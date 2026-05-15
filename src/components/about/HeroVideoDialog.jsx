"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroVideoDialog({
  youtubeId,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className = "",
}) {
  const [playing, setPlaying] = useState(false);

  const ytSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-2xl aspect-video",
        className,
      ].join(" ")}
    >
      {playing ? (
        <>
          <iframe
            src={ytSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-none"
          />
          {/* Back button */}
          <button
            type="button"
            onClick={() => setPlaying(false)}
            aria-label="Back to thumbnail"
            className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-white text-sm backdrop-blur-sm hover:bg-black/80 transition cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
          className="group relative block w-full h-full cursor-pointer border-none bg-transparent p-0"
        >
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain"
            priority
            draggable={false}
          />

          {/* Play button overlay */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-200 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="h-7 w-7 ml-1"
                aria-hidden="true"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
