"use client";

import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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
  // "10:00 AM" → 10, "1:00 PM" → 13, "12:00 PM" → 12, "12:00 AM" → 0
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
  "placeholder:text-white placeholder:uppercase";

const INPUT_ERR_CLS =
  BASE_INPUT + " border-red-400 focus:border-red-300";

const mkCls = (border) => BASE_INPUT + ` ${border} focus:border-white`;
const inp   = (hasError, border) => hasError ? INPUT_ERR_CLS : mkCls(border);
const sel   = (hasError, border, isEmpty) =>
  inp(hasError, border) + " cursor-pointer pr-5" + (isEmpty ? " uppercase" : "");

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingForm({ inputBorder = "border-[var(--primary)]" }) {
  const router = useRouter();
  const [serverError,   setServerError]   = useState("");
  const [cities,        setCities]        = useState([]);
  const [salonsInCity,  setSalonsInCity]  = useState([]);
  const [loadingSalons, setLoadingSalons] = useState(false);

  useEffect(() => {
    fetch("/api/salons/cities")
      .then(r => r.json())
      .then(d => setCities(d.cities ?? []))
      .catch(() => {});
  }, []);

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

  // ── Fetch salons when city changes ────────────────────────────────────────
  useEffect(() => {
    setValue("salonName", "");
    clearErrors("salonName");
    if (!cityValue) { setSalonsInCity([]); return; }
    setLoadingSalons(true);
    fetch(`/api/salons?city=${encodeURIComponent(cityValue)}&limit=50`)
      .then(r => r.json())
      .then(d => setSalonsInCity(d.salons ?? []))
      .catch(() => setSalonsInCity([]))
      .finally(() => setLoadingSalons(false));
  }, [cityValue, setValue, clearErrors]);

  // ── Clear salon error when a salon is selected ────────────────────────────
  useEffect(() => {
    if (selectedSalon) clearErrors("salonName");
  }, [selectedSalon, clearErrors]);

  // ── IST-aware date / time logic ───────────────────────────────────────────
  const nowIST        = getNowIST();
  const todayISTStr   = toISTDateStr(nowIST);
  const currentHourIST = nowIST.getHours();
  // Block today entirely once all slots are past (≥ 9 PM = last slot hour)
  const isPast9PMIST  = currentHourIST >= 21;
  const minDateStr    = isPast9PMIST
    ? toISTDateStr(new Date(nowIST.getTime() + 86_400_000))
    : todayISTStr;

  // For same-day bookings, only show future time slots
  const availableHours = selectedDate === todayISTStr
    ? HOURS.filter(h => parseHour24(h) > currentHourIST)
    : HOURS;

  // Reset preferredTime if the selected slot is no longer available
  useEffect(() => {
    if (selectedTime && !availableHours.includes(selectedTime)) {
      setValue("preferredTime", "");
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    // Salon is required when the city has active salons
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
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>

        {/* SALON NAME — shown only when a city is selected */}
        {cityValue && (
          <FormField id="bf-salon" label="Select Salon" error={errors.salonName?.message} isSelect>
            <select
              id="bf-salon"
              disabled={loadingSalons}
              className={sel(!!errors.salonName, inputBorder, !watch("salonName"))}
              {...register("salonName")}
            >
              <option value="">
                {loadingSalons
                  ? "Loading salons…"
                  : salonsInCity.length === 0
                    ? "No salons available in this city"
                    : "Select salon"}
              </option>
              {salonsInCity.map(s => (
                <option key={s._id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </FormField>
        )}

        {/* APPOINTMENT DATE */}
        <FormField id="bf-date" label="Appointment Date" error={errors.appointmentDate?.message}>
          <input
            id="bf-date"
            type="date"
            min={minDateStr}
            className={inp(!!errors.appointmentDate, inputBorder) + " [&::-webkit-calendar-picker-indicator]:invert"}
            {...register("appointmentDate")}
          />
        </FormField>

        {/* PREFERRED TIME — filtered for same-day bookings */}
        <FormField id="bf-time" label="Preferred Time" error={errors.preferredTime?.message} isSelect>
          <select
            id="bf-time"
            className={sel(!!errors.preferredTime, inputBorder, !watch("preferredTime"))}
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
