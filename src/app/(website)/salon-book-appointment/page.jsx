import BookingForm from '@/components/booking/BookingForm'
import PartnerBrands from '@/components/layout/PartnerBrands'

export default async function page({ searchParams }) {
  const params = await searchParams;
  const defaultCity    = params?.city    ?? "";
  const defaultSalon   = params?.salon   ?? "";
  const defaultName    = params?.name    ?? "";
  const defaultContact = params?.contact ?? "";

  return (
    <>
      <div className="w-full bg-cover bg-center" style={{ backgroundImage: "url('/img/all/book-appointement.webp')" }}>
       <div className="max-w-4xl mx-auto px-4 py-12 md:py-12 lg:py-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase mb-8">
            Book An Appointment
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="flex min-h-75 w-52 flex-col items-center justify-center border-1 border-white rounded-full bg-black px-8 text-center">
              <h3 className="text-lg font-bold uppercase text-white">Our Timing</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Bookings service operates between{" "}
                <strong className="font-bold text-primary">10:00 am</strong> and{" "}
                <strong className="font-bold text-primary">06:00 pm</strong>
              </p>
            </div>

            <div className="flex min-h-75 w-52 flex-col items-center justify-center border-1 border-white rounded-full bg-black px-8 text-center">
              <h3 className="text-lg font-bold uppercase leading-tight text-white">
                250 Plus Salons
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Premium presence across india and kaula lumpur.
              </p>
            </div>

            <div className="flex min-h-75 w-52 flex-col items-center justify-center border-1 border-white rounded-full bg-black px-8 text-center">
              <h3 className="text-lg font-bold uppercase leading-tight text-white">
                Expert Stylist
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Crafted by trained beauty professionals.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-12 lg:pb-12">
          <BookingForm
            defaultCity={defaultCity}
            defaultSalon={defaultSalon}
            defaultName={defaultName}
            defaultContact={defaultContact}
          />
          <div className="text-center">
            <p className="text-white text-base tracking-[3px] uppercase mb-2">OR</p>
            <p className="text-white text-lg tracking-wide">
              CALL US @{" "}
              <a href="tel:180021256657" className="text-primary font-bold no-underline hover:underline">
                1800 212 56657
              </a>
            </p>
          </div>
        </div>
      </div>
      <PartnerBrands/>
    </>
  );
}