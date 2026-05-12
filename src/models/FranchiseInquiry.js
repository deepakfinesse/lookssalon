import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const FranchiseInquirySchema = new Schema(
  {
    inquiryId: {
      type:     String,
      required: true,
      unique:   true,
      index:    true,
    },
    name: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 80,
    },
    occupation: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 100,
    },
    contact: {
      type:     String,
      required: true,
      trim:     true,
    },
    email: {
      type:      String,
      required:  true,
      trim:      true,
      lowercase: true,
    },
    location: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 200,
    },
    message: {
      type:    String,
      default: "",
      trim:    true,
      maxlength: 1000,
    },
    status: {
      type:    String,
      enum:    ["new", "reviewed", "contacted", "closed"],
      default: "new",
      index:   true,
    },
    notes: {
      type:    String,
      default: "",
      trim:    true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

FranchiseInquirySchema.index({ status: 1, createdAt: -1 });
FranchiseInquirySchema.index({ createdAt: -1 });
FranchiseInquirySchema.index({ name: 1 });
FranchiseInquirySchema.index({ email: 1 });
FranchiseInquirySchema.index({ contact: 1 });

const FranchiseInquiry =
  models.FranchiseInquiry ?? model("FranchiseInquiry", FranchiseInquirySchema);

export default FranchiseInquiry;
