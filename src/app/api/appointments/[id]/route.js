import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { getSession } from "@/lib/auth";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

// ── PATCH /api/appointments/[id] ──────────────────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { id } = await params;
  const { status, notes } = body;

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status value." },
      { status: 400 }
    );
  }

  const updates = { updatedAt: new Date() };
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;

  try {
    await connectDB();

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true, // return the updated document
        runValidators: true, // enforce schema enums on update
      }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment: { ...updated, _id: updated._id.toString() },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message =
        Object.values(err.errors)[0]?.message || "Validation failed.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    if (err.name === "CastError") {
      return NextResponse.json(
        { error: "Invalid appointment ID." },
        { status: 400 }
      );
    }
    console.error("PATCH /api/appointments/[id]:", err);
    return NextResponse.json(
      { error: "Failed to update appointment." },
      { status: 500 }
    );
  }
}

// ── DELETE /api/appointments/[id] ─────────────────────────────────────────────

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const deleted = await Appointment.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.name === "CastError") {
      return NextResponse.json(
        { error: "Invalid appointment ID." },
        { status: 400 }
      );
    }
    console.error("DELETE /api/appointments/[id]:", err);
    return NextResponse.json(
      { error: "Failed to delete appointment." },
      { status: 500 }
    );
  }
}
