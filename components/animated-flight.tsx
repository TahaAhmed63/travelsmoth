import * as FM from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AnimatedFlight({ planeSrc, cloudsSrc }: { planeSrc: string; cloudsSrc: string }) {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.4)), url(${cloudsSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <section className="relative overflow-hidden py-24" style={sectionStyle}>
      {/* overlay to soften background */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            {/* Mobile: decorative image above text */}
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F687cabaabd0740a79887b881752352c8?format=webp&width=800" alt="traveler" className="block md:hidden w-full rounded-xl mb-6 object-cover h-56" />

            <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Ready for Takeoff?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="text-lg text-bronze-700 mb-6 max-w-xl">
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

            {/* Decorative large image on desktop */}
            <motion.img
              src="https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F687cabaabd0740a79887b881752352c8?format=webp&width=800"
              alt="traveler"
              className="hidden md:block absolute -left-12 top-1/2 transform -translate-y-1/2 w-72 rounded-2xl shadow-2xl z-10"
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 40, damping: 16 }}
            />
          </div>

          <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
            {/* Plane: positioned absolutely so it can extend and cover the section like the example */}
            <motion.img
              src={planeSrc}
              alt="plane"
              aria-hidden
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[140%] max-w-none pointer-events-none drop-shadow-2xl z-10"
              initial={{ x: '120%', opacity: 0, rotate: 6 }}
              whileInView={{ x: '10%', opacity: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 40, damping: 18 }}
            />

            {/* continuous subtle bobbing on wrapper to mimic flight */}
            <motion.div className="absolute inset-0 pointer-events-none z-0" initial={{ y: 0 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', type: 'tween' }} />

            {/* subtle plane glow */}
            <div className="absolute inset-0 pointer-events-none -z-0">
              <div style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(255,215,0,0.12) 0%, rgba(255,255,255,0) 40%)' }} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
