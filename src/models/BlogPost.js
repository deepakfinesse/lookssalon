import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const BlogPostSchema = new Schema(
  {
    title:    { type: String, required: true, trim: true, maxlength: 200 },
    slug:     { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 250 },
    content:  { type: String, required: true, default: "" },
    excerpt:  { type: String, trim: true, maxlength: 500, default: "" },
    featuredImage: {
      url: { type: String, trim: true, default: "" },
      alt: { type: String, trim: true, default: "" },
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "BlogCategory" }],
    tags:       [{ type: String, trim: true, maxlength: 60 }],
    author:     { type: String, trim: true, default: "Admin", maxlength: 100 },
    status:     { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date, default: null },
    readTime:   { type: Number, default: 1 },
    seo: {
      title:       { type: String, trim: true, maxlength: 70, default: "" },
      description: { type: String, trim: true, maxlength: 160, default: "" },
      keywords:    [{ type: String, trim: true, maxlength: 60 }],
    },
  },
  { timestamps: true }
);

BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ categories: 1, status: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1, status: 1 });

const BlogPost = models.BlogPost ?? model("BlogPost", BlogPostSchema);
export default BlogPost;
