'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { getInstagramPosts } from "@/lib/getInstagramPosts";
import Instagram from './Instagram'
import BookAppointment from './BookAppointment'
import PartnerBrands from './PartnerBrands'


const posts = await getInstagramPosts();

const Footer = () => {
  return (
    <>
    <BookAppointment/>
    <PartnerBrands/>
      {/* Footer */}
      <footer className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* Quick Links */}
            <div className="lg:col-span-6">
              <h3 className="text-[22px] text-primary uppercase font-semibold mb-6">
                Quick Links
              </h3>

              <div className="flex">
                <ul className="w-1/2 space-y-2">
                  {['About Us','Services','Franchise','E-shop','Academy'].map((item,i)=>(
                    <li key={i}>
                      <Link
                        href="#"
                        className="relative text-white uppercase text-[16px] leading-[40px] transition duration-300 hover:text-primary before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[1px] before:bg-secondary before:transition-all before:duration-500 hover:before:w-full"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="w-1/2 space-y-2">
                  {['Contact','Book Appointment','Salon Finder','Offers'].map((item,i)=>(
                    <li key={i}>
                      <Link
                        href="#"
                        className="relative text-white uppercase text-[16px] leading-[40px] transition duration-300 hover:text-primary before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[1px] before:bg-secondary before:transition-all before:duration-500 hover:before:w-full"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Join Us */}
            <div className="lg:col-span-3">
              <h3 className="text-[22px] text-primary uppercase font-semibold mb-6 mt-8 lg:mt-0">
                Join Us
              </h3>

              <ul className="space-y-4">
                {[
                  {icon:<FaFacebookF/>, name:'Facebook',link:'https://www.facebook.com/Looksunisexsalon/'},
                  {icon:<FaInstagram/>, name:'Instagram',link:'https://www.instagram.com/looksunisexsalon/'},
                  {icon:<FaTwitter/>, name:'Twitter',link:'https://x.com/looksindia'}
                ].map((item,i)=>(
                  <li key={i}>
                    <Link
                      href={item.link} target='blank'
                      className="flex items-center gap-3 text-white uppercase text-[16px] hover:text-primary transition"
                    >
                      <span className="w-[35px] h-[35px] bg-white text-black rounded-full flex items-center justify-center">
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram */}
            <div className="lg:col-span-3">
              <h3 className="text-[22px] text-primary uppercase font-semibold mb-6 mt-8 lg:mt-0">
                Instagram
              </h3>

              <div className="grid grid-cols-1 gap-2">
                <Instagram posts={posts} />
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-primary py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 items-center text-[13px] font-semibold uppercase">

            {/* Left */}
            <div className="lg:col-span-5 text-black">
              © 2024. <Link href="#" className="no-underline">Looks Salon</Link> All Rights Reserved
            </div>

            {/* Center */}
            <div className="lg:col-span-5 mt-2 lg:mt-0">
              <ul className="flex flex-wrap text-black">
                {['Privacy Policy','Disclaimer','Site Map'].map((item,i)=>(
                  <li key={i} className="flex items-center">
                    <Link href="#" className="no-underline">{item}</Link>
                    {i !== 2 && <span className="mx-2 border-r border-black h-3"></span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="lg:col-span-2 text-black text-left lg:text-right mt-2 lg:mt-0">
              <Link href="https://www.finessse.digital/" target='blank' className="flex items-center gap-2 justify-start lg:justify-end">
                <Image
                  src="/img/home/site-credit.webp"
                  width={28}
                  height={10}
                  alt="Finessse Interactive"
                />
                Site Credits
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Footer