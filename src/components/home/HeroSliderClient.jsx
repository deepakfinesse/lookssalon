'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default function HeroSliderClient({ slides }) {
  if (!slides || slides.length === 0) return null

  return (
    // h-[56vw] = 16:9 ratio based on viewport width — stable on mobile so
    // Swiper's absolutely-positioned fade slides never collapse the wrapper height
    <section className="relative w-full overflow-hidden">
      <Swiper
        effect="fade"
        loop
        speed={800}
        autoHeight
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="w-full"
      >
        {slides.map((slide, index) => {
          const desktopSrc = slide.desktopImage?.url
          const mobileSrc  = slide.mobileImage?.url || desktopSrc
          const alt        = slide.desktopImage?.alt || `Banner slide ${index + 1}`

          return (
            <SwiperSlide key={slide._id || index}>
              <Link href={slide.href || '/'} className="block w-full">

                {/* Mobile — natural height, no cropping */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mobileSrc}
                  alt={slide.mobileImage?.alt || alt}
                  className="block md:hidden w-full h-auto"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Desktop — fill inside fixed-height container */}
                <div className="hidden md:block relative md:h-[40vh] lg:h-[90vh]">
                  <Image
                    src={desktopSrc}
                    alt={alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 768px) 100vw"
                    className="object-cover"
                  />
                </div>

              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination { bottom: 30px; }
        .swiper-pagination-bullet {
          background: white; width: 10px; height: 10px;
          opacity: 1; transition: all 0.5s ease;
        }
        .swiper-pagination-bullet-active {
          background: #DEAB30; width: 40px; border-radius: 6px;
        }
      `}</style>
    </section>
  )
}
