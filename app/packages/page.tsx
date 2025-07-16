"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Search, Filter, Users, Hotel, Calendar, CheckCircle, MapPin, Clock, Plane } from "lucide-react"
import Link from "next/link"
import TourBookingPopup from "@/components/tour-booking-popup"

const umrahPackages = [
  {
    id: "umrah-economy-basic",
    name: "Economy Umrah Package",
    subtitle: "Essential Pilgrimage Experience",
    duration: "14 days / 13 nights",
    price: 1899,
    originalPrice: 2199,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=500&h=350&fit=crop",
    category: "Economy",
    groupSize: "20-30 people",
    hotels: [
      { name: "Riyadh Al Deafah Hotel", stars: 3, nights: 8, distance: "800m from Haram", city: "Makkah" },
      { name: "Saraya Taba Hotel", stars: 3, nights: 5, distance: "500m from Masjid Nabawi", city: "Madinah" },
    ],
    highlights: ["Visa processing", "Round trip flights", "Ground transportation", "Ziyarat tours"],
    included: ["3-star accommodation", "Daily breakfast", "Airport transfers", "Umrah guide"],
    features: ["Shared transportation", "Group Ziyarat", "Basic meals", "Standard room"],
    description:
      "Perfect for first-time pilgrims seeking an affordable yet comprehensive Umrah experience. This package includes all essential services with comfortable 3-star accommodations in both holy cities.",
    itinerary: [
      "Day 1-2: Arrival in Jeddah, transfer to Makkah",
      "Day 3-9: Makkah stay with Umrah rituals",
      "Day 10-14: Madinah visit and Ziyarat tours",
      "Day 15: Departure from Madinah",
    ],
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
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=500&h=350&fit=crop",
    category: "Economy",
    groupSize: "15-25 people",
    hotels: [
      { name: "Makkah Comfort Hotel", stars: 3, nights: 8, distance: "600m from Haram", city: "Makkah" },
      { name: "Madinah Standard Hotel", stars: 3, nights: 5, distance: "400m from Masjid Nabawi", city: "Madinah" },
    ],
    highlights: ["Fast visa processing", "Direct flights", "AC transportation", "Extended Ziyarat"],
    included: ["3-star+ accommodation", "Breakfast & dinner", "All transfers", "Professional guide"],
    features: ["AC transportation", "Extended tours", "Better meals", "Upgraded rooms"],
    description:
      "An enhanced economy package with better accommodations, closer to the holy sites, and additional meal options. Ideal for families seeking comfort without premium pricing.",
    itinerary: [
      "Day 1-2: Direct flight to Jeddah, VIP transfer",
      "Day 3-9: Enhanced Makkah experience",
      "Day 10-14: Extended Madinah tours",
      "Day 15: Comfortable departure",
    ],
  },
  {
    id: "umrah-premium-deluxe",
    name: "Premium Umrah Package",
    subtitle: "Superior Comfort & Service",
    duration: "14 days / 13 nights",
    price: 2899,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=350&fit=crop",
    category: "Premium",
    groupSize: "10-15 people",
    hotels: [
      { name: "Makkah Premium Hotel", stars: 4, nights: 8, distance: "300m from Haram", city: "Makkah" },
      { name: "Madinah Deluxe Hotel", stars: 4, nights: 5, distance: "200m from Masjid Nabawi", city: "Madinah" },
    ],
    highlights: ["Priority visa", "Premium flights", "Private transport", "Comprehensive Ziyarat"],
    included: ["4-star accommodation", "All meals", "Private transfers", "Expert guide"],
    features: ["Private transportation", "All meals included", "Premium location", "Spacious rooms"],
    description:
      "Experience premium comfort with 4-star accommodations, private transportation, and comprehensive meal plans. Perfect for those seeking elevated service and convenience.",
    itinerary: [
      "Day 1-2: Premium flight experience",
      "Day 3-9: Luxury Makkah stay",
      "Day 10-14: Premium Madinah experience",
      "Day 15: First-class departure",
    ],
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
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=500&h=350&fit=crop",
    category: "Premium",
    groupSize: "8-12 people",
    hotels: [
      { name: "Makkah Luxury Hotel", stars: 4, nights: 8, distance: "200m from Haram", city: "Makkah" },
      { name: "Madinah Premium Resort", stars: 4, nights: 5, distance: "150m from Masjid Nabawi", city: "Madinah" },
    ],
    highlights: ["Express visa", "Business class option", "Luxury transport", "VIP Ziyarat"],
    included: ["4-star+ accommodation", "Premium meals", "Luxury transfers", "VIP guide"],
    features: ["Luxury vehicles", "Premium dining", "Prime location", "Suite rooms"],
    description:
      "Luxury pilgrimage experience with business class flights, suite accommodations, and VIP services. Designed for discerning travelers who value comfort and exclusivity.",
    itinerary: [
      "Day 1-2: Business class arrival",
      "Day 3-9: Luxury Makkah suite experience",
      "Day 10-14: VIP Madinah tours",
      "Day 15: Premium departure service",
    ],
  },
  {
    id: "umrah-executive-royal",
    name: "Executive Umrah Package",
    subtitle: "Luxury & Exclusivity",
    duration: "14 days / 13 nights",
    price: 4299,
    originalPrice: 4799,
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=500&h=350&fit=crop",
    category: "Executive",
    groupSize: "4-8 people",
    hotels: [
      { name: "Makkah Royal Hotel", stars: 5, nights: 8, distance: "100m from Haram", city: "Makkah" },
      { name: "Madinah Executive Hotel", stars: 5, nights: 5, distance: "50m from Masjid Nabawi", city: "Madinah" },
    ],
    highlights: ["VIP visa service", "Business class flights", "Private chauffeur", "Exclusive tours"],
    included: ["5-star accommodation", "Gourmet meals", "Private chauffeur", "Personal guide"],
    features: ["Private chauffeur", "Gourmet dining", "Haram view rooms", "VIP services"],
    description:
      "Executive-level pilgrimage with 5-star luxury, private chauffeur service, and exclusive access. Perfect for those seeking the ultimate in comfort and personalized service.",
    itinerary: [
      "Day 1-2: VIP arrival and royal treatment",
      "Day 3-9: Executive Makkah experience",
      "Day 10-14: Royal Madinah service",
      "Day 15: Exclusive departure",
    ],
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=350&fit=crop",
    category: "Executive",
    groupSize: "2-6 people",
    hotels: [
      { name: "Makkah Presidential Suite", stars: 5, nights: 8, distance: "Direct Haram access", city: "Makkah" },
      { name: "Madinah Royal Suite", stars: 5, nights: 5, distance: "Direct Masjid access", city: "Madinah" },
    ],
    highlights: ["Instant visa", "First class flights", "Personal butler", "Private tours"],
    included: ["Presidential suites", "Personal chef", "Butler service", "Private scholar"],
    features: ["Butler service", "Personal chef", "Presidential suites", "Exclusive access"],
    description:
      "The ultimate luxury pilgrimage experience with presidential suites, personal butler, private chef, and first-class everything. Reserved for those who demand absolute excellence.",
    itinerary: [
      "Day 1-2: First-class arrival with butler service",
      "Day 3-9: Presidential Makkah experience",
      "Day 10-14: Royal Madinah with private scholar",
      "Day 15: Platinum departure service",
    ],
  },
]

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

  const filteredPackages = umrahPackages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory
    const matchesDuration =
      selectedDuration === "All" ||
      (selectedDuration === "7-10 days" && Number.parseInt(pkg.duration) <= 10) ||
      (selectedDuration === "11-14 days" &&
        Number.parseInt(pkg.duration) >= 11 &&
        Number.parseInt(pkg.duration) <= 14) ||
      (selectedDuration === "15+ days" && Number.parseInt(pkg.duration) >= 15)
    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $2500" && pkg.price < 2500) ||
      (selectedPriceRange === "$2500-$3500" && pkg.price >= 2500 && pkg.price <= 3500) ||
      (selectedPriceRange === "$3500-$4500" && pkg.price >= 3500 && pkg.price <= 4500) ||
      (selectedPriceRange === "Over $4500" && pkg.price > 4500)

    return matchesSearch && matchesCategory && matchesDuration && matchesPrice
  })

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return b.reviews - a.reviews
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
            <p className="text-bronze-600">
              Showing {sortedPackages.length} of {umrahPackages.length} packages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPackages.map((pkg, index) => (
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
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${categoryColors[pkg.category as keyof typeof categoryColors]} font-semibold border`}
                      >
                        {pkg.category}
                      </Badge>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{pkg.rating}</span>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-gold-500 text-white rounded-lg px-3 py-2">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">${pkg.price}</span>
                          {pkg.originalPrice && (
                            <span className="text-xs line-through text-gold-200">${pkg.originalPrice}</span>
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
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{pkg.groupSize}</span>
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
                        {pkg.hotels.map((hotel, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-bronze-900 truncate flex-1 mr-2">
                                {hotel.name}
                              </span>
                              <div className="flex items-center gap-1">
                                {[...Array(hotel.stars)].map((_, starIndex) => (
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
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4 flex-1">
                      <p className="text-sm text-bronze-700 leading-relaxed">
                        {isExpanded(pkg.id) ? pkg.description : `${pkg.description.substring(0, 120)}...`}
                      </p>

                      {/* Expanded Content */}
                      {isExpanded(pkg.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-3"
                        >
                          {/* Highlights */}
                          <div>
                            <h5 className="font-semibold text-bronze-900 mb-2">Package Highlights</h5>
                            <div className="grid grid-cols-2 gap-1">
                              {pkg.highlights.map((highlight, i) => (
                                <div key={i} className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span className="text-xs text-bronze-700">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Included */}
                          <div>
                            <h5 className="font-semibold text-bronze-900 mb-2">What's Included</h5>
                            <div className="grid grid-cols-2 gap-1">
                              {pkg.included.map((item, i) => (
                                <div key={i} className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                  <span className="text-xs text-bronze-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Brief Itinerary */}
                          <div>
                            <h5 className="font-semibold text-bronze-900 mb-2">Brief Itinerary</h5>
                            <div className="space-y-1">
                              {pkg.itinerary.map((day, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Plane className="w-3 h-3 text-gold-600 mt-1 flex-shrink-0" />
                                  <span className="text-xs text-bronze-700">{day}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(pkg.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-bronze-600">({pkg.reviews} reviews)</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-auto">
                      <Button
                        variant="outline"
                        className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300"
                        onClick={() => toggleExpanded(pkg.id)}
                      >
                        {isExpanded(pkg.id) ? "Show Less" : "Read More"}
                      </Button>

                      <div className="flex gap-2">
                        <Link href={`/packages/${pkg.id}`} className="flex-1">
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
            ))}
          </div>

          {sortedPackages.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-bronze-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-bronze-900 mb-2">No packages found</h3>
              <p className="text-bronze-600">Try adjusting your filters to see more results</p>
            </div>
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
                image: selectedPackage.image,
              }}
              onClose={() => setIsBookingOpen(false)}
              isUmrah={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
