'use client'
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

const stats = [
  { value: 220, label: 'Salons Pan India' },
  { value: 35, label: 'Years of Experience' },
  { value: 7000, label: 'Artists & Technicians' },
]

const Counter = () => {
  const [start, setStart] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="
        relative 
        bg-[url('/img/home/counter-bg.webp')] 
        bg-cover bg-center bg-no-repeat
        py-16 md:py-24 lg:py-14 xl:pt-20 xl:pb-28
      "
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold uppercase tracking-wider text-black">
            Looks in Numbers
          </h2>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              
              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary">
                {start ? (
                  <CountUp end={item.value} duration={2.5} />
                ) : (
                  '0'
                )}
                +
              </h3>

              <h4 className="mt-3 text-base sm:text-lg md:text-2xl xl:text-3xl font-medium uppercase text-black ">
                {item.label}
              </h4>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Counter