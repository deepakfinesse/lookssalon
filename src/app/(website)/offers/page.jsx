import React from 'react'
import Image from "next/image";
import Button from '@/components/ui/Button';
import BookAppointment from '@/components/layout/BookAppointment';
import PartnerBrands from '@/components/layout/PartnerBrands';

const page = () => {
  return (
    <>
        <section>
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-6xl text-primary font-bold uppercase leading-normal">
                  <span className="text-grey">offers at</span>  looks salon
                </h1>
                <div className='grid grid-cols-2 gap-12'>
                    <div className="relative group overflow-hidden cursor-pointer">
                        <Image src="/img/all/offer-2.png" alt="Offer 1" width={600} height={600} className="" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                            href="/salon-book-appointment"
                            label="BOOK NOW"
                            variant="dark"
                            />
                        </div>
                    </div>
                    <div className="relative group overflow-hidden cursor-pointer">
                        <Image src="/img/all/offer-2.png" alt="Offer 1" width={600} height={600} className="" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                href="/salon-book-appointment"
                                label="BOOK NOW"
                                variant="dark"
                            />
                        </div>
                    </div>
                    <div className="relative group overflow-hidden cursor-pointer">
                        <Image src="/img/all/offer-2.png" alt="Offer 1" width={600} height={600} className="" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                href="/salon-book-appointment"
                                label="BOOK NOW"
                                variant="dark"
                            />
                        </div>
                    </div>
                    <div className="relative group overflow-hidden cursor-pointer">
                        <Image src="/img/all/offer-2.png" alt="Offer 1" width={600} height={600} className="" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                href="/salon-book-appointment"
                                label="BOOK NOW"
                                variant="dark"
                            />
                        </div>
                    </div>
                </div>
            </div>
          
        </section>
        <BookAppointment/>
          <PartnerBrands/>
    </>
  )
}

export default page