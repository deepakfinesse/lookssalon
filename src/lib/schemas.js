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
    .max(120, "Email must be 120 characters or less.")
    .refine(
      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      { message: "Please enter a valid email address." }
    ),

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
  limit:  z.coerce.number().int().min(1).max(500).default(15),
  status: z.enum(["all", ...STATUSES]).default("all"),
  search: z.string().trim().max(100).default(""),
});

// ── Franchise inquiry schema ──────────────────────────────────────────────────

export const FranchiseInquirySchema = z.object({
  name: z
    .string({ required_error: "Please enter your name." })
    .trim()
    .min(1, "Please enter your name.")
    .max(80, "Name must be 80 characters or less."),

  occupation: z
    .string({ required_error: "Please enter your occupation." })
    .trim()
    .min(1, "Please enter your occupation.")
    .max(100, "Occupation must be 100 characters or less."),

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
    .max(120, "Email must be 120 characters or less.")
    .refine(
      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      { message: "Please enter a valid email address." }
    ),

  location: z
    .string({ required_error: "Please enter the desired franchise location." })
    .trim()
    .min(1, "Please enter the desired franchise location.")
    .max(200, "Location must be 200 characters or less."),

  message: z
    .string()
    .trim()
    .max(1000, "Message must be 1000 characters or less.")
    .optional()
    .default(""),
});

export const FRANCHISE_STATUSES = ["new", "reviewed", "contacted", "closed"];

export const FranchiseQuerySchema = z.object({
  page:   z.coerce.number().int().min(1).default(1),
  limit:  z.coerce.number().int().min(1).max(5000).default(15),
  status: z.enum(["all", ...FRANCHISE_STATUSES]).default("all"),
  search: z.string().trim().max(100).default(""),
});

export const FranchiseUpdateSchema = z
  .object({
    status: z.enum(FRANCHISE_STATUSES, {
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

// ── Salon schemas ─────────────────────────────────────────────────────────────

export const SalonCreateSchema = z.object({
  name: z
    .string({ required_error: "Salon name is required." })
    .trim()
    .min(1, "Salon name is required.")
    .max(100, "Name must be 100 characters or less."),

  city: z
    .string({ required_error: "City is required." })
    .trim()
    .min(1, "City is required.")
    .max(100, "City must be 100 characters or less."),

  address: z
    .string({ required_error: "Address is required." })
    .trim()
    .min(1, "Address is required.")
    .max(300, "Address must be 300 characters or less."),

  phones: z
    .array(z.string().trim().min(1, "Phone number cannot be empty.").max(20))
    .min(1, "At least one phone number is required.")
    .max(3, "Maximum 3 phone numbers allowed."),

  timing: z
    .string({ required_error: "Timing is required." })
    .trim()
    .min(1, "Timing is required.")
    .max(100, "Timing must be 100 characters or less."),

  googleMapUrl:       z.string().trim().max(500).optional().default(""),
  salonTourUrl:       z.string().trim().max(500).optional().default(""),
  bookAppointmentUrl: z.string().trim().max(500).optional().default(""),
  isActive:           z.boolean().optional().default(true),
});

export const SalonUpdateSchema = SalonCreateSchema.partial().refine(
  data => Object.keys(data).length > 0,
  { message: "Provide at least one field to update." }
);

export const SalonQuerySchema = z.object({
  page:   z.coerce.number().int().min(1).default(1),
  limit:  z.coerce.number().int().min(1).max(500).default(200),
  search: z.string().trim().max(100).default(""),
  city:   z.string().trim().max(100).default(""),
});

// ── Blog schemas ──────────────────────────────────────────────────────────────

export const BLOG_STATUSES = ["draft", "published"];

export const BlogCategoryCreateSchema = z.object({
  name: z
    .string({ required_error: "Category name is required." })
    .trim()
    .min(1, "Category name is required.")
    .max(100, "Name must be 100 characters or less."),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(120, "Slug must be 120 characters or less.")
    .optional(),
  description: z.string().trim().max(500).optional().default(""),
});

export const BlogCategoryUpdateSchema = BlogCategoryCreateSchema.partial().refine(
  data => Object.keys(data).length > 0,
  { message: "Provide at least one field to update." }
);

export const BlogPostCreateSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title must be 200 characters or less."),
  slug: z.string().trim().toLowerCase().max(250).optional(),
  content: z.string().default(""),
  excerpt: z.string().trim().max(500).optional().default(""),
  featuredImage: z
    .object({
      url: z.string().trim().max(1000).optional().default(""),
      alt: z.string().trim().max(200).optional().default(""),
    })
    .optional()
    .default({}),
  categories: z.array(z.string().trim()).optional().default([]),
  tags: z.array(z.string().trim().max(60)).optional().default([]),
  author: z.string().trim().max(100).optional().default("Admin"),
  status: z.enum(BLOG_STATUSES).optional().default("draft"),
  seo: z
    .object({
      title:       z.string().trim().max(70).optional().default(""),
      description: z.string().trim().max(160).optional().default(""),
      keywords:    z.array(z.string().trim().max(60)).optional().default([]),
    })
    .optional()
    .default({}),
});

export const BlogPostUpdateSchema = BlogPostCreateSchema.partial().refine(
  data => Object.keys(data).length > 0,
  { message: "Provide at least one field to update." }
);

export const BlogQuerySchema = z.object({
  page:     z.coerce.number().int().min(1).default(1),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
  status:   z.enum(["all", ...BLOG_STATUSES]).default("all"),
  category: z.string().trim().max(120).default(""),
  search:   z.string().trim().max(100).default(""),
  sort:     z.enum(["latest", "oldest"]).default("latest"),
});

// ── Helper: format first Zod error as a plain string ─────────────────────────

export function firstError(result) {
  return result.error.issues[0]?.message ?? "Validation failed.";
}