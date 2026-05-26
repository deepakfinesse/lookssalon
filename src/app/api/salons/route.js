import { NextResponse }    from "next/server";
import { auth }            from "@/lib/auth";
import connectDB           from "@/lib/mongodb";
import Salon               from "@/models/Salon";
import { SalonCreateSchema, SalonQuerySchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

function generateSalonId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => chars[b % chars.length])
    .join("");
  return `LSN-${suffix}`;
}

// ── GET /api/salons — public ───────────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const qResult = SalonQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
  if (!qResult.success) {
    return NextResponse.json({ error: firstError(qResult) }, { status: 400 });
  }

  const { page, limit, search, city } = qResult.data;

  // Admin view: pass ?admin=1 to see inactive salons too (still requires session check in dashboard)
  const showAll = searchParams.get("admin") === "1";
  const query = showAll ? {} : { isActive: true };

  if (city) {
    const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.city = { $regex: `^${escaped}$`, $options: "i" };
  }

  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = { $regex: escaped, $options: "i" };
    query.$or = [{ city: rx }, { name: rx }, { pinCode: rx }, { address1: rx }, { address2: rx }, { address3: rx }];
  }

  try {
    await connectDB();

    const [salons, total] = await Promise.all([
      Salon.find(query)
        .sort({ city: 1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v")
        .lean(),
      Salon.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        salons: salons.map(s => ({ ...s, _id: s._id.toString() })),
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (err) {
    console.error("GET /api/salons:", err);
    return NextResponse.json({ error: "Failed to fetch salons." }, { status: 500 });
  }
}

// ── POST /api/salons — admin only ─────────────────────────────────────────────

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = SalonCreateSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  try {
    await connectDB();

    let salonId, salon;
    let attempts = 0;
    while (attempts < 5) {
      salonId = generateSalonId();
      try {
        salon = await Salon.create({ salonId, ...result.data });
        break;
      } catch (e) {
        if (e.code === 11000) { attempts++; continue; }
        throw e;
      }
    }
    if (!salon) {
      return NextResponse.json({ error: "ID conflict. Please try again." }, { status: 409 });
    }

    return NextResponse.json(
      { success: true, salon: { ...salon.toObject(), _id: salon._id.toString() } },
      { status: 201 }
    );
  } catch (err) {
    if (err.name === "ValidationError") {
      const msg = Object.values(err.errors)[0]?.message ?? "Validation failed.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error("POST /api/salons:", err);
    return NextResponse.json({ error: "Failed to create salon." }, { status: 500 });
  }
}
