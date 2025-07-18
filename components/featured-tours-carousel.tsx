"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, ChevronLeft, ChevronRight, Calendar, Hotel, Camera } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "./tour-booking-popup"

const featuredTours = [
  {
    id: 1,
    title: "Bali Paradise Adventure",
    destination: "Bali, Indonesia",
    duration: "7 days / 6 nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop&crop=center",
    category: "Adventure",
    groupSize: "8-12 people",
    hotels: [
      { name: "Seminyak Beach Resort", stars: 4, nights: 2 },
      { name: "Ubud Jungle Resort", stars: 4, nights: 2 },
      { name: "Sanur Beach Hotel", stars: 4, nights: 2 },
    ],
    highlights: ["Temple visits", "Rice terraces", "Beach relaxation", "Cultural experiences"],
    included: ["Accommodation", "Daily breakfast", "Transportation", "Guide"],
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "European Grand Tour",
    destination: "Europe (5 Countries)",
    duration: "14 days / 13 nights",
    price: 2899,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&crop=center",
    category: "Cultural",
    groupSize: "12-16 people",
    hotels: [
      { name: "Paris Luxury Hotel", stars: 5, nights: 3 },
      { name: "Rome Historic Hotel", stars: 4, nights: 3 },
      { name: "Barcelona Modern Hotel", stars: 4, nights: 2 },
      { name: "Amsterdam Canal Hotel", stars: 4, nights: 2 },
      { name: "London Premium Hotel", stars: 5, nights: 3 },
    ],
    highlights: ["Historic cities", "Art museums", "Local cuisine", "Architecture tours"],
    included: ["Luxury accommodation", "Daily breakfast", "High-speed train", "Expert guide"],
    difficulty: "Moderate",
  },
  {
    id: 3,
    title: "Safari Kenya Experience",
    destination: "Kenya, Africa",
    duration: "10 days / 9 nights",
    price: 2199,
    originalPrice: 2699,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=center",
    category: "Wildlife",
    groupSize: "6-10 people",
    hotels: [
      { name: "Nairobi Safari Lodge", stars: 4, nights: 2 },
      { name: "Masai Mara Luxury Camp", stars: 5, nights: 3 },
      { name: "Amboseli Eco Lodge", stars: 4, nights: 2 },
      { name: "Tsavo Safari Camp", stars: 4, nights: 2 },
    ],
    highlights: ["Big Five safari", "Masai Mara", "Cultural villages", "Hot air balloon"],
    included: ["Safari lodge accommodation", "All meals", "Game drives", "Professional guide"],
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Japan Cherry Blossom",
    destination: "Japan",
    duration: "12 days / 11 nights",
    price: 3299,
    originalPrice: 3799,
    rating: 4.9,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&h=400&fit=crop&crop=center",
    category: "Cultural",
    groupSize: "10-14 people",
    hotels: [
      { name: "Tokyo Imperial Hotel", stars: 5, nights: 4 },
      { name: "Kyoto Traditional Ryokan", stars: 4, nights: 3 },
      { name: "Osaka Modern Hotel", stars: 4, nights: 2 },
      { name: "Hiroshima Peace Hotel", stars: 4, nights: 2 },
    ],
    highlights: ["Cherry blossoms", "Traditional temples", "Bullet trains", "Tea ceremonies"],
    included: ["Premium accommodation", "Daily breakfast", "JR Pass", "Cultural guide"],
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Patagonia Trekking",
    destination: "Argentina & Chile",
    duration: "15 days / 14 nights",
    price: 3799,
    originalPrice: 4299,
    rating: 4.7,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop&crop=center",
    category: "Adventure",
    groupSize: "8-12 people",
    hotels: [
      { name: "Buenos Aires Boutique Hotel", stars: 4, nights: 2 },
      { name: "El Calafate Glacier Lodge", stars: 4, nights: 3 },
      { name: "Torres del Paine Eco Lodge", stars: 4, nights: 4 },
      { name: "Puerto Natales Mountain Hotel", stars: 3, nights: 3 },
      { name: "Santiago City Hotel", stars: 4, nights: 2 },
    ],
    highlights: ["Torres del Paine", "Glacier hiking", "Wildlife spotting", "Mountain lodges"],
    included: ["Mountain lodge accommodation", "All meals", "Trekking gear", "Expert guide"],
    difficulty: "Challenging",
  },
]

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Challenging: "bg-red-100 text-red-700",
}

export default function FeaturedToursCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedTour, setselectedTour] = useState<PreSelectedTour | null>(null)

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTours.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTours.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTours.length) % featuredTours.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getVisibleTours = () => {
    const tours = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % featuredTours.length
      tours.push({ ...featuredTours[index], slideIndex: i })
    }
    return tours
  }
  const handleBookNow = (tour: typeof featuredTours[0]) => {
    setselectedTour({
      id: tour.id,
      name: tour.title,
      price: tour.price,
      duration: tour.duration, // You can adjust this based on your needs
      image: tour.image
    })
    setIsPopupOpen(true)
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
            {getVisibleTours().map((tour, index) => (
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
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-gold-500 text-white font-semibold">{tour.category}</Badge>
                      <Badge
                        className={`${difficultyColors[tour.difficulty as keyof typeof difficultyColors]} font-medium`}
                      >
                        {tour.difficulty}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-bronze-900">{tour.rating}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 bg-bronze-900/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">${tour.price}</span>
                          {tour.originalPrice && (
                            <span className="text-sm line-through text-gray-300">${tour.originalPrice}</span>
                          )}
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
                        <span>{tour.destination}</span>
                      </div>
                    </div>

                    {/* Tour Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-bronze-600">
                        <Users className="w-4 h-4 text-gold-600" />
                        <span>{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-bronze-600">
                        <Clock className="w-4 h-4 text-gold-600" />
                        <span>{tour.duration.split(" / ")[0]}</span>
                      </div>
                    </div>

                    {/* Hotels Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-bronze-900 mb-2 flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-gold-600" />
                        Accommodations ({tour.hotels.length} hotels)
                      </h4>
                      <div className="space-y-1">
                        {tour.hotels.slice(0, 2).map((hotel, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <span className="text-bronze-700 truncate flex-1 mr-2">{hotel.name}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(hotel.stars)].map((_, starIndex) => (
                                <Star key={starIndex} className="w-3 h-3 fill-gold-400 text-gold-400" />
                              ))}
                              <span className="text-bronze-500 ml-1">({hotel.nights}n)</span>
                            </div>
                          </div>
                        ))}
                        {tour.hotels.length > 2 && (
                          <div className="text-xs text-bronze-500">+{tour.hotels.length - 2} more hotels</div>
                        )}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(tour.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-bronze-600">({tour.reviews} reviews)</span>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-bronze-900 mb-2">Tour Highlights</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {tour.highlights.slice(0, 4).map((highlight, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Camera className="w-3 h-3 text-gold-600" />
                            <span className="text-xs text-bronze-700 truncate">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Included */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-bronze-900 mb-2">What's Included</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {tour.included.slice(0, 4).map((item, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-xs text-bronze-700 truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link href={`/tours/${tour.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button        onClick={() => handleBookNow(tour)} className="bg-gold-500 hover:bg-gold-600 text-white px-6 transition-all duration-300">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
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
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {featuredTours.map((_, index) => (
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
