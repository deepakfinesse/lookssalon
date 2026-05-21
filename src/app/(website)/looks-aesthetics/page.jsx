import React from 'react'
import Image from "next/image";
import FadeUp from "@/components/animation/FadeUp";
import PartnerBrands from "@/components/layout/PartnerBrands";
import BookAppointment from '@/components/layout/BookAppointment';
import Button from '@/components/ui/Button';
const page = () => {
  return (
    <>
    {/* Hero Section */}
          <div
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/aesthetics/hero-bg.webp')" }}
          >
            <div className="max-w-5xl mx-auto min-h-[calc(100vh-90px)] px-4 py-12 flex flex-col items-center justify-center text-center gap-4">
                
              
                <Image src="/img/all/aesthetics/logo.svg" alt="Looks Prive" className='text-center' width={180} height={90} />
                <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-primary font-bold uppercase leading-normal">
                  The Future of Beauty
                </h1>
                <p className='text-md lg:text-lg text-white'>A New Dimension of Care. Building on years of excellence and the trusted legacy of Looks Salon, we are proud to unveil Looks Aesthetics—our dedicated venture into the world of advanced clinical beauty. This is where the artistry of the salon meets the precision of the laboratory.</p>
              
            </div>
          </div>
          
        {/* white 1 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/aesthetics/s1-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase tracking-widest mb-1 md:mb-6">
                  WHERE LUXURY MEETS MEDICAL PRECISION
                </h2>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Designed specifically for those who seek transformative, science-backed results. By integrating state-of-the-art technology with medical-grade protocols, we bridge the gap between traditional facials and clinical procedures, all within the signature high-end environment you’ve come to expect from the Looks brand.
                </p>
              </div>
              <div className="order-0 md:order-1 w-full md:w-1/2 relative mb-4 md:mb-0">
                              <Image
                                src="/img/all/aesthetics/s1.webp"
                                alt="Couture Hair & Makeup"
                                width={404}
                                height={300}
                                className="ml-auto"
                              />
                            </div>
              
            </div>
          </div>

          {/* black 2 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/aesthetics/s2-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                              <Image
                                src="/img/all/aesthetics/s2.webp"
                                alt="Couture Hair & Makeup"
                                width={404}
                                height={300}
                                className=""
                              />
                            </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-primary font-bold uppercase tracking-widest mb-1 md:mb-6">
                  ADVANCED PROTOCOLS, PERSONALIZED FOR YOU
                </h2>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Our budding venture is staffed by the industry’s most elite therapists, trained in the latest aesthetic breakthroughs. From regenerative therapies to non-invasive contouring, every treatment is a bespoke journey.
                </p>
              </div>
            </div>
          </div>
        {/* white 2 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/aesthetics/s3-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase tracking-widest mb-1 md:mb-6">
                  THE NEXT CHAPTER OF THE LOOKS LEGACY
                </h2>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Looks Aesthetics isn’t just an expansion; it’s an evolution. We are bringing the same passion, international expertise, and commitment to quality that defined our first four years into a new era of aesthetic excellence.
                </p>
              </div>
              <div className="order-0 md:order-1 w-full md:w-1/2 relative mb-4 md:mb-0">
                              <Image
                                src="/img/all/aesthetics/s3.webp"
                                alt="Couture Hair & Makeup"
                                width={404}
                                height={300}
                                className="ml-auto"
                              />
                            </div>
              
            </div>
          </div>



         

          <BookAppointment/>
          <PartnerBrands/>
    </>
  )
}

export default page