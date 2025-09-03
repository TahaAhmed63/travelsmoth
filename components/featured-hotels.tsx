"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Car, Utensils, Waves, ArrowRight, Dumbbell, ParkingCircle, Snowflake } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "./tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

interface PreSelectedTour {
  id: string
  name: string
  price: number
  duration: string
  image: string
}

interface ApiHotel {
  id: string
  name: string
  location: string
  description: string
  category: string
  rooms: number
  rating: number
  address: string
  contactphone: string
  contactemail: string
  website: string
  minprice: number
  maxprice: number
  currency: string
  amenities: string[]
  additionalamenities: string
  checkintime: string
  checkouttime: string
  cancellationpolicy: string
  additionalpolicies: string
  mainimage: string
  galleryimages: string[]
  created_at: string
  galleryImages?: string[]
  mainImage?: string
}

const amenityIcons: Record<string, any> = {
  "WiFi": Wifi,
  "Pool": Waves,
  "Parking": ParkingCircle,
  "Gym": Dumbbell,
  "Business Center": Car,
  "Air Conditioning": Snowflake,
  "Restaurant": Utensils,
  "Fine Dining": Utensils,
  "Private Beach": Waves,
  "Beach Access": Waves,
  "Spa": Star,
  "Water Sports": Waves,
  "Yoga": Star,
}

function getHotelImage(hotel: ApiHotel) {
  // Prefer mainimage, fallback to mainImage, fallback to first gallery image, fallback to placeholder
  if (hotel.mainimage && hotel.mainimage.trim() !== "") return hotel.mainimage
  if (hotel.mainImage && hotel.mainImage.trim() !== "") return hotel.mainImage
  if (hotel.galleryimages && hotel.galleryimages.length > 0) return hotel.galleryimages[0]
  if (hotel.galleryImages && hotel.galleryImages.length > 0) return hotel.galleryImages[0]
  return "/placeholder.svg"
}

function getCategoryLabel(category: string) {
  // Map API category to display label
  if (!category) return "Hotel"
  const map: Record<string, string> = {
    resort: "Resort",
    hotel: "Hotel",
    "city hotel": "City Hotel",
    "beach resort": "Beach Resort",
    luxury: "Luxury Hotel",
    "luxury resort": "Luxury Resort",
  }
  return map[category.toLowerCase()] || category
}

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState<ApiHotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<PreSelectedTour | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${BaseUrl}/api/hotels`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch hotels")
        return res.json()
      })
      .then((data: ApiHotel[]) => {
        setHotels(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load hotels")
        setLoading(false)
      })
  }, [])

  const handleBookNow = (hotel: ApiHotel) => {
    setSelectedHotel({
      id: hotel.id,
      name: hotel.name,
      price: hotel.minprice,
      duration: "3 nights",
      image: getHotelImage(hotel),
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

        {loading ? (
          <div className="text-center text-bronze-600 py-12">Loading hotels...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : hotels.length === 0 ? (
          <div className="text-center text-bronze-600 py-12">No hotels found.</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {hotels.slice(0, 3).map((hotel, index) => (
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
                      src={`${BaseUrl}${getHotelImage(hotel)}`}
                      alt={hotel.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-gold-500 text-white font-semibold">Featured</Badge>
                      <Badge className="bg-white/90 text-bronze-900">{getCategoryLabel(hotel.category)}</Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-bronze-900">{hotel.rating?.toFixed(1) ?? "N/A"}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 bg-bronze-900/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            {hotel.currency?.toLowerCase() === "usd" || hotel.currency?.toLowerCase() === "dollar"
                              ? "$"
                              : hotel.currency?.toLowerCase() === "jpy"
                              ? "¥"
                              : hotel.currency?.toLowerCase() === "eur"
                              ? "€"
                              : hotel.currency?.toLowerCase() === "gbp"
                              ? "£"
                              : ""}
                            {hotel.minprice}
                          </span>
                          {hotel.maxprice && hotel.maxprice > hotel.minprice && (
                            <span className="text-sm line-through text-gray-300">
                              {hotel.currency?.toLowerCase() === "usd" || hotel.currency?.toLowerCase() === "dollar"
                                ? "$"
                                : hotel.currency?.toLowerCase() === "jpy"
                                ? "¥"
                                : hotel.currency?.toLowerCase() === "eur"
                                ? "€"
                                : hotel.currency?.toLowerCase() === "gbp"
                                ? "£"
                                : ""}
                              {hotel.maxprice}
                            </span>
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
                              i < Math.round(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {/* No reviews in API, so omit or fake */}
                      {/* <span className="text-sm text-bronze-600">({hotel.reviews} reviews)</span> */}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-bronze-900 mb-3">Top Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {(hotel.amenities || []).slice(0, 4).map((amenity, i) => {
                          const IconComponent = amenityIcons[amenity] || Star
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
        )}

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
