import { motion } from "framer-motion"
import Link from "next/link"

export default function AnimatedFlight({ planeSrc, cloudsSrc }: { planeSrc: string; cloudsSrc: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream-50 py-24">
      {/* Clouds background */}
      <motion.img
        src={cloudsSrc}
        alt="clouds"
        className="absolute left-0 top-0 w-full h-80 object-cover opacity-90 pointer-events-none"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
                <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg border-2 border-bronze-300 text-bronze-900 font-semibold bg-white/80">
                  Browse Tours
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="relative h-64 md:h-80 flex items-center justify-center">
            {/* Plane animation - enters from right when in view */}
            <motion.img
              src={planeSrc}
              alt="plane"
              className="w-80 max-w-full pointer-events-none drop-shadow-2xl"
              initial={{ x: 300, opacity: 0, rotate: 6 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              animate={{ y: [0, -8, 0] }}
              
            />

            {/* subtle plane trail */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(255,215,0,0.12) 0%, rgba(255,255,255,0) 40%)' }}
            />
          </div>
        </div>
      </div>

      {/* subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
