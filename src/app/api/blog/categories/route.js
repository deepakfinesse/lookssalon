import { NextResponse }    from "next/server";
import { auth }            from "@/lib/auth";
import connectDB           from "@/lib/mongodb";
import BlogCategory        from "@/models/BlogCategory";
import { BlogCategoryCreateSchema, firstError } from "@/lib/schemas";

export const runtime = "nodejs";

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── GET /api/blog/categories — public ─────────────────────────────────────────

export async function GET() {
  try {
    await connectDB();
    const categories = await BlogCategory.find()
      .sort({ name: 1 })
      .select("-__v")
      .lean();

    return NextResponse.json(
      { categories: categories.map(c => ({ ...c, _id: c._id.toString() })) },
      { headers: { "Cache-Control": "public, max-age=120, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("GET /api/blog/categories:", err);
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 });
  }
}

// ── POST /api/blog/categories — admin only ─────────────────────────────────────

export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let raw;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const result = BlogCategoryCreateSchema.safeParse(raw);
  if (!result.success) return NextResponse.json({ error: firstError(result) }, { status: 400 });

  const { name, description } = result.data;
  const slug = result.data.slug || toSlug(name);

  try {
    await connectDB();
    const category = await BlogCategory.create({ name, slug, description });
    return NextResponse.json(
      { success: true, category: { ...category.toObject(), _id: category._id.toString() } },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 });
    console.error("POST /api/blog/categories:", err);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}
