import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const SalonSchema = new Schema(
  {
    salonId: { type: String, required: true, unique: true, index: true },
    name:     { type: String, required: true, trim: true, maxlength: 100 },
    city:     { type: String, required: true, trim: true, maxlength: 100 },
    address1: { type: String, required: true, trim: true, maxlength: 200 },
    address2: { type: String, trim: true, default: "", maxlength: 200 },
    address3: { type: String, trim: true, default: "", maxlength: 200 },
    pinCode:  { type: String, trim: true, default: "", maxlength: 10 },
    address:  { type: String, trim: true, default: "", maxlength: 300 }, // legacy
    phones: {
      type: [String],
      required: true,
      validate: {
        validator: v => Array.isArray(v) && v.length >= 1 && v.length <= 3,
        message: "Provide 1 to 3 phone numbers.",
      },
    },
    timing:             { type: String, required: true, trim: true, maxlength: 100 },
    googleMapUrl:       { type: String, trim: true, default: "" },
    salonTourUrl:       { type: String, trim: true, default: "" },
    bookAppointmentUrl: { type: String, trim: true, default: "" },
    isActive:           { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Compound indexes for locator queries + dashboard listing
SalonSchema.index({ isActive: 1, city: 1, name: 1 });
SalonSchema.index({ city: 1, name: 1 });

const Salon = models.Salon ?? model("Salon", SalonSchema);
export default Salon;
