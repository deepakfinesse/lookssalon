"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";

const salonImages = [
  { src: "/img/home/our-salon.webp", alt: "Our Salon - Interior" },
  { src: "/img/home/our-salon2.webp", alt: "Our Salon - Styling" },
  { src: "/img/home/our-salon3.webp", alt: "Our Salon - Products" },
  { src: "/img/home/our-salon2.webp", alt: "Our Salon - Team" },
];

const OurSalons = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % salonImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 md:py-4">
      <div className="max-w-4xl xl:max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0">

          {/* Image Carousel — single fixed container, image crossfades in place */}
          <div className="lg:pr-20">
            {/*
              - aspect-[3/4] locks the height to the image ratio
              - one container; every slide is absolute-filled and stacked
              - only the active slide fades to opacity-100, the rest stay at 0
            */}
            <div className="relative w-full aspect-[3/4] overflow-hidden md:-mt-13  xl:-mt-24">
              {salonImages.map((image, index) => (
                <Image
                  key={image.src + index}
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center mt-6 md:mt-0">
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center uppercase text-black">
                Our Salons
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-black max-w-lg">
                The Exclusive Unisex Salon in your town acquainted with
                world-class tools and professionals for stunning looks and
                absolute luxury.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex items-center gap-2 md:gap-5 mt-3 md:mt-6">
                <Button href="/locate-salon" label="locate salon Near you" />
                <Button href="/aboutus#opening-soon" label="opening soon" />
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurSalons;







// "use client";
// import Image from "next/image";
// import Button from "../ui/Button";
// import FadeUp from "../animation/FadeUp";

// const OurSalons = () => {
//   return (
//     <section className="py-16 md:py-4">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0">
//           {/* Image */}
//           <div className="relative md:-mt-32 lg:pr-20">
//             <Image
//               src="/img/home/our-salon.webp"
//               alt="Our Salon"
//               width={600}
//               height={500}
//               className="w-full h-auto object-contain"
//             />
//           </div>

//           {/* Content */}
//           <div className="flex flex-col items-center text-center ">
//             <FadeUp delay={0.1}>
//               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center uppercase text-black">
//                 Our Salons
//               </h2>
//             </FadeUp>
//             <FadeUp delay={0.2}>
//               <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-black max-w-lg">
//                 The Exclusive Unisex Salon in your town acquainted with
//                 world-class tools and professionals for stunning looks and
//                 absolute luxury.
//               </p>
//             </FadeUp>

//             {/* Buttons */}
//             <FadeUp delay={0.3}>
//               <div className="flex items-center gap-2 md:gap-5 mt-6">
//                 <Button href="/" label="locate salon Near you" />
//                 <Button href="/" label="opening soon" />
//               </div>
//             </FadeUp>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurSalons;













// "use client";
// import Image from "next/image";
// import Button from "../ui/Button";
// import { useAnimation } from "@/hooks/useAnimation";

// const OurSalons = () => {
//   const [ref, isVisible] = useAnimation({ threshold: 0.6 });

//   return (
//     <section ref={ref} className="py-16 md:py-4">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0">
//           {/* Image */}
//           <div className="relative md:-mt-32 lg:pr-20">
//             <Image
//               src="/img/home/our-salon.webp"
//               alt="Our Salon"
//               width={600}
//               height={500}
//               className="w-full h-auto object-contain"
//             />
//           </div>

//           {/* Content */}
//           <div
//             className={`
//               flex flex-col items-center text-center
//               transition-all duration-900 delay-100 ease-out
//               ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-9"
//               }
//             `}
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black ">
//               Our Salons
//             </h2>

//             <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-black max-w-lg">
//               The Exclusive Unisex Salon in your town acquainted with
//               world-class tools and professionals for stunning looks and
//               absolute luxury.
//             </p>

//             <div className="flex items-center gap-2 md:gap-5 mt-6">
//               <Button href="/" label="locate salon Near you" />
//               <Button href="/" label="opening soon" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurSalons;
