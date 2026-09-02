"use client";
import React from "react";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";
import BookingForm from "../booking/BookingForm";


const BookAppointmentFooter = () => {
  return (
    <section className="w-full bg-[#DDAB2F] bg-[url('/img/home/book-appointment-bg.png')] bg-cover bg-[center_15%] bg-no-repeat py-12 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-center  text-center">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-black">
                Let's not wait for the Perfect Look
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
                Book an appointment
              </p>
            </FadeUp>
          </div>

          {/* Form */}
          <div className="w-full md:pl-10">
            <BookingForm inputBorder="border-black" />
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentFooter;
