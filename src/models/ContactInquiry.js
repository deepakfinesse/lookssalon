import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const ContactInquirySchema = new Schema(
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
    phone: {
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
    subject: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 200,
    },
    query: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 2000,
    },
    status: {
      type:    String,
      enum:    ["new", "reviewed", "replied", "closed"],
      default: "new",
      index:   true,
    },
    notes: {
      type:      String,
      default:   "",
      trim:      true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

ContactInquirySchema.index({ status: 1, createdAt: -1 });
ContactInquirySchema.index({ createdAt: -1 });
ContactInquirySchema.index({ name: 1 });
ContactInquirySchema.index({ email: 1 });

const ContactInquiry =
  models.ContactInquiry ?? model("ContactInquiry", ContactInquirySchema);

export default ContactInquiry;
