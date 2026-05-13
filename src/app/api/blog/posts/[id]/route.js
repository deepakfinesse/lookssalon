import { NextResponse }  from "next/server";
import { auth }          from "@/lib/auth";
import connectDB         from "@/lib/mongodb";
import BlogPost          from "@/models/BlogPost";
import { BlogPostUpdateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calcReadTime(html) {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

// ── GET /api/blog/posts/[id] — public (by slug) or admin (by _id) ─────────────

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    await connectDB();

    // Support both MongoDB _id and slug lookups
    const isObjectId = /^[a-f\d]{24}$/i.test(id);
    const query = isObjectId ? { _id: id } : { slug: id, status: "published" };

    const post = await BlogPost.findOne(query)
      .populate("categories", "name slug")
      .select("-__v")
      .lean();

    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const serialized = {
      ...post,
      _id: post._id.toString(),
      categories: post.categories.map(c => ({ ...c, _id: c._id.toString() })),
    };

    return NextResponse.json({ post: serialized });
  } catch (err) {
    console.error("GET /api/blog/posts/[id]:", err);
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  }
}

// ── PATCH /api/blog/posts/[id] — admin only ───────────────────────────────────

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = BlogPostUpdateSchema.safeParse(raw);
  if (!result.success) return NextResponse.json({ error: firstError(result) }, { status: 400 });

  const data = result.data;

  // Auto-generate slug if title changed but slug not provided
  if (data.title && !data.slug) data.slug = toSlug(data.title);

  // Recalculate readTime if content updated
  if (data.content !== undefined) data.readTime = calcReadTime(data.content);

  // Set publishedAt when transitioning to published
  if (data.status === "published") {
    const existing = await BlogPost.findById(id).select("status publishedAt").lean();
    if (existing && existing.status !== "published" && !existing.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  try {
    await connectDB();
    const post = await BlogPost.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate("categories", "name slug")
      .select("-__v")
      .lean();

    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    return NextResponse.json({
      success: true,
      post: {
        ...post,
        _id: post._id.toString(),
        categories: post.categories.map(c => ({ ...c, _id: c._id.toString() })),
      },
    });
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    console.error("PATCH /api/blog/posts/[id]:", err);
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

// ── DELETE /api/blog/posts/[id] — admin only ─────────────────────────────────

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/blog/posts/[id]:", err);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
