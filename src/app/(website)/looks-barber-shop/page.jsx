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
            <div className="grid grid-cols-1  md:grid-cols-2 items-end">
              <div className="px-8 md:px-12 lg:px-20 py-10 md:py-16 flex flex-col items-left text-left self-center">
                <Image src="/img/all/barber/logo.svg" alt="Looks Barber" width={250} height={120} className="pb-15" />
                <h1 className="text-2xl sm:text-2xl md:text-3xl xl:text-3xl text-white font-semibold uppercase">
                    THE <br/>
                  
                  <sapn className="text-5xl sm:text-5xl md:text-6xl xl:text-8xl text-white font-bold uppercase">Grooming <br/> <span className="text-primary">Standard</span> </sapn></h1>
                  <span class="block w-24 h-0.5 bg-primary mt-2 mb-4"></span>
                  <p className='text-lg lg:text-2xl text-white'>Precision cuts. Timeless style. Elevated experience. <br className='hidden md:block' />Setting the benchmark for men’s grooming.</p>
              </div>
              <div className="flex items-end justify-end overflow-hidden">
                <Image src="/img/all/barber/hero.webp" alt="Looks Barber" width={870} height={741} className="w-full h-auto object-bottom hidden md:block" />
                <Image src="/img/all/barber/hero-mobile.webp" alt="Looks Barber" width={870} height={741} className="w-full h-auto object-bottom block md:hidden" />
              </div>
            </div>
          </div>

          {/* Salons Section */}
          <div className="w-full bg-black py-16 px-4">
            <h2 className="text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase text-center tracking-wide mb-4 leading-tight">
              A Legacy of Refinement in <br className='hidden md:block' /> Delhi’s Elite Hubs
            </h2>
            <p className="text-white text-center max-w-4xl mx-auto mb-10">
              Situated in the heart of Delhi’s most iconic neighborhoods—from the sophisticated lanes of khan market to the leafy avenues of defence colony and the stately residences of new friends colony—looks barber shop is the definitive sanctuary for the modern gentleman. We have redefined the traditional barbershop experience, blending old-world charm with the "uber-luxury" expectations of Delhi’s most discerning clientele. Here, grooming is not a chore; it is a curated ritual of prestige.
            </p>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "LOOKS BARBER SHOP ", location: "KHAN MARKET ", img: "/img/all/barber/l1.webp",href:"https://maps.app.goo.gl/6d4SF2DLFSRL25HG8" },
                { name: "LOOKS BARBER SHOP  ", location: "DEFENCE COLONY", img: "/img/all/barber/l2.webp",href:"https://maps.app.goo.gl/nCVFYWT7HMZ7aubw8" },
                { name: "LOOKS BARBER SHOP ", location: "NEW FRIENDS COLONY", img: "/img/all/barber/l3.webp",href:"https://maps.app.goo.gl/bCRAsVsuYwKBkNcSA" },
              ].map((salon, i, arr) => (
                <div key={salon.location} className="group relative flex flex-col items-center gap-0">
                  {i < arr.length - 1 && (
                                      <Image
                                        src="/img/all/prive/border.svg"
                                        alt=""
                                        width={2}
                                        height={320}
                                        className="hidden md:block absolute top-0 -right-2.5 h-75 w-5"
                                      />
                                    )}
                  <div className="relative w-52 h-80 rounded-full overflow-hidden border-2 border-primary transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-4 group-hover:shadow-[0_20px_45px_-10px_rgba(169,37,75,0.7)]">
                    <Image src={salon.img} alt={salon.location} fill className="bject-cover object-center p-1 transition-transform duration-700 ease-out group-hover:scale-110" />
                  </div>
                  <h3 className="text-white font-bold uppercase  text-md  md:text-2xl mt-2 md:mt-4 transition-colors duration-500 group-hover:text-primary">{salon.name}</h3>
                  <h4 className="text-primary font-bold uppercase text-md md:text-2xl transition-colors duration-500 group-hover:text-white">{salon.location}</h4>
                  <FadeUp delay={0.3}>
                    {/* Buttons */}
                    <div className="flex items-center gap-5 mt-2 md:mt-4">
                      <Button href={salon.href} label="Explore salon" target="_blank" variant="dark" />
                    </div>
                  </FadeUp>
                </div>
              ))}
            </div>
          </div>
          
        {/* white 1 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s2-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-semibold uppercase ">
                  MASTERY IN EVERY CUT
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Our chairs are manned by a collective of the industry’s finest master barbers and stylists who understand the nuances of a gentleman's aesthetic. Whether it is a precision fade, a classic scissor cut, or a meticulous beard sculpt, our experts bring a global perspective to local tradition. At Looks The Barber Shop, we honor the heritage of the craft while utilizing contemporary techniques to ensure every client leaves with a look of effortless authority.
                </p>
              </div>
              <div className="order-1 md:order-0 w-full md:w-1/2 relative mb-4 md:mb-0">
                                            <Image
                                              src="/img/all/barber/barber-s1.webp"
                                              alt="Couture Hair & Makeup"
                                              width={464}
                                              height={414}
                                              className="ml-auto"
                                            />
                                          </div>
              
            </div>
          </div>

          {/* black 2 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s1-bg.webp')" }}>
            <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                                            <Image
                                              src="/img/all/barber/barber-s2.webp"
                                              alt="Couture Hair & Makeup"
                                              width={464}
                                              height={393}
                                              className=""
                                            />
                                          </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center ">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-white font-semibold uppercase">
                  THE RITUAL OF THE ROYAL SHAVE
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Experience the pinnacle of relaxation with our signature hot-towel shaves and advanced skin treatments designed specifically for men. In our private, high-end environments, we use only the most prestigious grooming products—the "best in the field"—to cater to the unique needs of your skin and hair. From the initial consultation to the final splash of artisanal cologne, every moment at Looks is designed to provide a retreat from the city’s pace
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