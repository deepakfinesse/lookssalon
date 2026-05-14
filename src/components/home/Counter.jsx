"use client";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import FadeUp from "../animation/FadeUp";

const Counter = ({
  stats = [],
  gridCols = "grid-cols-3 sm:grid-cols-2 md:grid-cols-3",
}) => {
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid ${gridCols} gap-1 md:gap-4 text-center`}
    >
      {stats.map((item, index) => (
        <FadeUp key={item.label} delay={index * 0.2}>
          <div className="flex flex-col items-center">
            <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary">
              {start ? <CountUp end={item.value} duration={2.5} /> : "0"}+
            </h3>

            <h4 className="mt-0 text-sm md:text-2xl xl:text-3xl font-medium uppercase text-black">
              {item.label}
            </h4>
          </div>
        </FadeUp>
      ))}
    </div>
  );
};

export default Counter;




// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import CountUp from "react-countup";
// import FadeUp from "../animation/FadeUp";

// const stats = [
//   { value: 220, label: "Salons Pan India" },
//   { value: 35, label: "Years of Experience" },
//   { value: 7000, label: "Artists & Technicians" },
// ];

// const Counter = () => {
//   const [start, setStart] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStart(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.4 }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
   
// <>
//         {/* Counters */}
//         <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
//           {stats.map((item, index) => (
//             <FadeUp key={index} delay={index * 0.2}>
//               <div className="flex flex-col items-center">
//                 <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary">
//                   {start ? <CountUp end={item.value} duration={2.5} /> : "0"}+
//                 </h3>

//                 <h4 className="mt-3 text-base sm:text-lg md:text-2xl xl:text-3xl font-medium uppercase text-black">
//                   {item.label}
//                 </h4>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </>
//   );
// };

// export default Counter;
