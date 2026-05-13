import { NextResponse }  from "next/server";
import { auth }          from "@/lib/auth";
import connectDB         from "@/lib/mongodb";
import Salon             from "@/models/Salon";
import { SalonUpdateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

// ── PATCH /api/salons/[id] — admin only ───────────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = SalonUpdateSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const salon = await Salon.findByIdAndUpdate(
      id,
      { $set: result.data },
      { returnDocument: "after", runValidators: true }
    ).lean();

    if (!salon) {
      return NextResponse.json({ error: "Salon not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, salon: { ...salon, _id: salon._id.toString() } });
  } catch (err) {
    if (err.name === "ValidationError") {
      const msg = Object.values(err.errors)[0]?.message ?? "Validation failed.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error("PATCH /api/salons/[id]:", err);
    return NextResponse.json({ error: "Failed to update salon." }, { status: 500 });
  }
}

// ── DELETE /api/salons/[id] — admin only ──────────────────────────────────────

export async function DELETE(_request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const salon = await Salon.findByIdAndDelete(id);
    if (!salon) {
      return NextResponse.json({ error: "Salon not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/salons/[id]:", err);
    return NextResponse.json({ error: "Failed to delete salon." }, { status: 500 });
  }
}
