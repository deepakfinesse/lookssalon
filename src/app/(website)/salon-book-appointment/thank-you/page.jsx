import Button from "@/components/ui/Button";

export const metadata = {
  title:       "Booking Confirmed — Looks Salon",
  description: "Your appointment has been successfully booked with Looks Salon.",
  robots:      "noindex", // thank-you pages should not be indexed
};

export default function ThankYouPage({ searchParams }) {
  const bookingId = searchParams?.id ?? null;

  return (
    <main className="min-h-[calc(100vh-90px)] bg-black flex items-center justify-center px-4 py-12">

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 40%, rgba(222,171,48,0.07) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 70% 70%, rgba(222,171,48,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="relative w-full max-w-xl text-center">

        {/* ── Checkmark ── */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-17 h-17 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 flex items-center justify-center">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <path
                d="M10 25L20 35L38 15"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Heading ── */}
        <h1 className="text-white text-4xl md:text-4xl xl:text-6xl font-medium tracking-[3px] uppercase mb-4 ">
          Thank You
        </h1>

        {/* ── Gold rule ── */}
        <div className="w-12 h-px bg-primary mx-auto mb-2" />

        {/* ── Message ── */}
        <p className="text-white text-lg leading-relaxed tracking-wide mb-2">
          Your appointment request has been received.
        </p>
        <p className="text-white text-sm tracking-wide mb-6">
            📞 &nbsp;Need help?{" "}
            <a
              href="tel:180021256657"
              className="text-primary hover:underline font-medium"
            >
              1800 212 56657
            </a>
          </p>
        {/* <p className="text-white text-sm leading-relaxed tracking-wide mb-4">
          A confirmation email is on its way to you. Our team will get in touch
          shortly to confirm your slot.
        </p> */}

        {/* ── Booking ID ── */}
        {bookingId && (
          <div className="inline-block border border-[var(--primary)]/20 bg-primary/5 px-8 py-4 mb-10">
            <p className="text-white text-[10px] tracking-[3px] uppercase mb-1.5">
              Booking Reference
            </p>
            <p className="text-primary text-xl tracking-[4px]">
              #{bookingId}
            </p>
            
          </div>
        )}

        {/* ── Info strip ── */}
        {/* <div className="border-t border-b border-white/10 py-5 mb-4 space-y-2">
          <p className="text-white text-sm tracking-wide">
            ⏰ &nbsp;Bookings operate between{" "}
            <span className="text-primary">10:00 a.m.</span> and{" "}
            <span className="text-primary">6:00 p.m.</span>
          </p>
          <p className="text-white text-sm tracking-wide">
            📞 &nbsp;Need help?{" "}
            <a
              href="tel:180021256657"
              className="text-primary hover:underline font-medium"
            >
              1800 212 56657
            </a>
          </p>
        </div> */}

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" label="Back to Home" variant="primary" />
          {/* <Link
            href="/salon-book-appointment"
            className="inline-block px-10 py-3.5 bg-transparent
                       border border-[var(--primary)]/50 text-primary
                       text-[11px] tracking-[4px] uppercase
                       transition-colors duration-200 hover:bg-primary/10"
          >
            Book Another
          </Link> */}
        </div>

      </div>
    </main>
  );
}