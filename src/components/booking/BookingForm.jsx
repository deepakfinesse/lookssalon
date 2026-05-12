"use client";

import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState }    from "react";
import { useRouter }   from "next/navigation";
import { FormField }   from "@/components/ui/FormField";
import Button          from "@/components/ui/Button";
import { BookingSchema, CITIES, SERVICES, HOURS } from "@/lib/schemas";

// ── Shared class strings (module-scope — never recreated per render) ──────────

const INPUT_CLS =
  "w-full py-1 px-0 bg-transparent border-0 border-b border-[var(--primary)] " +
  "text-white text-base tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "focus:border-white placeholder-transparent";

const INPUT_ERR_CLS =
  "w-full py-1 px-0 bg-transparent border-0 border-b border-red-400 " +
  "text-white text-base tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "focus:border-red-300 placeholder-transparent";

const SELECT_CLS     = INPUT_CLS     + " cursor-pointer pr-5";
const SELECT_ERR_CLS = INPUT_ERR_CLS + " cursor-pointer pr-5";

const inp = (hasError) => hasError ? INPUT_ERR_CLS  : INPUT_CLS;
const sel = (hasError) => hasError ? SELECT_ERR_CLS : SELECT_CLS;

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:       zodResolver(BookingSchema),
    mode:           "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name:          "",
      contact:       "",
      email:         "",
      gender:        "",
      city:          "",
      service:       "",
      preferredTime: "",
    },
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res  = await fetch("/api/appointments", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }

      reset();
      // Redirect to dedicated thank-you page, pass booking ID in URL
      router.push(`/salon-book-appointment/thank-you?id=${json.bookingId}`);

    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* NAME */}
        <FormField id="bf-name" label="Name" error={errors.name?.message}>
          <input
            id="bf-name"
            type="text"
            autoComplete="name"
            maxLength={80}
            className={inp(!!errors.name)}
            {...register("name")}
          />
        </FormField>

        {/* CONTACT */}
        <FormField id="bf-contact" label="Contact" error={errors.contact?.message}>
          <input
            id="bf-contact"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            className={inp(!!errors.contact)}
            {...register("contact")}
          />
        </FormField>

        {/* EMAIL */}
        <FormField id="bf-email" label="Email ID" error={errors.email?.message}>
          <input
            id="bf-email"
            type="email"
            autoComplete="email"
            maxLength={120}
            className={inp(!!errors.email)}
            {...register("email")}
          />
        </FormField>

        {/* GENDER */}
        <FormField id="bf-gender" label="Gender" error={errors.gender?.message} isSelect>
          <select
            id="bf-gender"
            className={sel(!!errors.gender)}
            {...register("gender")}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </FormField>

        {/* CITY */}
        <FormField id="bf-city" label="City" error={errors.city?.message} isSelect>
          <select
            id="bf-city"
            className={sel(!!errors.city)}
            {...register("city")}
          >
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>

        {/* SERVICE TYPE */}
        <FormField id="bf-service" label="Service Type" error={errors.service?.message} isSelect>
          <select
            id="bf-service"
            className={sel(!!errors.service)}
            {...register("service")}
          >
            <option value="">Select service</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

        {/* PREFERRED TIME */}
        <FormField id="bf-time" label="Preferred Time" error={errors.preferredTime?.message} isSelect>
          <select
            id="bf-time"
            className={sel(!!errors.preferredTime)}
            {...register("preferredTime")}
          >
            <option value="">Select time</option>
            {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </FormField>

        {/* Server-level error */}
        {serverError && (
          <div
            role="alert"
            className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-sm"
          >
            <p className="text-red-400 text-xs m-0 tracking-wide">{serverError}</p>
          </div>
        )}

        {/* BOOK NOW */}
        <div className="flex justify-center mt-6 mb-6">
          <Button
            type="submit"
            label={isSubmitting ? "Booking…" : "Book Now"}
            variant="primary"
            disabled={isSubmitting}
          />
        </div>

        {/* OR / phone */}
        <div className="text-center">
          <p className="text-white text-base tracking-[3px] uppercase mb-2">
            OR
          </p>
          <p className="text-white text-lg tracking-wide">
            CALL US @{" "}
            <a
              href="tel:180021256657"
              className="text-[var(--primary)] font-bold no-underline hover:underline"
            >
              1800 212 56657
            </a>
          </p>
        </div>

      </form>
    </div>
  );
}