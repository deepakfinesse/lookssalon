"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * HeroVideoDialog
 *
 * @param {object} props
 * @param {string} props.youtubeId        - YouTube video ID e.g. "dQw4w9WgXcQ"
 * @param {string} props.thumbnailSrc     - Thumbnail image path e.g. "/thumbnail.jpg"
 * @param {string} [props.thumbnailAlt]   - Alt text for the thumbnail
 * @param {string} [props.className]      - Extra classes on the trigger wrapper
 *
 * Performance:
 *  LCP  → next/image with priority; iframe never in DOM until click
 *  FCP  → only static <img> + inline SVG on critical path
 *  TBT  → YouTube ~300 kB of scripts injected only after user interaction
 *  CLS  → aspect-ratio wrapper reserves space before image loads
 */
export default function HeroVideoDialog({
  youtubeId,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  /* focus trap + scroll lock */
  useEffect(() => {
    if (!open) return;

    const prevActive = document.activeElement;
    closeButtonRef.current?.focus();
    const savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = savedOverflow;
      prevActive?.focus();
    };
  }, [open, closeDialog]);

  const ytSrc = open
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : undefined;

  return (
    <>
      {/* ── Trigger ───────────────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        aria-label="Play video"
        className={[
          "group relative block w-full cursor-pointer rounded-2xl border-none bg-transparent p-0",
          "aspect-video overflow-visible",
          "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "hover:scale-[1.015] focus-visible:outline focus-visible:outline-2",
          "focus-visible:outline-white/80 focus-visible:outline-offset-4",
          className,
        ].join(" ")}
      >
        {/* Decorative pulsing ring */}
        {/* <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute -inset-[10%] rounded-full",
            "border border-neutral-400/50",
            "animate-[ringPulse_3s_ease-in-out_infinite]",
          ].join(" ")}
        /> */}

        {/* Thumbnail */}
        <span className="relative block h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1]"
            priority
            draggable={false}
          />
          {/* Gradient overlay */}
          {/* <span
            aria-hidden="true"
            className={[
              "absolute inset-0 rounded-2xl",
              "bg-gradient-to-br from-black/30 via-black/10 to-black/35",
              "transition-opacity duration-300 group-hover:opacity-70",
            ].join(" ")}
          /> */}
        </span>

        {/* Play button */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* Red glow */}
          <span className="absolute h-[clamp(56px,8vw,80px)] w-[clamp(56px,8vw,80px)] rounded-full bg-red-500/15 blur-xl transition-opacity duration-300 group-hover:opacity-150" />

          {/* Frosted-glass play circle */}
          {/* <span
            className={[
              "relative flex h-[clamp(56px,8vw,80px)] w-[clamp(56px,8vw,80px)]",
              "items-center justify-center rounded-full",
              "border border-white/55 bg-white/18",
              "shadow-[0_4px_24px_rgba(0,0,0,0.45)]",
              "backdrop-blur-sm",
              "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "group-hover:scale-110 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
            ].join(" ")}
          >
            
            <span
              className="ml-1 block"
              style={{
                width: 0,
                height: 0,
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "18px solid red",
              }}
            />
          </span> */}
        </span>
      </button>

      {/* ── Dialog / Backdrop ─────────────────────────────────────────── */}
      {open && (
        <div
          role="presentation"
          onClick={closeDialog}
          className={[
            "fixed inset-0 z-[9999]",
            "flex items-center justify-center p-4",
            "bg-black/85 backdrop-blur-md",
            "animate-[fadeIn_0.2s_ease_forwards]",
          ].join(" ")}
        >
          <dialog
            open
            aria-modal="true"
            aria-label="Video player"
            onClick={(e) => e.stopPropagation()}
            className={[
              "relative m-auto w-[min(90vw,960px)] overflow-visible",
              "border-none bg-transparent p-0",
              "animate-[slideUp_0.28s_cubic-bezier(0.34,1.56,0.64,1)_forwards]",
            ].join(" ")}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDialog}
              aria-label="Close video"
              className={[
                "absolute -top-11 right-0 z-10",
                "flex h-9 w-9 items-center justify-center rounded-full",
                "border border-white/30 bg-white/8 text-white",
                "cursor-pointer transition-all duration-200",
                "hover:scale-110 hover:rotate-90 hover:border-white/70 hover:bg-white/18",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-3",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* 16:9 iframe wrapper */}
            <div
              className={[
                "relative w-full overflow-hidden rounded-xl bg-black",
                "pt-[56.25%]",
                "shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]",
              ].join(" ")}
            >
              <iframe
                src={ytSrc}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full rounded-xl border-none"
              />
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}