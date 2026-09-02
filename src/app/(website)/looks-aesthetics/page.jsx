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
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-left justify-center text-left gap-4">
                <div className='grid grid-cols-12'>
                <div className='lg:col-span-4 py-20 flex flex-col items-left justify-center'> 
                  <Image src="/img/all/aesthetics/logo.svg" alt="Looks Prive" className='text-center pb-15' width={200} height={90} />
                  <h1 className="text-2xl sm:text-2xl md:text-3xl xl:text-3xl text-white font-semibold uppercase">
                    The Future of <br/>
                  
                  <sapn className="text-5xl sm:text-5xl md:text-7xl xl:text-9xl text-white font-bold uppercase">Beauty </sapn></h1>
                  <span class="block w-24 h-0.5 bg-primary mt-2 mb-4"></span>
                  <p className='text-lg lg:text-2xl text-white'>Advanced aesthetics, <br className='hidden md:block' />elevated by the legacy of Looks Salon.</p>
                </div>
                <div className='lg:col-span-8'>
                    <Image src="/img/all/aesthetics/aesthetics-hero.webp" alt="Looks Prive" className='text-center' width={926} height={800} />
                </div>
                </div>
            </div>
          </div>

          {/* black 2 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s2-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                              <Image
                                src="/img/all/aesthetics/aesthetics-s2.webp"
                                alt="Couture Hair & Makeup"
                                width={464}
                                height={455}
                                className=""
                              />
                            </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-semibold uppercase ">
                  ADVANCED PROTOCOLS, PERSONALIZED FOR YOU
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Our budding venture is staffed by the industry’s most elite therapists, trained in the latest aesthetic breakthroughs. From regenerative therapies to non-invasive contouring, every treatment is a bespoke journey.
                </p>
              </div>
            </div>
          </div>
                
          
        {/* white 1 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s1-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-white font-semibold uppercase">
                  WHERE LUXURY MEETS MEDICAL PRECISION
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Designed specifically for those who seek transformative, science-backed results. By integrating state-of-the-art technology with medical-grade protocols, we bridge the gap between traditional facials and clinical procedures, all within the signature high-end environment you’ve come to expect from the Looks brand.
                </p>
              </div>
              <div className="order-0 md:order-1 w-full md:w-1/2 relative mb-4 md:mb-0">
                              <Image
                                src="/img/all/aesthetics/aesthetics-s1.webp"
                                alt="Couture Hair & Makeup"
                                width={464}
                                height={432}
                                className="ml-auto"
                              />
                            </div>
              
            </div>
          </div>


          {/* black 2 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s2-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                              <Image
                                src="/img/all/aesthetics/aesthetics-s3.webp"
                                alt="Couture Hair & Makeup"
                                width={545}
                                height={384}
                                className=""
                              />
                            </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-semibold uppercase">
                  THE NEXT CHAPTER OF THE LOOKS LEGACY
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Looks Aesthetics isn’t just an expansion; it’s an evolution. We are bringing the same passion, international expertise, and commitment to quality that defined our first four years into a new era of aesthetic excellence.
                </p>
              </div>
            </div>
          </div>

          
        



         

          {/* <BookAppointment/> */}
          <PartnerBrands/>
    </>
  )
}

export default page