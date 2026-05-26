"use client";
import Image from "next/image";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    src: "/img/all/prepaid-blackn.webp",
    alt: "Blue Prepaid Card",
    final:   { rotate: "0deg", translateX: "50%", translateY: "-42%", zIndex: 1 },
    initial: { rotate: "0deg", translateX: "50%", translateY: "80%",  zIndex: 1 },
  },
  {
    src: "/img/all/prepaid-silvern.webp",
    alt: "Silver Prepaid Card",
    final:   { rotate: "0deg", translateX: "24%", translateY: "-22%", zIndex: 2 },
    initial: { rotate: "0deg", translateX: "24%", translateY: "80%",  zIndex: 2 },
  },
  {
    src: "/img/all/prepaid-goldn.webp",
    alt: "Gold Prepaid Card",
    final:   { rotate: "0deg", translateX: "0%", translateY: "0%", zIndex: 3 },
    initial: { rotate: "0deg", translateX: "0%", translateY: "80%", zIndex: 3 },
  },
];

const PrepaidCards = () => {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[url('/img/home/prepaid-card-bg.webp')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[340px] md:min-h-[400px]">

          {/* ── Card fan ── */}
          <div className="order-2 md:order-1 relative flex items-end justify-start h-full py-0 md:py-1 pl-4 md:pl-10">
            {/*
              Gold card is the size anchor.
              We give it a fixed width; silver & blue overflow via absolute positioning.
              The section itself has overflow-hidden so nothing bleeds outside.
            */}
            <div
              className="relative"
              style={{
                width: "clamp(260px, 38vw, 500px)",
                aspectRatio: "1.586",          // standard card ratio 85.6 × 54mm
                marginTop: "clamp(160px, 8vw, 100px)", // pushes gold down so blue has room above
              }}
            >
              {cards.map((card, i) => {
                const delay = triggered ? `${i * 140}ms` : "0ms";
                const pos = triggered ? card.final : card.initial;

                return (
                  <div
                    key={card.src}
                    className="absolute inset-0"
                    style={{
                      zIndex: pos.zIndex,
                      transform: `rotate(${pos.rotate}) translate(${pos.translateX}, ${pos.translateY})`,
                      opacity: triggered ? 1 : 0,
                      transition: `transform 0.8s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay},
                                   opacity 0.5s ease ${delay}`,
                      transformOrigin: "bottom left",
                    }}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 70vw, 500px"
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-center justify-center text-center pt-10 md:pt-0 py-0 md:py-14">
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black leading-tight">
                Pay Less <br /> Get More
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-2 md:mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
                with Pre-paid cards
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex items-center gap-5 mt-3 md:mt-6">
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







// "use client";
// import Image from "next/image";
// import Button from "../ui/Button";
// import FadeUp from "../animation/FadeUp";

// const PrepaidCards = () => {
//   return (
//     <section
//       className="
//         w-full 
//         bg-[url('/img/home/prepaid-card-bg.webp')] 
//         bg-cover bg-center bg-no-repeat
        
//       "
//     >
//       <div className="max-w-7xl mx-auto py-10 md:py-0 px-4">
//         <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">
//           {/* Image */}
//           <div className="md:col-span-7 flex justify-end pt-0 md:pt-4">
//             <Image
//               src="/img/home/prepaid-card.webp"
//               alt="Pay Less Get More"
//               width={638}
//               height={300}
//               className="w-full max-w-[638px] h-auto object-contain"
//             />
//           </div>

//           {/* Content */}
//           <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
//             <FadeUp delay={0.1}>
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black leading-tight">
//                 Pay Less <br /> Get More
//               </h2>
//             </FadeUp>
//             <FadeUp delay={0.2}>
//               <p className="mt-2 md:mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
//                 with Pre-paid cards
//               </p>
//             </FadeUp>
//             {/* Buttons */}
//             <FadeUp delay={0.3}>
//               <div className="flex items-center gap-5 mt-3 md:mt-6">
//                 <Button
//                   href="/prepaid-cards"
//                   label="Buy your prepaid cards"
//                   variant="dark"
//                 />
//               </div>
//             </FadeUp>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PrepaidCards;
