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

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Counter />
      <OurSalons />
      <HairColour />
      <BridalService />
      <PrepaidCards />
      <LooksKart />
      <Enroll />

      {/* <BookAppointment/>
    <PartnerBrands/> */}
    </>
  );
}
