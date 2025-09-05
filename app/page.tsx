"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import TourBookingForm from "@/components/tour-booking-form"
import FeaturedHotels from "@/components/featured-hotels"
import { useRouter } from "next/navigation"
import FeaturedToursCarousel from "@/components/featured-tours-carousel"
import UmrahPackagesSection from "@/components/umrah-packages-section"
import AnimatedFlight from "@/components/animated-flight"

const featuredTours = [
  {
    id: 1,
    title: "Bali Paradise Adventure",
    destination: "Bali, Indonesia",
    duration: "7 days",
    price: "$1,299",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop&crop=center",
    category: "Adventure",
  },
  {
    id: 2,
    title: "European Grand Tour",
    destination: "Europe",
    duration: "14 days",
    price: "$2,899",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop&crop=center",
    category: "Cultural",
  },
  {
    id: 3,
    title: "Safari Kenya Experience",
    destination: "Kenya, Africa",
    duration: "10 days",
    price: "$2,199",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop&crop=center",
    category: "Wildlife",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "Absolutely incredible experience! The team organized everything perfectly and the destinations were breathtaking.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "Best travel agency I've ever worked with. Professional, reliable, and they truly care about your experience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    text: "Made our honeymoon unforgettable. Every detail was perfect and the customer service was outstanding.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  },
]

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const router = useRouter()
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setTestimonialsPerPage(window.innerWidth >= 768 ? 3 : 1)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getVisibleTestimonials = () => {
    if (testimonialsPerPage === 3) {
      const start = testimonialIndex
      const end = start + 3
      if (end <= testimonials.length) {
        return testimonials.slice(start, end)
      } else {
        return [...testimonials.slice(start), ...testimonials.slice(0, end - testimonials.length)]
      }
    } else {
      return [testimonials[testimonialIndex]]
    }
  }

  const handleTourClick = (tourname: string) => {
    router.push(`/tours/${tourname}`)
  }

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }
  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/herro.png')",
            backgroundAttachment: "fixed",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center text-white max-w-4xl mx-auto px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Travel
            <span className="text-gold-400"> Smooth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Experience seamless travel with our expertly crafted tours, luxury hotels, and complete vacation packages
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 text-lg">
              <Link href="/tours" className="flex items-center gap-2">
                Explore Tours <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-white hover:text-black px-8 py-4 text-lg"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Tour Booking Form */}
      <TourBookingForm />

      {/* Featured Tours Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Featured Tours</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Discover our most popular destinations and experiences, carefully curated for unforgettable adventures
            </p>
          </motion.div>

          <FeaturedToursCarousel />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white"
            >
              <Link href="/tours">View All Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <FeaturedHotels />
      <UmrahPackagesSection />
      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gold-500">
              Why buy from travelsmoth.pk
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We are travelsmoth.pk, your trusted travel partner. Pilgrims and travelers can purchase their travel products from us with total confidence for the reasons set below:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 w-full">
            {/* Images column */}
            <div className="flex justify-center items-center">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-end justify-center w-full">
                <img
                  src="/23.jpg"
                  alt="Mosque 1"
                  className="rounded-lg shadow-lg object-cover w-56 h-60 md:w-64 md:h-[20rem] border-4 border-white"
                  style={{ position: 'static' }}
                />
                <img
                  src="/25-1.jpg"
                  alt="Mosque 2"
                  className="rounded-lg shadow-lg object-cover w-56 h-80 md:w-64 md:h-[28rem] border-4 border-white"
                  style={{ position: 'static', left: 'unset', right: 0 }}
                />
              </div>
            </div>
            {/* Text column */}
            <div className="flex flex-col justify-center items-center">
              <ul className="space-y-4 text-left w-full text-base max-w-lg mx-auto">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  40 years of travel industry experience.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  ATOL protected 5311 you can check online
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  IATA registered 91252582 you can check online
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  We are the visa issuing agent - also authorized by Saudi ministry of foreign affairs.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  For flights / hotels / visas/ transportation. We book directly for our customers. We are not third party suppliers.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  When you buy from us, your money is secure.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gold-500">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  Check our reviews on <span className="inline-flex items-center ml-1"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Trustpilot_logo.png" alt="Trustpilot" className="h-5 inline-block mr-1" />Trustpilot</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Modern background section with gradient and overlayed text */}
          <div
            className="relative w-full mt-10 rounded-2xl overflow-hidden shadow-xl"
            style={{
              minHeight: '320px',
              backgroundImage: `
                linear-gradient(
                  to bottom right,
                  rgba(255, 215, 0, 0.85) 0%,
                  rgba(255, 255, 255, 0.85) 100%
                ),
                url('/modern-bg-mosque.jpg')
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
              >
            <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 md:py-20 h-full">
              <div className="max-w-4xl mx-auto text-center text-gray-900">
                <p className="mb-4 text-lg md:text-xl font-semibold drop-shadow-lg">
                  We feel the above points are important to mention because:
                </p>
                <p className="mb-4 text-base md:text-lg font-medium drop-shadow-lg">
                  Every year millions of Muslims celebrate hajj and umrah by making the pilgrimage to Mecca in what is the world's biggest annual gathering of people. Within this mass of humanity are thousands of UK citizens, many of whom will have saved for years in the knowledge that, for them, this will be a once-in-a-lifetime trip.
                </p>
                <p className="text-base md:text-lg font-medium drop-shadow-lg">
                  Unfortunately as the pilgrimage season approaches there will also be a significant number of Muslims who have paid for a tour package for themselves and their family only to discover their dreams have been shattered by fraudsters.
                </p>
              </div>
                </div>
            {/* Optional: darken overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/80 via-white/70 to-gold-200/80 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers who have experienced unforgettable journeys with us
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="flex flex-col items-center justify-center relative max-w-7xl mx-auto">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 hover:bg-gold-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gold-600" />
            </button>
            <div className="w-full flex flex-col md:flex-row gap-8 items-stretch justify-center">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={testimonial.name + idx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="w-full md:w-1/3"
                >
                  <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-bronze-700 mb-6 italic">"{testimonial.text}"</p>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-bronze-900">{testimonial.name}</h4>
                        <p className="text-sm text-bronze-600">{testimonial.location}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 hover:bg-gold-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gold-600" />
            </button>
            {/* Dots indicator */}
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`w-2 h-2 rounded-full ${idx === testimonialIndex ? 'bg-gold-600' : 'bg-gold-200'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Flight Section */}
      <AnimatedFlight
        planeSrc={"https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F3bed0609092440a3b2ae2dff707de10f?format=webp&width=800"}
        cloudsSrc={"https://cdn.builder.io/api/v1/image/assets%2F9ddc4b4090114e7aa6d47a7c04058f87%2F72220fb7433c48c69a4c0e09132d4699?format=webp&width=800"}
      />
    </div>
  )
}
