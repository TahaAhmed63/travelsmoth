"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Users, Hotel, CheckCircle, Calendar, Phone, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "@/components/tour-booking-popup"

const umrahPackages = {
  economy: [
    {
      id: "umrah-economy-basic",
      name: "Economy Umrah Package",
      subtitle: "Essential Pilgrimage Experience",
      duration: "14 days / 13 nights",
      price: 1899,
      originalPrice: 2199,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop",
      category: "Economy",
      groupSize: "20-30 people",
      hotels: [
        { name: "Riyadh Al Deafah Hotel", stars: 3, nights: 8, distance: "800m from Haram", city: "Makkah" },
        { name: "Saraya Taba Hotel", stars: 3, nights: 5, distance: "500m from Masjid Nabawi", city: "Madinah" },
      ],
      highlights: ["Visa processing", "Round trip flights", "Ground transportation", "Ziyarat tours"],
      included: ["3-star accommodation", "Daily breakfast", "Airport transfers", "Umrah guide"],
      features: ["Shared transportation", "Group Ziyarat", "Basic meals", "Standard room"],
    },
    {
      id: "umrah-economy-plus",
      name: "Economy Plus Umrah",
      subtitle: "Enhanced Value Package",
      duration: "14 days / 13 nights",
      price: 2299,
      originalPrice: 2599,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop",
      category: "Economy",
      groupSize: "15-25 people",
      hotels: [
        { name: "Makkah Comfort Hotel", stars: 3, nights: 8, distance: "600m from Haram", city: "Makkah" },
        { name: "Madinah Standard Hotel", stars: 3, nights: 5, distance: "400m from Masjid Nabawi", city: "Madinah" },
      ],
      highlights: ["Fast visa processing", "Direct flights", "AC transportation", "Extended Ziyarat"],
      included: ["3-star+ accommodation", "Breakfast & dinner", "All transfers", "Professional guide"],
      features: ["AC transportation", "Extended tours", "Better meals", "Upgraded rooms"],
    },
  ],
  premium: [
    {
      id: "umrah-premium-deluxe",
      name: "Premium Umrah Package",
      subtitle: "Superior Comfort & Service",
      duration: "14 days / 13 nights",
      price: 2899,
      originalPrice: 3299,
      rating: 4.8,
      reviews: 298,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Premium",
      groupSize: "10-15 people",
      hotels: [
        { name: "Makkah Premium Hotel", stars: 4, nights: 8, distance: "300m from Haram", city: "Makkah" },
        { name: "Madinah Deluxe Hotel", stars: 4, nights: 5, distance: "200m from Masjid Nabawi", city: "Madinah" },
      ],
      highlights: ["Priority visa", "Premium flights", "Private transport", "Comprehensive Ziyarat"],
      included: ["4-star accommodation", "All meals", "Private transfers", "Expert guide"],
      features: ["Private transportation", "All meals included", "Premium location", "Spacious rooms"],
    },
    {
      id: "umrah-premium-luxury",
      name: "Premium Luxury Umrah",
      subtitle: "Elevated Pilgrimage Experience",
      duration: "14 days / 13 nights",
      price: 3499,
      originalPrice: 3899,
      rating: 4.9,
      reviews: 187,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop",
      category: "Premium",
      groupSize: "8-12 people",
      hotels: [
        { name: "Makkah Luxury Hotel", stars: 4, nights: 8, distance: "200m from Haram", city: "Makkah" },
        { name: "Madinah Premium Resort", stars: 4, nights: 5, distance: "150m from Masjid Nabawi", city: "Madinah" },
      ],
      highlights: ["Express visa", "Business class option", "Luxury transport", "VIP Ziyarat"],
      included: ["4-star+ accommodation", "Premium meals", "Luxury transfers", "VIP guide"],
      features: ["Luxury vehicles", "Premium dining", "Prime location", "Suite rooms"],
    },
  ],
  executive: [
    {
      id: "umrah-executive-royal",
      name: "Executive Umrah Package",
      subtitle: "Luxury & Exclusivity",
      duration: "14 days / 13 nights",
      price: 4299,
      originalPrice: 4799,
      rating: 4.9,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop",
      category: "Executive",
      groupSize: "4-8 people",
      hotels: [
        { name: "Makkah Royal Hotel", stars: 5, nights: 8, distance: "100m from Haram", city: "Makkah" },
        { name: "Madinah Executive Hotel", stars: 5, nights: 5, distance: "50m from Masjid Nabawi", city: "Madinah" },
      ],
      highlights: ["VIP visa service", "Business class flights", "Private chauffeur", "Exclusive tours"],
      included: ["5-star accommodation", "Gourmet meals", "Private chauffeur", "Personal guide"],
      features: ["Private chauffeur", "Gourmet dining", "Haram view rooms", "VIP services"],
    },
    {
      id: "umrah-executive-platinum",
      name: "Platinum Executive Umrah",
      subtitle: "Ultimate Sacred Journey",
      duration: "14 days / 13 nights",
      price: 5999,
      originalPrice: 6499,
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Executive",
      groupSize: "2-6 people",
      hotels: [
        { name: "Makkah Presidential Suite", stars: 5, nights: 8, distance: "Direct Haram access", city: "Makkah" },
        { name: "Madinah Royal Suite", stars: 5, nights: 5, distance: "Direct Masjid access", city: "Madinah" },
      ],
      highlights: ["Instant visa", "First class flights", "Personal butler", "Private tours"],
      included: ["Presidential suites", "Personal chef", "Butler service", "Private scholar"],
      features: ["Butler service", "Personal chef", "Presidential suites", "Exclusive access"],
    },
  ],
}

