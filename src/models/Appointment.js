import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

// ── Schema ────────────────────────────────────────────────────────────────────

const AppointmentSchema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Prefer not to say"],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    salonName: {
      type: String,
      trim: true,
      default: "",
    },
    appointmentDate: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      enum: [
        "Hair Cut & Styling",
        "Hair Color",
        "Hair Treatment",
        "Bridal Makeup",
        "Party Makeup",
        "Facial",
        "Waxing",
        "Threading",
        "Manicure",
        "Pedicure",
        "Other",
      ],
    },
    preferredTime: {
      type: String,
      required: true,
      enum: [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
      ],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    // Mongoose auto-manages createdAt + updatedAt
    timestamps: true,
  }
);

// ── Compound indexes for dashboard queries ────────────────────────────────────
// status filter + default sort
AppointmentSchema.index({ status: 1, createdAt: -1 });
// default dashboard sort
AppointmentSchema.index({ createdAt: -1 });
// search fields
AppointmentSchema.index({ name: 1 });
AppointmentSchema.index({ email: 1 });
AppointmentSchema.index({ contact: 1 });

// ── Model registration ────────────────────────────────────────────────────────
// In dev, delete the cached model before re-registering so that schema changes
// (new fields, updated enums) are always picked up on hot reload instead of
// Mongoose silently stripping fields not present in the stale cached schema.
if (process.env.NODE_ENV !== "production" && models.Appointment) {
  delete models.Appointment;
}
const Appointment =
  models.Appointment ?? model("Appointment", AppointmentSchema);

export default Appointment;
