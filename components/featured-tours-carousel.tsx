"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, ChevronLeft, ChevronRight, Calendar, Hotel, Camera } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "./tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

const API_URL = `${BaseUrl}/api/tours`

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Challenging: "bg-red-100 text-red-700",
}

type APITour = {
  id: string
  title: string
  duration: string
  difficulty: string
  groupsize?: string | null
  groupSize?: string | null
  price: string
  rating?: number | null
  bookings?: number | null
  description?: string
  departurelocation?: string | null
  departureLocation?: string | null
  departuretime?: string | null
  departureTime?: string | null
  returntime?: string | null
  returnTime?: string | null
  languages?: string
  highlights?: string[]
  included?: string[]
  notincluded?: string[] | null
  notIncluded?: string[] | null
  tourplan?: string | null
  tourPlan?: string | null
  itinerary?: any[]
  archiveImages?: string
  mainImage?: string
  destinationIds?: string[]
  destinations?: { id: string; name: string; galleryImages: string[] }[]
  slug?: string
}

export default function FeaturedToursCarousel() {
  const [tours, setTours] = useState<APITour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedTour, setselectedTour] = useState<PreSelectedTour | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Fetch tours from API
  useEffect(() => {
    setLoading(true)
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tours")
        return res.json()
      })
      .then((data) => {
        setTours(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Error loading tours")
        setLoading(false)
      })
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || tours.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tours.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, tours.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tours.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getVisibleTours = () => {
    const visible: (APITour & { slideIndex: number })[] = []
    for (let i = 0; i < 3; i++) {
      if (tours.length === 0) break
      const index = (currentIndex + i) % tours.length
      visible.push({ ...tours[index], slideIndex: i })
    }
    return visible
  }

  const handleBookNow = (tour: APITour) => {
    setselectedTour({
      id: tour.id,
      name: tour.title,
      price: tour.price,
      duration: tour.duration,
      image: tour.mainImage
        ? tour.mainImage.startsWith("http")
          ? tour.mainImage
          : `${BaseUrl}${tour.mainImage}`
        : "/placeholder.svg",
    })
    setIsPopupOpen(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-bronze-700 text-lg">Loading featured tours...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-red-600 text-lg">{error}</span>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {getVisibleTours().map((tour, index) => {
              // Fallbacks and mapping for API data
              const imageUrl = tour.mainImage
                ? tour.mainImage.startsWith("http")
                  ? tour.mainImage
                  : `${BaseUrl}${tour.mainImage}`
                : "/placeholder.svg"
              const groupSize = tour.groupSize || tour.groupsize || "N/A"
              const highlights = tour.highlights || []
              const included = tour.included || []
              const difficulty = tour.difficulty || "Easy"
              const rating = typeof tour.rating === "number" ? tour.rating : 4.5
              const reviews = typeof tour.bookings === "number" ? tour.bookings : 0
              const price = typeof tour.price === "string" ? tour.price : "$0"
              // No hotels in API, so skip hotels section
              return (
                <motion.div
                  key={`${tour.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={tour.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className="bg-gold-500 text-white font-semibold">Featured</Badge>
                        <Badge
                          className={`${difficultyColors[difficulty] || "bg-gray-100 text-gray-700"} font-medium`}
                        >
                          {difficulty}
                        </Badge>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-bronze-900">{rating}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-4 right-4 bg-bronze-900/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{price}</span>
                          </div>
                          <span className="text-xs text-gray-300">per person</span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{tour.duration}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-bronze-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                          {tour.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-bronze-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {(tour.destinations && tour.destinations.length > 0)
                              ? tour.destinations.map((d) => d.name).join(", ")
                              : "—"}
                          </span>
                        </div>
                      </div>

                      {/* Tour Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-bronze-600">
                          <Users className="w-4 h-4 text-gold-600" />
                          <span>{groupSize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-bronze-600">
                          <Clock className="w-4 h-4 text-gold-600" />
                          <span>{tour.duration}</span>
                        </div>
                      </div>

                      {/* No hotels in API, so skip hotels section */}

                      {/* Reviews */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-bronze-600">
                          ({reviews} {reviews === 1 ? "booking" : "bookings"})
                        </span>
                      </div>

                      {/* Highlights */}
                      {highlights.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-bronze-900 mb-2">Tour Highlights</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {highlights.slice(0, 4).map((highlight, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <Camera className="w-3 h-3 text-gold-600" />
                                <span className="text-xs text-bronze-700 truncate">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Included */}
                      {included.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-bronze-900 mb-2">What's Included</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {included.slice(0, 4).map((item, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-xs text-bronze-700 truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link href={`/tours/${tour.slug || tour.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300"
                          >
                            View Details
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleBookNow(tour)}
                          className="bg-gold-500 hover:bg-gold-600 text-white px-6 transition-all duration-300"
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {tours.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 text-bronze-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 text-bronze-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gold-500 scale-125" : "bg-bronze-300 hover:bg-bronze-400"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 text-sm text-bronze-600">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500" : "bg-gray-400"}`} />
          <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
        </div>
      </div>
      {isPopupOpen && selectedTour && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <TourBookingPopup
            preSelectedTour={selectedTour}
            onClose={() => {
              setIsPopupOpen(false)
              setselectedTour(null)
            }}
          />
        </div>
      )}
    </div>
  )
}
