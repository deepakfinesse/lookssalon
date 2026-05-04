'use client'
import Image from 'next/image'
import Button from '../ui/Button';

const BridalService = () => {
  return (
    <section
      className="
        w-full 
        bg-[#abafaf] 
        bg-cover bg-center bg-no-repeat
      "
      // If you want background image:
      // className="bg-[url('/assets/images/looks-beautiful-bg.png')] ..."
    >
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">

          {/* Empty spacer (replaces col-md-1) */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black">
              Look Beautiful
            </h2>

            <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
              on YOUR day
            </p>
            {/* Buttons */}
            <div className="flex items-center gap-5 mt-6">
                <Button href="/" label="Bridal services" variant='dark'/>
            </div>

          </div>

          {/* Image */}
          <div className="md:col-span-7">
            <Image
              src="/img/home/bridal-service.webp"
              alt="Look Beautiful"
              width={700}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>

        </div>

      </div>
    </section>
  )
}

export default BridalService