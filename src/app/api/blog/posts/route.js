import { NextResponse }  from "next/server";
import { auth }          from "@/lib/auth";
import connectDB         from "@/lib/mongodb";
import BlogPost          from "@/models/BlogPost";
import BlogCategory      from "@/models/BlogCategory";
import { BlogPostCreateSchema, BlogQuerySchema, firstError } from "@/lib/schemas";

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

// ── GET /api/blog/posts ───────────────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("admin") === "1";

  const qResult = BlogQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
  if (!qResult.success) return NextResponse.json({ error: firstError(qResult) }, { status: 400 });

  const { page, limit, status, category, search, sort } = qResult.data;

  // Admin requires auth
  if (isAdmin) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const query = isAdmin ? {} : { status: "published" };

  if (!isAdmin && status !== "all") query.status = status;
  if (isAdmin && status !== "all") query.status = status;

  if (category) {
    try {
      await connectDB();
      const cat = await BlogCategory.findOne({ slug: category }).select("_id").lean();
      if (cat) query.categories = cat._id;
      else return NextResponse.json({ posts: [], pagination: { page, limit, total: 0, pages: 0 } });
    } catch (err) {
      console.error("GET /api/blog/posts - category lookup:", err);
    }
  }

  if (search) {
    const esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = { $regex: esc, $options: "i" };
    query.$or = [{ title: rx }, { excerpt: rx }, { tags: rx }];
  }

  const sortOrder = sort === "oldest" ? 1 : -1;

  try {
    await connectDB();

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: sortOrder, createdAt: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("categories", "name slug")
        .select("-content -__v")
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    const serialized = posts.map(p => ({
      ...p,
      _id: p._id.toString(),
      categories: p.categories.map(c => ({ ...c, _id: c._id.toString() })),
    }));

    const cacheHeader = isAdmin
      ? "no-store"
      : "public, max-age=60, stale-while-revalidate=300";

    return NextResponse.json(
      { posts: serialized, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
      { headers: { "Cache-Control": cacheHeader } }
    );
  } catch (err) {
    console.error("GET /api/blog/posts:", err);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

// ── POST /api/blog/posts — admin only ─────────────────────────────────────────

export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = BlogPostCreateSchema.safeParse(raw);
  if (!result.success) return NextResponse.json({ error: firstError(result) }, { status: 400 });

  const data = result.data;
  if (!data.slug) data.slug = toSlug(data.title);
  data.readTime = calcReadTime(data.content || "");
  if (data.status === "published" && !data.publishedAt) data.publishedAt = new Date();

  try {
    await connectDB();
    const post = await BlogPost.create(data);
    await post.populate("categories", "name slug");
    return NextResponse.json(
      { success: true, post: { ...post.toObject(), _id: post._id.toString() } },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    if (err.name === "ValidationError") {
      const msg = Object.values(err.errors)[0]?.message ?? "Validation failed.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error("POST /api/blog/posts:", err);
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
