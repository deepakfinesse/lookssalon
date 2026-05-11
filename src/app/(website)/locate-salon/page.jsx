import React from 'react'
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Image from "next/image";
import FadeUp from '@/components/animation/FadeUp';
import Button from '@/components/ui/Button';

const page = () => {
  return (
    <>
    <section
          className="
            w-full 
            bg-[url('/img/all/salon-locator-bg.webp')] 
            bg-cover bg-center bg-no-repeat
            
          "
        >
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">
              {/* Image */}
              <div className="md:col-span-6 flex justify-end pt-4">
                <Image
                  src="/img/all/salon-locator-hero.webp"
                  alt="Pay Less Get More"
                  width={638}
                  height={300}
                  className="w-full max-w-[638px] h-auto object-contain"
                />
              </div>
    
              {/* Content */}
              <div className="md:col-span-6 flex flex-col items-center justify-center text-center">
                <FadeUp delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black leading-tight mb-4">
                    locate salon <br /> near you
                  </h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-3 text-lg sm:text-xl md:text-xl font-medium uppercase text-black mb-4">
                    Select from our chain of 220+ stores across pan India
                  </p>
                </FadeUp>
                {/* Buttons */}
                <FadeUp delay={0.3}>
                  <div className="flex items-center gap-5 mt-6">
                    <Button
                      href="/"
                      label="Enter city / location"
                      variant="dark"
                    />
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
    <BookAppointment/>
        <PartnerBrands/>
    </>
  )
}

export default page