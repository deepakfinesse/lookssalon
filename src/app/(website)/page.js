import BridalService from "@/components/home/BridalService";
import Counter from "@/components/home/Counter";
import Enroll from "@/components/home/Enroll";
import HairColour from "@/components/home/HairColour";
import HeroSlider from "@/components/home/HeroSlider";
import OurSalons from "@/components/home/OurSalons";
import PrepaidCards from "@/components/home/PrepaidCards";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import LooksKart from "@/components/home/LooksKart";
import FadeUp from "@/components/animation/FadeUp";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <section
        className="
        relative
        bg-[url('/img/home/counter-bg.webp')]
        bg-cover bg-center bg-no-repeat
        py-10 md:py-24 lg:py-14 xl:pt-20 xl:pb-28
      "
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <FadeUp delay={0.1}>
            <div className="text-center mb-10 md:mb-14">
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold uppercase tracking-wider text-black">
                Looks in Numbers
              </h1>
            </div>
          </FadeUp>
          <Counter
            stats={[
              { value: 250, label: "Salons Pan India" },
              { value: 36, label: "Years of Experience" },
              { value: 7000, label: "Artists & Technicians" },
            ]}
          />
        </div>
      </section>

      <OurSalons />
      <HairColour />
      <BridalService />
      <PrepaidCards />
      <LooksKart />
      <Enroll />

      <BookAppointment/>
    <PartnerBrands/>
    </>
  );
}
