import BlogPostForm from "@/app/dashboard/_components/BlogPostForm";
import connectDB from "@/lib/mongodb";
import BlogCategory from "@/models/BlogCategory";

export const metadata = { title: "New Post — Blog Dashboard", robots: "noindex" };

async function getCategories() {
  try {
    await connectDB();
    const cats = await BlogCategory.find().sort({ name: 1 }).select("_id name slug").lean();
    return cats.map(c => ({ ...c, _id: c._id.toString() }));
  } catch {
    return [];
  }
}

export default async function NewBlogPostPage() {
  const categories = await getCategories();
  return <BlogPostForm categories={categories} />;
}
