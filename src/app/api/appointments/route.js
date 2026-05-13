import { NextResponse }    from "next/server";
import { auth }            from "@/lib/auth";
import connectDB           from "@/lib/mongodb";
import Appointment         from "@/models/Appointment";
import { BookingSchema, AppointmentQuerySchema, firstError } from "@/lib/schemas";
import { sendCustomerConfirmationEmail, sendAdminNotificationEmail } from "@/lib/emails";

export const runtime = "nodejs";

function generateBookingId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => chars[b % chars.length])
    .join("");
}

// ── POST /api/appointments ─────────────────────────────────────────────────────

export async function POST(request) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Zod validates + transforms (trim, lowercase, strip spaces from contact)
  const result = BookingSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  const data = result.data;

  try {
    await connectDB();

    const bookingId  = generateBookingId();
    const appointment = await Appointment.create({ bookingId, ...data });

    // Fire-and-forget emails — 8s timeout fits Vercel free 10s function limit
    // Awaited so Vercel doesn't kill the function before emails dispatch.
    // 5s timeout per email keeps total well under the 10s function limit.
    const withTimeout = (p) =>
      Promise.race([
        p,
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error("email_timeout")), 5_000)
        ),
      ]);

    const emailResults = await Promise.allSettled([
      withTimeout(sendCustomerConfirmationEmail(appointment.toObject())),
      withTimeout(sendAdminNotificationEmail(appointment.toObject())),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === "rejected")
        console.error(`Email [${i === 0 ? "customer" : "admin"}] failed:`, r.reason?.message);
    });

    return NextResponse.json(
      { success: true, message: "Appointment booked successfully!", bookingId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)[0]?.message ?? "Validation failed.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    if (err.code === 11000) {
      return NextResponse.json({ error: "Booking ID conflict. Please try again." }, { status: 409 });
    }
    console.error("POST /api/appointments:", err);
    return NextResponse.json({ error: "Failed to save booking. Please try again." }, { status: 500 });
  }
}

// ── GET /api/appointments ──────────────────────────────────────────────────────

export async function GET(request) {
  // NextAuth session check — replaces old getSession()
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Zod parses + coerces + defaults all query params in one step
  const { searchParams } = new URL(request.url);
  const queryResult = AppointmentQuerySchema.safeParse(
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
      { bookingId: rx },
      { contact:   rx },
    ];
  }

  try {
    await connectDB();

    const [appointments, total, stats] = await Promise.all([
      Appointment.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("bookingId name email contact service city salonName gender preferredTime appointmentDate status notes createdAt updatedAt")
        .lean(),

      Appointment.countDocuments(query),

      Appointment.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const statsMap = { pending: 0, confirmed: 0, completed: 0, cancelled: 0, total: 0 };
    for (const s of stats) {
      if (s._id in statsMap) statsMap[s._id] = s.count;
      statsMap.total += s.count;
    }

    return NextResponse.json(
      {
        appointments: appointments.map(a => ({ ...a, _id: a._id.toString() })),
        pagination:   { page, limit, total, pages: Math.ceil(total / limit) },
        stats:        statsMap,
      },
      { headers: { "Cache-Control": "private, max-age=0, must-revalidate" } }
    );
  } catch (err) {
    console.error("GET /api/appointments:", err);
    return NextResponse.json({ error: "Failed to fetch appointments." }, { status: 500 });
  }
}