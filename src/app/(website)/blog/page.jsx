import { Suspense }       from "react";
import BlogSection        from "@/components/blog/BlogSection";
import BookAppointment    from "@/components/layout/BookAppointment";
import PartnerBrands      from "@/components/layout/PartnerBrands";
import connectDB          from "@/lib/mongodb";
import BlogPost           from "@/models/BlogPost";
import BlogCategory       from "@/models/BlogCategory";

export const revalidate = 60; // ISR — revalidate every 60 seconds

const POSTS_PER_PAGE = 20;

async function getBlogData({ page, category, sort }) {
  try {
    await connectDB();

    const query = { status: "published" };

    if (category) {
      const cat = await BlogCategory.findOne({ slug: category }).select("_id").lean();
      if (cat) query.categories = cat._id;
    }

    const sortOrder = sort === "oldest" ? 1 : -1;
    const skip = (page - 1) * POSTS_PER_PAGE;

    const [posts, total, categories] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: sortOrder, createdAt: sortOrder })
        .skip(skip)
        .limit(POSTS_PER_PAGE)
        .populate("categories", "name slug _id")
        .select("title slug excerpt featuredImage categories tags readTime publishedAt")
        .lean(),
      BlogPost.countDocuments(query),
      BlogCategory.find().sort({ name: 1 }).select("_id name slug").lean(),
    ]);

    return {
      posts: posts.map(p => ({
        ...p,
        _id: p._id.toString(),
        categories: p.categories.map(c => ({ ...c, _id: c._id.toString() })),
      })),
      totalPages: Math.ceil(total / POSTS_PER_PAGE),
      categories: categories.map(c => ({ ...c, _id: c._id.toString() })),
    };
  } catch {
    return { posts: [], totalPages: 1, categories: [] };
  }
}

export async function generateMetadata({ searchParams }) {
  const { category } = await searchParams;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lookssalon.in";

  let title       = "Blog — Looks Salon | Hair Care, Bridal & Beauty Tips";
  let description = "Explore expert hair care, bridal beauty, and salon tips from Looks Salon. Stay updated with the latest trends in hair styling, colour, and skincare.";
  let canonical   = `${siteUrl}/blog`;

  if (category) {
    const catName = category.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    title         = `${catName} — Blog | Looks Salon`;
    description   = `Browse all ${catName} articles from Looks Salon. Expert tips and guides.`;
    canonical     = `${siteUrl}/blog?category=${category}`;
  }

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Looks Salon",
      type: "website",
      images: [{ url: `${siteUrl}/img/og-blog.jpg`, width: 1200, height: 630, alt: "Looks Salon Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPage({ searchParams }) {
  const { page: rawPage = "1", category = "", sort = "latest" } = await searchParams;
  const page = Math.max(1, parseInt(rawPage, 10) || 1);

  const { posts, totalPages, categories } = await getBlogData({ page, category, sort });

  return (
    <>
      <Suspense>
        <BlogSection
          posts={posts}
          categories={categories}
          currentPage={page}
          totalPages={totalPages}
          currentCategory={category}
          currentSort={sort}
        />
      </Suspense>
      {/* <BookAppointment /> */}
      <PartnerBrands />
    </>
  );
}
