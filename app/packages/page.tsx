"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Search, Filter, Users, Hotel, Calendar, CheckCircle, MapPin, Clock, Plane } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "@/components/tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

const categories = ["All", "Economy", "Premium", "Executive"]
const priceRanges = ["All", "Under $2500", "$2500-$3500", "$3500-$4500", "Over $4500"]
const durations = ["All", "7-10 days", "11-14 days", "15+ days"]

const categoryColors = {
  Economy: "bg-green-100 text-green-700 border-green-300",
  Premium: "bg-blue-100 text-blue-700 border-blue-300",
  Executive: "bg-purple-100 text-purple-700 border-purple-300",
}

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set())
  const [umrahPackages, setUmrahPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true)
      setError(null)
      try {
        const baseUrl = typeof BaseUrl === "function" ? BaseUrl() : BaseUrl
        const res = await fetch(`${baseUrl}/api/umrah`)
        if (!res.ok) throw new Error("Failed to fetch packages")
        const data = await res.json()
        setUmrahPackages(data?.data?.packages || [])
      } catch (err: any) {
        setError(err.message || "Failed to load packages")
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  // Helper: get highlights (for compatibility with new API)
  const getHighlights = (pkg: any) => {
    // Try both 'highlights' and 'package_include'
    if (Array.isArray(pkg.highlights) && pkg.highlights.length > 0) return pkg.highlights
    if (Array.isArray(pkg.package_include) && pkg.package_include.length > 0) return pkg.package_include
    return []
  }

  // Helper: get included
  const getIncluded = (pkg: any) => {
    if (Array.isArray(pkg.included) && pkg.included.length > 0) return pkg.included
    if (Array.isArray(pkg.package_include) && pkg.package_include.length > 0) return pkg.package_include
    return []
  }

  // Helper: get group size
  const getGroupSize = (pkg: any) => {
    return pkg.group_size || pkg.groupSize || ""
  }

  // Helper: get hotels
  const getHotels = (pkg: any) => {
    return Array.isArray(pkg.hotels) ? pkg.hotels : []
  }

  // Helper: get price
  const getPrice = (pkg: any) => {
    return pkg.price
  }

  // Helper: get category/type
  const getCategory = (pkg: any) => {
    return pkg.category || pkg.package_type || ""
  }

  // Helper: get duration
  const getDuration = (pkg: any) => {
    return pkg.duration || pkg.total_duration || ""
  }

  // Helper: get main image
  const getMainImage = (pkg: any) => {
    return pkg.mainimage || pkg.main_image || "/placeholder.svg"
  }

  // Helper: get slug
  const getSlug = (pkg: any) => {
    return pkg.slug || pkg.id
  }

  // Helper: get description
  const getDescription = (pkg: any) => {
    return pkg.description || ""
  }

  // Helper: get itinerary
  const getItinerary = (pkg: any) => {
    return Array.isArray(pkg.itinerary) ? pkg.itinerary : []
  }

  // Helper: get rating
  const getRating = (pkg: any) => {
    return typeof pkg.rating === "number" ? pkg.rating : 4.5
  }

  // Helper: get reviews
  const getReviews = (pkg: any) => {
    return typeof pkg.reviews === "number" ? pkg.reviews : 0
  }

  // Helper: get original price
  const getOriginalPrice = (pkg: any) => {
    return pkg.originalPrice
  }

  // Helper: get currency
  const getCurrency = (pkg: any) => {
    return pkg.currency || "USD"
  }

  // Filtering logic
  const filteredPackages = umrahPackages?.filter((pkg) => {
    const name = pkg.name || ""
    const category = getCategory(pkg)
    const duration = getDuration(pkg)
    const price = getPrice(pkg)

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || category === selectedCategory
    const matchesDuration =
      selectedDuration === "All" ||
      (selectedDuration === "7-10 days" && Number(duration) <= 10) ||
      (selectedDuration === "11-14 days" && Number(duration) >= 11 && Number(duration) <= 14) ||
      (selectedDuration === "15+ days" && Number(duration) >= 15)
    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $2500" && price < 2500) ||
      (selectedPriceRange === "$2500-$3500" && price >= 2500 && price <= 3500) ||
      (selectedPriceRange === "$3500-$4500" && price >= 3500 && price <= 4500) ||
      (selectedPriceRange === "Over $4500" && price > 4500)

    return matchesSearch && matchesCategory && matchesDuration && matchesPrice
  })

  // Sorting logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getPrice(a) - getPrice(b)
      case "price-high":
        return getPrice(b) - getPrice(a)
      case "rating":
        return getRating(b) - getRating(a)
      default:
        return getReviews(b) - getReviews(a)
    }
  })

  const handleBookNow = (pkg: any) => {
    setSelectedPackage(pkg)
    setIsBookingOpen(true)
  }

  const toggleExpanded = (packageId: string) => {
    const newExpanded = new Set(expandedPackages)
    if (newExpanded.has(packageId)) {
      newExpanded.delete(packageId)
    } else {
      newExpanded.add(packageId)
    }
    setExpandedPackages(newExpanded)
  }

  const isExpanded = (packageId: string) => expandedPackages.has(packageId)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=600&fit=crop"
            alt="Umrah packages background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Umrah Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Embark on a sacred journey with our comprehensive Umrah packages designed for every budget and preference
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bronze-400 w-5 h-5" />
              <Input
                placeholder="Search Umrah packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            {loading ? (
              <p className="text-bronze-600">Loading packages...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : (
              <p className="text-bronze-600">
                Showing {sortedPackages.length} of {umrahPackages.length} packages
              </p>
            )}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <span className="text-bronze-600">Loading packages...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <span className="text-red-600">Error: {error}</span>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPackages.map((pkg, index) => {
                  const highlights = getHighlights(pkg)
                  const included = getIncluded(pkg)
                  const hotels = getHotels(pkg)
                  const groupSize = getGroupSize(pkg)
                  const price = getPrice(pkg)
                  const category = getCategory(pkg)
                  const duration = getDuration(pkg)
                  const mainImage = getMainImage(pkg)
                  const slug = getSlug(pkg)
                  const description = getDescription(pkg)
                  const itinerary = getItinerary(pkg)
                  const rating = getRating(pkg)
                  const reviews = getReviews(pkg)
                  const originalPrice = getOriginalPrice(pkg)
                  const currency = getCurrency(pkg)

                  // Show "Read More" button only if there are highlights or itinerary, otherwise show included directly
                  const canExpand = (Array.isArray(highlights) && highlights.length > 0) || (Array.isArray(itinerary) && itinerary.length > 0)

                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <img
                            src={typeof mainImage === 'string' ? mainImage : "/placeholder.svg"}
                            alt={pkg.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          <div className="absolute top-4 left-4">
                            <Badge
                              className={`${categoryColors[category as keyof typeof categoryColors] || ""} font-semibold border`}
                            >
                              {category}
                            </Badge>
                          </div>

                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{rating}</span>
                            </div>
                          </div>

                          {/* Price Badge */}
                          <div className="absolute bottom-4 right-4 bg-gold-500 text-white rounded-lg px-3 py-2">
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">
                                  {currency === "USD" ? "$" : currency}{price}
                                </span>
                                {originalPrice && (
                                  <span className="text-xs line-through text-gold-200">
                                    {currency === "USD" ? "$" : currency}{originalPrice}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs">per person</span>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-6 flex flex-col flex-1">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-bronze-900 mb-1 group-hover:text-gold-600 transition-colors">
                              {pkg.name}
                            </h3>
                            <p className="text-sm text-bronze-600 mb-3">{pkg.subtitle}</p>

                            <div className="flex items-center gap-4 text-sm text-bronze-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{groupSize}</span>
                              </div>
                            </div>
                          </div>

                          {/* Hotels Section */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-bronze-900 mb-2 flex items-center gap-2">
                              <Hotel className="w-4 h-4 text-gold-600" />
                              Hotels
                            </h4>
                            <div className="space-y-2">
                              {hotels.length > 0 ? (
                                hotels.map((hotel: any, i: number) => (
                                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-bronze-900 truncate flex-1 mr-2">
                                        {hotel.name}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        {[...Array(hotel.stars || 0)].map((_: any, starIndex: number) => (
                                          <Star key={starIndex} className="w-3 h-3 fill-gold-400 text-gold-400" />
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-bronze-600">
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {hotel.distance}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {hotel.nights} nights
                                      </span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-bronze-600">No hotel details available</div>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <div className="mb-4 flex-1">
                            <p className="text-sm text-bronze-700 leading-relaxed">
                              {isExpanded(pkg.id) ? description : `${description.substring(0, 120)}${description.length > 120 ? "..." : ""}`}
                            </p>

                            {/* Expanded Content or Included if no highlights */}
                            {isExpanded(pkg.id) && canExpand && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 space-y-3"
                              >
                                {/* Highlights */}
                                {Array.isArray(highlights) && highlights.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-bronze-900 mb-2">Package Highlights</h5>
                                    <div className="grid grid-cols-2 gap-1">
                                      {highlights.map((highlight: string, i: number) => (
                                        <div key={i} className="flex items-center gap-1">
                                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                          <span className="text-xs text-bronze-700">{highlight.replace(/^\.\s*/, "")}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Included */}
                                {Array.isArray(included) && included.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-bronze-900 mb-2">What's Included</h5>
                                    <div className="grid grid-cols-2 gap-1">
                                      {included.map((item: string, i: number) => (
                                        <div key={i} className="flex items-center gap-1">
                                          <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                          <span className="text-xs text-bronze-700">{item.replace(/^\.\s*/, "")}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Brief Itinerary */}
                                {Array.isArray(itinerary) && itinerary.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-bronze-900 mb-2">Brief Itinerary</h5>
                                    <div className="space-y-1">
                                      {itinerary.map((day: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2">
                                          <Plane className="w-3 h-3 text-gold-600 mt-1 flex-shrink-0" />
                                          <span className="text-xs text-bronze-700">{day}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}

                            {/* If not expandable, show included directly */}
                            {!canExpand && Array.isArray(included) && included.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-semibold text-bronze-900 mb-2">What's Included</h5>
                                <div className="grid grid-cols-2 gap-1">
                                  {included.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                      <span className="text-xs text-bronze-700">{item.replace(/^\.\s*/, "")}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

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
                            <span className="text-sm text-bronze-600">({reviews} reviews)</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3 mt-auto">
                            {canExpand && (
                              <Button
                                variant="outline"
                                className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300"
                                onClick={() => toggleExpanded(pkg.id)}
                              >
                                {isExpanded(pkg.id) ? "Show Less" : "Read More"}
                              </Button>
                            )}

                            <div className="flex gap-2">
                              <Link href={`/packages/${slug}`} className="flex-1">
                                <Button
                                  variant="outline"
                                  className="w-full border-bronze-300 text-bronze-600 hover:bg-bronze-50 transition-all duration-300"
                                >
                                  View Details
                                </Button>
                              </Link>
                              <Button
                                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white transition-all duration-300"
                                onClick={() => handleBookNow(pkg)}
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {sortedPackages.length === 0 && (
                <div className="text-center py-16">
                  <Filter className="w-16 h-16 text-bronze-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-bronze-900 mb-2">No packages found</h3>
                  <p className="text-bronze-600">Try adjusting your filters to see more results</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-bronze-900">
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
                image: selectedPackage.image || selectedPackage.main_image,
              }}
              itemType="umrah"
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
