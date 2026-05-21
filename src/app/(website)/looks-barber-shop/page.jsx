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
            style={{ backgroundImage: "url('/img/all/barber/hero-bg.webp')" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="pl-0 md:pl-65 lg:pl-40 xl:pl-65 py-12 md:py-16 flex flex-col text-center">
                <Image src="/img/all/barber/logo.svg" alt="Looks Barber" width={524} height={190} className='px-8' />
                <h1 className="text-4xl md:text-5xl xl:text-6xl text-primary font-bold uppercase mt-6 leading-tight text-center">
                  THE GROOMING<br /> STANDARD
                </h1>
              </div>
              <div className="flex items-end justify-end">
                <Image src="/img/all/barber/hero.webp" alt="Looks Barber" width={870} height={741} className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Salons Section */}
          <div className="w-full bg-black py-16 px-4">
            <h2 className="text-3xl md:text-4xl xl:text-5xl text-primary font-bold uppercase text-center tracking-wide mb-14 leading-tight">
              The Art of Transformation,<br />Perfected Over Years.....
            </h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "LOOKS BARBER SHOP ", location: "KHAN MARKET ", img: "/img/all/barber/l1.webp",href:"/" },
                { name: "LOOKS BARBER SHOP  ", location: "DEFENCE COLONY", img: "/img/all/barber/l2.webp",href:"/" },
                { name: "LOOKS BARBER SHOP ", location: "NEW FRIENDS COLONY", img: "/img/all/barber/l3.webp",href:"/" },
              ].map((salon) => (
                <div key={salon.location} className="flex flex-col items-center gap-0">
                  <div className="relative w-52 h-80 rounded-full overflow-hidden">
                    <Image src={salon.img} alt={salon.location} fill className="object-cover object-center" />
                  </div>
                  <h3 className="text-white font-bold uppercase  text-sm mt-2 md:mt-4">{salon.name}</h3>
                  <h4 className="text-primary font-bold uppercase text-sm">{salon.location}</h4>
                  <FadeUp delay={0.3}>
              {/* Buttons */}
              <div className="flex items-center gap-5 mt-2 md:mt-4">
                <Button href={salon.href} label="Explore salon" variant="dark" />
              </div>
            </FadeUp>
                </div>
              ))}
            </div>
          </div>
          
        {/* white 1 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/barber/s1-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase tracking-widest mb-6">
                  MASTERY IN EVERY CUT
                </h2>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Our chairs are manned by a collective of the industry’s finest master barbers and stylists who understand the nuances of a gentleman's aesthetic. Whether it is a precision fade, a classic scissor cut, or a meticulous beard sculpt, our experts bring a global perspective to local tradition. At Looks The Barber Shop, we honor the heritage of the craft while utilizing contemporary techniques to ensure every client leaves with a look of effortless authority.
                </p>
              </div>
              <div className="order-1 md:order-0 w-full md:w-1/2 relative mb-4 md:mb-0">
                                            <Image
                                              src="/img/all/barber/s1.webp"
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
            style={{ backgroundImage: "url('/img/all/barber/s2-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                                            <Image
                                              src="/img/all/barber/s2.webp"
                                              alt="Couture Hair & Makeup"
                                              width={404}
                                              height={300}
                                              className=""
                                            />
                                          </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center ">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-primary font-bold uppercase tracking-widest mb-6">
                  THE RITUAL OF THE ROYAL SHAVE
                </h2>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Experience the pinnacle of relaxation with our signature hot-towel shaves and advanced skin treatments designed specifically for men. In our private, high-end environments, we use only the most prestigious grooming products—the "best in the field"—to cater to the unique needs of your skin and hair. From the initial consultation to the final splash of artisanal cologne, every moment at Looks is designed to provide a retreat from the city’s pace
                </p>
              </div>
            </div>
          </div>
          <BookAppointment/>
          <PartnerBrands/>
    </>
  )
}

export default page