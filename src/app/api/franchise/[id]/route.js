import { NextResponse }  from "next/server";
import { auth }          from "@/lib/auth";
import connectDB         from "@/lib/mongodb";
import FranchiseInquiry  from "@/models/FranchiseInquiry";
import { FranchiseUpdateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

// ── PATCH /api/franchise/[id] ─────────────────────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = FranchiseUpdateSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  const { id } = await params;

  try {
    await connectDB();
    const inquiry = await FranchiseInquiry.findByIdAndUpdate(
      id,
      { $set: result.data },
      { returnDocument: "after", runValidators: true }
    ).lean();

    if (!inquiry) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });

    return NextResponse.json({ inquiry: { ...inquiry, _id: inquiry._id.toString() } });
  } catch (err) {
    if (err.name === "CastError") {
      return NextResponse.json({ error: "Invalid inquiry ID." }, { status: 400 });
    }
    console.error("PATCH /api/franchise/[id]:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

// ── DELETE /api/franchise/[id] ────────────────────────────────────────────────

export async function DELETE(_request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const inquiry = await FranchiseInquiry.findByIdAndDelete(id).lean();
    if (!inquiry) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.name === "CastError") {
      return NextResponse.json({ error: "Invalid inquiry ID." }, { status: 400 });
    }
    console.error("DELETE /api/franchise/[id]:", err);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
