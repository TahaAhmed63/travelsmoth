import { motion } from "framer-motion"

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-bronze-900">Why choose <span className="text-gold-500">travelsmoth.pk</span></h2>
          <p className="mt-3 text-bronze-600 max-w-2xl mx-auto">We combine technology and human expertise to deliver safe, transparent, and delightful travel experiences.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-bronze-900">Verified Suppliers</h3>
              <p className="text-sm text-bronze-600 mt-2">Direct relationships with airlines and hotels ensure authenticity and better pricing.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-bronze-900">Transparent Pricing</h3>
              <p className="text-sm text-bronze-600 mt-2">Clear quotes, no hidden fees, and flexible payment plans.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-bronze-900">Secure & Insured</h3>
              <p className="text-sm text-bronze-600 mt-2">SSL payments, optional insurance, and buyer protection.</p>
            </div>
          </div>

          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-md">
              <img src="/25-1.jpg" alt="travel" className="w-full h-80 object-cover" />
            </div>

            <motion.img
              src="https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F3bed0609092440a3b2ae2dff707de10f?format=webp&width=800"
              alt="plane"
              className="absolute -right-8 top-8 w-44 md:w-56 opacity-95 pointer-events-none"
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 40, damping: 16 }}
            />
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow">
              <div className="text-sm text-bronze-600">Years Experience</div>
              <div className="text-2xl font-bold text-bronze-900">40+</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow">
              <div className="text-sm text-bronze-600">Happy Travelers</div>
              <div className="text-2xl font-bold text-bronze-900">10k+</div>
            </div>

            <a href="/contact" className="inline-block px-4 py-3 bg-gold-500 text-white rounded-lg text-center font-semibold">Contact Us</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
