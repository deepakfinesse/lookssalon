import React from "react";
import Image from "next/image";
import FranchiseForm from "@/components/booking/FranchiseForm";
import FadeUp from "@/components/animation/FadeUp";
import PartnerBrands from "@/components/layout/PartnerBrands";

const whyLooksData = [
  {
    id: 1,
    img: "/img/all/why-looks-1.svg",
    text: "35 years old Brand is by far way ahead of all competition",
  },
  {
    id: 2,
    img: "/img/all/why-looks-2.svg",
    text: "Looks salon is amongst top 10 brands with pan India presence",
  },
  {
    id: 3,
    img: "/img/all/why-looks-3.svg",
    text: `We partner with the best in trade product partnerships across international brands; this comes naturally to you PARTNERS…`,
  },
  {
    id: 4,
    img: "/img/all/why-looks-4.svg",
    text: `We provide Franchise with the overall consulting, training and development needs as YOU are the key to our success`,
  },
  {
    id: 5,
    img: "/img/all/why-looks-5.svg",
    text: `We have won lot of accolades and awards; owing to our customer centric approach`,
  },
];

const provideToFranchiseeData = [
  {
    id: 1,
    heading: (<>Marketing <br className="hidden md:block"/> & Sales</>),
    text: `We start planning for the franchise right from the word 'INTERESTED'; we help you identify the strategic location with the right target audience in the locality to make it work for you. Our dedicated area manager will help you with the complete roll out plan starting from the Launch to the regular sales and marketing activities planning and execution.`,
  },
  {
    id: 2,
    heading: (<>Recruitment <br className="hidden md:block"/> & Training</>),
    text: `The salon industry like every other service based industry is highly dependent on its people in terms of providing the service to client retention. Our academy dedicated for this cause will always help you recruit highly trained manpower and would also help you in keeping them updated on their skills.`,
  },
  {
    id: 3,
    heading: "Advertising",
    text: `You automatically come in with us on the complete marketing plans which will help all our franchise across the country and couple with regular sales focused promotions will ensure steady business and growth for you.`,
  },
  {
    id: 4,
    heading: "Operations",
    text: `Only uniform and par excellence service and operations sets a provider apart from the clutter in the market. Our team will help you set up the complete operations as per our standards and help you maintain it effectively. We ensure uniform "LOOKS" experience through proper training of your operations team. We help you set the highest service level standards to ensure victory over other local brands and players.`,
  },
];

const Franchise = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/img/all/franchisee-bg.webp')" }}
      >
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-90px)] px-4 py-12 flex items-start justify-center text-center">
          <FadeUp delay={0.1}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-white font-bold uppercase leading-normal">
              Start your journey with us today
              <br className="hidden md:block" />
              Be a Looks Franchise
            </h1>
          </FadeUp>
        </div>
      </div>

      {/* Why Looks Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white relative -mt-22 md:-mt-30 lg:-mt-32 z-10 ">
        <FadeUp delay={0.1}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-black font-bold uppercase mb-10 text-center">
            Why Looks?
          </h2>
        </FadeUp>
        <ul className="space-y-6 lg:px-16">
          {whyLooksData.map((item) => (
            <FadeUp delay={0.1}>
            <li
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center lg:gap-4"
            >
              <Image
                src={item.img}
                alt="Why Looks"
                width={70}
                height={70}
              />

              <p className="text-lg md:text-3xl text-black font-semibold lg:pl-6">
                {item.text}
              </p>
            </li>
            </FadeUp>
          ))}
        </ul>
      </section>

      {/* Franchisee Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <FadeUp delay={0.1}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-black font-bold uppercase mb-12 text-center">
          What We Provide to Franchisee
        </h2>
        </FadeUp>

        <div className="grid gap-10">
          {provideToFranchiseeData.map((item) => (
            <FadeUp delay={0.1}>
            <div
              key={item.id}
              className="grid lg:grid-cols-12 md:gap-16 xl:gap-24  pb-8 items-center"
            >
              <div className="lg:col-span-4">
                <h3 className="text-2xl md:text-4xl lg:text-5xl text-primary font-bold uppercase leading-tight">
                  {item.heading}
                </h3>
              </div>

              <div className="lg:col-span-8">
                <p className="text-base md:text-lg text-black ">
                  {item.text}
                </p>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </section>


      <section className="w-full  bg-cover bg-center" style={{ backgroundImage: "url('/img/all/franchisee-query-bg.webp')" }}>
             <div className="max-w-6xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
                <FadeUp delay={0.1}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-white font-bold uppercase mb-4">
                  Start your journey with us
                </h1>
                </FadeUp>
              </div> 
              <div className="max-w-2xl mx-auto px-4 pb-12 lg:pb-12">
                <FadeUp delay={0.2}>
                <FranchiseForm />
                </FadeUp>
              </div>
        </section>
        <PartnerBrands/>
    </>
  );
};

export default Franchise;