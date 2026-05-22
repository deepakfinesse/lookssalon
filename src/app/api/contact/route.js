import { NextResponse }   from "next/server";
import { auth }           from "@/lib/auth";
import connectDB          from "@/lib/mongodb";
import ContactInquiry     from "@/models/ContactInquiry";
import { ContactInquirySchema, ContactQuerySchema, firstError } from "@/lib/schemas";
import { sendContactCustomerEmail, sendContactAdminEmail } from "@/lib/emails";

export const runtime = "nodejs";

function generateInquiryId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand  = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => chars[b % chars.length])
    .join("");
  return `LCQ-${rand}`;
}

// ── POST /api/contact ──────────────────────────────────────────────────────────

export async function POST(request) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = ContactInquirySchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  try {
    await connectDB();

    const inquiryId = generateInquiryId();
    const inquiry   = await ContactInquiry.create({ inquiryId, ...result.data });

    const withTimeout = (p) =>
      Promise.race([
        p,
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error("email_timeout")), 5_000)
        ),
      ]);

    const emailResults = await Promise.allSettled([
      withTimeout(sendContactCustomerEmail(inquiry.toObject())),
      withTimeout(sendContactAdminEmail(inquiry.toObject())),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === "rejected")
        console.error(`Contact email [${i === 0 ? "customer" : "admin"}] failed:`, r.reason?.message);
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", inquiryId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "ID conflict. Please try again." }, { status: 409 });
    }
    console.error("POST /api/contact:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}

// ── GET /api/contact ───────────────────────────────────────────────────────────

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const queryResult = ContactQuerySchema.safeParse(
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
      { phone:     rx },
      { subject:   rx },
    ];
  }

  try {
    await connectDB();

    const [inquiries, total, stats] = await Promise.all([
      ContactInquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("inquiryId name phone email subject query status notes createdAt")
        .lean(),

      ContactInquiry.countDocuments(query),

      ContactInquiry.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const statsMap = { new: 0, reviewed: 0, replied: 0, closed: 0, total: 0 };
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
    console.error("GET /api/contact:", err);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}
