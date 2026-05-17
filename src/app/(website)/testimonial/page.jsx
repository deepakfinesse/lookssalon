import FadeUp from '@/components/animation/FadeUp';
import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";


const testimonialData = [
  {
    id: 1,
    image: "/img/testimonial/testimonial1.webp",
    rating: 5,
    name: "Priya Sharma, Mumbai",
    quote:
      "I've been going to Looks Salon for three years now . The stylist understood exactly what I want. Totally worth every rupee!",
  },
  {
    id: 2,
    image: "/img/testimonial/testimonial2.webp",
    rating: 5,
    name: "Rahul Mehta, Delhi",
    quote:
      "The beard shaping was precise and the stylist gave great suggestions for my face shape. My go-to salon now.",
  },
  {
    id: 3,
    image: "/img/testimonial/testimonial3.webp",
    rating: 5,
    name: "Ananya Iyer, Bangalore",
    quote:
      "Got my bridal makeup and hair done at Looks Salon and I genuinely felt great. The team was patient, professional and made me feel absolutely beautiful on my big day.",
  },
  {
    id: 4,
    image: "/img/testimonial/testimonial4.webp",
    rating: 5,
    name: "Vikram Nair, Chennai",
    quote:
      "Tried the global hair colour with a scalp treatment and I'm happyby how natural it looks. No damage — just clean, sharp colour. The staff really is very professional",
  },
];

const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar key={i} className="text-[#D4A017] text-xl" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt key={i} className="text-[#D4A017] text-xl" />
      );
    } else {
      stars.push(
        <FaRegStar key={i} className="text-[#D4A017] text-xl" />
      );
    }
  }

  return stars;
};

const Testimonial = () => {
  return (
    <>
      <section className="">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-12 text-center">
          <FadeUp delay={0.1}>
          <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-grey font-bold uppercase mb-4">
            Voice Of Experience
          </h1>
          </FadeUp>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 gap-4">
            {testimonialData.map((testimonial) => (
              <FadeUp delay={0.2}>
              <div
                key={testimonial.id}
                className="grid grid-cols-12 gap-6 items-center cursor-pointer"
              >
                {/* Image */}
                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-center">
                  <img
                    src={testimonial.image}
                    alt={`Testimonial ${testimonial.id}`}
                    width={250}
                    height={300}
                  />
                </div>

                {/* Content */}
                <div className="col-span-12 md:col-span-9">
                  
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl text-black font-bold mb-4">
                    {testimonial.name}
                  </h3>

                  {/* Quote */}
                  <p className="text-lg text-black leading-relaxed max-w-4xl">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <BookAppointment/>
        <PartnerBrands/>
    </>
  )
}

export default Testimonial