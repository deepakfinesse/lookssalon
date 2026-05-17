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
            style={{ backgroundImage: "url('/img/all/prive/hero-bg.png')" }}
          >
            <div className="max-w-5xl mx-auto min-h-[calc(100vh-90px)] px-4 py-12 flex flex-col items-center justify-center text-center">
                
              
                <Image src="/img/all/prive/logo.svg" alt="Looks Prive" className='text-center' width={180} height={90} />
                <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-primary font-bold uppercase leading-normal">
                  The Pinnacle of Artistry
                </h1>
                <p className='text-md lg:text-lg text-white'>Step into a sanctuary where beauty meets precision. For years, Looks Prive has been the destination for those who seek more than just a service. We bring together a curated collective of the industry’s most celebrated therapists and elite international stylists. Our team doesn't just follow trends; they set them, ensuring every cut, color, and stroke is a Prive masterpiece tailored specifically to your aesthetic.</p>
              
            </div>
          </div>
          {/* black 1 */}
          <div className="w-full bg-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 relative min-h-100">
                <Image
                  src="/img/all/prive/s1.png"
                  alt="Couture Hair & Makeup"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-primary font-bold uppercase tracking-widest mb-6">
                  Couture Hair &amp; Makeup
                </h2>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Experience the transformative power of world-class styling. From bespoke hair extensions and avant-garde coloring to flawless red-carpet makeup, our <strong className="text-white">Looks Prive</strong> experts use their global perspective to highlight your unique features. Whether it&apos;s a subtle refresh or a complete reinvention, we deliver excellence in every strand, backed by years of top-tier industry expertise.
                </p>
              </div>
            </div>
          </div>
        {/* white 1 */}
          <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
                <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase tracking-widest mb-6">
                  Couture Hair &amp; Makeup
                </h2>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  Our treatment suites offer a retreat for the senses and a powerhouse for results. At <strong className="text-black">Looks Prive</strong> we specialize in medical-grade skin treatments and rejuvenating therapies that merge science with luxury. Led by the industry's best therapists, our services are designed to restore your glow and provide lasting, visible improvements to your skin’s health through years of refined technique.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative min-h-100">
                <Image
                  src="/img/all/prive/s2.png"
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
                  src="/img/all/prive/s3.png"
                  alt="Couture Hair & Makeup"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-primary font-bold uppercase tracking-widest mb-6">
                  THE FINISHING TOUCH: MANICURES & BEYOND
                </h2>
                <p className="text-white text-md lg:text-lg leading-relaxed">
                  Indulge in nail care redefined. At Looks Prive, our nail technicians treat every service as a ritual, focusing on both the health of your natural nails and the artistry of the finish. Using only the most prestigious lacquer lines and restorative treatments, we ensure your hands and feet reflect the elegance you carry.
                </p>
              </div>
            </div>
          </div>
        {/* white 2 */}
          <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
                <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
                <h2 className="text-2xl md:text-3xl xl:text-4xl text-black font-bold uppercase tracking-widest mb-6">
                  CURATED AFTERCARE: THE LOOKS PRIVE BOUTIQUE
                </h2>
                <p className="text-black text-md lg:text-lg leading-relaxed">
                  True beauty is maintained between appointments. Our retail gallery features an exclusive selection of the world’s finest professional products, hand-picked by the Looks Prive team for their efficacy. Your stylist will curate a personalized home-care regimen, ensuring you have the exact tools and formulas needed to preserve your salon-fresh look and protect your investment with the best in the field.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative min-h-100">
                <Image
                  src="/img/all/prive/s4.png"
                  alt="Couture Hair & Makeup"
                  fill
                  className="object-cover object-center"
                />
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
                { name: "LOOKS PRIVÉ", location: "VASANT VIHAR", img: "/img/all/prive/s1.png",href:"/" },
                { name: "LOOKS PRIVÉ", location: "MALCHA MARG", img: "/img/all/prive/s2.png",href:"/" },
                { name: "LOOKS PRIVÉ", location: "AEROCITY", img: "/img/all/prive/s3.png",href:"/" },
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

              <BookAppointment/>
          <PartnerBrands/>
    </>
  )
}

export default page