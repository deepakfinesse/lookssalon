'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const slides = [
  {
    src: '/img/home/hero.webp',
    alt: 'Hero Slide 1',
    href: '/',
  },
  {
    src: '/img/home/hero.webp',
    alt: 'Hero Slide 2',
    href: '/',
  },
  {
    src: '/img/home/hero.webp',
    alt: 'Hero Slide 3',
    href: '/',
  },
]

const HeroSlider = () => {
  return (
    <section className="relative w-full h-[25vh] md:h-[40vh] lg:h-[90vh]  overflow-hidden">
      <Swiper
        effect="fade"
        loop
        speed={800}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            
            {/* ✅ FULL CLICKABLE SLIDE */}
            <Link href={slide.href} className="block w-full h-full">
              
              <div className="relative w-full  h-full lg:h-[90vh]">
                
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0} // LCP safe
                  sizes="100vw"
                  className="object-cover"
                />

                {/* <div className="absolute inset-0 bg-black/40"></div> */}

              </div>

            </Link>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ INLINE PAGINATION STYLE (Tailwind-safe) */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 30px;
        }

        .swiper-pagination-bullet {
          background: white;
          width: 10px;
          height: 10px;
          opacity: 1;
          transition: all 0.5s ease;
        }

        .swiper-pagination-bullet-active {
          background: #DEAB30;
          width: 40px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  )
}

export default HeroSlider





// 'use client'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
// import Image from 'next/image'

// // Swiper styles
// import 'swiper/css'
// import 'swiper/css/effect-fade'
// import 'swiper/css/pagination'

// const slides = [
//   {
//     src: '/img/home/hero.webp',
//     alt: 'Hero Slide 1',
//   },
//   {
//     src: '/img/home/hero.png',
//     alt: 'Hero Slide 2',
//   },
//   {
//     src: '/img/home/hero.webp',
//     alt: 'Hero Slide 3',
//   },
// ]

// const HeroSlider = () => {
//   return (
//     <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden">
//       <Swiper
//         effect="fade"
//         loop={true}
//         speed={800}
//         autoplay={{
//           delay: 4000, // realistic autoplay
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[EffectFade, Pagination, Autoplay]}
//         className="h-full"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-[85vh] sm:h-screen">
              
//               {/* ✅ Next Image for performance */}
//               <Image
//                 src={slide.src}
//                 alt={slide.alt}
//                 fill
//                 priority={index === 0} // ⭐ LCP optimization
//                 quality={90}
//                 sizes="100vw"
//                 className="object-cover"
//               />

//               {/* Optional overlay */}
//               {/* <div className="absolute inset-0 bg-black/40"></div> */}

//               {/* Optional content */}
//               {/* <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-4">
//                 <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold">
//                   Looks Salon
//                 </h1>
//               </div> */}

//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   )
// }

// export default HeroSlider