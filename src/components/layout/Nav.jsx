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
    { href: "/aboutus", label: "About Us" },
    {
      href: "#",
      label: "Services",
      subItems: [
        { href: "/ladies-salon-services", label: "Ladies" },
        { href: "/gents-salon-services", label: "Gents" },
        { href: "/prepaid-cards", label: "Prepaid Cards" },
      ],
    },
    { href: "/testimonial", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
    { href: "/franchise", label: "Franchise" },
    { href: "https://www.looksschool.com/", label: "Academy" },
    { href: "/", label: "Offers" },
    { href: "/", label: "Contact Us" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/90 flex flex-col items-center transition-transform duration-700 ${
        isActive ? "translate-x-0" : "-translate-x-full"
      } bg-[url('/img/home/nav-bg.webp')] bg-cover bg-center bg-no-repeat`}
    >
      {/* Logo */}
      <div className="relative pt-6 pb-6">
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

      {/* Menu */}
      <ul className="flex-1 flex flex-col items-center justify-start text-center overflow-y-auto px-5 custom-scrollbar">
        
        {menuItems.map((item, index) => (
  <FadeUp key={item.label} delay={0.2 * (index + 1)}>
    <li className="mb-2">
      <Link
        href={item.href}
        onClick={
          item.subItems
            ? (e) => {
                e.preventDefault();
                setShowSubServices(!showSubServices);
              }
            : toggleMenu
        }
        className="text-[34px] leading-[1.1] sm:text-3xl md:text-3xl lg:text-4xl xl:text-[48px] font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center uppercase gap-2"
      >
        {item.label}

        {item.subItems &&
          (showSubServices ? (
            <FaAngleUp className="text-primary text-2xl" />
          ) : (
            <FaAngleDown className="text-primary text-2xl" />
          ))}
      </Link>

      {/* Sub Menu */}
      {item.subItems && showSubServices && (
        <ul className="mt-1 space-y-1">
          {item.subItems.map((subItem, subIndex) => (
            <FadeUp
              key={subItem.href}
              delay={0.1 * (subIndex + 1)}
            >
              <li>
                <Link
                  href={subItem.href}
                  onClick={toggleMenu}
                  className="text-2xl leading-[1.1] sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 uppercase"
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
        {/* {menuItems.map((item) => (
          <li key={item.label} className="mb-2">
            <Link
              href={item.href}
              onClick={
                item.subItems
                  ? (e) => {
                      e.preventDefault();
                      setShowSubServices(!showSubServices);
                    }
                  : toggleMenu
              }
              className="text-[34px] leading-[1.1] sm:text-3xl md:text-3xl lg:text-4xl xl:text-[48px] font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 flex items-center justify-center uppercase gap-2"
            >
              {item.label}

              {item.subItems &&
                (showSubServices ? (
                  <FaAngleUp className="text-primary text-2xl" />
                ) : (
                  <FaAngleDown className="text-primary text-2xl" />
                ))}
            </Link>

            
            {item.subItems && showSubServices && (
              <ul className="mt-1 space-y-1 ">
                {item.subItems.map((subItem) => (
                  <li key={subItem.href}>
                    <Link
                      href={subItem.href}
                      onClick={toggleMenu}
                      className="text-2xl leading-[1.1] sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-105 uppercase "
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))} */}
      </ul>

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