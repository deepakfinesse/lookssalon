"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import FadeUp from "../animation/FadeUp";

/**
 * Drop the milestone artwork (transparent PNG/WebP cut-outs, like the mock-up)
 * into /public/img/about/milestones/ using these file names:
 *   founder.webp · branches.webp · team.webp · academy.webp
 *   membership-card.webp · card-gold.webp · card-black.webp · card-silver.webp
 * Missing files simply don't render — the timeline layout still holds.
 */
const milestones = [
  {
    year: "1989",
    side: "left",
    title: "Mr. Sanjay Dutta",
    desc: (
      <>
        established the first Looks Salon
        <br />
        in January
      </>
    ),
    img: "/img/about/milestones/founder.webp",
    imgAlt: "Mr. Sanjay Dutta, founder of Looks Salon",
  },
  {
    year: "2010",
    side: "right",
    title: "250+ Branches",
    desc: (
      <>
        in India, 55+ cities and
        <br />1 International location
      </>
    ),
    img: "/img/about/milestones/branches.webp",
    imgAlt: "Looks Salon branches across India",
  },
  {
    year: "2012",
    side: "left",
    title: (
      <>
        Approximately
        <br />
        8000
      </>
    ),
    desc: "creative minds employed",
    img: "/img/about/milestones/team.webp",
    imgAlt: "Looks Salon creative team",
  },
  {
    year: "2014",
    side: "right",
    title: (
      <>
        Launched an
        <br />
        Academy
      </>
    ),
    desc: (
      <>
        that teaches the art of Hair, Makeup
        <br />
        &amp; beauty in association with ARTH
        <br />
        (Absolute Route To Hairdressing) by L&apos;Or&eacute;al
      </>
    ),
    img: "/img/about/milestones/academy.webp",
    imgAlt: "Looks Academy of Hair, Beauty & Make-up",
  },
  {
    year: "2016",
    side: "left",
    title: (
      <>
        Launched its own membership
        <br />
        card &ldquo;Love Your Looks&rdquo;
      </>
    ),
    desc: (
      <>
        that now has approx. 1 million plus members
        <br />
        across the chain. The membership program is
        <br />
        successful &amp; has projected a 16% growth YOY.
      </>
    ),
    img: "/img/about/milestones/membership-card.webp",
    imgAlt: "Love Your Looks membership card",
  },
  {
    year: "2018",
    side: "center",
    title: (
      <>
        Launched its own
        <br />
        Prepaid Cards
      </>
    ),
    desc: "that support the drive of a cashless India",
    cards: [
      { img: "/img/about/milestones/card-gold.webp", alt: "Looks Salon Gold prepaid card" },
      { img: "/img/about/milestones/card-black.webp", alt: "Looks Salon Black prepaid card" },
      { img: "/img/about/milestones/card-silver.webp", alt: "Looks Salon Silver prepaid card" },
    ],
  },
];

const CORNER = 64;

