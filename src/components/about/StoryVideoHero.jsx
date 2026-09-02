"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Full-bleed "Our Story" hero with an auto-playing background video
 * and a circular play / pause toggle button.
 *
 * Provide EITHER:
 *  - videoSrc: path to a local muted mp4/webm (best quality, recommended), or
 *  - youtubeId: a YouTube video id (no query string) used as the background.
 *
 * poster is shown before the video is ready and as a fallback.
 */
export default function StoryVideoHero({
  videoSrc,
  youtubeId,
  poster,
  posterAlt = "Our story",
  title = "Our Story",
  children,
}) {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  // ---- native <video> control -------------------------------------------
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    // kick off autoplay (muted autoplay is allowed by browsers)
    el.play?.().catch(() => {});
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [videoSrc]);

  // ---- YouTube iframe control (postMessage API) ------------------------
  const postToYouTube = useCallback((func) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
  }, []);

  const toggle = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
      return;
    }
    if (iframeRef.current) {
      postToYouTube(playing ? "pauseVideo" : "playVideo");
      setPlaying((p) => !p);
    }
  }, [playing, postToYouTube]);

  const ytSrc = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&enablejsapi=1&playlist=${youtubeId}`
    : null;

  return (
    <section className="relative w-full h-[70vh] min-h-[460px] max-h-[760px] overflow-hidden">
      {/* ---- background media ---- */}
      <div className="absolute inset-0 -z-0">
        {poster && (
          <Image
            src={poster}
            alt={posterAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {videoSrc ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : ytSrc ? (
          <iframe
            ref={iframeRef}
            src={ytSrc}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          />
        ) : null}
      </div>

      {/* ---- dark overlay ---- */}
      <div className="absolute inset-0 bg-black/45" />

      {/* ---- content ---- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold uppercase text-white md:text-4xl lg:text-5xl xl:text-6xl">
          {title}
        </h1>
        <div className="max-w-3xl text-md leading-relaxed text-white/90 lg:text-lg">
          {children}
        </div>
      </div>

      {/* ---- play / pause toggle ---- */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        aria-pressed={playing}
        className="absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/60 md:bottom-8 md:right-8 md:h-14 md:w-14"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 md:h-6 md:w-6" aria-hidden="true">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>
    </section>
  );
}
