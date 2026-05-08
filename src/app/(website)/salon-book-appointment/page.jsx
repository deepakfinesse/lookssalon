import BookingForm from '@/components/booking/BookingForm'
import React from 'react'
const page = () => {
  return (
    <>
      <div className="w-full  bg-cover bg-center" style={{ backgroundImage: "url('/img/all/book-appointement.webp')" }}>
       <div className="max-w-4xl mx-auto px-4 py-12 md:py-12 lg:py-12  text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold uppercase mb-4">
            Book An Appointment Online!
          </h1>
          <p className="text-md lg:text-2xl text-white pb-2">
                Our online bookings service operates between{" "}
                <strong className="text-primary font-semibold">10:00a.m.</strong>{" "}
                and{" "}
                <strong className="text-[var(--primary)] font-semibold">6:00p.m.</strong>
          </p>
          <p className="text-md lg:text-lg text-white">
                Your data is safe with us! We will only use your details to process your salon
                booking, and won&apos;t <br className='hideen md:block' /> share them with third parties.
          </p>
        </div> 
        <div className="max-w-3xl mx-auto px-4 pb-12 lg:pb-12">
          <BookingForm />
        </div>
      </div>
    </>
  )
}

export default page