/** Build the rounded serpentine path that threads through every node centre. */
function buildPath(pts, w) {
  if (!pts.length) return "";
  const first = pts[0];

  // Top entry hook: drop from the top centre, then sweep across to the first node.
  const startX = w ? w / 2 : first.x;
  const hookY = Math.max(CORNER + 4, first.y - CORNER * 2.2);
  const dir0 = first.x >= startX ? 1 : -1;
  const r0 = Math.min(
    CORNER,
    Math.abs(first.x - startX) / 2 - 6 || CORNER,
    (first.y - hookY) / 2 - 6 || CORNER
  );

  let d = `M ${startX} 0`;
  if (Math.abs(first.x - startX) > 4) {
    d += ` L ${startX} ${hookY - r0}`;
    d += ` Q ${startX} ${hookY} ${startX + dir0 * r0} ${hookY}`;
    d += ` L ${first.x - dir0 * r0} ${hookY}`;
    d += ` Q ${first.x} ${hookY} ${first.x} ${hookY + r0}`;
  }
  d += ` L ${first.x} ${first.y}`;

  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const midY = (a.y + b.y) / 2;
    const dir = b.x >= a.x ? 1 : -1;
    const r = Math.max(
      10,
      Math.min(CORNER, (b.y - a.y) / 2 - 6, Math.abs(b.x - a.x) / 2 - 6 || CORNER)
    );

    d += ` L ${a.x} ${midY - r}`;
    d += ` Q ${a.x} ${midY} ${a.x + dir * r} ${midY}`;
    d += ` L ${b.x - dir * r} ${midY}`;
    d += ` Q ${b.x} ${midY} ${b.x} ${midY + r}`;
    d += ` L ${b.x} ${b.y}`;
  }

  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y + 44}`;
  return d;
}

const hideImg = (e) => {
  e.currentTarget.style.display = "none";
};

export default function AboutTimeline() {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const rowRefs = useRef([]);
  const pathRef = useRef(null);

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [pathD, setPathD] = useState("");
  const [drawn, setDrawn] = useState(false);
  const [visibleRows, setVisibleRows] = useState([]);

  const measure = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const cRect = c.getBoundingClientRect();
    const pts = nodeRefs.current.filter(Boolean).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
      };
    });

    const w = c.offsetWidth;
    const h = c.offsetHeight;
    setDims((d) => (d.w === w && d.h === h ? d : { w, h }));

    const nd = buildPath(pts, w);
    setPathD((prev) => (prev === nd ? prev : nd));
  }, []);

  useEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 400);

    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Draw / redraw the stroke animation whenever the path changes.
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !pathD) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = drawn ? "0" : `${len}`;
  }, [pathD, drawn]);

  // Kick off the line drawing once the timeline scrolls into view.
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setDrawn(true);
        }),
      { threshold: 0.12 }
    );
    io.observe(c);
    return () => io.disconnect();
  }, []);

  // Reveal each row's content + node as it enters the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = e.target.dataset.index;
            setVisibleRows((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        }),
      { threshold: 0.35 }
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <FadeUp delay={0.2}>
          <h2 className="mb-10 text-center text-3xl font-bold uppercase text-black md:mb-14 md:text-4xl lg:text-5xl xl:text-5xl">
            Our Milestones
          </h2>
        </FadeUp>

        {/* ───────────── Desktop: serpentine timeline ───────────── */}
        <div ref={containerRef} className="relative mt-10 hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            width={dims.w || 1}
            height={dims.h || 1}
            viewBox={`0 0 ${dims.w || 1} ${dims.h || 1}`}
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d={pathD}
              stroke="#161616"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke-dashoffset 2400ms ease-out" }}
            />
          </svg>

          {milestones.map((m, i) => {
            const shown = visibleRows.includes(String(i));
            const isRight = m.side === "right";
            const isCenter = m.side === "center";

            const bullseye = (
              <div
                ref={(el) => (nodeRefs.current[i] = el)}
                className={
                  isCenter
                    ? "relative z-20 mb-6"
                    : `absolute top-1/2 z-20 -translate-y-1/2 ${
                        isRight ? "right-[56px]" : "left-[56px]"
                      }`
                }
              >
                <div
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border-[8px] border-primary bg-white transition-all duration-500 ease-out ${
                    shown ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                >
                  <span className="block h-[18px] w-[18px] rounded-full bg-primary" />
                </div>
              </div>
            );

            const textBlock = (
              <div
                className={`transition-all duration-700 ease-out ${
                  isRight ? "text-right" : "text-left"
                } ${
                  shown
                    ? "translate-x-0 opacity-100"
                    : `opacity-0 ${isRight ? "translate-x-10" : "-translate-x-10"}`
                }`}
              >
                <p className="text-lg font-bold text-primary xl:text-xl">{m.year}</p>
                <h3 className="mt-1 text-2xl font-bold uppercase leading-tight text-black xl:text-[27px]">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 xl:text-[15px]">
                  {m.desc}
                </p>
              </div>
            );

            const mediaBlock = m.img ? (
              <div
                className={`transition-all duration-700 ease-out ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: shown ? "120ms" : "0ms" }}
              >
                <img
                  src={m.img}
                  alt={m.imgAlt}
                  onLoad={measure}
                  onError={hideImg}
                  className="mx-auto w-full max-w-[420px] object-contain"
                />
              </div>
            ) : (
              <div />
            );

            if (isCenter) {
              return (
                <div
                  key={i}
                  data-index={i}
                  ref={(el) => (rowRefs.current[i] = el)}
                  className="relative flex flex-col items-center pb-4 pt-6 text-center"
                >
                  {bullseye}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <p className="text-lg font-bold text-primary xl:text-xl">{m.year}</p>
                    <h3 className="mt-1 text-2xl font-bold uppercase leading-tight text-black xl:text-[27px]">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500 xl:text-[15px]">
                      {m.desc}
                    </p>
                  </div>
                  <div className="mt-10 grid w-full max-w-4xl grid-cols-3 gap-4 sm:gap-8">
                    {m.cards.map((c, ci) => (
                      <div
                        key={ci}
                        className={`transition-all duration-700 ease-out ${
                          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                        style={{ transitionDelay: shown ? `${150 + ci * 120}ms` : "0ms" }}
                      >
                        <img
                          src={c.img}
                          alt={c.alt}
                          onLoad={measure}
                          onError={hideImg}
                          className="w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                data-index={i}
                ref={(el) => (rowRefs.current[i] = el)}
                className="relative flex min-h-[300px] items-center xl:min-h-[360px]"
              >
                {bullseye}
                <div
                  className={`grid w-full grid-cols-2 items-center gap-8 xl:gap-14 ${
                    isRight ? "pl-4 pr-[120px]" : "pl-[120px] pr-4"
                  }`}
                >
                  {isRight ? (
                    <>
                      {mediaBlock}
                      {textBlock}
                    </>
                  ) : (
                    <>
                      {textBlock}
                      {mediaBlock}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ───────────── Mobile / tablet: stacked timeline ───────────── */}
        <div className="relative mt-6 pl-10 lg:hidden">
          <div className="absolute bottom-3 left-[15px] top-3 w-[2px] bg-primary/60" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <FadeUp key={i} delay={0.1}>
                <div className="relative">
                  <div className="absolute -left-[38px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-[5px] border-primary bg-white">
                    <span className="block h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <p className="text-base font-bold text-primary">{m.year}</p>
                  <h3 className="mt-0.5 text-xl font-bold uppercase leading-tight text-black">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{m.desc}</p>
                  {m.img && (
                    <img
                      src={m.img}
                      alt={m.imgAlt}
                      onError={hideImg}
                      className="mt-4 w-full max-w-[320px] object-contain"
                    />
                  )}
                  {m.cards && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {m.cards.map((c, ci) => (
                        <img
                          key={ci}
                          src={c.img}
                          alt={c.alt}
                          onError={hideImg}
                          className="w-full object-contain"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
