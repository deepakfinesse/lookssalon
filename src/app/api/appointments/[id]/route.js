import { NextResponse } from "next/server";
import { auth }         from "@/lib/auth";
import connectDB        from "@/lib/mongodb";
import Appointment      from "@/models/Appointment";
import { AppointmentUpdateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

// ── PATCH /api/appointments/[id] ──────────────────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Zod validates status enum + notes length + requires at least one field
  const result = AppointmentUpdateSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  const { id } = await params;
  const updates = result.data;

  try {
    await connectDB();

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }

    return NextResponse.json({
      success:     true,
      appointment: { ...updated, _id: updated._id.toString() },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: Object.values(err.errors)[0]?.message ?? "Validation failed." },
        { status: 400 }
      );
    }
    if (err.name === "CastError") {
      return NextResponse.json({ error: "Invalid appointment ID." }, { status: 400 });
    }
    console.error("PATCH /api/appointments/[id]:", err);
    return NextResponse.json({ error: "Failed to update appointment." }, { status: 500 });
  }
}

// ── DELETE /api/appointments/[id] ─────────────────────────────────────────────

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const deleted = await Appointment.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.name === "CastError") {
      return NextResponse.json({ error: "Invalid appointment ID." }, { status: 400 });
    }
    console.error("DELETE /api/appointments/[id]:", err);
    return NextResponse.json({ error: "Failed to delete appointment." }, { status: 500 });
  }
}