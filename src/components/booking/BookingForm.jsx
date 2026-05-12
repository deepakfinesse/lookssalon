"use client";

import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState }    from "react";
import { useRouter }   from "next/navigation";
import { FormField }   from "@/components/ui/FormField";
import Button          from "@/components/ui/Button";
import { BookingSchema, CITIES, SERVICES, HOURS } from "@/lib/schemas";

// ── Shared class strings ──────────────────────────────────────────────────────

const BASE_INPUT =
  "w-full py-1 px-0 bg-transparent border-0 border-b font-medium " +
  "text-white text-md tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "placeholder:text-white placeholder:uppercase";

const INPUT_ERR_CLS =
  BASE_INPUT + " border-red-400 focus:border-red-300";

const mkCls  = (border) => BASE_INPUT + ` ${border} focus:border-white`;
const inp    = (hasError, border) => hasError ? INPUT_ERR_CLS : mkCls(border);
const sel    = (hasError, border, isEmpty) => inp(hasError, border) + " cursor-pointer pr-5" + (isEmpty ? " uppercase" : "");

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingForm({ inputBorder = "border-[var(--primary)]" }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
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
            placeholder="Name"
            autoComplete="name"
            maxLength={80}
            className={inp(!!errors.name, inputBorder)}
            {...register("name")}
          />
        </FormField>

        {/* CONTACT */}
        <FormField id="bf-contact" label="Contact" error={errors.contact?.message}>
          <input
            id="bf-contact"
            type="tel"
            placeholder="Contact"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            className={inp(!!errors.contact, inputBorder)}
            {...register("contact")}
          />
        </FormField>

        {/* EMAIL */}
        <FormField id="bf-email" label="Email ID" error={errors.email?.message}>
          <input
            id="bf-email"
            type="email"
            placeholder="Email ID"
            autoComplete="email"
            maxLength={120}
            className={inp(!!errors.email, inputBorder)}
            {...register("email")}
          />
        </FormField>

        {/* GENDER */}
        <FormField id="bf-gender" label="Gender" error={errors.gender?.message} isSelect>
          <select
            id="bf-gender"
            className={sel(!!errors.gender, inputBorder, !watch("gender"))}
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
            className={sel(!!errors.city, inputBorder, !watch("city"))}
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
            className={sel(!!errors.service, inputBorder, !watch("service"))}
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
            className={sel(!!errors.preferredTime, inputBorder, !watch("preferredTime"))}
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

        

      </form>
    </div>
  );
}