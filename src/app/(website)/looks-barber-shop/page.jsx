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
            style={{ backgroundImage: "url('/img/all/barber/hero-bg.png')" }}
          >
            <div className="max-w-4xl mx-auto min-h-[calc(100vh-90px)] px-4 py-12 flex flex-col items-star justify-center ">
                
              
                <Image src="/img/all/barber/logo.svg" alt="Looks Prive" className='text-center' width={290} height={90} />
                <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-primary font-bold uppercase mt-4">
                  The Grooming <br className='hidden md:block'/> Standard
                </h1>
                
            </div>
          </div>

          {/* Salons Section */}
          <div className="w-full bg-black py-16 px-4">
            <h2 className="text-3xl md:text-4xl xl:text-5xl text-primary font-bold uppercase text-center tracking-wide mb-14 leading-tight">
              The Art of Transformation,<br />Perfected Over Years.....
            </h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "LOOKS BARBER SHOP ", location: "KHAN MARKET ", img: "/img/all/barber/l1.png",href:"/" },
                { name: "LOOKS BARBER SHOP  ", location: "DEFENCE COLONY", img: "/img/all/barber/l2.png",href:"/" },
                { name: "LOOKS BARBER SHOP ", location: "NEW FRIENDS COLONY", img: "/img/all/barber/l3.png",href:"/" },
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
          <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
                <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase tracking-widest mb-6">
                  MASTERY IN EVERY CUT
                </h2>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Our chairs are manned by a collective of the industry’s finest master barbers and stylists who understand the nuances of a gentleman's aesthetic. Whether it is a precision fade, a classic scissor cut, or a meticulous beard sculpt, our experts bring a global perspective to local tradition. At Looks The Barber Shop, we honor the heritage of the craft while utilizing contemporary techniques to ensure every client leaves with a look of effortless authority.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative min-h-100">
                <Image
                  src="/img/all/barber/s1.png"
                  alt="Couture Hair & Makeup"
                  fill
                  className="object-cover object-center"
                />
              </div>
              
            </div>
          </div>

          {/* black 2 */}
          <div className="w-full bg-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative min-h-100">
                <Image
                  src="/img/all/barber/s2.png"
                  alt="Couture Hair & Makeup"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
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