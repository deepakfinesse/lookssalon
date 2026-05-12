import React from "react";
import Image from "next/image";
import FadeUp from "@/components/animation/FadeUp";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Button from "@/components/ui/Button";


const page = () => {
  return (
    <>
      {/* <BookingForm /> */}
      <section>
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
          <FadeUp delay={0.1}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-grey font-bold uppercase mb-4">
            {" "}
            Prepaid Cards
          </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
          <p className="text-md lg:text-lg text-black">
            Getting a discount has never harmed anyone, so why spend those extra
            hard earned bucks on services that can be availed at discounted
            rates and become a prime member of our services? It's time to get
            your new look with Looks Salon prepaid cards and let your look do
            all the talkings.
          </p>
          </FadeUp>
        </div>

        <div className="max-w-7xl mx-auto px-4  pb-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* CARD 1 */}
            <FadeUp delay={0.3}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="/img/all/prepaid-blue.webp"
                  width={320}
                  height={200}
                  alt="Looks Blue"
                />

                {/* Reflection */}
                {/* <Image
                src="/img/all/prepaid-card1.png"
                width={320}
                height={200}
                alt="reflection"
                className="absolute top-full left-0 scale-y-[-1] opacity-20 blur-sm"
                /> */}
              </div>

              <h2 className="text-2xl lg:text-3xl font-semibold uppercase text-[#20ADDB]">
                LOOKS BLUE
              </h2>

              <div className="mt-4 w-full max-w-[260px]  text-md lg:text-lg">
                <div className="flex justify-between py-1">
                  <span className="font-semibold">PRE LOADED</span>
                  <span className="font-semibold">RS. 6,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold">SERVICE WORTH</span>
                  <span className="font-semibold">RS. 7,500</span>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex items-center gap-5 mt-6">
                <Button
                  href="/"
                  label="Buy Now"
                  variant="dark"
                />
              </div>
            </div>
            </FadeUp>
            <FadeUp delay={0.3}>
            {/* CARD 2 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="/img/all/prepaid-silver.webp"
                  width={320}
                  height={200}
                  alt="Looks Silver"
                />
              </div>

              <h2 className="text-2xl lg:text-3xl font-semibold  uppercase text-[#828282]">
                LOOKS SILVER
              </h2>

              <div className="mt-4 w-full max-w-[260px] text-md lg:text-lg">
                <div className="flex justify-between py-1">
                  <span className="font-semibold">PRE LOADED</span>
                  <span className="font-semibold">RS. 15,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold">SERVICE WORTH</span>
                  <span className="font-semibold">RS. 20,000</span>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex items-center gap-5 mt-6">
                <Button
                  href="/"
                  label="Buy Now"
                  variant="dark"
                />
              </div>
            </div>
            </FadeUp>
            
            <FadeUp delay={0.3}>
            {/* CARD 3 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="/img/all/prepaid-gold.webp"
                  width={320}
                  height={200}
                  alt="Looks Gold"
                />
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold  uppercase text-[#CA9957]">
                LOOKS GOLD
              </h2>
              <div className="mt-4 w-full max-w-[260px] text-md lg:text-lg">
                <div className="flex justify-between py-1">
                  <span className="font-semibold">PRE LOADED</span>
                  <span className="font-semibold">RS. 50,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold">SERVICE WORTH</span>
                  <span className="font-semibold">RS. 75,000</span>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex items-center gap-5 mt-6">
                <Button
                  href="/"
                  label="Buy Now"
                  variant="dark"
                />
              </div>
            </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
          <FadeUp delay={0.1}>
          <p className="text-md lg:text-lg text-white">
            We know that you love getting a makeover often as it helps you bring
            out different personalities of yourself. So with our prepaid cards,
            get ready to fall in love with makeovers that people for sure are
            going to notice. We've always believed in long-term relations with
            our clients and these prepaid cards make that possible. Classified
            in 3 categories - Blue, Silver and Gold, you can avail services upto
            the total worth of each card and flaunt your looks in no time. While
            we are working on your makeover, we will make sure that you've the
            best time at our salon because we know a different and unique look
            is not an easy task.Don't waste more time on thinking about it. Your
            hair, skin and nails need all the pampering and love to make them
            feel the best and Looks salon is here with the state of art
            facilities to serve you. Living your life to the fullest should
            always be the mantra and if it means getting a long overdue
            makeover, then it's now or never.
          </p>
          </FadeUp>
        </div>
      </section>
      <BookAppointment/>
        <PartnerBrands/>
    </>
  );
};

export default page;
