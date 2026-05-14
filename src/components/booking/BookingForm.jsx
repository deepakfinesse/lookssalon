"use client";

import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { useRouter }   from "next/navigation";
import { FormField }   from "@/components/ui/FormField";
import Button          from "@/components/ui/Button";
import { BookingSchema, SERVICES, HOURS } from "@/lib/schemas";

// ── IST time helpers ──────────────────────────────────────────────────────────

function getNowIST() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
}

function toISTDateStr(date) {
  const ist = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  return [
    ist.getFullYear(),
    String(ist.getMonth() + 1).padStart(2, "0"),
    String(ist.getDate()).padStart(2, "0"),
  ].join("-");
}

function parseHour24(timeStr) {
  const [time, period] = timeStr.split(" ");
  let h = parseInt(time.split(":")[0], 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h;
}

// ── Shared class strings ──────────────────────────────────────────────────────

const BASE_INPUT =
  "w-full py-1 px-0 bg-transparent border-0 border-b font-medium " +
  "text-white text-md tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "placeholder:text-white ";

const INPUT_ERR_CLS =
  BASE_INPUT + " border-red-400 focus:border-red-300";

const mkCls = (border) => BASE_INPUT + ` ${border} focus:border-white`;
const inp   = (hasError, border) => hasError ? INPUT_ERR_CLS : mkCls(border);
const sel   = (hasError, border) =>
  inp(hasError, border) + " cursor-pointer pr-5 scheme-dark [&>option]:bg-[#1a1a1a] [&>option]:text-white";

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingForm({ inputBorder = "border-[var(--primary)]", defaultCity = "", defaultSalon = "" }) {
  const router = useRouter();
  const [serverError,   setServerError]   = useState("");
  const [cities,        setCities]        = useState([]);
  const [salonsInCity,  setSalonsInCity]  = useState([]);
  const [loadingSalons, setLoadingSalons] = useState(false);

  // Track one-time prefill so strict-mode double-invocation doesn't re-apply
  const cityPrefilled   = useRef(false);
  const salonPrefilled  = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:       zodResolver(BookingSchema),
    mode:           "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name:            "",
      contact:         "",
      email:           "",
      gender:          "",
      city:            "",
      salonName:       "",
      appointmentDate: "",
      service:         "",
      preferredTime:   "",
    },
  });

  const cityValue     = watch("city");
  const selectedDate  = watch("appointmentDate");
  const selectedTime  = watch("preferredTime");
  const selectedSalon = watch("salonName");

  // ── 1. Load city list ─────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/salons/cities")
      .then(r => r.json())
      .then(d => setCities(d.cities ?? []))
      .catch(() => {});
  }, []);

  // ── 2. Apply defaultCity AFTER city options exist in DOM ──────────────────
  //    useEffect fires after React commits the new <option> elements, so
  //    setValue can find the matching option in the select element.
  useEffect(() => {
    if (!cityPrefilled.current && defaultCity && cities.includes(defaultCity)) {
      cityPrefilled.current = true;
      setValue("city", defaultCity, { shouldDirty: false, shouldTouch: false });
    }
  }, [cities]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 3. Fetch salons whenever city changes ─────────────────────────────────
  useEffect(() => {
    clearErrors("salonName");
    if (!cityValue) { setSalonsInCity([]); return; }
    setLoadingSalons(true);
    fetch(`/api/salons?city=${encodeURIComponent(cityValue)}&limit=50`)
      .then(r => r.json())
      .then(d => setSalonsInCity(d.salons ?? []))
      .catch(() => setSalonsInCity([]))
      .finally(() => setLoadingSalons(false));
  }, [cityValue, clearErrors]);

  // ── 4. Apply defaultSalon AFTER salon options exist in DOM ────────────────
  useEffect(() => {
    if (!salonPrefilled.current && defaultSalon && salonsInCity.some(s => s.name === defaultSalon)) {
      salonPrefilled.current = true;
      setValue("salonName", defaultSalon, { shouldDirty: false, shouldTouch: false });
    }
  }, [salonsInCity]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Clear salon error when a salon is selected ────────────────────────────
  useEffect(() => {
    if (selectedSalon) clearErrors("salonName");
  }, [selectedSalon, clearErrors]);

  // ── IST-aware date / time logic ───────────────────────────────────────────
  const nowIST         = getNowIST();
  const todayISTStr    = toISTDateStr(nowIST);
  const currentHourIST = nowIST.getHours();
  const isPast9PMIST   = currentHourIST >= 21;
  const minDateStr     = isPast9PMIST
    ? toISTDateStr(new Date(nowIST.getTime() + 86_400_000))
    : todayISTStr;

  const availableHours = selectedDate === todayISTStr
    ? HOURS.filter(h => parseHour24(h) > currentHourIST)
    : HOURS;

  useEffect(() => {
    if (selectedTime && !availableHours.includes(selectedTime)) {
      setValue("preferredTime", "");
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    if (cityValue && salonsInCity.length > 0 && !data.salonName) {
      setError("salonName", { type: "manual", message: "Please select a salon." });
      return;
    }

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
      router.push(`/salon-book-appointment/thank-you?id=${json.bookingId}`);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Row 1: Name + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8">
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
        </div>

        {/* Row 2: Email + Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8">
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

          <FormField id="bf-gender" label="Gender" error={errors.gender?.message} isSelect>
            <select
              id="bf-gender"
              className={sel(!!errors.gender, inputBorder)}
              {...register("gender")}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </FormField>
        </div>

        {/* Row 3: City + Salon (salon conditional) */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8">
          <FormField id="bf-city" label="City" error={errors.city?.message} isSelect>
            <select
              id="bf-city"
              className={sel(!!errors.city, inputBorder)}
              {...register("city", {
                onChange: () => {
                  setSalonsInCity([]);
                  setValue("salonName", "");
                  clearErrors("salonName");
                },
              })}
            >
              <option value="">Select city</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>

          {cityValue && (
            <FormField id="bf-salon" label="Select Salon" error={errors.salonName?.message} isSelect>
              <select
                id="bf-salon"
                disabled={loadingSalons}
                className={sel(!!errors.salonName, inputBorder)}
                {...register("salonName")}
              >
                <option value="">
                  {loadingSalons
                    ? "Loading salons…"
                    : salonsInCity.length === 0
                      ? "No salons in this city"
                      : "Select salon"}
                </option>
                {salonsInCity.map(s => (
                  <option key={s._id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </FormField>
          )}
        </div>

        {/* Row 4: Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <FormField id="bf-date" label="Appointment Date" error={errors.appointmentDate?.message}>
            <input
              id="bf-date"
              type="date"
              min={minDateStr}
              className={inp(!!errors.appointmentDate, inputBorder) + " [&::-webkit-calendar-picker-indicator]:invert"}
              {...register("appointmentDate")}
            />
          </FormField>

          <FormField id="bf-time" label="Preferred Time" error={errors.preferredTime?.message} isSelect>
            <select
              id="bf-time"
              className={sel(!!errors.preferredTime, inputBorder)}
              {...register("preferredTime")}
            >
              <option value="">
                {selectedDate === todayISTStr && availableHours.length === 0
                  ? "No slots available today"
                  : "Select time"}
              </option>
              {availableHours.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Row 5: Service — full width */}
        <FormField id="bf-service" label="Service Type" error={errors.service?.message} isSelect>
          <select
            id="bf-service"
            className={sel(!!errors.service, inputBorder)}
            {...register("service")}
          >
            <option value="">Select service</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

        {/* Server-level error */}
        {serverError && (
          <div role="alert" className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-sm">
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
