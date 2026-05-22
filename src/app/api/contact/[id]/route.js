import { NextResponse }  from "next/server";
import { auth }          from "@/lib/auth";
import connectDB         from "@/lib/mongodb";
import ContactInquiry    from "@/models/ContactInquiry";
import { ContactUpdateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

// ── PATCH /api/contact/[id] ────────────────────────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = ContactUpdateSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: firstError(result) }, { status: 400 });
  }

  const { id } = await params;

  try {
    await connectDB();
    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { $set: result.data },
      { returnDocument: "after", runValidators: true }
    ).lean();

    if (!inquiry) return NextResponse.json({ error: "Message not found." }, { status: 404 });

    return NextResponse.json({ inquiry: { ...inquiry, _id: inquiry._id.toString() } });
  } catch (err) {
    if (err.name === "CastError") {
      return NextResponse.json({ error: "Invalid message ID." }, { status: 400 });
    }
    console.error("PATCH /api/contact/[id]:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

// ── DELETE /api/contact/[id] ───────────────────────────────────────────────────

export async function DELETE(_request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const inquiry = await ContactInquiry.findByIdAndDelete(id).lean();
    if (!inquiry) return NextResponse.json({ error: "Message not found." }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.name === "CastError") {
      return NextResponse.json({ error: "Invalid message ID." }, { status: 400 });
    }
    console.error("DELETE /api/contact/[id]:", err);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
