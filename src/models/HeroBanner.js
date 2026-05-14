import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const HeroBannerSchema = new Schema(
  {
    desktopImage: {
      url: { type: String, trim: true, default: "" },
      alt: { type: String, trim: true, default: "" },
    },
    mobileImage: {
      url: { type: String, trim: true, default: "" },
      alt: { type: String, trim: true, default: "" },
    },
    href:     { type: String, trim: true, default: "/" },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

HeroBannerSchema.index({ order: 1 });

const HeroBanner = models.HeroBanner ?? model("HeroBanner", HeroBannerSchema);
export default HeroBanner;
