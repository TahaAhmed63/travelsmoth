"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import TourBookingForm from "@/components/tour-booking-form"
import FeaturedHotels from "@/components/featured-hotels"
import { useRouter } from "next/navigation"

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

  const handleTourClick = (tourname: string) => {
    router.push(`/tours/${tourname}`)
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
              "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&crop=center')",
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
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => handleTourClick(tour.title.toLowerCase().replace(/\s+/g, '-'))}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-gold-500 text-white">{tour.category}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                      </div>
                      <span className="text-sm text-bronze-500">({tour.reviews} reviews)</span>
                    </div>

                    <h3 className="text-xl font-bold text-bronze-900 mb-2">{tour.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-bronze-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.destination}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold-600">{tour.price}</span>
                      <Button className="bg-gold-500 hover:bg-gold-600">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

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
      {/* <FeaturedHotels /> */}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Why Choose Travel Smooth</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              We're committed to providing exceptional travel experiences with personalized service and attention to
              detail
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Guides",
                description: "Professional local guides with deep knowledge of destinations",
              },
              {
                icon: Star,
                title: "5-Star Service",
                description: "Exceptional customer service from planning to return",
              },
              {
                icon: MapPin,
                title: "Unique Destinations",
                description: "Access to exclusive locations and hidden gems",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance during your travels",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-bronze-900 mb-2">{feature.title}</h3>
                <p className="text-bronze-600">{feature.description}</p>
              </motion.div>
            ))}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-bronze-700 mb-6 italic">"{testimonial.text}"</p>

                  <div className="flex items-center gap-3">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready for Your Next Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers and discover the world with our expertly crafted experiences
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-gold-600 hover:bg-gray-100">
                <Link href="/contact">Get Started Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gold-600"
              >
                <Link href="/tours">Browse Tours</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
