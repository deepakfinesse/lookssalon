'use client'
import Image from 'next/image'
import Button from '../ui/Button';
import { useAnimation } from '@/hooks/useAnimation'

const OurSalons = () => {
  const [ref, isVisible] = useAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 md:py-4">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0">

          {/* Image */}
          <div className="relative md:-mt-32 lg:pr-20">
            <Image
              src="/img/home/our-salon.webp"
              alt="Our Salon"
              width={600}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div
            className={`
              flex flex-col items-center text-center
              transition-all duration-700 ease-out 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black transition-all duration-700 delay-100">
              Our Salons
            </h2>

            <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-black max-w-lg transition-all duration-700 delay-200">
              The Exclusive Unisex Salon in your town acquainted with world-class tools and professionals for stunning looks and absolute luxury.
            </p>

            <div className="flex items-center gap-2 md:gap-5 mt-6 transition-all duration-700 delay-300">
              <Button href="/" label="locate salon Near you" />
              <Button href="/" label="opening soon" />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default OurSalons
















// 'use client'
// import Image from 'next/image'
// import Button from '../ui/Button';

// const OurSalons = () => {
//   return (
//     <section className="py-16 md:py-4">
//       <div className="max-w-7xl mx-auto px-4">

//         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0">

//           {/* Image */}
//           <div className="relative md:-mt-32 lg:pr-20">
//             <Image
//               src="/img/home/our-salon.webp"
//               alt="Our Salon"
//               width={600}
//               height={500}
//               className="w-full h-auto object-contain"
//             />
//           </div>

//           {/* Content */}
//           <div className="flex flex-col items-center text-center ">
            
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center uppercase text-black">
//               Our Salons
//             </h2>

//             <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-black max-w-lg">
//               The Exclusive Unisex Salon in your town acquainted with world-class tools and professionals for stunning looks and absolute luxury.
//             </p>

//             {/* Buttons */}
//               <div className="flex items-center gap-2 md:gap-5 mt-6">
//                 <Button href="/" label="locate salon Near you" />
//                 <Button href="/" label="opening soon" />
                
//               </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   )
// }

// export default OurSalons