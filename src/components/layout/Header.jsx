
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Nav from './Nav';
import Link from 'next/link';
import Button from '../ui/Button';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHasScrolled(currentScrollY > 150);

      if (currentScrollY < 150) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div style={{ height: '88px' }} />
      <header
        className={`py-3 bg-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          hasScrolled ? 'shadow-md' : ''
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          
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
                <Button href="/locate-salon" label="locate a salon" />
                <Button href="/salon-book-appointment" label="Book Appointment" />
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

      </header>

      <Nav isActive={isActive} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;






























// 'use client'
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Nav from './Nav';
// import Link from 'next/link';
// import Button from '../ui/Button';

// const Header = () => {
//   const [isActive, setIsActive] = useState(false);

//   const toggleMenu = () => {
//     setIsActive(!isActive);
//   };

//   return (
//     <>
//       <header className="py-3 bg-white">
//         <div className="container mx-auto px-4">
          
//           <div className="flex justify-between items-center w-full">
            
//             {/* Logo */}
//             <div>
//               <Link href="/">
//                 <Image
//                   src="/img/logo.svg"
//                   width={167}
//                   height={66}
//                   alt="logo"
//                 />
//               </Link>
//             </div>

//             {/* Right Side */}
//             <div className="flex items-center gap-10">
              
//               {/* Buttons */}
//               <div className="hidden md:flex items-center gap-3">
//                 <Button href="/" label="locate a salon" />
//                 <Button href="/salon-book-appointment" label="Book Appointment" />
                
//               </div>

//               {/* Hamburger */}
//               <div
//                 className={`group flex flex-col justify-between w-9 h-7 cursor-pointer transition-opacity duration-500 ${
//                   isActive ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={toggleMenu}
//               >
//                 <div className="h-1 bg-black rounded transition-colors duration-300 group-hover:bg-primary"></div>

//                 <div className="h-1 bg-black rounded w-3/4 self-end transition-colors duration-300 group-hover:bg-primary"></div>

//                 <div className="h-1 bg-black rounded transition-colors duration-300 group-hover:bg-primary"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Nav */}
//         <Nav isActive={isActive} toggleMenu={toggleMenu} />
//       </header>
//     </>
//   );
// };

// export default Header;