const categoryConfig = {
  economy: {
    stars: 3,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  premium: {
    stars: 5,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  executive: {
    stars: 7,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
}

export default function UmrahPackagesSection() {
  const [activeTab, setActiveTab] = useState("economy")
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  const handleBookPackage = (pkg: any) => {
    setSelectedPackage(pkg)
    setIsBookingOpen(true)
  }

  const getCurrentPackages = () => {
    return umrahPackages[activeTab as keyof typeof umrahPackages] || []
  }

  const currentPackage = getCurrentPackages()[currentPackageIndex]
  const config = categoryConfig[activeTab as keyof typeof categoryConfig]

  const nextPackage = () => {
    const packages = getCurrentPackages()
    setCurrentPackageIndex((prev) => (prev + 1) % packages.length)
  }

  const prevPackage = () => {
    const packages = getCurrentPackages()
    setCurrentPackageIndex((prev) => (prev - 1 + packages.length) % packages.length)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPackageIndex(0)
  }

  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-cream-50 via-white to-gold-50">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-bronze-900 mb-2 md:mb-4">Umrah Packages</h2>
          <p className="text-base sm:text-lg md:text-xl text-bronze-600 max-w-2xl mx-auto">
            Experience the sacred journey with our carefully crafted Umrah packages designed for every budget and
            preference
          </p>
        </motion.div>

        {/* Modern Tab Navigation */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-xl border border-bronze-100 w-full max-w-[55%]">
            {/* Mobile: 2 rows, Desktop: 1 row */}
            <div className="block md:hidden w-full">
              <div className="flex gap-1 sm:gap-2 w-full mb-2">
                {Object.entries(categoryConfig).slice(0,2).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`flex-1 min-w-[6rem] md:min-w-[10rem] text-xs px-2 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === key
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105`
                        : "text-bronze-600 hover:text-bronze-900 hover:bg-bronze-50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="capitalize">{key}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(config.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              activeTab === key ? "fill-yellow-300 text-yellow-300" : "fill-gold-400 text-gold-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-center w-full">
                {Object.entries(categoryConfig).slice(2,3).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`min-w-[6rem] text-xs px-2 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === key
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105`
                        : "text-bronze-600 hover:text-bronze-900 hover:bg-bronze-50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="capitalize">{key}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(config.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              activeTab === key ? "fill-yellow-300 text-yellow-300" : "fill-gold-400 text-gold-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Desktop: single row */}
            <div className="hidden md:inline-flex items-center w-auto mx-auto">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`px-6 py-3 rounded-[1.2rem] font-semibold text-lg transition-all duration-300 flex items-center ${
                    activeTab === key
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : "bg-transparent text-bronze-700"
                  }`}
                  style={{ marginRight: key !== Object.keys(categoryConfig)[Object.keys(categoryConfig).length - 1] ? '0.5rem' : 0 }}
                >
                  <span className="capitalize mr-2">{key}</span>
                  <span className="flex items-center">
                    {[...Array(config.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          activeTab === key
                            ? "fill-yellow-300 text-yellow-300"
                            : "fill-gold-400 text-gold-400"
                        }`}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Package Display */}
        <AnimatePresence mode="wait">
          {currentPackage && (
            <motion.div
              key={`${activeTab}-${currentPackageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto"
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-white">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-56 sm:h-72 md:h-96 lg:h-auto overflow-hidden min-h-[220px]">
                    <img
                      src={currentPackage.image || "/placeholder.svg"}
                      alt={currentPackage.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Price Overlay */}
                    <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 text-white">
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm font-medium">from</span>
                        <span className="text-2xl sm:text-4xl font-bold">${currentPackage.price}</span>
                      </div>
                      {currentPackage.originalPrice && (
                        <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                          <span className="text-base sm:text-lg line-through text-gray-300">${currentPackage.originalPrice}</span>
                          <Badge className="bg-red-500 text-white text-xs">
                            Save ${currentPackage.originalPrice - currentPackage.price}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Navigation Arrows */}
                    {getCurrentPackages().length > 1 && (
                      <>
                        <button
                          onClick={prevPackage}
                          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-bronze-900 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                        >
                          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={nextPackage}
                          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-bronze-900 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                        >
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="mb-4 sm:mb-6">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <Badge
                          className={`${config.bgColor} ${config.textColor} ${config.borderColor} border font-semibold px-2 sm:px-3 py-0.5 sm:py-1`}
                        >
                          {currentPackage.category}
                        </Badge>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {[...Array(config.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-gold-400 text-gold-400" />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-bronze-900 mb-1 sm:mb-2">{currentPackage.name}</h3>
                      <p className="text-base sm:text-lg text-bronze-600 mb-2 sm:mb-4">{currentPackage.subtitle}</p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-bronze-600 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                          <span className="text-xs sm:text-base">{currentPackage.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                          <span className="text-xs sm:text-base">{currentPackage.groupSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hotels Section */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-bold text-bronze-900 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
                        <Hotel className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                        Accommodations
                      </h4>
                      <div className="space-y-2 sm:space-y-4">
                        {currentPackage.hotels.map((hotel: any, i: number) => (
                          <div key={i} className="border border-bronze-200 rounded-lg p-2 sm:p-4 bg-bronze-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2 gap-1">
                              <div>
                                <span className="font-semibold text-bronze-900 text-xs sm:text-base">
                                  {hotel.city} Hotel: ({hotel.nights} Nights)
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 sm:gap-1">
                                {[...Array(hotel.stars)].map((_, starIndex) => (
                                  <Star key={starIndex} className="w-3 h-3 sm:w-4 sm:h-4 fill-gold-400 text-gold-400" />
                                ))}
                              </div>
                            </div>
                            <h5 className="text-base sm:text-lg font-bold text-green-700 mb-0.5 sm:mb-1">{hotel.name}</h5>
                            <p className="text-xs sm:text-sm text-bronze-600">{hotel.distance}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 sm:mb-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                        {currentPackage.features.slice(0, 4).map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-1 sm:gap-2">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-bronze-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-bronze-300 text-bronze-700 hover:bg-bronze-50 py-2 sm:py-3 text-base sm:text-lg font-semibold"
                      >
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">+1 (555) 123-4567</span>
                        <span className="inline xs:hidden">Call</span>
                      </Button>
                      <Button
                        onClick={() => handleBookPackage(currentPackage)}
                        className={`flex-1 bg-gradient-to-r ${config.color} hover:opacity-90 text-white py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-lg`}
                      >
                        Enquire Now
                      </Button>
                    </div>

                    {/* Package Indicators */}
                    {getCurrentPackages().length > 1 && (
                      <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
                        {getCurrentPackages().map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPackageIndex(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                              index === currentPackageIndex
                                ? `bg-gradient-to-r ${config.color}`
                                : "bg-bronze-300 hover:bg-bronze-400"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <Link href="/packages">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold-500 to-bronze-600 hover:from-gold-600 hover:to-bronze-700 text-white px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl"
            >
              View All Umrah Packages
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-full sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl font-bold text-bronze-900">
              Book Your Umrah Package: {selectedPackage?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <TourBookingPopup
              preSelectedTour={{
                id: selectedPackage.id,
                name: selectedPackage.name,
                price: selectedPackage.price,
                duration: selectedPackage.duration,
                image: selectedPackage.image,
              }}
              onClose={() => setIsBookingOpen(false)}
              isUmrah={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
