"use client";
import React from "react";
import Button from "../ui/Button";
import FadeUp from "../animation/FadeUp";

const BookAppointment = () => {
  return (
    <section className="w-full bg-[#DDAB2F] bg-[url('/img/home/book-appointment-bg.png')] bg-cover bg-[center_15%] bg-no-repeat py-12 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-center  text-center">
            <FadeUp delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-black">
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
            <form className="space-y-8">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b-2 border-black text-white text-lg md:text-xl pt-6 pb-2 focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-2 text-white text-lg md:text-xl transition-all duration-200
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-xl
                  peer-focus:top-1 peer-focus:text-sm peer-focus:scale-90"
                >
                  Name *
                </label>
              </div>

              {/* Contact */}
              <div className="relative">
                <input
                  type="text"
                  id="contact"
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b-2 border-black text-white text-lg md:text-xl pt-6 pb-2 focus:outline-none"
                />
                <label
                  htmlFor="contact"
                  className="absolute left-0 top-2 text-white text-lg md:text-xl transition-all duration-200
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-xl
                  peer-focus:top-1 peer-focus:text-sm peer-focus:scale-90"
                >
                  Contact *
                </label>
              </div>

              {/* City (SELECT) */}
              <div className="relative">
                <select
                  id="city"
                  required
                  defaultValue=""
                  className="peer w-full bg-transparent border-b-2 border-black text-white text-lg md:text-xl pt-6 pb-2 focus:outline-none appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="Delhi" className="text-black">
                    Delhi
                  </option>
                  <option value="Mumbai" className="text-black">
                    Mumbai
                  </option>
                  <option value="Bangalore" className="text-black">
                    Bangalore
                  </option>
                </select>

                <label
                  htmlFor="city"
                  className="absolute left-0 top-2 text-white text-lg md:text-xl transition-all duration-200
                  peer-focus:top-1 peer-focus:text-sm peer-focus:scale-90
                  peer-[&:not([value=''])]:top-1 peer-[&:not([value=''])]:text-sm peer-[&:not([value=''])]:scale-90"
                >
                  City *
                </label>
              </div>

              {/* Service Type (SELECT) */}
              <div className="relative">
                <select
                  id="service"
                  required
                  defaultValue=""
                  className="peer w-full bg-transparent border-b-2 border-black text-white text-lg md:text-xl pt-6 pb-2 focus:outline-none appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="Hair" className="text-black">
                    Hair
                  </option>
                  <option value="Makeup" className="text-black">
                    Makeup
                  </option>
                  <option value="Skin" className="text-black">
                    Skin
                  </option>
                </select>

                <label
                  htmlFor="service"
                  className="absolute left-0 top-2 text-white text-lg md:text-xl transition-all duration-200
                  peer-focus:top-1 peer-focus:text-sm peer-focus:scale-90
                  peer-[&:not([value=''])]:top-1 peer-[&:not([value=''])]:text-sm peer-[&:not([value=''])]:scale-90"
                >
                  Service Type *
                </label>
              </div>

              {/* Button */}
              <div className="text-center pt-4">
                <Button
                  label="Book Now"
                  href="#"
                  variant="dark"
                  className="shadow-[0px_0px_24px_0px_#00000059]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;

// 'use client'
// import React from 'react'
// import Button from '../ui/Button'

// const BookAppointment = () => {
//   return (
//     <section
//       className="
//         w-full
//         bg-primary
//         bg-[url('/img/home/book-appointment-bg.png')]
//         bg-cover bg-[center_15%] bg-no-repeat
//         py-12 md:py-12
//       "
//     >
//       <div className="max-w-7xl mx-auto px-4">

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

//           {/* Left Content */}
//           <div className="flex flex-col items-center text-center ">

//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-black">
//               Let's not wait for the Perfect Look
//             </h2>

//             <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
//               Book an appointment
//             </p>

//           </div>

//           {/* Form */}
//           <div className="w-full md:pl-10">
//             <form className="space-y-8">

//               {/* Input Field */}
//               {[
//                 { id: 'name', label: 'Name' },
//                 { id: 'contact', label: 'Contact' },
//                 { id: 'city', label: 'City' },
//                 { id: 'service', label: 'Service Type' },
//               ].map((field) => (
//                 <div key={field.id} className="relative">

//                   <input
//                     type="text"
//                     id={field.id}
//                     placeholder=" "
//                     required
//                     className="
//                       peer w-full bg-transparent border-b-2 border-black
//                       text-white text-lg md:text-xl
//                       focus:outline-none focus:border-black
//                       pt-6 pb-2
//                     "
//                   />

//                   <label
//                     htmlFor={field.id}
//                     className="
//                       absolute left-0 top-2 text-white text-lg md:text-xl
//                       transition-all duration-200
//                       peer-placeholder-shown:top-5
//                       peer-placeholder-shown:text-xl
//                       peer-focus:top-1
//                       peer-focus:text-sm
//                       peer-focus:scale-90
//                     "
//                   >
//                     {field.label} <span className="text-white">*</span>
//                   </label>

//                 </div>
//               ))}

//               {/* Button */}
//               <div className="text-center pt-4">
//                 <Button label="Book Now" href="#" variant="dark" className='shadow-[0px_0px_24px_0px_#00000059]'/>
//               </div>

//             </form>
//           </div>

//         </div>

//       </div>
//     </section>
//   )
// }

// export default BookAppointment
