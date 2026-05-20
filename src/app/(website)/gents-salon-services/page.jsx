"use client";
import FadeUp from "@/components/animation/FadeUp";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Image from "next/image";
import Link from "next/link";


const services = [
  {
    title: "CUT & HAIR CARE",
    desc: `Every great look begins with the right cut. At LOOKS, our stylists are trained to deliver tailored hair cuts that match your personality, lifestyle, and face structure. Whether you're looking for a classic crew cut, a modern fade, or something edgy, we ensure a sharp and stylish finish. For our youngest clients, we offer a gentle and fun Child Hair Cut [Below 5 years], making sure little ones feel comfortable while looking their adorable best.`,
    icon: "/img/services/mens-icon1.svg",
  },
  {
    title: "BEARD CARE",
    desc: `A well-groomed beard speaks volumes. Our beard care services are designed to maintain, refine, and style your facial hair with finesse. Choose a clean shave for a crisp, smooth look or opt for a beard trim to maintain the perfect shape. Want to upgrade your beard game? Try our beard color services for covering greys or experimenting with a fresh shade. Complete the look with expert beard styling—from classic to contemporary, we craft beards that frame your face perfectly.`,
    icon: "/img/services/mens-icon2.svg",
  },
  {
    title: "HAIR CARE",
    desc: `Healthy hair is the foundation of a great appearance. Our hair care services are curated to nourish, strengthen, and restore hair vitality. Whether you're dealing with dryness, dullness, or just need some pampering, our team ensures your hair gets the care it deserves.`,
    icon: "/img/services/mens-icon3.svg",
  },
  {
    title: "HAIR COLOUR",
    desc: `Add vibrancy or a touch of sophistication with our professional hair colour services. From bold transformations to subtle highlights or grey coverage, we use top-quality products to ensure long-lasting colour and healthy hair. Our stylists guide you to choose the right shade to complement your skin tone and personal style.`,
    icon: "/img/services/mens-icon4.svg",
  },
  {
    title: "HAIR TEXTURE",
    desc: `Elevate your look with our hair texture solutions. Whether you want sleek straight hair, voluminous curls, or a frizz-free finish, our treatments like smoothing, straightening, and perming are designed to enhance your natural hair while maintaining its health and shine.`,
    icon: "/img/services/mens-icon5.svg",
  },
  {
    title: "HAIR SPA TREATMENTS",
    desc: `Unwind and revitalize your scalp and hair with our luxurious hair spa treatments. These deep-conditioning sessions target issues like dandruff, hair fall, and dryness, leaving you with a healthier scalp and noticeably softer, shinier hair.`,
    icon: "/img/services/mens-icon6.svg",
  },
];

export default function ladiesServices() {
  return (
    <>
      <section className="">
        {/* TOP GRID SECTION */}
        <div className="max-w-7xl mx-auto p-4 md:p-8  text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-30  p-4">
            {/* Left Images */}
            <div className="hidden md:block space-y-14">
              <div className="overflow-hidden group">
                <Image
                  src="/img/services/mens-one.webp"
                  alt=""
                  width={532}
                  height={651}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden group">
                <Image
                  src="/img/services/mens-three.webp"
                  alt=""
                  width={532}
                  height={483}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* CTA BOX */}
              <Link href="/salon-book-appointment" className="relative block overflow-hidden border-12 border-primary lg:ml-12 lg:-mr-12 px-6 py-6 lg:px-12 lg:py-10 text-left mt-6 bg-white group cursor-pointer">
                <h4 className="relative z-10 text-3xl lg:text-6xl font-medium leading-snug transition duration-300 group-hover:text-white">
                  Book Now & give yourself a head turning LOOK
                </h4>
                <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
              </Link>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-grey font-bold uppercase text-center md:mt-6 mb-6">
                  SERVICES
                </h1>

                <div className="overflow-hidden group mb-4">
                  <Image
                    src="/img/services/mens-two.webp"
                    alt=""
                    width={532}
                    height={336}
                    className="w-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <ul className="text-center text-2xl md:text-[44px] font-extrabold my-10 md:my-15 space-y-2">
                  <li className="relative overflow-hidden group">
                    <a href="#service-0" className="block">
                      <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">CUT & HAIR CARE</span></FadeUp>
                      <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                  </li>
                  <li className="relative overflow-hidden group">
                    <a href="#service-1" className="block">
                      <FadeUp delay={0.2}><span className="relative z-10 transition duration-300 group-hover:text-white">BEARD CARE</span></FadeUp>
                      <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                  </li>
                  <li className="relative overflow-hidden group">
                    <a href="#service-2" className="block">
                      <FadeUp delay={0.3}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR CARE</span></FadeUp>
                      <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                  </li>
                  <li className="relative overflow-hidden group">
                    <a href="#service-3" className="block">
                      <FadeUp delay={0.4}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR COLOR</span></FadeUp>
                      <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                  </li>
                  <li className="relative overflow-hidden group">
                    <a href="#service-4" className="block">
                      <FadeUp delay={0.5}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR TEXTURE</span></FadeUp>
                      <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                  </li>
                  <li className="relative overflow-hidden group">
                    <a href="#service-5" className="block">
                      <FadeUp delay={0.6}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR SPA TREATMENTS</span></FadeUp>
                      <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                  </li>
                </ul>
                <div className="overflow-hidden group mt-4">
                  <Image
                    src="/img/services/mens-four.webp"
                    alt=""
                    width={400}
                    height={200}
                    className="w-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid mt-14">
            <FadeUp delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold  mb-4">
                LOOKS Salon – Premium Men’s Grooming Services
              </h2>
            </FadeUp>
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

        {/* SERVICES LIST SECTION */}
        <div className="">
          {services.map((item, index) => (
            <div
              key={index}
              id={`service-${index}`}
              className={`

              ${
                index % 2 === 0 ? "bg-black text-white" : "bg-[#fff] text-black"
              }
              p-6
            `}
            >
              <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Icon Placeholder */}
                  <div className="flex items-center justify-center text-primary">
                    <FadeUp delay={0.1}>
                      <Image src={item.icon} alt="Icon" width={70} height={0} />
                    </FadeUp>
                  </div>

                  {/* Content */}
                  <div>
                    <FadeUp delay={0.1}>
                      <h3
                        className={`text-2xl md:text-3xl font-semibold tracking-wide mb-4 ${
                          index % 2 === 0 ? "text-primary" : "text-black"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                      <p className={`text-lg font-medium leading-relaxed ${index % 2 === 0 ? "font-normal" : "font-medium"}`}>
                        {item.desc}
                      </p>
                    </FadeUp>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <BookAppointment/>
      <PartnerBrands/>
    </>
  );
}
