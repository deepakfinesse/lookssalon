import AboutTimeline from '@/components/about/AboutTimeline'
import HeroVideoDialog from '@/components/about/HeroVideoDialog'
import Counter from '@/components/home/Counter'
import React from 'react'
import Image from "next/image";
import FadeUp from '@/components/animation/FadeUp';
import BookAppointment from '@/components/layout/BookAppointment';
import PartnerBrands from '@/components/layout/PartnerBrands';

const leftAwards = [
  {
    col1: [
      { category: "Color Trophy", result: "Winner" },
      { category: "Cut & Style", result: "Winner" },
    ],
    col2: [
      { category: "Color Trophy", result: "Runner up" },
      { category: "Best Salon Chain", result: "North" },
    ],
  },
];

const rightAwards = [
  {
    col1: [
      { category: "Best Salon Chain", result: "North" },
      { category: "Young Colorist", result: "Runners Up" },
    ],
    col2: [
      { category: "Best Salon Design", result: "North Cyber Hub" },
      { category: "Cut & Style", result: "Runners Up" },
    ],
  },
];
const achievements = [
  {
    img: "/img/about/award-loreal.webp", // replace with your image
    alt: "L'Oreal Award",
    desc: (
      <>
        Looks Salon won the<br />
        L'oreal Men's Image 2011 and won the L'Oreal<br />
        color trophy 2008 and were the runners up in the<br />
        Men's image & L'Oreal color trophy 2006 a Pan<br />
        India contest
      </>
    ),
  },
  {
    img: "/img/about/award-iifa.webp", // replace with your image
    alt: "IIFA Partnership",
    desc: (
      <>
        Looks Salon proudly partnered the IIFA awards<br />
        – 2009 as a hair styling partner and<br />
        successfully initiated the process of starting a<br />
        trend to bring the ramp hairstyling to the mass.
      </>
    ),
  },
  {
    img: "/img/about/award-academy.webp", // replace with your image
    alt: "Academy Launch",
    desc: (
      <>
        Branched out in the field of education and<br />
        successfully launched academy with departments<br />
        of Hair, Make-up and Beauty which has churned<br />
        out numerous batches of students who are now<br />
        happily employed.
      </>
    ),
  },
  {
    img: "/img/about/award-salon-chain.webp", // replace with your image
    alt: "Best Salon Chain",
    desc: (
      <>
        Looks won the Images Best salon chain of the year<br />
        2013 and Best salon chain of the year 2014 &<br />
        2015 from Salon Congress.
      </>
    ),
  },
  {
    img: "/img/about/award-abcd2.webp", // replace with your image
    alt: "ABCD2 Movie Partner",
    desc: (
      <>
        Salon partners for an Indian Blockbuster movie<br />
        "ABCD2", a Disney Pictures Production
      </>
    ),
  },
];

