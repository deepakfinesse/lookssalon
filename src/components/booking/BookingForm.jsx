"use client";

import { memo }                   from "react";
import { useForm }                from "react-hook-form";
import { zodResolver }            from "@hookform/resolvers/zod";
import { useState }               from "react";
import { FormField }              from "@/components/ui/FormField";
import { BookingSchema, CITIES, SERVICES, HOURS } from "@/lib/schemas";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";

// ── Shared class strings (module-scope — never recreated per render) ──────────

const INPUT_CLS =
  "w-full py-1 px-0 bg-transparent border-0 border-b border-[var(--primary)] " +
  "text-white text-base tracking-wide  " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "focus:border-white placeholder-transparent";

const INPUT_ERR_CLS =
  "w-full py-1 px-0 bg-transparent border-0 border-b border-red-400 " +
  "text-white text-base tracking-wide  " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "focus:border-red-300 placeholder-transparent";

const SELECT_CLS      = INPUT_CLS     + " cursor-pointer pr-5";
const SELECT_ERR_CLS  = INPUT_ERR_CLS + " cursor-pointer pr-5";

// When field has an error → red border, else gold border
const inp = (hasError) => hasError ? INPUT_ERR_CLS     : INPUT_CLS;
const sel = (hasError) => hasError ? SELECT_ERR_CLS    : SELECT_CLS;

// ── Success state ─────────────────────────────────────────────────────────────

const SuccessState = memo(function SuccessState({ bookingId, onReset }) {
  return (
    <div className="text-center py-12 px-5">
      <div
        aria-hidden="true"
        className="w-16 h-16 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30
                   flex items-center justify-center mx-auto mb-6 text-2xl text-[var(--primary)]"
      >✓</div>
      <p className="text-[var(--primary)] text-[10px] tracking-[4px] uppercase mb-3 ">
        Booking Confirmed
      </p>
      <h3 className="text-white text-xl font-light mb-4 ">
        Thank You!
      </h3>
      <p className="text-white/60 text-[13px] leading-relaxed mb-2 ">
        Your appointment request has been received.<br />
        A confirmation email is on its way to you.
      </p>
      <p className="text-white/40 text-xs mb-8 ">
        Booking ID:{" "}
        <span className="text-[var(--primary)] font-mono">#{bookingId}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="bg-transparent border border-[var(--primary)]/60 text-[var(--primary)]
                   px-8 py-2.5 text-[10px] tracking-[3px] uppercase cursor-pointer
                    transition-colors duration-200
                   hover:bg-[var(--primary)]/10"
      >
        Book Another
      </button>
    </div>
  );
});

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [bookingId,    setBookingId]    = useState(null);   // null = not submitted yet
  const [serverError,  setServerError]  = useState("");     // API-level error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:        zodResolver(BookingSchema),
    mode:            "onChange",      // validate as user types
    reValidateMode:  "onChange",      // re-validate on every change
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
      setBookingId(json.bookingId);
      reset(); // clear all fields after success
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  const handleReset = () => {
    setBookingId(null);
    setServerError("");
    reset();
  };

  if (bookingId) {
    return <SuccessState bookingId={bookingId} onReset={handleReset} />;
  }

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

        {/* Server-level error (API failure, network error) */}
        {serverError && (
          <div
            role="alert"
            className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-sm"
          >
            <p className="text-red-400 text-xs m-0 tracking-wide">{serverError}</p>
          </div>
        )}

        {/* BOOK NOW */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="block w-full py-4 min-h-[52px]
                     bg-[var(--primary)] text-black border-0
                     text-lg tracking-[5px] uppercase font-bold
                      cursor-pointer mb-6
                     transition-opacity duration-200 will-change-[opacity]
                     hover:opacity-[0.88] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Booking…" : "Book Now"}
        </button>

         {/* Buttons */}
          {/* <FadeUp delay={0.2}>
              <div className="text-center pb-4">
                <Button
                  label="Book Now"
                  href="#"
                  className="md:px-10 shadow-[0px_0px_24px_0px_#00000059]"
                />
              </div>
          </FadeUp> */}

        {/* OR / phone */}
        <div className="text-center">
          <p className="text-white text-base tracking-[3px] uppercase mb-2 ">
            OR
          </p>
          <p className="text-white text-lg tracking-wide ">
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