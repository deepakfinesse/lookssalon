"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getInstagramPosts } from "@/lib/getInstagramPosts";
import Instagram from "./Instagram";
import FadeUp from "../animation/FadeUp";
import BookAppointmentFooter from "./BookAppointmentFooter";

const posts = await getInstagramPosts();

const Footer = () => {
  return (
    <>
      <BookAppointmentFooter/>
      
      {/* Footer */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <FadeUp delay={0.1}>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold uppercase text-black">
                our work, our signature
              </h2>
               <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-black text-center max-w-7xl">
                Every look we create is unique - designed to enhance natural beauty with precision and care.
              </p>
            </div>
          </FadeUp>
         
          <div className="grid grid-cols-1 gap-12">
              <Instagram posts={posts} />
          </div>

          {/* Join us on */}
          <FadeUp delay={0.1}>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-4 bg-primary px-6 py-3">
                <span className="text-lg font-extrabold uppercase tracking-wide text-white">
                  Join us on
                </span>
                {[
                  {
                    icon: <FaFacebookF />,
                    name: "Facebook",
                    link: "https://www.facebook.com/Looksunisexsalon/",
                  },
                  {
                    icon: <FaInstagram />,
                    name: "Instagram",
                    link: "https://www.instagram.com/looksunisexsalon/",
                  },
                  {
                    icon: <FaXTwitter />,
                    name: "Twitter",
                    link: "https://x.com/looksindia",
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    target="_blank"
                    aria-label={item.name}
                    className="w-[35px] h-[35px] bg-white text-black rounded-full flex items-center justify-center text-base transition duration-300 hover:bg-black hover:text-white"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </FadeUp>

        </div>
      </section>
      
      <footer className="relative bg-black bg-[url('/img/home/footer-bg.webp')] bg-cover bg-center bg-no-repeat py-16 md:py-20">
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/">
                <Image
                  src="/img/logo-white.svg"
                  width={150}
                  height={75}
                  alt="Looks Salon"
                />
              </Link>

              <p className="mt-6 max-w-xs text-base leading-relaxed text-white font-weight-medium">
                The Exclusive Unisex Salon in your town acquainted with world-class
                tools and professionals for stunning looks and absolute luxury.
              </p>

              <div className="mt-8 flex items-center gap-4">
                {[
                  {
                    icon: <FaFacebookF />,
                    name: "Facebook",
                    link: "https://www.facebook.com/Looksunisexsalon/",
                  },
                  {
                    icon: <FaInstagram />,
                    name: "Instagram",
                    link: "https://www.instagram.com/looksunisexsalon/",
                  },
                  {
                    icon: <FaXTwitter />,
                    name: "Twitter",
                    link: "https://x.com/looksindia",
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    target="_blank"
                    aria-label={item.name}
                    className="w-[42px] h-[42px] bg-white text-black rounded-full flex items-center justify-center text-lg transition duration-300 hover:bg-primary hover:text-white"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h3 className="text-xl uppercase font-bold tracking-wide text-white mb-6">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "About Us", href: "/aboutus", target: "_self" },
                  { label: "Blogs", href: "/blog", target: "_self" },
                  { label: "Franchise", href: "/franchise", target: "_self" },
                  { label: "Media", href: "/media", target: "_self" },
                  { label: "Contact", href: "/contact", target: "_self" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      target={item.target}
                      className="relative text-white/90 uppercase text-base font-medium transition duration-300 hover:text-primary before:content-[''] before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[1px] before:bg-primary before:transition-all before:duration-500 hover:before:w-full"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="text-xl uppercase font-bold tracking-wide text-white mb-6">
                Services
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Male", href: "/gents-salon-services", target: "_self" },
                  { label: "Female", href: "/ladies-salon-services", target: "_self" },
                  { label: "Bridal", href: "/", target: "_self" },
                  { label: "Loyalty Card", href: "/prepaid-cards", target: "_self" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      target={item.target}
                      className="relative text-white/90 uppercase text-base font-medium transition duration-300 hover:text-primary before:content-[''] before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[1px] before:bg-primary before:transition-all before:duration-500 hover:before:w-full"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div className="lg:col-span-3">
              <h3 className="text-xl uppercase font-bold tracking-wide text-white mb-6">
                Explore
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Book Appointment", href: "/salon-book-appointment", target: "_self" },
                  { label: "Salon Locator", href: "/locate-salon", target: "_self" },
                  { label: "E-Shop", href: "https://lookskart.com/", target: "_blank" },
                  { label: "Academy", href: "https://www.looksschool.com/", target: "_blank" },
                  { label: "Looks Prive", href: "/looks-prive", target: "_self" },
                  { label: "Looks The Barber Shop", href: "/looks-barber-shop", target: "_self" },
                  { label: "Looks Aesthetics", href: "/looks-aesthetics", target: "_self" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      target={item.target}
                      className="relative text-white/90 uppercase text-base font-medium transition duration-300 hover:text-primary before:content-[''] before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[1px] before:bg-primary before:transition-all before:duration-500 hover:before:w-full"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 items-center text-[13px] font-semibold uppercase">
            {/* Left */}
            <div className="lg:col-span-5 text-black">
              © 2026.{" "}
              <Link href="https://www.lookssalon.in/" className="no-underline">
                Looks Salon
              </Link>{" "}
              All Rights Reserved
            </div>

            {/* Center */}
            <div className="lg:col-span-5 mt-2 lg:mt-0">
              <ul className="flex flex-wrap text-black">
                {[ 
                { label: "Privacy Policy", href: "/privacy-policy", target: "_self" },
                { label: "Disclaimer",           href: "/disclaimer", target: "_self" },
                { label: "Site Map",           href: "/", target: "_self" },
              ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Link href={item.href} target={item.target} className="no-underline">
                      {item.label}
                    </Link>
                    {i !== 2 && (
                      <span className="mx-2 border-r border-black h-3"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="lg:col-span-2 text-black text-left lg:text-right mt-2 lg:mt-0">
              <Link
                href="https://www.finessse.digital/"
                target="blank"
                className="flex items-center gap-2 justify-start lg:justify-end"
              >
                <Image
                  src="/img/home/site-credit.png"
                  width={28}
                  height={10}
                  alt="Finessse Interactive"
                />Site Credits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
