"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiX } from "react-icons/bi";
import { FaAngleUp, FaAngleDown, FaAngleRight } from "react-icons/fa";
import FadeUp from "../animation/FadeUp";

const Nav = ({ isActive, toggleMenu }) => {
  const [showSubServices, setShowSubServices] = useState(false);

  const menuItems = [
    { href: "/aboutus", label: "About Us", target: "_self" },
    {
      href: "#",
      label: "Services",
      subItems: [
        { href: "/ladies-salon-services", label: "Ladies", target: "_self" },
        { href: "/gents-salon-services", label: "Gents", target: "_self" },
        // { href: "/", label: "Bridal", target: "_self" },
        { href: "/prepaid-cards", label: "Prepaid Cards", target: "_self" },
      ],
    },
    { href: "/testimonial", label: "Testimonials", target: "_self" },
    { href: "/blog", label: "Blogs", target: "_self" },
    { href: "/franchise", label: "Franchise", target: "_self" },
    { href: "https://www.looksschool.com/", label: "Academy", target: "_blank" },
    { href: "/offers", label: "Offers", target: "_self" },
    { href: "/contact", label: "Contact Us", target: "_self" },
  ];

  const brands = [
    {
      href: "/looks-prive",
      line1: "Looks",
      line2: "Prive",
      logo: "/img/all/prive/logo-black.svg",
    },
    {
      href: "/looks-aesthetics",
      line1: "Looks",
      line2: "Aesthetics",
      logo: "/img/all/aesthetics/logo-black.svg",
    },
    {
      href: "/looks-barber-shop",
      line1: "Looks",
      line2: "The Barber Shop",
      logo: "/img/all/barber/logo-black.svg",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center transition-transform duration-700 ${
        isActive ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      {/* Logo */}
      <div className="relative pt-6 pb-6 lg:pb-8 xl:pb-12 shrink-0">
        <FadeUp delay={0.1}>
          <Link href="/" onClick={toggleMenu}>
            <Image
              src="/img/logo.svg"
              width={180}
              height={90}
              alt="logo"
              priority
            />
          </Link>
        </FadeUp>
      </div>

      {/* Body - stacks on mobile, two columns on md+ */}
      <div className="flex-1 w-full max-w-7xl overflow-y-auto custom-scrollbar px-5 pb-24 md:pb-10">
        <div className="flex flex-col md:flex-row md:items-stretch gap-10 md:gap-0">

          {/* Left - main menu */}
          <ul className="w-full md:w-[35%] flex flex-col items-start md:items-start md:pr-12 lg:pr-16">
            {menuItems.map((item, index) => (
              <FadeUp key={item.label} delay={0.15 * (index + 1)}>
                <li className="py-2">
                  <Link
                    href={item.href}
                    target={item.target}
                    onClick={
                      item.subItems
                        ? (e) => {
                            e.preventDefault();
                            setShowSubServices(!showSubServices);
                          }
                        : toggleMenu
                    }
                    className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold uppercase leading-tight text-black transition-colors duration-300 hover:text-primary flex items-center justify-center md:justify-start gap-2"
                  >
                    {item.label}
                    {item.subItems &&
                      (showSubServices ? (
                        <FaAngleUp className="text-primary text-3xl" />
                      ) : (
                        <FaAngleDown className="text-primary text-3xl" />
                      ))}
                  </Link>

                  {/* Sub Menu */}
                  {item.subItems && showSubServices && (
                    <ul className="mt-2 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <FadeUp key={subItem.href} delay={0.1 * (subIndex + 1)}>
                          <li>
                            <Link
                              href={subItem.href}
                              target={subItem.target}
                              onClick={toggleMenu}
                              className="text-xl md:text-2xl font-bold uppercase text-grey transition-colors duration-300 hover:text-primary flex items-center justify-center md:justify-text-xl md:text-2xl font-bold uppercase text-grey transition-colors duration-300 hover:text-primary flex items-center justify-start md:justify-start"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        </FadeUp>
                      ))}
                    </ul>
                  )}
                </li>
              </FadeUp>
            ))}
          </ul>

          {/* Divider */}
          <div className="hidden md:block w-px bg-black/40 shrink-0" />

          {/* Right - Our Brands */}
          <div className="w-full md:w-[65%] md:pl-12 lg:pl-16">
            <FadeUp delay={0.2}>
              <h3 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold uppercase  text-black text-left md:text-left">
                Our Brands
              </h3>
              <span className="block w-24 h-1 bg-primary mt-3 mx-0" />
            </FadeUp>

            <div className="mt-0 border-t border-primary">
              {brands.map((brand, index) => (
                <FadeUp key={brand.href} delay={0.25 + 0.15 * index}>
                  <Link
                    href={brand.href}
                    onClick={toggleMenu}
                    className="group flex items-center gap-4 md:gap-5 py-5 border-b border-primary"
                  >
                    <span className="shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-primary flex items-center justify-center p-3 transition-colors duration-300 group-hover:border-primary">
                      <Image
                        src={brand.logo}
                        width={64}
                        height={64}
                        alt={`${brand.line1} ${brand.line2}`}
                        className="w-full h-full object-contain"
                      />
                    </span>
                    <span className="flex-1 text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold uppercase leading-tight text-black transition-colors duration-300 group-hover:text-primary">
                      {brand.line1}
                      <br />
                      {brand.line2}
                    </span>
                    <FaAngleRight className="shrink-0 text-primary text-xl transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-5 text-black text-5xl hover:text-primary transition cursor-pointer"
        onClick={toggleMenu}
      >
        <BiX />
      </button>
    </div>
  );
};

export default Nav;









// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { BiX } from "react-icons/bi";
// import { FaAngleUp, FaAngleDown } from "react-icons/fa";
// import FadeUp from "../animation/FadeUp";

// const Nav = ({ isActive, toggleMenu }) => {
//   const [showSubServices, setShowSubServices] = useState(false);

//   const menuItems = [
//     { href: "/aboutus", label: "About Us", target: "_self" },
//     {
//       href: "#",
//       label: "Services",
//       subItems: [
//         { href: "/ladies-salon-services", label: "Ladies", target: "_self" },
//         { href: "/gents-salon-services", label: "Gents", target: "_self" },
//         { href: "/", label: "Bridal ", target: "_self" },
//         { href: "/prepaid-cards", label: "Prepaid Cards", target: "_self" },
//       ],
//     },
//     { href: "/testimonial", label: "Testimonials", target: "_self" },
//     { href: "/blog", label: "Blog", target: "_self" },
//     { href: "/franchise", label: "Franchise", target: "_self" },
//     { href: "https://www.looksschool.com/", label: "Academy", target: "_blank" },
//     { href: "/offers", label: "Offers", target: "_self" },
//     { href: "/contact", label: "Contact Us", target: "_self" },
//   ];

//   return (
//     <div
//       className={`fixed inset-0 z-50 bg-black/90 flex flex-col items-center transition-transform duration-700 ${
//         isActive ? "translate-x-0" : "-translate-x-full"
//       } bg-[url('/img/home/nav-bg.webp')] bg-cover bg-center bg-no-repeat`}
//     >
//       {/* Logo */}
//       <div className="relative pt-6 pb-6">
//         <FadeUp delay={0.1}>
//         <Link href="/" onClick={toggleMenu}>
//           <Image
//             src="/img/logo-white.svg"
//             width={180}
//             height={90}
//             alt="logo"
//             priority
//           />
//         </Link>
//         </FadeUp>
//       </div>

//       {/* Menu */}
//       <ul className="flex-1 flex flex-col items-center justify-start text-center overflow-y-auto px-5 custom-scrollbar">
        
//         {menuItems.map((item, index) => (
//             <FadeUp key={item.label} delay={0.2 * (index + 1)}>
//               <li className="mb-2">
//                 <Link
//                   href={item.href}
//                   target={item.target}
//                   onClick={
//                     item.subItems
//                       ? (e) => {
//                           e.preventDefault();
//                           setShowSubServices(!showSubServices);
//                         }
//                       : toggleMenu
//                   }
//                   className="text-3xl leading-[1.1] md:text-3xl lg:text-4xl xl:text-[48px] font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center uppercase gap-2"
//                 >
//                   {item.label}

//                   {item.subItems &&
//                     (showSubServices ? (
//                       <FaAngleUp className="text-primary text-2xl" />
//                     ) : (
//                       <FaAngleDown className="text-primary text-2xl" />
//                     ))}
//                 </Link>

//                 {/* Sub Menu */}
//                 {item.subItems && showSubServices && (
//                   <ul className="mt-1 space-y-1">
//                     {item.subItems.map((subItem, subIndex) => (
//                       <FadeUp
//                         key={subItem.href}
//                         delay={0.1 * (subIndex + 1)}
//                       >
//                         <li>
//                           <Link
//                             href={subItem.href}
//                             target={subItem.target}
//                             onClick={toggleMenu}
//                             className="text-2xl leading-[1.1]  md:text-3xl lg:text-3xl xl:text-4xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center uppercase gap-2"
//                           >
//                             {subItem.label}
//                           </Link>
//                         </li>
//                       </FadeUp>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             </FadeUp>
//           ))}
//         {/* {menuItems.map((item) => (
//           <li key={item.label} className="mb-2">
//             <Link
//               href={item.href}
//               onClick={
//                 item.subItems
//                   ? (e) => {
//                       e.preventDefault();
//                       setShowSubServices(!showSubServices);
//                     }
//                   : toggleMenu
//               }
//               className="text-[34px] leading-[1.1] sm:text-3xl md:text-3xl lg:text-4xl xl:text-[48px] font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center uppercase gap-2"
//             >
//               {item.label}

//               {item.subItems &&
//                 (showSubServices ? (
//                   <FaAngleUp className="text-primary text-2xl" />
//                 ) : (
//                   <FaAngleDown className="text-primary text-2xl" />
//                 ))}
//             </Link>

            
//             {item.subItems && showSubServices && (
//               <ul className="mt-1 space-y-1 ">
//                 {item.subItems.map((subItem) => (
//                   <li key={subItem.href}>
//                     <Link
//                       href={subItem.href}
//                       onClick={toggleMenu}
//                       className="text-2xl leading-[1.1] sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 uppercase "
//                     >
//                       {subItem.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))} */}
//       </ul>

//       {/* Close Button */}
//       <button
//         className="absolute top-4 right-5 text-white text-5xl hover:text-primary transition cursor-pointer"
//         onClick={toggleMenu}
//       >
//         <BiX />
//       </button>
//     </div>
//   );
// };

// export default Nav;