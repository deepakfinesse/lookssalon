"use client";
import Image from "next/image";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";

const PrepaidCards = () => {
  return (
    <section
      className="
        w-full 
        bg-[url('/img/home/prepaid-card-bg.webp')] 
        bg-cover bg-center bg-no-repeat
        
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          {/* Image */}
          <div className="md:col-span-7 flex justify-end pt-4">
            <Image
              src="/img/home/prepaid-card.webp"
              alt="Pay Less Get More"
              width={638}
              height={300}
              className="w-full max-w-[638px] h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black leading-tight">
                Pay Less <br /> Get More
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
                with Pre-paid cards
              </p>
            </FadeUp>
            {/* Buttons */}
            <FadeUp delay={0.3}>
              <div className="flex items-center gap-5 mt-6">
                <Button
                  href="/prepaid-cards"
                  label="Buy your prepaid cards"
                  variant="dark"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrepaidCards;
