"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Car, Utensils, Waves, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import TourBookingPopup from "./tour-booking-popup"

interface PreSelectedTour {
  id: string
  name: string
  price: number
  duration: string
  image: string
}

const featuredHotels = [
  {
    id: "maldives-luxury-resort",
    name: "Maldives Luxury Resort & Spa",
    location: "Maldives",
    rating: 4.9,
    reviews: 342,
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop",
    category: "Luxury Resort",
    amenities: ["Private Beach", "Spa", "Water Sports", "Fine Dining"],
    description: "Overwater villas with pristine ocean views and world-class amenities",
    featured: true,
  },
  {
    id: "dubai-premium-hotel",
    name: "Dubai Premium Hotel",
    location: "Dubai, UAE",
    rating: 4.8,
    reviews: 567,
    price: 450,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    category: "City Hotel",
    amenities: ["Pool", "Spa", "Business Center", "Restaurant"],
    description: "Modern luxury in the heart of Dubai with stunning city views",
    featured: true,
  },
  {
    id: "bali-beach-resort",
    name: "Bali Beach Resort",
    location: "Bali, Indonesia",
    rating: 4.7,
    reviews: 423,
    price: 320,
    originalPrice: 420,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    category: "Beach Resort",
    amenities: ["Beach Access", "Pool", "Yoga", "Restaurant"],
    description: "Tropical paradise with traditional Balinese hospitality",
    featured: true,
  },
]

const amenityIcons = {
  "Private Beach": Waves,
  "Beach Access": Waves,
  Spa: Star,
  "Water Sports": Waves,
  "Fine Dining": Utensils,
  Pool: Waves,
  "Business Center": Car,
  Restaurant: Utensils,
  Yoga: Star,
  WiFi: Wifi,
}

export default function FeaturedHotels() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<PreSelectedTour | null>(null)

  const handleBookNow = (hotel: typeof featuredHotels[0]) => {
    setSelectedHotel({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price,
      duration: "3 nights", // You can adjust this based on your needs
      image: hotel.image
    })
    setIsPopupOpen(true)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 via-white to-gold-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Featured Hotels</h2>
          <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury hotels and resorts offering exceptional experiences worldwide
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="relative overflow-hidden">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-gold-500 text-white font-semibold">Featured</Badge>
                    <Badge className="bg-white/90 text-bronze-900">{hotel.category}</Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-bronze-900">{hotel.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-bronze-900/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">${hotel.price}</span>
                        {hotel.originalPrice && (
                          <span className="text-sm line-through text-gray-300">${hotel.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-300">per night</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{hotel.location}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-bronze-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-bronze-600 text-sm leading-relaxed">{hotel.description}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-bronze-600">({hotel.reviews} reviews)</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-bronze-900 mb-3">Top Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenities.slice(0, 4).map((amenity, i) => {
                        const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Star
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-gold-600" />
                            <span className="text-xs text-bronze-700">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/hotels/${hotel.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleBookNow(hotel)}
                      className="bg-gold-500 hover:bg-gold-600 text-white px-6 transition-all duration-300"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/hotels">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold-500 to-bronze-600 hover:from-gold-600 hover:to-bronze-700 text-white px-8 py-4 text-lg group"
            >
              Explore All Hotels
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Tour Booking Popup */}
      {isPopupOpen && selectedHotel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <TourBookingPopup
            preSelectedTour={selectedHotel}
            onClose={() => {
              setIsPopupOpen(false)
              setSelectedHotel(null)
            }}
          />
        </div>
      )}
    </section>
  )
}
