import { NextResponse } from "next/server";
import { auth }         from "@/lib/auth";
import connectDB        from "@/lib/mongodb";
import HeroBanner       from "@/models/HeroBanner";

export const runtime = "nodejs";

// ── PATCH /api/banners/[id] — admin only ──────────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const update = {};

  if (raw.desktopImage !== undefined) {
    update.desktopImage = {
      url: String(raw.desktopImage.url ?? "").trim(),
      alt: String(raw.desktopImage.alt ?? "").trim(),
    };
  }
  if (raw.mobileImage !== undefined) {
    update.mobileImage = {
      url: String(raw.mobileImage.url ?? "").trim(),
      alt: String(raw.mobileImage.alt ?? "").trim(),
    };
  }
  if (raw.href !== undefined)     update.href     = String(raw.href).trim() || "/";
  if (raw.order !== undefined)    update.order    = Number(raw.order);
  if (raw.isActive !== undefined) update.isActive = Boolean(raw.isActive);

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 });
  }

  try {
    await connectDB();
    const banner = await HeroBanner.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!banner) return NextResponse.json({ error: "Banner not found." }, { status: 404 });

    return NextResponse.json({ success: true, banner: { ...banner, _id: banner._id.toString() } });
  } catch (err) {
    console.error("PATCH /api/banners/[id]:", err);
    return NextResponse.json({ error: "Failed to update banner." }, { status: 500 });
  }
}

// ── DELETE /api/banners/[id] — admin only ─────────────────────────────────────

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const banner = await HeroBanner.findByIdAndDelete(id);
    if (!banner) return NextResponse.json({ error: "Banner not found." }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/banners/[id]:", err);
    return NextResponse.json({ error: "Failed to delete banner." }, { status: 500 });
  }
}
