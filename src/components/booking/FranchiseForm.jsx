"use client";

import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState }    from "react";
import { useRouter }   from "next/navigation";
import { FormField }   from "@/components/ui/FormField";
import Button          from "@/components/ui/Button";
import { FranchiseInquirySchema } from "@/lib/schemas";

// ── Shared class strings (identical to BookingForm) ───────────────────────────

const BASE_INPUT =
  "w-full py-1 px-0 bg-transparent border-0 border-b font-medium " +
  "text-white text-md tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "placeholder:text-white placeholder:uppercase";

const INPUT_ERR_CLS = BASE_INPUT + " border-red-400 focus:border-red-300";

const mkCls = (border) => BASE_INPUT + ` ${border} focus:border-white`;
const inp   = (hasError, border) => hasError ? INPUT_ERR_CLS : mkCls(border);

// ── Main component ────────────────────────────────────────────────────────────

export default function FranchiseForm({ inputBorder = "border-[var(--primary)]" }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:       zodResolver(FranchiseInquirySchema),
    mode:           "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name:       "",
      occupation: "",
      contact:    "",
      email:      "",
      location:   "",
      message:    "",
    },
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res  = await fetch("/api/franchise", {
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
      router.push(`/franchise/thank-you?id=${json.inquiryId}`);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* NAME */}
        <FormField id="ff-name" label="Name" error={errors.name?.message}>
          <input
            id="ff-name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            maxLength={80}
            className={inp(!!errors.name, inputBorder)}
            {...register("name")}
          />
        </FormField>

        {/* OCCUPATION */}
        <FormField id="ff-occupation" label="Occupation" error={errors.occupation?.message}>
          <input
            id="ff-occupation"
            type="text"
            placeholder="Occupation"
            autoComplete="organization-title"
            maxLength={100}
            className={inp(!!errors.occupation, inputBorder)}
            {...register("occupation")}
          />
        </FormField>

        {/* CONTACT */}
        <FormField id="ff-contact" label="Contact No." error={errors.contact?.message}>
          <input
            id="ff-contact"
            type="tel"
            placeholder="Contact no."
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            className={inp(!!errors.contact, inputBorder)}
            {...register("contact")}
          />
        </FormField>

        {/* EMAIL */}
        <FormField id="ff-email" label="Email ID" error={errors.email?.message}>
          <input
            id="ff-email"
            type="email"
            placeholder="Email id"
            autoComplete="email"
            maxLength={120}
            className={inp(!!errors.email, inputBorder)}
            {...register("email")}
          />
        </FormField>

        {/* LOCATION */}
        <FormField id="ff-location" label="Location of Franchisee" error={errors.location?.message}>
          <input
            id="ff-location"
            type="text"
            placeholder="Location of Franchisee"
            maxLength={200}
            className={inp(!!errors.location, inputBorder)}
            {...register("location")}
          />
        </FormField>

        {/* MESSAGE */}
        <FormField id="ff-message" label="Message" error={errors.message?.message}>
          <textarea
            id="ff-message"
            placeholder="Message"
            rows={3}
            maxLength={1000}
            className={
              inp(!!errors.message, inputBorder) +
              " resize-none leading-relaxed"
            }
            {...register("message")}
          />
        </FormField>

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-sm"
          >
            <p className="text-red-400 text-xs m-0 tracking-wide">{serverError}</p>
          </div>
        )}

        {/* SUBMIT */}
        <div className="flex justify-center mt-6 mb-6">
          <Button
            type="submit"
            label={isSubmitting ? "Sending…" : "Send Query"}
            variant="primary"
            disabled={isSubmitting}
          />
        </div>

      </form>
    </div>
  );
}
