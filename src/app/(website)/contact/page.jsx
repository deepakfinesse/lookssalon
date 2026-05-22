import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import ContactForm from '@/components/booking/ContactForm'

const page = () => {
  return (
    <>
      <section className="relative  w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/img/all/contact-bg.webp')" }}>
        
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto z-10 px-4 py-25 ">
          <h1 className="text-white font-black text-5xl md:text-6xl uppercase tracking-wide mb-10">
            Contact Us
          </h1>

          <div className="flex flex-col gap-7 max-w-sm">
            {/* Phone */}
            <div className="flex items-center gap-5">
              <span className="bg-primary rounded-full p-3 flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-black w-5 h-5" />
              </span>
              <span className="text-white text-lg font-medium">
                <Link href="tel:+91180021256657" className="underline underline-offset-2">
                  1800 212 56657
                </Link>
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5">
              <span className="bg-primary rounded-full p-3 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-black w-5 h-5" />
              </span>
              <div className="flex flex-col">
                <Link href="mailto:careers@lookssalon.in" className="text-white text-lg underline underline-offset-2">
                  careers@lookssalon.in
                </Link>
                <Link href="mailto:customercare@lookssalon.in" className="text-white text-lg underline underline-offset-2">
                  customercare@lookssalon.in
                </Link>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-5">
              <span className="bg-primary rounded-full p-3 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-black w-5 h-5" />
              </span>
              <Link
                href="https://maps.google.com/?q=No+17A/22,+Ajmal+Khan+Road,+Karol+Bagh,+New+Delhi+110005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg underline underline-offset-2 leading-relaxed"
              >
                No 17A / 22, Ajmal Khan Road,<br />
                Karol Bagh, New Delhi - 110 005
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className='grid grid-cols-12 gap-5 md:gap-10 items-start'>
            <div className='col-span-12 md:col-span-4'>
              <h2 className="text-3xl md:text-4xl text-grey font-bold uppercase mb-2 md:mb-6">
                get in touch
              </h2>
              <p className="text-black text-lg mb-4 md:mb-8">
                Fill out the form and our team will get back <br className='hidden md:block' /> to you as soon as possible.
              </p>
            </div>
            <div className='col-span-12 md:col-span-7'>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.468466117169!2d77.1890129!3d28.645688600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d029ea9c0b709%3A0xa7dea0e001ccd041!2sLOOKS%20Salon%2C%20Karol%20Bagh!5e0!3m2!1sen!2sin!4v1779438077162!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="LOOKS Salon, Karol Bagh"
      />
    </>
  )
}

export default page
