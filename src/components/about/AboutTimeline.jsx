"use client";
import { useEffect, useRef, useState } from "react";
import FadeUp from "../animation/FadeUp";

const milestones = [
  {
    side: "right",
    title: "Mr Sanjay Dutta",
    desc: <>established the first<br />Looks Salon in January, 1989</>,
  },
  {
    side: "left",
    title: "250+ branches",
    desc: <>in India, 55+ cities and<br />1 International location</>,
  },
  {
    side: "right",
    title: <>Approximately<br />8000 creatives</>,
    desc: "minds employed",
  },
  {
    side: "left",
    title: "Launched an academy in 2014",
    desc: <>that teaches the art of Hair, Makeup<br />& beauty in association with ARTH<br />(Absolute Route To Hairdressing) by L'Oréal</>,
  },
  {
    side: "right",
    title: <>Launched its own membership<br />card "Love your Looks"</>,
    desc: <>that now has approx. 1million plus members<br />across the chain. The membership program is<br />successful & has projected a 16% growth YOY.</>,
  },
  {
    side: "left",
    title: <>Launched its own<br />Prepaid cards</>,
    desc: "that support the drive of a cashless India.",
  },
];

export default function AboutTimeline() {
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) =>
              prev.includes(entry.target.dataset.index)
                ? prev
                : [...prev, entry.target.dataset.index]
            );
          }
        });
      },
      { threshold: 0.25 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">

        {/* Heading */}
        <FadeUp delay={0.2}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black font-bold uppercase mb-12 text-center"
          >
            Our Milestones
          </h2>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical gold line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-primary -translate-x-1/2" />

          {milestones.map((item, index) => {
            const isRight = item.side === "right";
            const isVisible = visible.includes(index.toString());

            return (
              <div
                key={index}
                data-index={index}
                ref={(el) => (refs.current[index] = el)}
                className="flex items-center mb-14"
              >
                {/* LEFT SLOT */}
                <div className="w-[calc(50%-22px)] flex justify-end pr-7">
                  {!isRight && (
                    <div
                      className={`text-right transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                      }`}
                    >
                      <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                        {item.title}
                      </p>
                      <p className="text-base md:text-lg text-black mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>

                {/* CIRCLE NODE — bullseye style */}
                <div
                  className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white"
                  style={{
                    width: 45,
                    height: 45,
                    border: "8px solid #DEAB30",
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 22,
                      height: 22,
                      background: "#DEAB30",
                    }}
                  />
                </div>

                {/* RIGHT SLOT */}
                <div className="w-[calc(50%-22px)] flex justify-start pl-7">
                  {isRight && (
                    <div
                      className={`text-left transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                      }`}
                    >
                      <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                        {item.title}
                      </p>
                      <p className="text-base md:text-lg text-black mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}