const page = () => {
  return (
    <>
        <section>
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
              <FadeUp delay={0.1}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-grey font-bold uppercase mb-4">
                    The journey
                </h1>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className='text-md lg:text-lg text-black'>LOOKS Salon - One of the most powerful brands in hair, beauty & makeup in India <br className='hidden lg:md:block'/> From a small 3 chair 300 Sq. Ft. barber shop to now 250 salons across India employing over 8000 creative minds.</p>
                </FadeUp>
            </div>
            <div className="max-w-4xl xl:max-w-5xl mx-auto px-4 pb-10 md:pb-8  lg:pb-12  text-center">
               
              <FadeUp delay={0.3}>
                {/* Hero Video Dialog */}
                <HeroVideoDialog
                youtubeId="NccYpBobQZ0?si=rdrs5mLcL8nNcGsv"       
                thumbnailSrc="/img/about/video-thumbnail.webp"   
                thumbnailAlt="Product walkthrough video"
                />
                </FadeUp>
            </div>
        </section>
        
        {/* Counter */}
        <section>
            <div className="max-w-5xl mx-auto px-4 py-12 md:py-12 lg:py-12 items-center  text-center">
                <div className='grid grid-cols-1 md:grid-cols-2 align-middle gap-10'>
                    <div className='h-full flex items-center text-left'>
                      <FadeUp delay={0.1}>
                        <p  className='text-md lg:text-lg text-black'>With continuous evolution over the years in new techniques and styles keeping itself updated with the national and international market, Looks has emerged as one of the trendiest salons over 36 years. Its prime vision is “Utmost Luxury at Affordable Prices” which comes packed with customer satisfaction beyond expectations.</p>
                      </FadeUp>
                    </div>
                <div>
                    <Counter
                    gridCols="grid-cols-1  md:grid-cols-1"
                    stats={[
                        { value: 250, label: "Salons Pan India" },
                        { value: 36, label: "Years" },
                        { value: 55, label: "cities" },
                    ]}
                    />
                    </div>
                </div>
            </div>
        </section>
        {/* Our Vision */}
        <section className='bg-primary'>
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-12 lg:py-12">
              <FadeUp delay={0.1}>
                <h2 className="text-3xl md:text-4xl xl:text-6xl text-black font-bold uppercase mb-4 text-center">
                    Our vision
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className='text-md lg:text-lg text-black'>To be a leading customer centric salon chain, warmly welcoming all customers for an experience which takes them on a high in terms of quality hair, beauty & skin services in a</p>
                <h3 className="text-2xl md:text-3xl xl:text-3xl text-black font-medium py-4">Hygenic, Relaxed & Compressed</h3>
                <p className='text-md lg:text-lg text-black'>environment to make their day fabulous. After claiming to be India’s most loved salon chain; Looks is now looking to spread its wings internationally. With our first opening in Kualumpur, Malaysia we are testing waters to take a full flight.</p>
              </FadeUp>
            </div>
        </section>

        {/* Our Milestones */}
        <AboutTimeline/>

        {/* Our Proud Moments */}
        <section className='bg-black'>
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-12 lg:py-12">
                <FadeUp delay={0.1}>
                <h2 className="text-3xl md:text-4xl xl:text-6xl text-primary font-bold uppercase mb-0 md:mb-2 text-center">
                    Our Proud Moments
                </h2>
                </FadeUp>
                <div className='relative bg-black overflow-hidden py-10'>
                  <div className="absolute left-0 right-0 hidden md:block"  style={{ top: "42%", height: 1.5, background: "#b8860b", zIndex: 0 }}/>
                  <FadeUp delay={0.2}>
                  <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

                      {/* ── LEFT PANEL ── */}
                      <div className="w-full md:flex-1 md:min-w-0 mt-0 md:mt-6">
                        {/* Year label sits ON the gold line */}
                        <p
                          className="text-2xl md:text-3xl font-semibold mb-6"
                          style={{ color: "#DFAB31" }}
                        >
                          2014-15
                        </p>

                        {/* Two-column award grid */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                          {/* Col 1 */}
                          <div className="flex flex-col gap-6">
                            {leftAwards[0].col1.map((award, i) => (
                              <AwardItem key={i} {...award} />
                            ))}
                          </div>
                          {/* Col 2 */}
                          <div className="flex flex-col gap-6">
                            {leftAwards[0].col2.map((award, i) => (
                              <AwardItem key={i} {...award} />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* ── CENTER MEDAL ── */}
                      <div className="order-first md:order-0 shrink-0 flex flex-col items-center mt-0 md:-mt-1.5">
                        {/* Gold outer ring → White ring → Image */}
                        <div
                          className="relative rounded-full overflow-hidden flex items-center justify-center w-48 h-48 md:w-80 md:h-80"
                        >
                          
                            {/* Inner image circle */}
                            
                              {/* 👇 Replace src with your actual image */}
                              <Image
                                src="/img/about/award-center.webp"
                                alt="Indian Hairdressing Awards"
                                fill
                                className="object-contain opacity-90"
                              />

                              {/* Text overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <h2
                                  className="text-white text-center text-md md:text-2xl font-black leading-tight -mt-16"
                                  style={{  textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                                >
                                  Indian<br />Hairdressing<br />Awards
                                </h2>
                              </div>
                        </div>
                      </div>

                      {/* ── RIGHT PANEL ── */}
                      <div className="w-full md:flex-1 md:min-w-0 text-left md:text-right mt-0 md:mt-6">
                        <p
                          className="text-2xl md:text-3xl font-semibold mb-6 text-left md:text-right"
                          style={{ color: "#DFAB31" }}
                        >
                          2016-17
                        </p>

                        {/* Two-column award grid */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                          {/* Col 1 */}
                          <div className="flex flex-col gap-6">
                            {rightAwards[0].col1.map((award, i) => (
                              <AwardItem key={i} {...award} />
                            ))}
                          </div>
                          {/* Col 2 */}
                          <div className="flex flex-col gap-6">
                            {rightAwards[0].col2.map((award, i) => (
                              <AwardItem key={i} {...award} />
                            ))}
                          </div>
                        </div>
                      </div>

                  </div>
                  </FadeUp>
                </div>

                {/* Row 1 — 3 items */}
                <FadeUp delay={0.2}>
                <div className="flex flex-wrap justify-center gap-x-14 gap-y-12 mt-10 mb-14">
                {achievements.slice(0, 3).map((item, i) => (
                    <AchievementCard key={i} item={item} />
                ))}
                </div>
                </FadeUp>

                {/* Row 2 — 2 items */}
                <FadeUp delay={0.2}>
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
                {achievements.slice(3).map((item, i) => (
                    <AchievementCard key={i} item={item} />
                ))}
                </div>
                </FadeUp>
            </div>
        </section>

        <PartnerBrands />
       
    </>
  )
}



function AwardItem({ category, result }) {
  return (
    <div>
      <p className="text-white text-md font-normal leading-tight">{category}</p>
      <p className="text-md font-normal mt-0.5" style={{ color: "#DFAB31" }}>
        {result}
      </p>
    </div>
  );
}

function AchievementCard({ item }) {
  return (
    <div className="flex flex-col items-center ">

      {/* Gold ring + circular image */}
      <div
        className="rounded-full p-[3px] mb-5 shrink-0 w-40 h-40 md:w-55 md:h-55"
        style={{
          background: "linear-gradient(145deg, #e8c96a, #a07820, #e8c96a, #7a5c10)",
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-900">
          <Image
            src={item.img}
            alt={item.alt}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* Description text */}
      <p className="text-white text-center text-lg leading-relaxed tracking-wide">
        {item.desc}
      </p>

    </div>
  );
}



      

export default page