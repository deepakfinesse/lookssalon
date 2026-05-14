import { NextResponse } from "next/server";
import { auth }         from "@/lib/auth";
import connectDB        from "@/lib/mongodb";
import HeroBanner       from "@/models/HeroBanner";

export const runtime = "nodejs";

// ── GET /api/banners — public ─────────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("admin") === "1";

  if (isAdmin) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();

    const query = isAdmin ? {} : { isActive: true };
    const banners = await HeroBanner.find(query).sort({ order: 1, createdAt: 1 }).lean();

    const serialized = banners.map(b => ({ ...b, _id: b._id.toString() }));

    const cacheHeader = isAdmin
      ? "no-store"
      : "public, max-age=60, stale-while-revalidate=300";

    return NextResponse.json(
      { banners: serialized },
      { headers: { "Cache-Control": cacheHeader } }
    );
  } catch (err) {
    console.error("GET /api/banners:", err);
    return NextResponse.json({ error: "Failed to fetch banners." }, { status: 500 });
  }
}

// ── POST /api/banners — admin only ────────────────────────────────────────────

export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const { desktopImage, mobileImage, href, order, isActive } = raw;

  if (!desktopImage?.url) {
    return NextResponse.json({ error: "Desktop image is required." }, { status: 400 });
  }

  try {
    await connectDB();
    const banner = await HeroBanner.create({
      desktopImage: {
        url: String(desktopImage.url).trim(),
        alt: String(desktopImage.alt ?? "").trim(),
      },
      mobileImage: {
        url: String(mobileImage?.url ?? "").trim(),
        alt: String(mobileImage?.alt ?? "").trim(),
      },
      href:     String(href ?? "/").trim() || "/",
      order:    Number(order ?? 0),
      isActive: isActive !== false,
    });

    return NextResponse.json(
      { success: true, banner: { ...banner.toObject(), _id: banner._id.toString() } },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/banners:", err);
    return NextResponse.json({ error: "Failed to create banner." }, { status: 500 });
  }
}
