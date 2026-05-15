'use client'
import Image from 'next/image'
import Link from 'next/link'
import FadeUp from "@/components/animation/FadeUp";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";

const services = [
  {
    title: 'CUT & STYLE | HAIR CARE...',
    desc: `The foundation of a fabulous look starts with the perfect hair cut and expert hair care. At LOOKS, our stylists begin with a personalized consultation to understand your hair texture, face shape, and style preference before creating a cut that enhances your natural beauty. Whether you're opting for a subtle trim or a bold new look, we ensure precision, style, and healthy hair every step of the way. Regular trims and customized treatments ensure your hair stays strong, bouncy, and easy to manage.`,
    icon: '/img/services/ladies-icon1.svg',
  },
  {
    title: 'HAIR STYLING',
    desc: `Elevate your everyday look or get party-ready with our professional hair styling services. Whether you're heading for a meeting, a wedding, or a date night, our stylists offer a wide range of styling solutions like blow dry, hair setting, upstyles, ironing, and curls. From soft, effortless waves to sleek straight looks or intricate buns, our styling service ensures you leave the salon looking flawless and photo-ready.`,
    icon: '/img/services/ladies-icon2.svg',     
  },
  {
    title: 'HAIR COLOUR',
    desc: `

Hair colour isn’t just about changing shades—it’s about expressing your personality. At LOOKS, our colour experts guide you through options that suit your skin tone, lifestyle, and hair goals. Whether you want a simple root touch-up, a rich global hair color, or an ammonia-free alternative for gentle colouring—we’ve got you covered. Looking for a trendy upgrade? Try our signature highlights, streaks, or opt for a stylish balayage color for soft, natural diladiesion. Every colour service includes pre- and post-care advice to ensure your hair remains healthy and vibrant.`,
    icon: '/img/services/ladies-icon3.svg',
  },
  {
    title: 'HAIR TEXTURE SERVICES',
    desc: `

Transform the way your hair feels and behaves with our range of hair texture treatments. For sleek, smooth, and frizz-free hair, choose from rebonding, straightening, or smoothening. Our keratin treatment and botox treatment help to restore strength and shine to chemically treated or damaged hair. Want volume and bounce instead? Our perming services deliver natural-looking curls with minimal maintenance. We also offer Olaplex express and Olaplex treatment—scientifically developed to rebuild broken hair bonds and improve the overall strength and health of your hair.`,
    icon: '/img/services/ladies-icon4.svg',
  },
  {
    title: 'HAIR & SCALP TREATMENTS',
    desc: `

A healthy scalp is essential for beautiful hair. Our intensive hair & scalp treatments target common concerns like dandruff, dryness, hair fall, and thinning. These therapeutic sessions involve deep cleansing, hydration, and nourishment using advanced techniques and products to restore your scalp’s health and promote stronger, shinier hair. Whether you need a quick refresh or a long-term treatment plan, we offer solutions that work.`,
    icon: '/img/services/ladies-icon5.svg',
  },
  {
    title: 'BODY REJUVENATION',
    desc: `

Take a break from your busy schedule and indulge in our body rejuvenation services designed to relax, detoxify, and renew. From refreshing body scrubs and wraps to full-body massages, these services improve circulation, reduce stress, and leave your skin soft, smooth, and glowing. It’s self-care at its best—because beauty starts with how you feel.`,
    icon: '/img/services/ladies-icon6.svg',
  },
  {
    title: 'FACIALS & CLEAN UPS | BLEACH',
    desc: `

Reveal a radiant, refreshed version of yourself with our customized facials and clean-ups, tailored to suit every skin type—from oily and acne-prone to dry or sensitive skin. Our trained skincare experts use proven techniques and premium products to cleanse, hydrate, and rejuvenate your skin. For a brighter and even-toned complexion, we offer safe bleach services that gently lighten unwanted pigmentation, tan, or facial hair.`,
    icon: '/img/services/ladies-icon7.svg',
  },
  {
    title: 'HANDS & FEET',
    desc: `

Pamper your hands and feet with our luxurious manicure and pedicure treatments. More than just grooming, these services include exfoliation, cuticle care, massage, and polish to leave your hands and feet soft, nourished, and beautiful. Choose from classic finishes or trendy nail art to express your style.`,
    icon: '/img/services/ladies-icon8.svg',
  },
  
  
]

