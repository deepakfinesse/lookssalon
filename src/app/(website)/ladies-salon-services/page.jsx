"use client";
import FadeUp from "@/components/animation/FadeUp";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Image from "next/image";
import Link from "next/link";


const services = [
  {
    title: "CUT",
    desc: `The foundation of a fabulous look starts with the perfect hair cut and expert hair care. At LOOKS, our stylists begin with a personalized consultation to understand your hair texture, face shape, and style preference before creating a cut that enhances your natural beauty. Whether you're opting for a subtle trim or a bold new look, we ensure precision, style, and healthy hair every step of the way. Regular trims and customized treatments ensure your hair stays strong, bouncy, and easy to manage.`,
    image: "/img/services/ladies-cut.webp",
  },
  {
    title: "STYLING",
    desc: `Elevate your everyday look or get party-ready with our professional hair styling services. Whether you're heading for a meeting, a wedding, or a date night, our stylists offer a wide range of styling solutions like blow dry, hair setting, upstyles, ironing, and curls. From soft, effortless waves to sleek straight looks or intricate buns, our styling service ensures you leave the salon looking flawless and photo-ready.`,
    image: "/img/services/ladies-styling.webp",
  },
  {
    title: "COLOUR",
    desc: `Hair colour isn’t just about changing shades—it’s about expressing your personality. At LOOKS, our colour experts guide you through options that suit your skin tone, lifestyle, and hair goals. Whether you want a simple root touch-up, a rich global hair color, or an ammonia-free alternative for gentle colouring—we’ve got you covered. Looking for a trendy upgrade? Try our signature highlights, streaks, or opt for a stylish balayage color for soft, natural dimension. Every colour service includes pre- and post-care advice to ensure your hair remains healthy and vibrant.`,
    image: "/img/services/ladies-hair-colour.webp",
  },
  {
    title: "TEXTURE",
    desc: `Transform the way your hair feels and behaves with our range of hair texture treatments. For sleek, smooth, and frizz-free hair, choose from rebonding, straightening, or smoothening. Our keratin treatment and botox treatment help to restore strength and shine to chemically treated or damaged hair. Want volume and bounce instead? Our perming services deliver natural-looking curls with minimal maintenance. We also offer Olaplex express and Olaplex treatment—scientifically developed to rebuild broken hair bonds and improve the overall strength and health of your hair.`,
    image: "/img/services/ladies-hair-texture.webp",
  },
  {
    title: "TREATMENT",
    desc: `A healthy scalp is essential for beautiful hair. Our intensive hair & scalp treatments target common concerns like dandruff, dryness, hair fall, and thinning. These therapeutic sessions involve deep cleansing, hydration, and nourishment using advanced techniques and products to restore your scalp’s health and promote stronger, shinier hair. Whether you need a quick refresh or a long-term treatment plan, we offer solutions that work.`,
    image: "/img/services/ladies-treatment.webp",
  },
  {
    title: "HANDS & FEET",
    desc: `Pamper your hands and feet with our luxurious manicure and pedicure treatments. More than just grooming, these services include exfoliation, cuticle care, massage, and polish to leave your hands and feet soft, nourished, and beautiful. Choose from classic finishes or trendy nail art to express your style.`,
    image: "/img/services/ladies-hands-feet.webp",
  },
  {
    title: "FACIALS & CLEAN UPS",
    desc: `Reveal a radiant, refreshed version of yourself with our customized facials and clean-ups, tailored to suit every skin type—from oily and acne-prone to dry or sensitive skin. Our trained skincare experts use proven techniques and premium products to cleanse, hydrate, and rejuvenate your skin. For a brighter and even-toned complexion, we offer safe bleach services that gently lighten unwanted pigmentation, tan, or facial hair.`,
    image: "/img/services/ladies-facials.webp",
  },
  {
    title: "NAIL ART SERVICES",
    desc: `At LOOKS, we offer a comprehensive range of nail art services that combine creativity with care. Whether you’re in the mood for bold colors or elegant designs. We use high-quality, long-lasting products to ensure your nails stay stunning between visits.`,
    image: "/img/services/ladies-nail-art.webp",
  },
];

export default function page() {
  return (
    <>
      <section className="" style={{backgroundImage: "url('/img/services/ladies-services-bg.webp')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 items-center pt-8">
            <FadeUp delay={0.1} className="order-2 md:order-1">
              <div className="relative w-full">    
                <img
                  src="/img/services/ladies-hero.gif"
                  alt="Ladies Salon Services"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="order-1 md:order-2">
              <div className="flex flex-col items-left justify-left gap-0 md:gap-2 text-center md:text-left">
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black font-bold uppercase leading-normal">
                  Elevate your beauty
                </h1>
                <p className="text-xl md:text-3xl text-black font-semibold">
                  with our premium grooming & <br className="hidden md:block"/> beauty services for women.
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
                At LOOKS Salon, we believe that beauty is personal, and every woman deserves to feel confident, empowered, and radiant. Our premium range of ladies’ services is thoughtfully crafted to meet every beauty and grooming need under one roof—from cutting-edge hair styling and skin treatments to indulgent spa experiences and on-trend nail art. With expert stylists, modern techniques, and top-of-the-line products, we deliver an experience that’s as luxurious as it is transformative.
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
