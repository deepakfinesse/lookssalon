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
            style={{ backgroundImage: "url('/img/all/prive/hero-bg.webp')" }}
          >
            <div className="max-w-8xl mx-auto min-h-[calc(100vh-90px)] px-4 py-12 flex flex-col items-center justify-center text-center">
           
                <Image src="/img/all/prive/logo-black.svg" alt="Looks Prive" className='text-center pb-8 md:pb-1' width={180} height={90} />
                <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-primary font-medium uppercase leading-normal">
                  The Pinnacle of Artistry
                </h1>
                <p className='text-md lg:text-lg text-black max-w-5xl mx-auto'>Step into a sanctuary where beauty meets precision. For years, Looks Prive has been the destination for those who seek more than just a service. We bring together a curated collective of the industry’s most celebrated therapists and elite international stylists. Our team doesn't just follow trends; they set them, ensuring every cut, color, and stroke is a Prive masterpiece tailored specifically to your aesthetic.</p>

                <Image src="/img/all/prive/hero.webp" alt="Looks Prive" className='mt-4' width={1324} height={424} />
            </div>
          </div>


          {/* black 1 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s1-bg.webp')" }} >
            <div className="max-w-7xl p-10 mx-auto flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                <Image
                  src="/img/all/prive/prive-s1.webp"
                  alt="Couture Hair & Makeup"
                  width={404}
                  height={300}
                  className=""
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-white font-semibold uppercase ">
                  Couture Hair &amp; Makeup
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Experience the transformative power of world-class styling. From bespoke hair extensions and avant-garde coloring to flawless red-carpet makeup, our  <strong className="text-white">Looks Prive</strong> experts use their global perspective to highlight your unique features. Whether it’s a subtle refresh or a complete reinvention, we deliver excellence in every strand, backed by years of top-tier industry experience.
                </p>
              </div>
            </div>
          </div>
        {/* white 1 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s2-bg.webp')" }}>
            <div className="max-w-7xl p-10 mx-auto flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase">
                  ADVANCED SKIN & BODY RITUALS
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                 Our treatment suites offer a retreat for the senses and a powerhouse for results. At Looks Prive, we specialize in medical-grade skin treatments and rejuvenating therapies that merge science with luxury. Led by the industry's best therapists, our services are designed to restore your glow and provide lasting, visible improvements to your skin’s health through years of refined technique.
                  </p>
              </div>
              <div className="order-0 md:order-1 w-full md:w-1/2 relative mb-4 md:mb-0">
                <Image
                  src="/img/all/prive/prive-s2.webp"
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
            style={{ backgroundImage: "url('/img/all/prive/s1-bg.webp')" }}>
            <div className="max-w-7xl p-10 mx-auto flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                <Image
                  src="/img/all/prive/prive-s3.webp"
                  alt="Couture Hair & Makeup"
                  width={404}
                  height={300}
                  className=""
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-white font-semibold uppercase">
                  THE FINISHING TOUCH: MANICURES & BEYOND
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Indulge in nail care redefined. At Looks Prive, our nail technicians treat every service as a ritual, focusing on both the health of your natural nails and the artistry of the finish. Using only the most prestigious lacquer lines and restorative treatments, we ensure your hands and feet reflect the elegance you carry.
                </p>
              </div>
            </div>
          </div>
        {/* white 2 */}
          <div className="w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/all/prive/s2-bg.webp')" }}>
            <div className="max-w-7xl p-10 mx-auto flex flex-col md:flex-row items-stretch">
                <div className="order-1 md:order-0 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase">
                  CURATED AFTERCARE: THE LOOKS PRIVE BOUTIQUE
                </h2>
                <span class="block w-30 h-0.5 bg-primary mt-2 mb-3"></span>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  True beauty is maintained between appointments. Our retail gallery features an exclusive selection of the world’s finest professional products, hand-picked by the Looks Prive team for their efficacy. Your stylist will curate a personalized home-care regimen, ensuring you have the exact tools and formulas needed to preserve your salon-fresh look and protect your investment with the best in the field.
                </p>
              </div>
              <div className="order-0 md:order-1 w-full md:w-1/2 relative mb-4 md:mb-0">
                <Image
                  src="/img/all/prive/prive-s4.webp"
                  alt="Couture Hair & Makeup"
                  width={404}
                  height={300}
                  className="ml-auto"
                />
              </div>
              
            </div>
          </div>



          {/* Salons Section */}
          <div className="w-full bg-black py-16 px-4">
            <h2 className="text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase text-center tracking-wide mb-6 md:mb-14 leading-tight">
              The Art of Transformation,<br className='hidden md:block' /> <span className="text-primary">Perfected Over Years</span>
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "LOOKS PRIVE", location: "VASANT VIHAR", img: "/img/all/prive/l1.webp",href:"https://maps.app.goo.gl/DeW8sViTcbFHJLWm9" },
                { name: "LOOKS PRIVE", location: "MALCHA MARG", img: "/img/all/prive/l2.webp",href:"https://maps.app.goo.gl/bkvbvf6uZa1ncDmh8" },
                { name: "LOOKS PRIVE", location: "AEROCITY", img: "/img/all/prive/l3.webp",href:"https://maps.app.goo.gl/KfKnkKdytiKjNhwh9" },
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
                    <Image
                      src={salon.img}
                      alt={salon.location}
                      fill
                      className="object-cover object-center p-1 transition-transform duration-700 ease-out group-hover:scale-110"
                    />
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

              {/* <BookAppointment/> */}
          <PartnerBrands/>
    </>
  )
}

export default page