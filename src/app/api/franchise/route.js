import { NextResponse }    from "next/server";
import { auth }            from "@/lib/auth";
import connectDB           from "@/lib/mongodb";
import FranchiseInquiry    from "@/models/FranchiseInquiry";
import { FranchiseInquirySchema, FranchiseQuerySchema, firstError } from "@/lib/schemas";
import { sendFranchiseCustomerEmail, sendFranchiseAdminEmail } from "@/lib/emails";

export const runtime = "nodejs";

function generateInquiryId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand  = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => chars[b % chars.length])
    .join("");
  return `LFR-${rand}`;
}

// ── POST /api/franchise ────────────────────────────────────────────────────────

export async function POST(request) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = FranchiseInquirySchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  try {
    await connectDB();

    const inquiryId = generateInquiryId();
    const inquiry   = await FranchiseInquiry.create({ inquiryId, ...result.data });

    const withTimeout = (p) =>
      Promise.race([
        p,
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error("email_timeout")), 5_000)
        ),
      ]);

    const emailResults = await Promise.allSettled([
      withTimeout(sendFranchiseCustomerEmail(inquiry.toObject())),
      withTimeout(sendFranchiseAdminEmail(inquiry.toObject())),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === "rejected")
        console.error(`Franchise email [${i === 0 ? "customer" : "admin"}] failed:`, r.reason?.message);
    });

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully!", inquiryId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "ID conflict. Please try again." }, { status: 409 });
    }
    console.error("POST /api/franchise:", err);
    return NextResponse.json({ error: "Failed to submit inquiry. Please try again." }, { status: 500 });
  }
}

// ── GET /api/franchise ─────────────────────────────────────────────────────────

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const queryResult = FranchiseQuerySchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );
  if (!queryResult.success) {
    return NextResponse.json({ error: firstError(queryResult) }, { status: 400 });
  }

  const { page, limit, status, search } = queryResult.data;

  const query = {};
  if (status !== "all") query.status = status;
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = { $regex: escaped, $options: "i" };
    query.$or = [
      { name:      rx },
      { email:     rx },
      { inquiryId: rx },
      { contact:   rx },
      { location:  rx },
    ];
  }

  try {
    await connectDB();

    const [inquiries, total, stats] = await Promise.all([
      FranchiseInquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("inquiryId name occupation email contact location message status notes createdAt")
        .lean(),

      FranchiseInquiry.countDocuments(query),

      FranchiseInquiry.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const statsMap = { new: 0, reviewed: 0, contacted: 0, closed: 0, total: 0 };
    for (const s of stats) {
      if (s._id in statsMap) statsMap[s._id] = s.count;
      statsMap.total += s.count;
    }

    return NextResponse.json(
      {
        inquiries:  inquiries.map(i => ({ ...i, _id: i._id.toString() })),
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        stats:      statsMap,
      },
      { headers: { "Cache-Control": "private, max-age=0, must-revalidate" } }
    );
  } catch (err) {
    console.error("GET /api/franchise:", err);
    return NextResponse.json({ error: "Failed to fetch inquiries." }, { status: 500 });
  }
}
