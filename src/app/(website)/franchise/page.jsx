import React from "react";
import Image from "next/image";
import FranchiseForm from "@/components/booking/FranchiseForm";
import FadeUp from "@/components/animation/FadeUp";
import PartnerBrands from "@/components/layout/PartnerBrands";
import Button from "@/components/ui/Button";

const whyLooksData = [
  {
    id: 1,
    img: "/img/all/why-looks-1.svg",
    text: "35 years old Brand is by far way ahead of all competition",
  },
  {
    id: 2,
    img: "/img/all/why-looks-5.svg",
    text: `We have won lot of accolades and awards; owing to our customer centric approach`,
  },
  {
    id: 3,
    img: "/img/all/why-looks-2.svg",
    text: "Looks salon is amongst top 10 brands with pan India presence",
  },
  {
    id: 4,
    img: "/img/all/why-looks-3.svg",
    text: `We partner with the best in trade product partnerships across International brands; this comes naturally to you PARTNERS.`,
  },
  {
    id: 5,
    img: "/img/all/why-looks-4.svg",
    text: `We provide Franchise with the overall consulting, training and development needs as YOU are the key to our success`,
  },
];

const provideToFranchiseeData = [
  {
    id: 1,
    heading: "Marketing & Sales",
    img: "/img/all/looks-provide-1.webp",
    text: `We start planning for the franchise right from the word 'INTERESTED'; we help you identify the strategic location with the right target audience in the locality to make it work for you. Our dedicated area manager will help you with the complete roll out plan starting from the Launch to the regular sales and marketing activities planning and execution.`,
  },
  {
    id: 2,
    heading: "Recruitment & Training",
    img: "/img/all/looks-provide-2.webp",
    text: `The salon industry like every other service based industry is highly dependent on it's people in terms of providing the service to client retention. Our academy dedicated for this cause will always help you recruit highly trained manpower and would also help you in keeping them updated on their skills.`,
  },
  {
    id: 3,
    heading: "Advertising",
    img: "/img/all/looks-provide-3.webp",
    text: `You automatically come in with us on the complete marketing plans which will help all our franchise across the country and couple with regular sales focused promotions will ensure steady business and growth for you.`,
  },
  {
    id: 4,
    heading: "Operations",
    img: "/img/all/looks-provide-4.webp",
    text: `Only uniform and par excellence service and operations sets a provider apart from the clutter in the market. Our team will help you set up the complete operations as per our standards and help you maintain it effectively. We ensure uniform "LOOKS" experience through proper training of your operations team. We help you set the highest service level standards to ensure victory over other local brands and players.`,
  },
];

const franchiseSteps = [
  {
    id: 1,
    img: "/img/all/franchise/step-1.svg",
    title: "Enquiry",
    text: "Submit your interest and tell us about your vision.",
  },
  {
    id: 2,
    img: "/img/all/franchise/step-2.svg",
    title: "Feasibility",
    text: "We assess the market potential and discuss the opportunity.",
  },
  {
    id: 3,
    img: "/img/all/franchise/step-3.svg",
    title: "Agreement",
    text: "We finalize terms and set the foundation for our partnership.",
  },
  {
    id: 4,
    img: "/img/all/franchise/step-4.svg",
    title: "Launch",
    text: "We support you at every step as you open and grow.",
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
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 flex items-start justify-start">
          <div className="max-w-xl text-left">
          <FadeUp delay={0.1}>
            <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase leading-tight">
              Start your journey

              <br className="hidden md:block" />
              with <span className="text-primary">Looks salon</span>
            </h1>

            <span className="block w-30 h-0.5 bg-primary mt-5 mb-6" />

            <p className="text-md lg:text-lg text-white pb-10">Join the Looks Salon family and be part of india’s most trusted and <br className="hidden md:block"/> premium salon brand</p>
            <Button href="/ladies-salon-services#service-2" label="Send Enquiry" variant="dark" />
          </FadeUp>

          </div>
        </div>
      </div>

      {/* Why Looks Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white relative ">
        <FadeUp delay={0.1}>
          <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-black font-bold uppercase mb-4 md:mb-10 text-center">
            Why Looks?
          </h2>
        </FadeUp>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-12 lg:px-16">
          {whyLooksData.map((item) => (
            <FadeUp delay={0.1} key={item.id}>
            <li className="flex flex-col items-center text-center w-full sm:w-[90%] lg:w-[90%] max-w-xs mx-auto">
              <Image
                src={item.img}
                alt="Why Looks"
                width={80}
                height={80}
              />

              <p className="text-base md:text-lg text-black mt-4">
                {item.text}
              </p>
            </li>
            </FadeUp>
          ))}
        </ul>
      </section>

      


      <section className="w-full  bg-cover bg-center" style={{ backgroundImage: "url('/img/all/franchisee-query-bg.webp')" }}>
             <div className="max-w-6xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
                <FadeUp delay={0.1}>
                <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase mb-0">
                 Request a franchise
                </h1>
                </FadeUp>
              </div> 
              <div className="max-w-2xl mx-auto px-4 pb-10 lg:pb-12">
                <FadeUp delay={0.2}>
                <FranchiseForm />
                </FadeUp>
              </div>
        </section>


        {/* Franchisee Section */}
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-16 bg-white">
        <FadeUp delay={0.1}>
        <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-black font-bold uppercase mb-4 md:mb-10 text-center">
          What Looks provide
        </h2>
        </FadeUp>

        <div className="grid gap-12 md:gap-20">
          {provideToFranchiseeData.map((item, index) => (
            <FadeUp delay={0.1} key={item.id}>
            <div className="grid lg:grid-cols-12 gap-6 md:gap-12 xl:gap-16 items-center">
              <div
                className={`lg:col-span-4 ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={item.img}
                  alt={item.heading}
                  width={520}
                  height={380}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div
                className={`lg:col-span-8 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <h3 className="text-xl md:text-2xl text-black font-bold uppercase tracking-wide mb-3">
                  {item.heading}
                </h3>
                <p className="text-base md:text-lg text-black">
                  {item.text}
                </p>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="w-full  bg-cover bg-center" style={{ backgroundImage: "url('/img/all/franchisee-query-bg.webp')" }}>
             <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16  text-center">
                <FadeUp delay={0.1}>
                <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase mb-6">
                 Simple steps. Lasting success.
                </h2>
                </FadeUp>
              </div>
              <div className="max-w-7xl mx-auto px-4 pt-16 pb-14 md:pb-20">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6">
                  {franchiseSteps.map((step, index) => (
                    <FadeUp delay={0.1} key={step.id} className="h-full">
                      <li className="group relative flex h-full flex-col items-center text-center">
                        <span className="absolute -top-14 z-10 flex h-28 w-28 items-center justify-center rounded-full border border-primary bg-black transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110">
                          <Image
                            src={step.img}
                            alt={step.title}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-contain transition-transform duration-300 ease-out group-hover:rotate-6"
                          />
                        </span>
                        {index < franchiseSteps.length - 1 && (
                          <span className="hidden lg:block absolute top-[50%] -right-6 w-6 h-px bg-primary" />
                        )}
                        <div className="flex w-full flex-1 flex-col rounded-2xl border border-primary bg-primary/10 px-6 pt-30 pb-14 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:border-primary group-hover:bg-primary/20 group-hover:shadow-[0_20px_40px_-15px_rgba(169,37,75,0.6)]">
                          <h3 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wide mb-3">
                            {step.title}
                          </h3>
                          <p className="text-md lg:text-lg text-white">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    </FadeUp>
                  ))}
                </ul>
              </div>
        </section>
        <PartnerBrands/>
    </>
  );
};

export default Franchise;