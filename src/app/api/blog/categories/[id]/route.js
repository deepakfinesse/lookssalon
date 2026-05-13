import { NextResponse }    from "next/server";
import { auth }            from "@/lib/auth";
import connectDB           from "@/lib/mongodb";
import BlogCategory        from "@/models/BlogCategory";
import BlogPost            from "@/models/BlogPost";
import { BlogCategoryUpdateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

// ── PATCH /api/blog/categories/[id] — admin only ──────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = BlogCategoryUpdateSchema.safeParse(raw);
  if (!result.success) return NextResponse.json({ error: firstError(result) }, { status: 400 });

  try {
    await connectDB();
    const category = await BlogCategory.findByIdAndUpdate(id, result.data, { new: true, runValidators: true }).select("-__v").lean();
    if (!category) return NextResponse.json({ error: "Category not found." }, { status: 404 });
    return NextResponse.json({ success: true, category: { ...category, _id: category._id.toString() } });
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 });
    console.error("PATCH /api/blog/categories/[id]:", err);
    return NextResponse.json({ error: "Failed to update category." }, { status: 500 });
  }
}

// ── DELETE /api/blog/categories/[id] — admin only ────────────────────────────

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const category = await BlogCategory.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: "Category not found." }, { status: 404 });

    // Remove category reference from all posts
    await BlogPost.updateMany({ categories: id }, { $pull: { categories: id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/blog/categories/[id]:", err);
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }
}
