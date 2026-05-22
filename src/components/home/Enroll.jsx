"use client";
import Image from "next/image";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";

const Enroll = () => {
  return (
    <section
      className="
        w-full 
        bg-[url('/img/home/enroll-bg.webp')] 
        bg-cover bg-center bg-no-repeat
        
        relative
      "
    >
      {/* Optional overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 pt-10 md:pt-0 items-center gap-4">
          {/* Image */}
          <div className="order-2 md:order-1 md:col-span-7">
            <Image
              src="/img/home/enroll.webp"
              alt="Looks Academy"
              width={800}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 md:col-span-3 flex flex-col items-center justify-center text-center">
            <FadeUp delay={0.1}>
              <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white">
                Looks Academy
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-white uppercase leading-snug">
                School of <br className="hidden md:block" /> hair and beauty
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              {/* Buttons */}
              <div className="flex items-center gap-5 mt-3 md:mt-6">
                <Button href="https://www.looksschool.com/" label="enroll now" target="_blank" variant="dark" />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;
