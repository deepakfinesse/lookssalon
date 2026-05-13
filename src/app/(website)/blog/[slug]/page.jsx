import { notFound }   from "next/navigation";
import Link           from "next/link";
import connectDB      from "@/lib/mongodb";
import BlogPost       from "@/models/BlogPost";
import BlogCategory   from "@/models/BlogCategory";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands  from "@/components/layout/PartnerBrands";

export const revalidate = 60;

async function getPost(slug) {
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug, status: "published" })
      .populate("categories", "name slug _id")
      .select("-__v")
      .lean();
    return post;
  } catch {
    return null;
  }
}

async function getRelatedPosts(post) {
  if (!post) return [];
  try {
    const query = {
      _id:    { $ne: post._id },
      status: "published",
      $or: [
        { categories: { $in: post.categories.map(c => c._id) } },
        { tags: { $in: post.tags } },
      ],
    };
    const related = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .limit(3)
      .populate("categories", "name slug")
      .select("title slug excerpt featuredImage categories readTime publishedAt")
      .lean();
    return related.map(p => ({
      ...p,
      _id: p._id.toString(),
      categories: p.categories.map(c => ({ ...c, _id: c._id.toString() })),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found — Looks Salon Blog" };

  const siteUrl    = process.env.NEXT_PUBLIC_SITE_URL || "https://lookssalon.in";
  const canonical  = `${siteUrl}/blog/${post.slug}`;
  const seoTitle   = post.seo?.title       || post.title;
  const seoDesc    = post.seo?.description || post.excerpt || `Read ${post.title} on the Looks Salon blog.`;
  const ogImage    = post.featuredImage?.url || `${siteUrl}/img/og-blog.jpg`;

  return {
    title:       `${seoTitle} | Looks Salon Blog`,
    description: seoDesc,
    keywords:    post.seo?.keywords?.join(", ") || post.tags?.join(", ") || "",
    alternates:  { canonical },
    openGraph: {
      title:     seoTitle,
      description: seoDesc,
      url:       canonical,
      siteName:  "Looks Salon",
      type:      "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime:  new Date(post.updatedAt).toISOString(),
      authors:   [post.author || "Looks Salon"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.featuredImage?.alt || seoTitle }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       seoTitle,
      description: seoDesc,
      images:      [ogImage],
    },
  };
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ status: "published" }).select("slug").lean();
    return posts.map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL || "https://lookssalon.in";
  const seoTitle  = post.seo?.title       || post.title;
  const seoDesc   = post.seo?.description || post.excerpt || "";
  const ogImage   = post.featuredImage?.url || "";

  // JSON-LD structured data
  const jsonLd = {
    "@context":         "https://schema.org",
    "@type":            "BlogPosting",
    headline:           post.title,
    description:        seoDesc,
    image:              ogImage || undefined,
    author: {
      "@type": "Person",
      name:    post.author || "Looks Salon",
    },
    publisher: {
      "@type": "Organization",
      name:    "Looks Salon",
      logo: {
        "@type": "ImageObject",
        url:     `${siteUrl}/img/logo.svg`,
      },
    },
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
    dateModified:  new Date(post.updatedAt).toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    keywords: (post.seo?.keywords?.length ? post.seo.keywords : post.tags)?.join(", ") || "",
  };

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-white">
        {/* ── Featured Image ── */}
        {post.featuredImage?.url && (
          <div className="w-full max-w-6xl mx-auto">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* ── Post Header ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-4 pb-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            {post.categories?.[0] && (
              <>
                <span>/</span>
                <Link href={`/blog?category=${post.categories[0].slug}`} className="hover:text-primary transition-colors capitalize">
                  {post.categories[0].name}
                </Link>
              </>
            )}
          </nav>

          {/* Categories */}
          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.categories.map(cat => (
                <Link
                  key={cat._id.toString()}
                  href={`/blog?category=${cat.slug}`}
                  className="border border-primary text-grey text-sm uppercase font-bold px-5.5 py-0.5 hover:bg-primary/10 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-3xl xl:text-3xl text-black font-medium mb-1">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm lg:text-sm text-black border-b border-gray-100 pb-2">
            {/* <span>By <span className="font-semibold text-gray-700">{post.author || "Looks Salon"}</span></span> */}
            {publishDate && <span>{publishDate}</span>} |
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-grey hover:text-primary transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <section className="bg-gray-50 py-14">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
              <h2 className="text-2xl font-bold text-grey uppercase mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(p => (
                  <Link key={p._id} href={`/blog/${p.slug}`} className="group block bg-white border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                    <div className="overflow-hidden">
                      {p.featuredImage?.url ? (
                        <img
                          src={p.featuredImage.url}
                          alt={p.featuredImage.alt || p.title}
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full aspect-4/3 bg-gray-100" />
                      )}
                    </div>
                    <div className="p-4">
                      {p.categories?.[0] && (
                        <span className="border border-primary text-grey text-sm font-bold uppercase px-5.5 py-0.5 mb-2 inline-block">
                          {p.categories[0].name}
                        </span>
                      )}
                      <h3 className="text-xl text-black group-hover:text-primary font-medium transition-colors duration-300 mt-1">
                        {p.title}
                      </h3>
                      <p className="text-md lg:text-md text-black mt-1 line-clamp-2">{p.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <BookAppointment />
      <PartnerBrands />
    </>
  );
}
