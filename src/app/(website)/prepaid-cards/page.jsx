import React from "react";
import Image from "next/image";
import FadeUp from "@/components/animation/FadeUp";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Button from "@/components/ui/Button";

const cards = [
  {
    name: "LOOKS SILVER",
    img: "/img/all/prepaid-silvern.webp",
    accent: "#8D8D8D",
    badgeBg: "#EDEDED",
    preLoaded: "RS. 22,500",
    serviceWorth: "RS. 30,000",
    href: "https://lookskart.com/collections/gift-card/products/looks-silver-gift-card",
  },
  {
    name: "LOOKS GOLD",
    img: "/img/all/prepaid-goldn.webp",
    accent: "#DB9C47",
    badgeBg: "#F7ECD9",
    preLoaded: "RS. 52,500",
    serviceWorth: "RS. 75,000",
    href: "https://lookskart.com/collections/gift-card/products/looks-golden-gift-card",
  },
  {
    name: "LOOKS BLACK",
    img: "/img/all/prepaid-blackn.webp",
    accent: "#1A1A1A",
    badgeBg: "#E6E6E6",
    preLoaded: "RS. 10,500",
    serviceWorth: "RS. 13,000",
    href: "https://lookskart.com/collections/gift-card/products/looks-black-gift-card",
  },
];

const benefits = [
  { img: "/img/all/prepaid-discount.svg", label: ["EXCLUSIVE", "DISCOUNT"] },
  { img: "/img/all/prepaid-discount2.svg", label: ["PRIORITY", "BOOKINGS"] },
  { img: "/img/all/prepaid-discount3.svg", label: ["SPECIAL OFFERS", "& PRIVILEGES"] },
  { img: "/img/all/prepaid-discount4.svg", label: ["MEMBER", "EXCLUSIVES"] },
  { img: "/img/all/prepaid-discount5.svg", label: ["SAFE &", "SECURE"] },
];

const maskIcon = (url, color) => ({
  backgroundColor: color,
  WebkitMaskImage: `url('${url}')`,
  maskImage: `url('${url}')`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
});

const CardRow = ({ icon, accent, badgeBg, label, value, divider }) => (
  <div
    className={`flex items-center justify-between py-1 ${
      divider ? "border-b border-[#E5E5E5]" : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: badgeBg }}
      >
        <span className="block h-[18px] w-[18px]" style={maskIcon(icon, accent)} />
      </span>
      <span className="font-semibold text-black text-sm">{label}</span>
    </div>
    <span className="font-semibold text-md" style={{ color: accent }}>
      {value}
    </span>
  </div>
);

const page = () => {
  return (
    <>
      {/* <BookingForm /> */}
      <section className="bg-white" style={{ backgroundImage: "url('/img/all/prepaid-bg.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-12 lg:py-12 text-center">
          <FadeUp delay={0.1}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black font-bold uppercase mb-4">
           Look your best. <span className="text-primary">more often.</span>
          </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
          <p className="text-md lg:text-lg text-black">
            Getting a discount has never harmed anyone, so why spend those extra
            hard earned bucks on services that can be availed at discounted
            rates and become a prime member of our services? It's time to get
            your new look with Looks Salon prepaid cards and let your look do
            all the talkings.
          </p>
          <p className="text-md lg:text-lg text-black pt-2">
            Choose from Blue, Silver or Gold, enjoy services worth more than your investment, and make every makeover effortless.
          </p>

          <p className="text-md lg:text-lg text-black font-semibold pt-2">
            Because looking you best should never have to wait.
          </p>
          </FadeUp>

        </div>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {cards.map((card, index) => (
              <FadeUp
                key={card.name}
                delay={0.3}
                className={`md:px-8 lg:px-12 ${
                  index > 0 ? "md:border-l md:border-[#E5E5E5]" : ""
                } mb-12 md:mb-0`}
              >
                <div className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-3">
                  <div className="relative overflow-hidden">
                    <Image
                      src={card.img}
                      width={320}
                      height={200}
                      alt={card.name}
                      className="transition-transform duration-500 group-hover:scale-95"
                    />
                  </div>

                  <h2
                    className="text-1xl lg:text-2xl font-bold uppercase -mt-20"
                    style={{ color: card.accent }}
                  >
                    {card.name}
                  </h2>
                  <span
                    className="block w-14 h-1 mt-2 mx-auto"
                    style={{ backgroundColor: card.accent }}
                  ></span>

                  <div className="mt-5 w-full max-w-[300px] text-md lg:text-lg">
                    <CardRow
                      icon="/img/all/prepaid-wallet.svg"
                      accent={card.accent}
                      badgeBg={card.badgeBg}
                      label="PRE LOADED"
                      value={card.preLoaded}
                      divider
                    />
                    <CardRow
                      icon="/img/all/prepaid-service.svg"
                      accent={card.accent}
                      badgeBg={card.badgeBg}
                      label="SERVICE WORTH"
                      value={card.serviceWorth}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-5 mt-1">
                    <Button
                      href={card.href}
                      label="Buy Now"
                      target="_blank"
                      variant="primary"
                    />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center md:justify-between">
            {benefits.map((benefit, index) => (
              <FadeUp
                key={benefit.label.join(" ")}
                delay={0.1 + index * 0.05}
                className={`flex items-center justify-center gap-3 py-5 md:flex-1 md:py-0 ${
                  index > 0 ? "md:border-l md:border-white/70" : ""
                }`}
              >
                <Image
                  src={benefit.img}
                  width={44}
                  height={44}
                  alt={benefit.label.join(" ")}
                  className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11"
                />
                <span className="font-semibold uppercase leading-tight text-white text-md sm:text-md">
                  {benefit.label[0]}
                  <br />
                  {benefit.label[1]}
                </span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>



      {/* <section className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
          <FadeUp delay={0.1}>
          <p className="text-md lg:text-lg text-white">
            We know that you love getting a makeover often as it helps you bring
            out different personalities of yourself. So with our prepaid cards,
            get ready to fall in love with makeovers that people for sure are
            going to notice. We've always believed in long-term relations with
            our clients and these prepaid cards make that possible. Classified
            in 3 categories - Blue, Silver and Gold, you can avail services upto
            the total worth of each card and flaunt your looks in no time. While
            we are working on your makeover, we will make sure that you've the
            best time at our salon because we know a different and unique look
            is not an easy task.Don't waste more time on thinking about it. Your
            hair, skin and nails need all the pampering and love to make them
            feel the best and Looks salon is here with the state of art
            facilities to serve you. Living your life to the fullest should
            always be the mantra and if it means getting a long overdue
            makeover, then it's now or never.
          </p>
          </FadeUp>
        </div>
      </section> */}
      {/* <BookAppointment/> */}
        <PartnerBrands/>
    </>
  );
};

export default page;
