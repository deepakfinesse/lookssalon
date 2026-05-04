'use client'
import Image from 'next/image'

const services = [
  {
    title: 'CUT & HAIR CARE',
    desc: `Every great look begins with the right cut. At LOOKS, our stylists are trained to deliver tailored hair cuts that match your personality, lifestyle, and face structure. Whether you're looking for a classic crew cut, a modern fade, or something edgy, we ensure a sharp and stylish finish. For our youngest clients, we offer a gentle and fun Child Hair Cut [Below 5 years], making sure little ones feel comfortable while looking their adorable best.`,
    icon: '/img/services/mens-icon1.svg',
  },
  {
    title: 'BEARD CARE',
    desc: `A well-groomed beard speaks volumes. Our beard care services are designed to maintain, refine, and style your facial hair with finesse. Choose a clean shave for a crisp, smooth look or opt for a beard trim to maintain the perfect shape. Want to upgrade your beard game? Try our beard color services for covering greys or experimenting with a fresh shade. Complete the look with expert beard styling—from classic to contemporary, we craft beards that frame your face perfectly.`,
    icon: '/img/services/mens-icon2.svg',     
  },
  {
    title: 'HAIR CARE',
    desc: `Healthy hair is the foundation of a great appearance. Our hair care services are curated to nourish, strengthen, and restore hair vitality. Whether you're dealing with dryness, dullness, or just need some pampering, our team ensures your hair gets the care it deserves.`,
    icon: '/img/services/mens-icon3.svg',
  },
  {
    title: 'HAIR COLOUR',
    desc: `Add vibrancy or a touch of sophistication with our professional hair colour services. From bold transformations to subtle highlights or grey coverage, we use top-quality products to ensure long-lasting colour and healthy hair. Our stylists guide you to choose the right shade to complement your skin tone and personal style.`,
    icon: '/img/services/mens-icon4.svg',
  },
  {
    title: 'HAIR TEXTURE',
    desc: `Elevate your look with our hair texture solutions. Whether you want sleek straight hair, voluminous curls, or a frizz-free finish, our treatments like smoothing, straightening, and perming are designed to enhance your natural hair while maintaining its health and shine.`,
    icon: '/img/services/mens-icon5.svg',
  },
  {
    title: 'HAIR SPA TREATMENTS',
    desc: `Unwind and revitalize your scalp and hair with our luxurious hair spa treatments. These deep-conditioning sessions target issues like dandruff, hair fall, and dryness, leaving you with a healthier scalp and noticeably softer, shinier hair.`,
    icon: '/img/services/mens-icon6.svg',
  }
]

export default function ladiesServices() {
  return (
    <>
    <section className="">

      {/* TOP GRID SECTION */}
      <div className="max-w-7xl mx-auto p-4 md:p-8  text-black">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-30  p-4">

          {/* Left Images */}
          <div className="space-y-14">
            <Image src="/img/services/mens-one.webp" alt="" width={400} height={300} className="w-full h-auto" />
            <Image src="/img/services/mens-three.webp" alt="" width={400} height={300} className="w-full h-auto" />

             {/* CTA BOX */}
                <div className="border-12 border-primary ml-12 -mr-12 px-10 py-10 text-left mt-6 bg-white">
                    <h4 className="text-6xl font-semibold leading-snug">
                        Book Now & give yourself a head turning LOOK
                    </h4>
                </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-between">

            <div>
              <h3 className="text-center text-6xl text-[#585858] font-extrabold tracking-widest mt-4 mb-6">
                SERVICES
              </h3>

              <Image src="/img/services/mens-two.webp" alt="" width={400} height={200} className="w-full mb-4" />

              <ul className="text-center text-[42px] font-extrabold my-15 space-y-1">
                <li>CUT & HAIR CARE</li>
                <li>BEARD CARE</li>
                <li>HAIR CARE</li>
                <li>HAIR COLOR</li>
                <li>HAIR TEXTURE</li>
                <li>HAIR SPA TREATMENTS</li>
              </ul>
               <Image src="/img/services/mens-four.webp" alt="" width={400} height={200} className="w-full mt-4" />
            </div>

           

          </div>

        </div>

        <div className="grid mt-14">
            <h2 className="text-3xl font-bold  mb-8">LOOKS Salon – Premium Men’s Grooming Services</h2>
            <p className="text-lg text-black">
                

At LOOKS Salon, we believe grooming is not just a routine—it’s a statement. Our exclusive range of men’s services is designed to deliver precision, style, and relaxation, all under one roof. Whether it’s a fresh hair cut, detailed beard styling, or a rejuvenating hair spa treatment, we’ve got you covered with top-tier expertise and premium products.
            </p>
        </div>

       

      </div>

      {/* SERVICES LIST SECTION */}
      <div className="">

        {services.map((item, index) => (
            
          <div
            key={index}
            className={`
              
              ${index % 2 === 0 ? 'bg-black text-white' : 'bg-[#fff] text-black'}
              p-6
            `}
          >
            <div className='max-w-7xl mx-auto px-4 py-10 space-y-6'>
            <div className='flex flex-col md:flex-row gap-6 items-start'>
            {/* Icon Placeholder */}
            <div className="flex items-center justify-center text-primary">
              <Image src={item.icon} alt="Icon" width={140} height={150} />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl text-primary font-semibold tracking-wide mb-4">
                {item.title}
              </h3>
              <p className="text-lg font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
          </div>
          </div>
        ))}

      </div>

    </section>


    </>
  )
}
