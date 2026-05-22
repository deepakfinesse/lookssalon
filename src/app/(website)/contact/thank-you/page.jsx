import Button        from "@/components/ui/Button";
import PartnerBrands from "@/components/layout/PartnerBrands";

export const metadata = {
  title:       "Thank You — Looks Salon",
  description: "Your message has been received. Our team will get back to you shortly.",
  robots:      "noindex",
};

export default function ContactThankYouPage({ searchParams }) {
  const inquiryId = searchParams?.id ?? null;

  return (
    <>
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

          {/* Checkmark */}
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

          <h1 className="text-white text-4xl md:text-4xl xl:text-6xl font-medium tracking-[3px] uppercase mb-4">
            Thank You
          </h1>

          <div className="w-12 h-px bg-primary mx-auto mb-4" />

          <p className="text-white text-lg leading-relaxed tracking-wide mb-2">
            Your message has been received.
          </p>
          <p className="text-white/70 text-sm tracking-wide mb-6">
            Our team will review your query and get back to you shortly.
          </p>
          <p className="text-white text-sm tracking-wide mb-6">
            📞&nbsp;Need help?{" "}
            <a href="tel:180021256657" className="text-primary hover:underline font-medium">
              1800 212 56657
            </a>
          </p>

          {inquiryId && (
            <div className="inline-block border border-[var(--primary)]/20 bg-primary/5 px-8 py-4 mb-10">
              <p className="text-white text-[10px] tracking-[3px] uppercase mb-1.5">
                Message Reference
              </p>
              <p className="text-primary text-xl tracking-[4px]">
                #{inquiryId}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" label="Back to Home" variant="dark" />
          </div>

        </div>
      </main>
      <PartnerBrands />
    </>
  );
}
