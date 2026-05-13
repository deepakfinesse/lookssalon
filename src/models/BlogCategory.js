import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const BlogCategorySchema = new Schema(
  {
    name:        { type: String, required: true, trim: true, maxlength: 100 },
    slug:        { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 120 },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

const BlogCategory = models.BlogCategory ?? model("BlogCategory", BlogCategorySchema);
export default BlogCategory;
