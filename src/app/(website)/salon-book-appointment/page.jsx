import BookingForm from '@/components/booking/BookingForm'
import React from 'react'
const page = () => {
  return (
    <>
        <h1 className='text-3xl font-bold text-center mt-10'>Book an appointment</h1>
        <BookingForm />
    </>
  )
}

export default page