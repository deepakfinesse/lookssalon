"use client";

import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter }   from "next/navigation";
import Button          from "@/components/ui/Button";
import { ContactInquirySchema } from "@/lib/schemas";

const BASE_INPUT =
  "w-full py-2 px-0 bg-transparent border-0 border-b font-medium " +
  "text-foreground text-sm tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "placeholder:text-grey/50 placeholder:uppercase placeholder:tracking-widest";

const inp = (hasError) =>
  hasError
    ? BASE_INPUT + " border-red-400 focus:border-red-400"
    : BASE_INPUT + " border-grey/20 focus:border-foreground";

function FieldError({ error }) {
  if (!error) return null;
  return (
    <p role="alert" aria-live="polite" className="mt-1 text-red-500 text-xs">
      {error}
    </p>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:       zodResolver(ContactInquirySchema),
    mode:           "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name:    "",
      phone:   "",
      email:   "",
      subject: "",
      query:   "",
    },
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res  = await fetch("/api/contact", {
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
      router.push(`/contact/thank-you?id=${json.inquiryId}`);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* Row 1: Full Name + Phone Number */}
      <div className="grid grid-cols-2 gap-8 mb-7">
        <div>
          <input
            id="cf-name"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            maxLength={80}
            className={inp(!!errors.name)}
            {...register("name")}
          />
          <FieldError error={errors.name?.message} />
        </div>
        <div>
          <input
            id="cf-phone"
            type="tel"
            placeholder="Phone Number"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            className={inp(!!errors.phone)}
            {...register("phone")}
          />
          <FieldError error={errors.phone?.message} />
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-7">
        <input
          id="cf-email"
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          maxLength={120}
          className={inp(!!errors.email)}
          {...register("email")}
        />
        <FieldError error={errors.email?.message} />
      </div>

      {/* Subject */}
      <div className="mb-7">
        <input
          id="cf-subject"
          type="text"
          placeholder="Subject"
          maxLength={200}
          className={inp(!!errors.subject)}
          {...register("subject")}
        />
        <FieldError error={errors.subject?.message} />
      </div>

      {/* Query */}
      <div className="mb-7">
        <textarea
          id="cf-query"
          placeholder="Write you query"
          rows={5}
          maxLength={2000}
          className={inp(!!errors.query) + " resize-none leading-relaxed"}
          {...register("query")}
        />
        <FieldError error={errors.query?.message} />
      </div>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-sm">
          <p className="text-red-500 text-xs m-0 tracking-wide">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <div className="mt-2">
        <Button
          type="submit"
          label={isSubmitting ? "Sending…" : "Send Message"}
          variant="primary"
          disabled={isSubmitting}
        />
      </div>

    </form>
  );
}
