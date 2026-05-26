"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiX } from "react-icons/bi";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
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
        { href: "/", label: "Bridal ", target: "_self" },
        { href: "/prepaid-cards", label: "Prepaid Cards", target: "_self" },
      ],
    },
    { href: "/franchise", label: "Franchise", target: "_self" },
    { href: "/offers", label: "Offers", target: "_self" },
    { href: "/testimonial", label: "Testimonials", target: "_self" },
    { href: "/blog", label: "Blog", target: "_self" },
    
    
    { href: "/looks-prive", label: "Looks Prive", target: "_self" },
    { href: "/looks-aesthetics", label: "Looks Aesthetics", target: "_self" },
    { href: "/looks-barber-shop", label: "Looks Barber Shop", target: "_self" },
    { href: "https://www.looksschool.com/", label: "Looks Academy", target: "_blank" },
    { href: "/contact", label: "Contact Us", target: "_self" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black md:bg-black/90 flex flex-col items-center transition-transform duration-700 ${
        isActive ? "translate-x-0" : "-translate-x-full"
      } md:bg-[url('/img/home/nav-bg.webp')] bg-cover bg-center bg-no-repeat`}
    >
      {/* Logo */}
      <div className="relative pt-6 pb-6 lg:pb-6 xl:pb-16">
        <FadeUp delay={0.1}>
        <Link href="/" onClick={toggleMenu}>
          <Image
            src="/img/logo-white.svg"
            width={180}
            height={90}
            alt="logo"
            priority
          />
        </Link>
        </FadeUp>
      </div>

      {/* Menu - single column on mobile, two columns on md+ */}
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-start overflow-y-scroll pt-2 custom-scrollbar w-full max-w-screen-lg xl:max-w-screen-lg px-5">
        {[menuItems.slice(0, 6), menuItems.slice(6)].map((colItems, colIdx) => (
          <React.Fragment key={colIdx}>
            {colIdx === 1 && (
              <div className="hidden md:block self-stretch border-l-2 border-dotted border-primary/50" />
            )}
            <ul className={`w-full md:w-1/2 flex flex-col items-center text-center ${colIdx === 0 ? "md:items-start md:text-right md:pr-10 lg:md:pr-16 md:pl-4" : "md:items-start md:text-left md:pl-10 lg:md:pl-16 md:pr-4"}`}>
              {colItems.map((item, index) => (
                <FadeUp key={item.label} delay={0.2 * (colIdx * 6 + index + 1)}>
                  <li>
                    {index > 0 && (
                      <div className=" w-full my-4" />
                    )}
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
                      className="text-3xl leading-[1.1] md:text-xl lg:text-4xl xl:text-[32px] font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center md:justify-start uppercase gap-2"
                    >
                      {item.label}

                      {item.subItems &&
                        (showSubServices ? (
                          <FaAngleUp className="text-primary text-xl" />
                        ) : (
                          <FaAngleDown className="text-primary text-xl" />
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
                                className="text-2xl leading-[1.1] md:text-3xl lg:text-3xl xl:text-2xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center md:justify-start uppercase gap-2"
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
          </React.Fragment>
        ))}
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-5 text-white text-5xl hover:text-primary transition cursor-pointer"
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