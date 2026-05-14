"use client";
import Image from "next/image";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";

const BridalService = () => {
  return (
    <section className="w-full bg-[#abafaf] bg-cover bg-center bg-no-repeat">
      <div className="max-w-7xl mx-auto pt-10 md:pt-0 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          <div className="hidden md:block md:col-span-1"></div>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black">
                Look <br /> Beautiful
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
                on YOUR day
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex items-center gap-5 mt-3 md:mt-6">
                <Button href="/ladies-salon-services" label="Bridal services" variant="dark" />
              </div>
            </FadeUp>
          </div>

          {/* Image (no animation for performance) */}
          <div className="md:col-span-7">
            <Image
              src="/img/home/bridal-service.webp"
              alt="Look Beautiful"
              width={700}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridalService;
