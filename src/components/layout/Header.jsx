'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Nav from './Nav';
import Link from 'next/link';
import Button from '../ui/Button';

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <header className="py-3 bg-white">
        <div className="container mx-auto px-4">
          
          <div className="flex justify-between items-center w-full">
            
            {/* Logo */}
            <div>
              <Link href="/">
                <Image
                  src="/img/logo.svg"
                  width={167}
                  height={66}
                  alt="logo"
                />
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-10">
              
              {/* Buttons */}
              <div className="hidden md:flex items-center gap-3">
                <Button href="/" label="Locate Salon" />
                <Button href="/" label="Book Appointment" />
                {/* <Button  href="/contact"  label="Locate Salon"  variant="dark" /> */}
               
                {/* <Link
                  href="/"
                  className="relative px-5 py-1 border-2 border-primary bg-black text-white font-bold uppercase text-md overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:text-black group-hover:border-black transition font-bold">
                    Locate Salon
                  </span>
                  <span className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-500"></span>
                </Link> */}

                {/* <Link
                  href="/"
                  className="relative px-5 py-1 border-2 border-black text-primary font-bold uppercase text-md overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:text-black transition">
                    Book Appointment
                  </span>
                  <span className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-500"></span>
                </Link> */}
              </div>

              {/* Hamburger */}
              <div
                className={`group flex flex-col justify-between w-9 h-7 cursor-pointer transition-opacity duration-500 ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={toggleMenu}
              >
                <div className="h-1 bg-black rounded transition-colors duration-300 group-hover:bg-primary"></div>

                <div className="h-1 bg-black rounded w-3/4 self-end transition-colors duration-300 group-hover:bg-primary"></div>

                <div className="h-1 bg-black rounded transition-colors duration-300 group-hover:bg-primary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <Nav isActive={isActive} toggleMenu={toggleMenu} />
      </header>
    </>
  );
};

export default Header;