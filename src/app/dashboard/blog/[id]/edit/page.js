import { notFound } from "next/navigation";
import BlogPostForm  from "@/app/dashboard/_components/BlogPostForm";
import connectDB     from "@/lib/mongodb";
import BlogPost      from "@/models/BlogPost";
import BlogCategory  from "@/models/BlogCategory";

export const metadata = { title: "Edit Post — Blog Dashboard", robots: "noindex" };

async function getData(id) {
  try {
    await connectDB();
    const [post, categories] = await Promise.all([
      BlogPost.findById(id)
        .populate("categories", "_id name slug")
        .select("-__v")
        .lean(),
      BlogCategory.find().sort({ name: 1 }).select("_id name slug").lean(),
    ]);
    return { post, categories };
  } catch {
    return { post: null, categories: [] };
  }
}

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  const { post, categories } = await getData(id);

  if (!post) notFound();

  const serialized = {
    ...post,
    _id: post._id.toString(),
    categories: post.categories.map(c => ({ ...c, _id: c._id.toString() })),
  };

  const serializedCats = categories.map(c => ({ ...c, _id: c._id.toString() }));

  return <BlogPostForm initialData={serialized} categories={serializedCats} />;
}
