// components/LooksKart.jsx
import Image from 'next/image'
import Link from 'next/link'
import { getCollections } from '@/lib/getCollections'
import { FaArrowRight } from 'react-icons/fa'
import Button from '../ui/Button';

export default async function LooksKart() {
  const collections = await getCollections()

  return (
    <section
      className="relative py-24 overflow-hidden
      bg-[url('/img/home/looks-kart-bg.png')] 
      bg-cover bg-center bg-no-repeat"
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-10 gap-10 items-center">

        {/* LEFT (30%) */}
        <div className="md:col-span-3">
          <Image
            src="/img/home/looks-kart-logo.png"
            alt="Looks Kart"
            width={150}
            height={100}
          />

          <p className="mt-4 text-base sm:text-lg md:text-xl font-bold text-black max-w-60">
            Shop authentic products from your most loved salon chain, LOOKS salon
          </p>

          {/* Buttons */}
              <div className="flex items-center gap-5 mt-6">
                <Button href="https://lookskart.com/" label="SHOP NOW" target="_blank" variant='dark'/>
              </div>
        </div>

        {/* RIGHT (70%) */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">

          {collections.map((item) => (
            <Link
              key={item.handle}
              href={item.url}
              target="_blank"
              className="relative group overflow-hidden rounded-md border-[3px] border-white"
            >
              {/* Image */}
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={400}
                  className="object-cover w-full h-[320px] group-hover:scale-105 transition duration-300"
                />
              )}

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center text-white z-10">
                <h3 className="text-sm font-semibold">
                  {item.title}
                </h3>

                {/* Arrow */}
                <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full group-hover:bg-yellow-500 transition">
                  <FaArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  )
}

























// // components/LooksKart.jsx
// import Image from 'next/image'
// import Button from '../ui/Button';
// import { getProducts } from '@/lib/getProducts'

// export default async function LooksKart() {
//   const products = await getProducts()

//   return (
//     <section
//       className="relative py-20 bg-gray-100 overflow-hidden
//       bg-[url('/img/home/looks-kart-bg.png')] 
//       bg-cover bg-center bg-no-repeat"
//     >
//       <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-10 gap-10 items-center">

//         {/* LEFT (30%) */}
//         <div className="md:col-span-3">
//           <Image
//             src="/img/home/looks-kart-logo.png"
//             alt="Looks Kart"
//             width={150}
//             height={100}
//           />

//           <p className="mt-4 text-base sm:text-lg md:text-xl text-black font-bold max-w-lg">
//             Shop authentic products from your most loved salon chain, LOOKS salon
//           </p>

//           {/* Buttons */}
//                         <div className="flex items-center gap-5 mt-6">
//                           <Button href="/" label="Shop now" variant='dark'/>
                          
//                         </div>
//         </div>

//         {/* RIGHT (70%) */}
//         <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">

//           {products.slice(0, 4).map((product) => (
//             <div
//               key={product.id}
//               className="relative group overflow-hidden rounded-md border-[3px] border-white"
//             >
//               {/* Image */}
//               <Image
//                 src={product.images?.[0]?.src}
//                 alt={product.title}
//                 width={300}
//                 height={400}
//                 className="object-cover w-full h-[250px] group-hover:scale-105 transition duration-300"
//               />

//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

//               {/* Content */}
//               <div className="absolute bottom-0 p-3 text-white z-10">
//                 <h3 className="text-sm font-semibold line-clamp-2">
//                   {product.title}
//                 </h3>
//               </div>
//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   )
// }