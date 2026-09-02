"use client";

import { useMemo, useState } from "react";
import FadeUp from "../animation/FadeUp";

/**
 * Drop the media artwork into /public/img/media/ and reference it via `src`.
 * Items without a `src` render as a grey placeholder tile, so the masonry
 * layout holds even before the real imagery is in place.
 */
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Awards", value: "awards" },
  { label: "Press", value: "press" },
  { label: "Collaboration", value: "collaboration" },
];

const MEDIA_ITEMS = [
  { id: 1, category: "awards", ratio: "1 / 1", src: "/img/all/offer-1.webp", alt: "Award feature" },
  { id: 2, category: "press", ratio: "1 / 1", src: "/img/all/offer-2.webp", alt: "Press feature" },
  { id: 3, category: "collaboration", ratio: "1 / 1", src: "/img/all/offer-1.webp", alt: "Collaboration feature" },
  { id: 4, category: "awards", ratio: "16 / 5", src: "/img/all/offer-2.webp", alt: "Award feature" },
  { id: 5, category: "press", ratio: "16 / 5", src: "/img/all/offer-1.webp", alt: "Press feature" },
  { id: 6, category: "collaboration", ratio: "16 / 5", src: "/img/all/offer-2.webp", alt: "Collaboration feature" },
  { id: 7, category: "press", ratio: "4 / 3", src: "/img/all/offer-1.webp", alt: "Press feature" },
  { id: 8, category: "awards", ratio: "3 / 4", src: "/img/all/offer-2.webp", alt: "Award feature" },
  { id: 9, category: "collaboration", ratio: "4 / 3", src: "/img/all/offer-1.webp", alt: "Collaboration feature" },
  { id: 10, category: "awards", ratio: "4 / 3", src: "/img/all/offer-2.webp", alt: "Award feature" },
  { id: 11, category: "collaboration", ratio: "3 / 4", src: "/img/all/offer-1.webp", alt: "Collaboration feature" },
  { id: 12, category: "press", ratio: "4 / 3", src: "/img/all/offer-2.webp", alt: "Press feature" },
];

export default function MediaGallery() {
  const [active, setActive] = useState("all");

  const items = useMemo(
    () => (active === "all" ? MEDIA_ITEMS : MEDIA_ITEMS.filter((m) => m.category === active)),
    [active]
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <FadeUp delay={0.1}>
        <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-black font-bold uppercase mb-4 md:mb-10 text-center">
          Media Gallery
        </h1>
      </FadeUp>

      {/* ── Filter tabs ── */}
      <FadeUp delay={0.15}>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 md:mb-14">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-sm lg:text-md font-bold font-primary uppercase tracking-wide border-2 px-5 md:px-7 py-2 transition-colors ${
                active === f.value
                  ? "bg-primary border-primary text-white"
                  : "border-gray text-grey hover:border-primary hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* ── Masonry grid ── */}
      {items.length === 0 ? (
        <div className="flex items-center justify-center py-24 text-gray-400">
          <p>No media found.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {items.map((item, i) => (
            <FadeUp key={item.id} delay={0.05 * (i + 1)}>
              <div className="mb-4 md:mb-6 break-inside-avoid overflow-hidden">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full bg-[#d9d9d9]" style={{ aspectRatio: item.ratio }} />
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      )}
    </section>
  );
}
