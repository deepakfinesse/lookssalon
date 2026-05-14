import connectDB   from '@/lib/mongodb'
import HeroBanner  from '@/models/HeroBanner'
import HeroSliderClient from './HeroSliderClient'

const FALLBACK_SLIDES = [
  { _id: 'f1', desktopImage: { url: '/img/home/hero.webp',  alt: 'Looks Salon' }, mobileImage: { url: '', alt: '' }, href: '/' },
  { _id: 'f2', desktopImage: { url: '/img/home/hero2.webp', alt: 'Looks Salon' }, mobileImage: { url: '', alt: '' }, href: '/' },
]

export default async function HeroSlider() {
  let slides = []
  try {
    await connectDB()
    const docs = await HeroBanner.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean()
    slides = docs.map(d => ({ ...d, _id: d._id.toString() }))
  } catch {
    // silently fall through to fallback
  }

  return <HeroSliderClient slides={slides.length > 0 ? slides : FALLBACK_SLIDES} />
}
