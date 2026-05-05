'use client'
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { BiX } from 'react-icons/bi';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const Nav = ({ isActive, toggleMenu }) => {
  const [showSubServices, setShowSubServices] = useState(false);

  const menuItems = [
    { href: '/', label: 'About Us' },
    // { href: '/', label: 'Services' },
    { 
      href: '#', 
      label: 'Services', 
      subItems: [
        { href: '/gents-salon-services', label: 'Gents' },
        { href: '/ladies-salon-services', label: 'Ladies' },
      ]
    },
    { href: '/', label: 'Testimonials' },
    { href: '/', label: 'Blogs' },
    { href: '/', label: 'Franchise' },
    { href: '/', label: 'Academy' },
    { href: '/', label: 'Offers' },
    { href: '/', label: 'Contact Us' },
  ];

  return (
    <div className={`fixed inset-0 z-50 bg-black/90 flex flex-col items-center gap-6 p-4 transition-transform duration-700 ${isActive ? 'translate-x-0' : '-translate-x-full'} bg-[url('/img/home/nav-bg.webp')] bg-cover bg-center bg-no-repeat`}>
      
      {/* Logo */}
      <div className='mb-2 lg:mb-2 xl:mb-4 pb-4 border-b-1 border-white'>
        <Link href="/" onClick={toggleMenu}>
          <Image src="img/logo-white.svg" width={180} height={90} alt="logo" />
        </Link>
      </div>

      {/* Menu */}
      <ul className="flex flex-col items-center text-center overflow-auto px-10">
        {menuItems.map((item) => (
          <li key={item.href} className="mb-2 lg:mb-2 xl:mb-6">
            
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
              className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-5xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-110 flex items-center uppercase gap-2"
            >
              {item.label}
              {item.subItems &&
                (showSubServices ? <FaAngleUp className='text-primary' /> : <FaAngleDown className='text-primary'/>)}
            </Link>

            {/* Sub Menu */}
            {item.subItems && showSubServices && (
              <ul className="mt-4">
                {item.subItems.map((subItem) => (
                  <li key={subItem.href} className="mb-2">
                    <Link
                      href={subItem.href}
                      onClick={toggleMenu}
                      className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-5xl font-extrabold bg-gradient-to-b from-primary to-[#DFAB31] bg-[length:100%_220%] bg-bottom bg-clip-text text-transparent transition-all duration-500 hover:bg-top hover:scale-110  uppercase gap-2"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Close Button */}
      <button
        className="absolute top-4 right-6 text-white text-6xl hover:text-primary transition cursor-pointer"
        onClick={toggleMenu}
      >
        <BiX />
      </button>
    </div>
  );
};

export default Nav;