'use client'
import Image from 'next/image'
import Button from '../ui/Button';

const HairColour = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#EBF0F6] to-[#C4CAD6] pt-4">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-12 items-center gap-0">

          {/* Image */}
          <div className="md:col-span-6">
            <Image
              src="/img/home/hair-colour.webp"
              alt="Hair Colour"
              width={700}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black">
              Look Daring <br /> Go Bold
            </h2>

            <p className="mt-4 text-lg sm:text-xl md:text-2xl font-medium uppercase text-black">
              with our signature hair colours
            </p>

            {/* Buttons */}
              <div className="flex items-center gap-5 mt-6">
                <Button href="/" label="hair colour services" variant='dark'/>
                
              </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default HairColour