export default function ladiesServices() {
  return (
    <>
    <section className="">

      {/* TOP GRID SECTION */}
      <div className="max-w-7xl mx-auto p-4 md:p-8  text-black">

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-30  p-4">

          {/* Left Images */}
          <div className="hidden md:block space-y-14">
            <div className="overflow-hidden group">
              <Image src="/img/services/ladies-one.webp" alt="" width={400} height={300} className="w-full h-auto transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="overflow-hidden group">
              <Image src="/img/services/ladies-two.webp" alt="" width={400} height={300} className="w-full h-auto transition-transform duration-500 group-hover:scale-110" />
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
              <h3 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-grey font-bold uppercase text-center md:mt-6 mb-6">
                SERVICES
              </h3>

              <div className="overflow-hidden group mb-4">
                <Image src="/img/services/ladies-three.webp" alt="" width={532} height={336} className="w-full transition-transform duration-500 group-hover:scale-110" />
              </div>

              <ul className="text-center text-2xl md:text-[44px] font-extrabold my-10 md:my-15 space-y-2">
                <li className="relative overflow-hidden group">
                  <a href="#service-0" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">CUT & STYLE</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-1" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR STYLING</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-2" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR COLOUR</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-3" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR TEXTURE SERVICES</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-4" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">HAIR & SCALP TREATMENTS</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-5" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">BODY REJUVENATION</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-6" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">FACIALS & CLEAN UPS</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-7" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">HANDS & FEET</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
                <li className="relative overflow-hidden group">
                  <a href="#service-8" className="block">
                    <FadeUp delay={0.1}><span className="relative z-10 transition duration-300 group-hover:text-white">NAIL ART SERVICES</span></FadeUp>
                    <span aria-hidden="true" className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
              </ul>
              <div className="overflow-hidden group mt-4 md:p-8">
                <Image src="/img/services/ladies-four.webp" alt="" width={400} height={200} className="w-full transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>

            
          </div>

        </div>

        <div className="grid mt-14">
          <FadeUp delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-bold  mb-4">LOOKS Salon – Luxurious Grooming & Beauty Services for Women </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
            <p className="text-lg text-black font-medium">
                At LOOKS Salon, we believe that beauty is personal, and every woman deserves to feel confident, empowered, and radiant. Our premium range of ladies’ services is thoughtfully crafted to meet every beauty and grooming need under one roof—from cutting-edge hair styling and skin treatments to indulgent spa experiences and on-trend nail art. With expert stylists, modern techniques, and top-of-the-line products, we deliver an experience that’s as luxurious as it is transformative.
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

              ${index % 2 === 0 ? 'bg-black text-white' : 'bg-[#fff] text-black'}
              p-6
            `}
          >
            <div className='max-w-7xl mx-auto px-4 py-10 space-y-6'>
            <div className='flex flex-col md:flex-row gap-6 items-start'>
            {/* Icon Placeholder */}
            <div className="flex items-center justify-center text-primary">
              <FadeUp delay={0.1}>
              <Image src={item.icon} alt="Icon" width={100} height={0} />
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


{/* BOTTOM IMAGE */}
    <section className="bg-black" id="service-8">
       <div className="max-w-7xl mx-auto py-14 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-50">
                {/* Content */}
                <div className="flex flex-col items-left ">
                  <FadeUp delay={0.2}>
                  <h2 className="text-3xl text-primary font-semibold tracking-wide mb-4">
                    NAIL ART SERVICES
                  </h2>
                  <p className="mt-4 text-base sm:text-lg font-normal text-white leading-relaxed max-w-lg">
                    Your hands say a lot about you—make sure they’re always polished to perfection. 
                    At LOOKS, we offer a comprehensive range of nail art services that combine creativity with care. Whether you’re in the mood for bold colours or elegant designs, our offerings include:
                  </p>
                  <ul className="list-disc list-inside mt-4 text-base sm:text-lg font-normal text-white leading-relaxed max-w-lg">  
                    
                   <li>Power Polish</li>
                    <li>Power Polish with Art</li>
                    <li>Temporary and Permanent Extensions</li>
                    <li>Gel & Acrylic Nail Paint</li>
                    <li>French Extensions</li>
                    <li>Sculpture Nail Extensions</li>
                    <li>Power Polish Removal</li>
                    <li>Permanent Extension Removal</li>
                    </ul>
                    <p className="mt-4 text-base sm:text-lg font-normal text-white leading-relaxed max-w-lg">
                    We use high-quality, long-lasting products to ensure your nails stay stunning between visits.
                  </p>
                  </FadeUp>
                </div>
                 {/* Image */}
                <div className="relative md:-mt-20 flex flex-col items-center md:items-right overflow-hidden group">
                  <Image
                    src="/img/services/nail-art-services.webp"
                    alt="Our Salon"
                    width={365}
                    height={500}
                    className="transition-transform duration-500 group-hover:scale-95"
                  />
                </div>
              </div>
            </div>
        </section>
        <BookAppointment/>
        <PartnerBrands/>

    </>
  )
}
