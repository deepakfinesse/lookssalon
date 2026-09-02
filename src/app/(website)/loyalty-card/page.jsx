
import React from 'react'
import FadeUp from '@/components/animation/FadeUp';
import PartnerBrands from '@/components/layout/PartnerBrands';

const benefits = [
  { title: 'Up to 20%', desc: 'Savings on services', accent: true },
  { title: 'Offers', desc: 'Exclusive member offers' },
  { title: 'Adds-ons', desc: 'Complimentary benefits' },
  { title: 'Priority', desc: 'Appointment access' },
]; 

const works = [
  { title: '1. Get your card', desc: 'Pick up your LYL Card by availing any service at any branch.', img: '/img/loyalty/lyl-works1.webp' },
  { title: '2. enjoy services', desc: 'Use your card every time you visit. Points are accrued on every services bill value (before taxes).', img: '/img/loyalty/lyl-works2.webp' },
  { title: '3. earn points', desc: 'For every ₹100 service, you get 10 points and every 1 point is equal to ₹1.', img: '/img/loyalty/lyl-works3.webp' },
  { title: '4. Redeem', desc: 'Redeem up to 50% of your bill with reward points. Minimum 250 points required.', img: '/img/loyalty/lyl-works4.webp' },
];

const page = () => {
  return (
    <>
        {/* lyl card & Benefits */}
        <section className='relative w-full bg-cover bg-center' style={{ backgroundImage: "url('/img/loyalty/loyalty-card-bg.webp')" }} >
            <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-24">
              <div className='grid grid-cols-1 md:grid-cols-[4fr_6fr] items-center gap-8 md:gap-12'>

                <div className='h-full flex flex-col justify-center items-start text-left'>
                  <FadeUp delay={0.1}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-bold uppercase mb-4 text-left">
                        lyl card & <br/> Benefits
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <p className='text-base lg:text-lg text-black'>More than a membership. It's a lifestyle.</p>
                  </FadeUp>
                </div>
                <div className='h-full flex flex-col items-center md:items-start'>
                  <img src="/img/loyalty/loyalty-card.webp" alt="Loyalty Card" className='w-full max-w-md md:max-w-none h-auto object-contain' />
                </div>
              </div>
            </div>
        </section>

        {/* Indulge. save. shine. */}
        <section className="w-full bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-[3.5fr_6.5fr] items-center gap-10 md:gap-16">

                {/* ── Card stack ── */}
                <FadeUp delay={0.1}>
                <div className="flex items-center justify-center rounded-md bg-white  p-0 sm:p-0 mx-auto w-full max-w-sm md:max-w-none">
                    <img src="/img/loyalty/loyalty-card-lyl.webp" alt="Loyalty Card" className='w-full h-auto object-contain' />
                </div>
                </FadeUp>

                {/* ── Content ── */}
                <div className="flex flex-col">
                <FadeUp delay={0.1}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-bold uppercase mb-4 text-left">
                    Indulge. Save. Shine.
                    </h2>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <p className="text-base lg:text-lg text-black">
                    Every customer&apos;s motive is to get maximum benefits from services that they take
                    and we at Looks Salon make sure that our customers are not only satisfied with our
                    services but also with the exclusive facilities that we provide them. One such
                    facility that we have for our clients are Loyalty Cards. Loyalty Cards is a program
                    through which customers at Looks Salon will get the advantage to avail points on
                    services that can be used for future services. The loyalty cards is a souvenir for
                    the long term relation with our customers as we strive for and want them to come
                    back to us for all the beauty and grooming services.
                    </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                    <p className="text-base lg:text-lg text-black">
                    The Loyalty Cards at Looks salon can be used for any services for men and women and
                    can be accrued on the In-Salon services only. All you&apos;ve to do is, while
                    getting a makeover at the nearest Looks Salon; ask for the Loyalty Card service and
                    viola! You are now a member of the program. It&apos;s that easy.
                    </p>
                </FadeUp>

                <FadeUp delay={0.4}>
                    <div className="mt-8 md:mt-10 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
                    {benefits.map((b) => (
                        <div
                        key={b.title}
                        className="group border p-3 sm:p-4 border-neutral-300 hover:border-primary transition flex flex-col items-center justify-start text-center"
                        >
                        <p className="text-lg sm:text-xl font-bold text-black group-hover:text-primary transition">
                            {b.title}
                        </p>
                        <p className="mt-1 text-sm sm:text-base lg:text-lg text-black">{b.desc}</p>
                        </div>
                    ))}
                    </div>
                </FadeUp>
                </div>

            </div>
            </div>
        </section>



        {/* how lyl card works */}
        <section className="w-full bg-black">
            <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="grid grid-col-1 text-center items-center gap-4 md:gap-6">

               
                <FadeUp delay={0.1}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-white font-bold uppercase mb-4 text-center">
                    how lyl card works
                    </h2>
                </FadeUp>

               

                <FadeUp delay={0.4}>
                    <div className=" grid grid-cols-2 gap-4 md:gap-20 sm:grid-cols-4">
                    {works.map((b) => (
                        <div
                        key={b.title}
                        className="group transition flex flex-col items-center justify-start text-center"
                        >
                            <img src={b.img} alt={b.title} className='w-full mb-4 border-2 border-neutral-300 group-hover:border-primary rounded-[180px]' />
                        <p className="text-xl font-bold text-white group-hover:text-primary transition uppercase">
                            {b.title}
                        </p>
                        <p className="mt-1 text-md lg:text-lg text-white">{b.desc}</p>
                        </div>
                    ))}
                    </div>
                </FadeUp>
                

            </div>
            </div>
        </section>
        <PartnerBrands/>
    </>
  )
}

export default page