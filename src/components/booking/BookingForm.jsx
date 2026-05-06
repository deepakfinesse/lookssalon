"use client";

import { useState, useCallback, memo } from "react";

// ── Static data ───────────────────────────────────────────────────────────────

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Other",
];
const SERVICES = [
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
];
const HOURS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];
const EMPTY_FORM = {
  name: "",
  contact: "",
  email: "",
  gender: "",
  city: "",
  service: "",
  preferredTime: "",
};

// ── Shared class strings (module-scope constants — never recreated per render) ─

// Label: uppercase, spaced, white, small — matches "NAME", "CONTACT" in screenshot
const LABEL =
  "block text-white text-[11px] font-[var(--font-primary)] tracking-[3px] uppercase mb-1";

// Underline input: transparent bg, only bottom border in gold, white text
const INPUT =
  "w-full py-2.5 px-0 bg-transparent border-0 border-b border-[var(--primary)] " +
  "text-white text-[13px] tracking-wide font-[var(--font-primary)] " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "focus:border-white placeholder-transparent";

// Select same as input + hide native arrow (arrow drawn via sibling span)
const SELECT = INPUT + " cursor-pointer pr-5";

// ── FieldWrapper ──────────────────────────────────────────────────────────────

const FieldWrapper = memo(function FieldWrapper({
  id,
  label,
  isSelect,
  children,
}) {
  return (
    <div className="relative mb-6 bg-black">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        {children}
        {isSelect && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 bottom-3 text-[var(--primary)] text-[9px]"
          >
            ▼
          </span>
        )}
      </div>
    </div>
  );
});

// ── Success state ─────────────────────────────────────────────────────────────

const SuccessState = memo(function SuccessState({ bookingId, onReset }) {
  return (
    <div className="text-center py-12 px-5">
      <div
        aria-hidden="true"
        className="w-16 h-16 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30
                   flex items-center justify-center mx-auto mb-6 text-2xl text-[var(--primary)]"
      >
        ✓
      </div>
      <p className="text-[var(--primary)] text-[10px] tracking-[4px] uppercase mb-3 font-[var(--font-primary)]">
        Booking Confirmed
      </p>
      <h3 className="text-white text-xl font-light mb-4 font-[var(--font-primary)]">
        Thank You!
      </h3>
      <p className="text-white/60 text-[13px] leading-relaxed mb-2 font-[var(--font-primary)]">
        Your appointment request has been received.
        <br />A confirmation email is on its way to you.
      </p>
      <p className="text-white/40 text-xs mb-8 font-[var(--font-primary)]">
        Booking ID:{" "}
        <span className="text-[var(--primary)] font-mono">#{bookingId}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="bg-transparent border border-[var(--primary)]/60 text-[var(--primary)]
                   px-8 py-2.5 text-[10px] tracking-[3px] uppercase cursor-pointer
                   font-[var(--font-primary)] transition-colors duration-200
                   hover:bg-[var(--primary)]/10"
      >
        Book Another
      </button>
    </div>
  );
});

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => (prev ? "" : prev));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const checks = [
        [!form.name.trim(), "Please enter your name."],
        [!form.contact.trim(), "Please enter your contact number."],
        [!form.email.trim(), "Please enter your email address."],
        [!form.gender, "Please select your gender."],
        [!form.city, "Please select your city."],
        [!form.service, "Please select a service type."],
        [!form.preferredTime, "Please select your preferred time."],
      ];
      for (const [fail, msg] of checks) {
        if (fail) {
          setError(msg);
          return;
        }
      }
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          return;
        }
        setSuccess(data.bookingId);
        setForm(EMPTY_FORM);
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  const handleReset = useCallback(() => setSuccess(null), []);

  if (success)
    return <SuccessState bookingId={success} onReset={handleReset} />;

  return (
    <div className="max-w-7xl mx-auto bg-black p-4">
      {/* ── Header copy — matches screenshot exactly ── */}
      <p className="text-white text-[13px] text-center leading-relaxed mb-2 tracking-wide">
        Our online bookings service operates between{" "}
        <strong className="text-[var(--primary)] font-semibold">
          10:00a.m.
        </strong>{" "}
        and{" "}
        <strong className="text-[var(--primary)] font-semibold">
          6:00p.m.
        </strong>
      </p>
      <p className="text-white/60 text-[11px] text-center leading-relaxed mb-8 tracking-wide">
        Your data is safe with us! We will only use your details to process your
        salon booking, and won&apos;t share them with third parties.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* NAME */}
        <FieldWrapper id="bf-name" label="Name">
          <input
            id="bf-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={INPUT}
            autoComplete="name"
            maxLength={80}
          />
        </FieldWrapper>

        {/* CONTACT */}
        <FieldWrapper id="bf-contact" label="Contact">
          <input
            id="bf-contact"
            type="tel"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className={INPUT}
            autoComplete="tel"
            maxLength={10}
            inputMode="numeric"
          />
        </FieldWrapper>

        {/* EMAIL ID */}
        <FieldWrapper id="bf-email" label="Email ID">
          <input
            id="bf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={INPUT}
            autoComplete="email"
            maxLength={120}
          />
        </FieldWrapper>

        {/* GENDER */}
        <FieldWrapper id="bf-gender" label="Gender" isSelect>
          <select
            id="bf-gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={SELECT}
          >
            <option value="" disabled hidden />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </FieldWrapper>

        {/* CITY */}
        <FieldWrapper id="bf-city" label="City" isSelect>
          <select
            id="bf-city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={SELECT}
          >
            <option value="" disabled hidden />
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FieldWrapper>

        {/* SERVICE TYPE */}
        <FieldWrapper id="bf-service" label="Service Type" isSelect>
          <select
            id="bf-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={SELECT}
          >
            <option value="" disabled hidden />
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FieldWrapper>

        {/* PREFERRED TIME */}
        <FieldWrapper id="bf-time" label="Preferred Time" isSelect>
          <select
            id="bf-time"
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
            className={SELECT}
          >
            <option value="" disabled hidden />
            {HOURS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </FieldWrapper>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-sm"
          >
            <p className="text-red-400 text-xs m-0 tracking-wide">{error}</p>
          </div>
        )}

        {/* BOOK NOW button — gold bg, black text, uppercase spaced, matches screenshot */}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="block w-full py-4 min-h-[52px]
                     bg-[var(--primary)] text-black border-0
                     text-[11px] tracking-[5px] uppercase font-bold
                     font-[var(--font-primary)] cursor-pointer mb-6
                     transition-opacity duration-200 will-change-[opacity]
                     hover:opacity-[0.88] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Booking…" : "Book Now"}
        </button>

        {/* OR / phone — matches screenshot */}
        <div className="text-center">
          <p className="text-white text-[11px] tracking-[3px] uppercase mb-2 font-[var(--font-primary)]">
            OR
          </p>
          <p className="text-white text-[12px] tracking-wide font-[var(--font-primary)]">
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
