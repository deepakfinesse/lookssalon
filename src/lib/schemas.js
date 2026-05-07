import { z } from "zod";

// ── Shared enum values (mirrors Mongoose schema — change in one place only) ───

export const CITIES = [
  "Mumbai","Delhi","Bengaluru","Hyderabad","Chennai",
  "Kolkata","Pune","Ahmedabad","Jaipur","Lucknow","Other",
];

export const SERVICES = [
  "Hair Cut & Styling","Hair Color","Hair Treatment","Bridal Makeup",
  "Party Makeup","Facial","Waxing","Threading","Manicure","Pedicure","Other",
];

export const HOURS = [
  "10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM",
  "4:00 PM","5:00 PM","6:00 PM",
];

export const STATUSES = ["pending","confirmed","completed","cancelled"];

// ── Booking form schema ───────────────────────────────────────────────────────

export const BookingSchema = z.object({
  name: z
    .string({ required_error: "Please enter your name." })
    .trim()
    .min(1, "Please enter your name.")
    .max(80, "Name must be 80 characters or less."),

  contact: z
    .string({ required_error: "Please enter your contact number." })
    .trim()
    .min(1, "Please enter your contact number.")
    .refine(
      v => /^[6-9]\d{9}$/.test(v.replace(/\s/g, "")),
      "Please enter a valid 10-digit Indian mobile number."
    ),

  email: z
    .string({ required_error: "Please enter your email address." })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(120, "Email must be 120 characters or less."),

  gender: z.enum(["Male","Female","Prefer not to say"], {
    required_error:  "Please select your gender.",
    invalid_type_error: "Please select a valid gender.",
  }),

  city: z.enum(CITIES, {
    required_error:  "Please select your city.",
    invalid_type_error: "Please select a valid city.",
  }),

  service: z.enum(SERVICES, {
    required_error:  "Please select a service type.",
    invalid_type_error: "Please select a valid service.",
  }),

  preferredTime: z.enum(HOURS, {
    required_error:  "Please select your preferred time.",
    invalid_type_error: "Please select a valid time.",
  }),
});

// ── Appointment update schema (dashboard PATCH) ───────────────────────────────

export const AppointmentUpdateSchema = z
  .object({
    status: z.enum(STATUSES, {
      invalid_type_error: "Invalid status value.",
    }).optional(),

    notes: z
      .string()
      .max(1000, "Notes must be 1000 characters or less.")
      .optional(),
  })
  .refine(
    data => data.status !== undefined || data.notes !== undefined,
    { message: "Provide at least one field to update." }
  );

// ── Dashboard query params schema (GET /api/appointments) ─────────────────────

export const AppointmentQuerySchema = z.object({
  page:   z.coerce.number().int().min(1).default(1),
  limit:  z.coerce.number().int().min(1).max(50).default(15),
  status: z.enum(["all", ...STATUSES]).default("all"),
  search: z.string().trim().max(100).default(""),
});

// ── Login schema ──────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(1, "Username is required."),

  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Password is required."),
});

// ── Helper: format first Zod error as a plain string ─────────────────────────

export function firstError(result) {
  return result.error.issues[0]?.message ?? "Validation failed.";
}