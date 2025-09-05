import { motion } from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AnimatedFlight({ planeSrc, cloudsSrc }: { planeSrc: string; cloudsSrc: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream-50 py-24">
      {/* Clouds background (behind content) */}
      <motion.img
        src={cloudsSrc}
        alt="clouds"
        aria-hidden
        className="absolute left-0 top-0 w-full h-64 object-cover opacity-60 pointer-events-none -z-10"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Ready for Takeoff?</h2>
            <p className="text-lg text-bronze-700 mb-6 max-w-xl">
              Experience the thrill of seamless travel. Book your next adventure today and let us handle the rest. From flights to bespoke packages, we make travel effortless.
            </p>

            <div className="flex gap-4">
              <Link href="/contact" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-6 py-3 rounded-lg bg-gold-500 text-white font-semibold shadow-lg"
                >
                  Get Started
                </motion.button>
              </Link>

              <Link href="/tours" className="inline-block">
                <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg border-2 border-bronze-300 text-bronze-900 font-semibold bg-white/90">
                  Browse Tours
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="relative h-64 md:h-80 flex items-center justify-center">
            {/* Plane: positioned absolutely so it can extend and cover the section like the example */}
            <div className="relative w-full h-full overflow-hidden">
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
              <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', type: 'tween' }}
              />
            </div>

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
