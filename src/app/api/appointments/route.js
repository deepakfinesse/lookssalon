import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { getSession } from "@/lib/auth";
import {
  sendCustomerConfirmationEmail,
  sendAdminNotificationEmail,
} from "@/lib/emails";

// ── Vercel free tier note ─────────────────────────────────────────────────────
// setInterval() does NOT work on Vercel — serverless functions spin down after
// each request. The rate-map below is request-scoped only.
// For real rate limiting on Vercel free, use the `x-forwarded-for` header +
// a short-lived flag in MongoDB, or upgrade to Vercel Edge with KV.
// ─────────────────────────────────────────────────────────────────────────────

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

function generateBookingId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => chars[b % chars.length])
    .join("");
}

// ── POST /api/appointments ─────────────────────────────────────────────────────

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, contact, email, gender, city, service, preferredTime } = body;

  // Required fields
  if (
    !name?.trim() ||
    !contact?.trim() ||
    !email?.trim() ||
    !gender ||
    !city ||
    !service ||
    !preferredTime
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // Format checks
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }
  if (!PHONE_RE.test(contact.replace(/\s/g, ""))) {
    return NextResponse.json(
      { error: "Invalid Indian phone number." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const bookingId = generateBookingId();

    // Mongoose validates enums (gender, city, service, preferredTime, status)
    // against the schema — no manual enum checks needed here
    const appointment = await Appointment.create({
      bookingId,
      name: name.trim(),
      contact: contact.replace(/\s/g, ""),
      email: email.trim().toLowerCase(),
      gender,
      city,
      service,
      preferredTime,
    });

    // Fire emails — 8s timeout fits inside Vercel free 10s function limit
    const withTimeout = (p) =>
      Promise.race([
        p,
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error("email timeout")), 8_000)
        ),
      ]);

    Promise.allSettled([
      withTimeout(sendCustomerConfirmationEmail(appointment.toObject())),
      withTimeout(sendAdminNotificationEmail(appointment.toObject())),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(
            `Email [${i === 0 ? "customer" : "admin"}] failed:`,
            r.reason?.message
          );
        }
      });
    });

    return NextResponse.json(
      { success: true, message: "Appointment booked successfully!", bookingId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    // Mongoose ValidationError → 400, everything else → 500
    if (err.name === "ValidationError") {
      const message =
        Object.values(err.errors)[0]?.message || "Validation failed.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    // Duplicate bookingId (extremely unlikely but safe)
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Booking ID conflict. Please try again." },
        { status: 409 }
      );
    }
    console.error("POST /api/appointments:", err);
    return NextResponse.json(
      { error: "Failed to save booking. Please try again." },
      { status: 500 }
    );
  }
}

// ── GET /api/appointments ──────────────────────────────────────────────────────

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "15"));
  const status = searchParams.get("status") || "all";
  const search = (searchParams.get("search") || "").trim().slice(0, 100);

  // Build Mongoose query
  const query = {};
  if (status && status !== "all") query.status = status;
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = { $regex: escaped, $options: "i" };
    query.$or = [
      { name: rx },
      { email: rx },
      { bookingId: rx },
      { contact: rx },
    ];
  }

  try {
    await connectDB();

    // Count + paginated list + status aggregation — all in parallel
    const [appointments, total, stats] = await Promise.all([
      Appointment.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select(
          "bookingId name email contact service city gender preferredTime status notes createdAt updatedAt"
        )
        .lean(), // .lean() returns plain JS objects — faster, less memory

      Appointment.countDocuments(query),

      Appointment.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const statsMap = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    };
    for (const s of stats) {
      if (s._id in statsMap) statsMap[s._id] = s.count;
      statsMap.total += s.count;
    }

    return NextResponse.json(
      {
        appointments: appointments.map((a) => ({
          ...a,
          _id: a._id.toString(),
        })),
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        stats: statsMap,
      },
      { headers: { "Cache-Control": "private, max-age=0, must-revalidate" } }
    );
  } catch (err) {
    console.error("GET /api/appointments:", err);
    return NextResponse.json(
      { error: "Failed to fetch appointments." },
      { status: 500 }
    );
  }
}
