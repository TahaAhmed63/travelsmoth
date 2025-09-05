import * as FM from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AnimatedFlight({ planeSrc, cloudsSrc }: { planeSrc: string; cloudsSrc: string }) {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.4)), url(https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F72220fb7433c48c69a4c0e09132d4699?format=webp&width=800)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '96px',
  }

  return (
    <section className="relative overflow-hidden py-24" style={sectionStyle}>
      {/* overlay to soften background */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{
          backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F9b828325963f4395b1b89c21dd687c4b)",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          padding: '150px 0',
        }} >
          <div className="relative">
            {/* Mobile: decorative image above text */}
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F687cabaabd0740a79887b881752352c8?format=webp&width=800" alt="traveler" className="hidden" />

            <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ paddingLeft: '17px' }} className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Ready for Takeoff?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} style={{ paddingLeft: '17px' }} className="text-lg text-bronze-700 mb-6 max-w-xl">
              Experience the thrill of seamless travel. Book your next adventure today and let us handle the rest. From flights to bespoke packages, we make travel effortless.
            </motion.p>

            <div className="flex gap-4">
              <Link href="/contact" className="inline-block">
                <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg bg-gold-500 text-white font-semibold shadow-lg">Get Started</motion.button>
              </Link>

              <Link href="/tours" className="inline-block">
                <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg border-2 border-bronze-300 text-bronze-900 font-semibold bg-white/90">Browse Tours</motion.button>
              </Link>
            </div>

          </div>

          <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
            {/* Right-side modern card with traveler image */}
            {/* Right-side full-height decorative image covering the section height on desktop */}
            <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 lg:w-5/12 overflow-hidden z-0">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F687cabaabd0740a79887b881752352c8?format=webp&width=800" alt="traveler" className="w-full h-full object-cover" />
              {/* gradient to smoothly blend image into content */}
              <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/70 to-transparent" />
            </div>
            {/* Plane: positioned absolutely so it can extend and cover the section like the example */}
       
          </div>
        </div>
      </div>

      {/* subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
