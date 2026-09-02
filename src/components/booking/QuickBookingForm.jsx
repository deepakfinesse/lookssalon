"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// ── Shared field styling ─────────────────────────────────────────────────────
const TEXT_FIELD =
  "bg-transparent border-b-2 border-white text-white placeholder:text-white " +
  "outline-none px-1 pb-1 text-lg md:text-2xl font-medium normal-case " +
  "transition-colors duration-200 focus:border-primary";

const SELECT_FIELD =
  "bg-transparent border-2 border-white text-white cursor-pointer " +
  "outline-none px-3 py-1.5 text-lg md:text-2xl font-medium normal-case appearance-none " +
  "transition-colors duration-200 focus:border-primary " +
  "[&>option]:bg-white [&>option]:text-black";

export default function QuickBookingForm() {
  const router = useRouter();

  const [cities, setCities]       = useState([]);
  const [values, setValues]       = useState({ name: "", contact: "", city: "" });
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load city list (same endpoint the full booking form uses)
  useEffect(() => {
    fetch("/api/salons/cities")
      .then(r => r.json())
      .then(d => setCities(d.cities ?? []))
      .catch(() => {});
  }, []);

  const setField = (key) => (e) => {
    const raw = e.target.value;
    const val = key === "contact" ? raw.replace(/\D/g, "").slice(0, 10) : raw;
    setValues(v => ({ ...v, [key]: val }));
    setErrors(er => ({ ...er, [key]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim())                     next.name    = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(values.contact))    next.contact = "Enter a valid 10-digit mobile number.";
    if (!values.city)                            next.city    = "Please select your city.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const qs = new URLSearchParams({
      name:    values.name.trim(),
      contact: values.contact,
      city:    values.city,
    }).toString();

    router.push(`/salon-book-appointment?${qs}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full max-w-5xl mx-auto px-4 text-white"
    >
      <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center justify-center gap-x-3 gap-y-12 text-lg md:text-4xl font-semibold ">

        {/* Name */}
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="whitespace-nowrap">My name is</span>
            <input
              type="text"
              placeholder="enter your name"
              value={values.name}
              onChange={setField("name")}
              maxLength={80}
              autoComplete="name"
              className={`${TEXT_FIELD} w-full sm:w-52`}
            />
          </div>
          {errors.name && (
            <span className="mt-1 text-xs font-normal normal-case text-red-700">{errors.name}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="whitespace-nowrap">
              <span className="hidden md:inline">, </span>My phone number is
            </span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="enter your number"
              value={values.contact}
              onChange={setField("contact")}
              maxLength={10}
              autoComplete="tel"
              className={`${TEXT_FIELD} w-full sm:w-56`}
            />
          </div>
          {errors.contact && (
            <span className="mt-1 text-xs font-normal normal-case text-red-700">{errors.contact}</span>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col w-full md:w-auto md:basis-full md:justify-center md:flex-row">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="whitespace-nowrap">I live in</span>
            <div className="relative w-full sm:w-56">
              <select
                value={values.city}
                onChange={setField("city")}
                className={`${SELECT_FIELD} w-full pr-9`}
              >
                <option value="">select city</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white"
              >
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {errors.city && (
            <span className="mt-1 text-xs font-normal normal-case text-red-700 sm:ml-2">{errors.city}</span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-18">
        <Button
          type="submit"
          variant="dark"
          disabled={submitting}
          label={submitting ? "Redirecting…" : "Book Now"}
        />
      </div>
    </form>
  );
}
