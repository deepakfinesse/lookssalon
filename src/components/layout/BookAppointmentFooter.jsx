"use client";
import React from "react";
import FadeUp from "../animation/FadeUp";
import QuickBookingForm from "../booking/QuickBookingForm";


const BookAppointmentFooter = () => {
  return (
    <section className="w-full  bg-[url('/img/home/book-appointment-bg.webp')] bg-cover bg-[center_15%] bg-no-repeat py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white mb-10 md:mb-20">
              Let&apos;s not wait for the Perfect Look
            </h2>
          </FadeUp>
          

          <FadeUp delay={0.3} className="w-full">
            <QuickBookingForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentFooter;
