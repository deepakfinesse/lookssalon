"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FadeUp from "../animation/FadeUp";

import "swiper/css";

const PartnerBrands = () => {
  const swiperRef = useRef(null);

  const partners = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <FadeUp delay={0.1}>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold uppercase text-black">
              Our Partner Brands
            </h2>
          </div>
        </FadeUp>

        {/* Slider */}
        <FadeUp delay={0.2}>
          <div className="relative flex items-center">
            {/* Prev Button */}
            <button
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="z-10 mr-4 w-10 h-9 flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:bg-primary transition"
            >
              <FaArrowLeft />
            </button>

            {/* Swiper */}
            <Swiper
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              slidesPerView={1}
              spaceBetween={10}
              simulateTouch={false}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[Autoplay]}
              breakpoints={{
                640:  { slidesPerView: 2, spaceBetween: 20 },
                768:  { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 60 },
              }}
              className="w-full"
            >
              {partners.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={`/img/home/partner/${item}.png`}
                      alt={`Partner ${item}`}
                      width={248}
                      height={60}
                      className="w-full max-w-45 md:max-w-55 h-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Next Button */}
            <button
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="z-10 ml-4 w-10 h-9 flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:bg-primary transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default PartnerBrands;
