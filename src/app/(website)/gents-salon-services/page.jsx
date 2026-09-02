"use client";
import FadeUp from "@/components/animation/FadeUp";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Image from "next/image";
import Link from "next/link";


const services = [
  {
    title: "CUT",
    desc: `Every great look begins with the right cut. At LOOKS, our stylists are trained to deliver tailored hair cuts that match your personality, lifestyle, and face structure. Whether you're looking for a classic crew cut, a modern fade, or something edgy, we ensure a sharp and stylish finish. For our youngest clients, we offer a gentle and fun Child Hair Cut [Below 5 years], making sure little ones feel comfortable while looking their adorable best.`,
    image: "/img/services/mens-cut.webp",
  },
  {
    title: "BEARD CARE",
    desc: `A well-groomed beard speaks volumes. Our beard care services are designed to maintain, refine, and style your facial hair with finesse. Choose a clean shave for a crisp, smooth look or opt for a beard trim to maintain the perfect shape. Want to upgrade your beard game? Try our beard color services for covering greys or experimenting with a fresh shade. Complete the look with expert beard styling—from classic to contemporary, we craft beards that frame your face perfectly.`,
    
    image: "/img/services/mens-beard-care.webp",
  },
  {
    title: "COLOUR",
    desc: `Add vibrancy or a touch of sophistication with our professional hair colour services. From bold transformations to subtle highlights or grey coverage, we use top-quality products to ensure long-lasting colour and healthy hair. Our stylists guide you to choose the right shade to complement your skin tone and personal style.`,
    image: "/img/services/mens-hair-colour.webp",
  },
  {
    title: "TEXTURE",
    desc: `Elevate your look with our hair texture solutions. Whether you want sleek straight hair, voluminous curls, or a frizz-free finish, our treatments like smoothing, straightening, and perming are designed to enhance your natural hair while maintaining its health and shine.`,
    image: "/img/services/mens-hair-texture.webp",
  },
  {
    title: "TREATMENT",
    desc: `Unwind and revitalize your scalp and hair with our luxurious hair spa treatments. These deep-conditioning sessions target issues like dandruff, hair fall, and dryness, leaving you with a healthier scalp and noticeably softer, shinier hair.`,
    image: "/img/services/mens-treatment.webp",
  },
  
  {
    title: "HAIR CARE",
    desc: `Healthy hair is the foundation of a great appearance. Our hair care services are curated to nourish, strengthen, and restore hair vitality. Whether you're dealing with dryness, dullness, or just need some pampering, our team ensures your hair gets the care it deserves.`,
    image: "/img/services/mens-hair-care.webp",
  },
];

export default function ladiesServices() {
  return (
    <>
      <section className="" style={{backgroundImage: "url('/img/services/mens-services-bg.webp')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0 items-center pt-8">
            <FadeUp delay={0.1} className="order-2 md:order-1">
              <div className="relative w-full">    
                <Image
                  src="/img/services/mens-services-hero.webp"
                  alt="Gents Salon Services"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="order-1 md:order-2">
              <div className="flex flex-col items-left justify-left gap-0 md:gap-2 text-center md:text-left">
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black font-bold uppercase leading-normal">
                  Refined. stylish. You.
                </h1>
                <p className="text-xl md:text-3xl text-black font-semibold">
                  Grooming & styling services <br className="hidden md:block"/> crafted for the modern man.
                </p>
              </div>
            </FadeUp>
            
          </div>
        </div>
      </section>
            
      <section className="">
        {/* TOP GRID SECTION */}
        <div className="max-w-7xl mx-auto p-4 md:p-8  text-black">
          {/* Text Section */}
          <div className="grid ">
            <FadeUp delay={0.2}>
              <p className="text-lg text-black font-medium">
                At LOOKS Salon, we believe grooming is not just a routine—it’s a
                statement. Our exclusive range of men’s services is designed to
                deliver precision, style, and relaxation, all under one roof.
                Whether it’s a fresh hair cut, detailed beard styling, or a
                rejuvenating hair spa treatment, we’ve got you covered with
                top-tier expertise and premium products.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>



      


      {/* SERVICES LIST SECTION */}
      <section className="bg-white">
        {services.map((item, index) => (
          <div key={index} id={`service-${index}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Image */}
              <div
                className={`relative min-h-[280px] md:min-h-[580px] overflow-hidden group ${
                  index % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div
                className={`flex flex-col justify-center px-6 py-10 md:px-14 lg:px-20 ${
                  index % 2 === 0 ? "md:order-2" : "md:order-1"
                }`}
              >
                <FadeUp delay={0.1}>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-black mb-4">
                    {item.title}
                  </h3>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-sm md:text-base text-black/80 font-medium leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        ))}
      </section>


      {/* <BookAppointment/> */}
      <PartnerBrands/>
    </>
  );
}
