"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Users, Hotel, CheckCircle, Calendar, Phone, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "@/components/tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

// API Umrah package type (based on provided API response)
type UmrahPackage = {
  id: string
  name: string
  description: string
  duration: number
  price: number
  currency: string
  total_duration: number
  duration_makkah: number
  duration_madinah: number
  package_type: string
  package_include: string[]
  hotel_ids: string[]
  departure_time: string
  return_time: string
  itinerary: any[]
  main_image?: string
  gallery_images: string[]
  included: string[]
  not_included: string[]
  accommodation: string
  flights_included: boolean
  transportation: string
  meals: string
  visa_assistance: boolean
  group_size: string
  available_seats: number
  bookings_count: number
  departure_date: string | null
  return_date: string | null
  status: string
  created_at: string
  updated_at: string
  hotels: any[]
}

const categoryConfig: Record<
  string,
  {
    stars: number
    color: string
    bgColor: string
    textColor: string
    borderColor: string
    label: string
  }
> = {
  economy: {
    stars: 3,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    label: "Economy",
  },
  premium: {
    stars: 5,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    label: "Premium",
  },
  executive: {
    stars: 7,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    label: "Executive",
  },
}

const DEFAULT_IMAGE = "/placeholder.svg"

export default function UmrahPackagesSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof categoryConfig>("economy")
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null)
  const [packages, setPackages] = useState<UmrahPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch packages from API (integrate with new API response shape)
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${BaseUrl}/api/umrah`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Umrah packages")
        return res.json()
      })
      .then((data) => {
        // API returns { success, data: { packages: [...], pagination: {...} } }
        if (data && data.success && Array.isArray(data.data?.packages)) {
          setPackages(data.data.packages)
        } else {
          setPackages([])
        }
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load Umrah packages.")
        setLoading(false)
      })
  }, [])

  // Group packages by package_type (case-insensitive)
  const groupedPackages = useMemo(() => {
    const groups: Record<string, UmrahPackage[]> = {
      economy: [],
      premium: [],
      executive: [],
    }
    for (const pkg of packages) {
      const type = (pkg.package_type || "").toLowerCase()
      if (groups[type]) {
        groups[type].push(pkg)
      }
    }
    return groups
  }, [packages])

  // Get current packages for active tab
  const getCurrentPackages = () => groupedPackages[activeTab] || []

  // Defensive: If currentPackageIndex is out of bounds, reset to 0
  useEffect(() => {
    const pkgs = getCurrentPackages()
    if (currentPackageIndex >= pkgs.length) {
      setCurrentPackageIndex(0)
    }
  }, [activeTab, groupedPackages])

  const currentPackages = getCurrentPackages()
  const currentPackage = currentPackages[currentPackageIndex] || null
  const config = categoryConfig[activeTab]

  const nextPackage = () => {
    const pkgs = getCurrentPackages()
    setCurrentPackageIndex((prev) => (pkgs.length ? (prev + 1) % pkgs.length : 0))
  }

  const prevPackage = () => {
    const pkgs = getCurrentPackages()
    setCurrentPackageIndex((prev) => (pkgs.length ? (prev - 1 + pkgs.length) % pkgs.length : 0))
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as keyof typeof categoryConfig)
    setCurrentPackageIndex(0)
  }

  const handleBookPackage = (pkg: UmrahPackage) => {
    setSelectedPackage(pkg)
    setIsBookingOpen(true)
  }

  // Helper: get image (API may not provide image)
  const getPackageImage = (pkg: UmrahPackage) => {
    // If API provides main_image, use it, else fallback
    return pkg.main_image ? pkg.main_image : DEFAULT_IMAGE
  }

  // Helper: get duration string
  const getDurationString = (pkg: UmrahPackage) => {
    if (typeof pkg.duration === "number" && !isNaN(pkg.duration)) {
      return `${pkg.duration} Nights`
    }
    if (typeof pkg.total_duration === "number" && !isNaN(pkg.total_duration)) {
      return `${pkg.total_duration} Nights`
    }
    return ""
  }

  // Helper: get features (prefer included, fallback to package_include)
  const getFeatures = (pkg: UmrahPackage) => {
    if (Array.isArray(pkg.included) && pkg.included.length > 0) {
      return pkg.included
    }
    if (Array.isArray(pkg.package_include)) {
      return pkg.package_include
    }
    return []
  }

  // Helper: get hotels (API may not provide, fallback to empty)
  const getHotels = (pkg: UmrahPackage) => {
    return Array.isArray(pkg.hotels) ? pkg.hotels : []
  }

  // Helper: get subtitle/description
  const getSubtitle = (pkg: UmrahPackage) => {
    return pkg.description || ""
  }

  // Helper: get group size (API provides group_size)
  const getGroupSize = (pkg: UmrahPackage) => {
    return pkg.group_size || "-"
  }

  // Helper: get category label
  const getCategoryLabel = (pkg: UmrahPackage) => {
    const type = (pkg.package_type || "").toLowerCase()
    return categoryConfig[type]?.label || type
  }

  // Helper: get price with currency
  const getPriceString = (pkg: UmrahPackage) => {
    if (pkg.price && pkg.currency) {
      // If USD, show $; else show currency code
      if (pkg.currency.toUpperCase() === "USD") {
        return `$${pkg.price}`
      }
      return `${pkg.price} ${pkg.currency}`
    }
    if (pkg.price) {
      return `$${pkg.price}`
    }
    return "-"
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
          <div className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-xl border border-bronze-100 w-full max-w-[85%] md:max-w-[58%]">
            {/* Mobile: 2 rows, Desktop: 1 row */}
            <div className="block md:hidden w-full">
              <div className="flex gap-1 sm:gap-2 w-full mb-2">
                {Object.entries(categoryConfig).slice(0, 2).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`flex-1 min-w-[6rem] md:min-w-[10rem] text-xs px-2 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === key
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105`
                        : "text-bronze-600 hover:text-bronze-900 hover:bg-bronze-50"
                      }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="capitalize">{config.label}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(config.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${activeTab === key ? "fill-yellow-300 text-yellow-300" : "fill-gold-400 text-gold-400"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-center w-full">
                {Object.entries(categoryConfig).slice(2, 3).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`min-w-[6rem] text-xs px-2 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === key
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105`
                        : "text-bronze-600 hover:text-bronze-900 hover:bg-bronze-50"
                      }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="capitalize">{config.label}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(config.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${activeTab === key ? "fill-yellow-300 text-yellow-300" : "fill-gold-400 text-gold-400"
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
                  className={`px-6 py-3 rounded-[1.2rem] font-semibold text-lg transition-all duration-300 flex items-center ${activeTab === key
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : "bg-transparent text-bronze-700"
                    }`}
                  style={{ marginRight: key !== Object.keys(categoryConfig)[Object.keys(categoryConfig).length - 1] ? '0.5rem' : 0 }}
                >
                  <span className="capitalize mr-2">{config.label}</span>
                  <span className="flex items-center">
                    {[...Array(config.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${activeTab === key
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

        {/* Loading/Error State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-bronze-700 text-lg font-semibold">Loading packages...</span>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-red-600 text-lg font-semibold">{error}</span>
          </div>
        )}

        {/* Package Display */}
        <AnimatePresence mode="wait">
          {!loading && !error && currentPackages.length > 0 && currentPackage && (
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
                      src={`${getPackageImage(currentPackage)}`}
                      alt={currentPackage.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Price Overlay */}
                    <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 text-white">
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm font-medium">from</span>
                        <span className="text-2xl sm:text-4xl font-bold">{getPriceString(currentPackage)}</span>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    {currentPackages.length > 1 && (
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
                          {getCategoryLabel(currentPackage)}
                        </Badge>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {[...Array(config.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-gold-400 text-gold-400" />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-bronze-900 mb-1 sm:mb-2">{currentPackage.name}</h3>
                      <p className="text-base sm:text-lg text-bronze-600 mb-2 sm:mb-4">{getSubtitle(currentPackage)}</p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-bronze-600 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                          <span className="text-xs sm:text-base">{getDurationString(currentPackage)}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                          <span className="text-xs sm:text-base">{getGroupSize(currentPackage)}</span>
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
                        {getHotels(currentPackage).length > 0 ? (
                          getHotels(currentPackage).map((hotel: any, i: number) => (
                            <div key={i} className="border border-bronze-200 rounded-lg p-2 sm:p-4 bg-bronze-50">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2 gap-1">
                                <div>
                                  <span className="font-semibold text-bronze-900 text-xs sm:text-base">
                                    {hotel.city || "-"} Hotel: ({hotel.nights || "-"} Nights)
                                  </span>
                                </div>
                                <div className="flex items-center gap-0.5 sm:gap-1">
                                  {[...Array(hotel.stars || 3)].map((_, starIndex) => (
                                    <Star key={starIndex} className="w-3 h-3 sm:w-4 sm:h-4 fill-gold-400 text-gold-400" />
                                  ))}
                                </div>
                              </div>
                              <h5 className="text-base sm:text-lg font-bold text-green-700 mb-0.5 sm:mb-1">{hotel.name || "-"}</h5>
                              <p className="text-xs sm:text-sm text-bronze-600">{hotel.distance || ""}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-bronze-600 text-sm">
                            {currentPackage.accommodation || "Hotel details will be provided upon request."}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 sm:mb-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                        {getFeatures(currentPackage).slice(0, 4).map((feature: string, i: number) => (
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
                    {currentPackages.length > 1 && (
                      <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
                        {currentPackages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPackageIndex(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentPackageIndex
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

        {/* Show message if no packages available for the selected tab */}
        {!loading && !error && currentPackages.length === 0 && (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-bronze-700 text-lg font-semibold">
              No {categoryConfig[activeTab]?.label || activeTab} packages are available right now.
            </span>
          </div>
        )}

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
                price: getPriceString(selectedPackage) as unknown as number,
                duration: getDurationString(selectedPackage),
                image: getPackageImage(selectedPackage),
              }}
              itemType="umrah"
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
