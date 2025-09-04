"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, MapPin, Search, Filter, Wifi, Car, Utensils, Waves, Dumbbell, Coffee } from "lucide-react"
import Link from "next/link"
import TourBookingForm from "@/components/tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

const categories = [
  "All",
  "Resort",
  "Hotel",
  "Villa",
  "Boutique",
  "Business",
]
const countries = [
  "All",
  "Maldives",
  "UAE",
  "Indonesia",
  "France",
  "Japan",
  "Greece",
]
const priceRanges = ["All", "Under $300", "$300-$500", "$500-$700", "Over $700"]
const hotelTypes = ["All", "Hotel", "Resort", "Villa"]

const amenityIcons: Record<string, any> = {
  "Private Beach": Waves,
  "Beach Access": Waves,
  Spa: Star,
  "Water Sports": Waves,
  "Fine Dining": Utensils,
  Pool: Waves,
  "Private Pool": Waves,
  "Business Center": Car,
  Restaurant: Utensils,
  Yoga: Star,
  WiFi: Wifi,
  Gym: Dumbbell,
  Bar: Coffee,
  Concierge: Star,
  "Room Service": Utensils,
  "Ocean View": Waves,
  Kitchen: Utensils,
  Terrace: Star,
  Parking: Car,
  "Air Conditioning": Star,
}

function getCountryFromLocation(location: string) {
  // Try to extract country from location string
  if (!location) return ""
  const loc = location.toLowerCase()
  if (loc.includes("maldives")) return "Maldives"
  if (loc.includes("uae") || loc.includes("dubai")) return "UAE"
  if (loc.includes("indonesia") || loc.includes("bali")) return "Indonesia"
  if (loc.includes("france") || loc.includes("paris")) return "France"
  if (loc.includes("japan") || loc.includes("tokyo")) return "Japan"
  if (loc.includes("greece") || loc.includes("santorini")) return "Greece"
  return ""
}

function getTypeFromCategory(category: string) {
  if (!category) return "Hotel"
  if (category.toLowerCase().includes("resort")) return "Resort"
  if (category.toLowerCase().includes("villa")) return "Villa"
  if (category.toLowerCase().includes("hotel")) return "Hotel"
  return "Hotel"
}

function getCategoryDisplay(category: string) {
  if (!category) return "Other"
  if (category.toLowerCase().includes("resort")) return "Resort"
  if (category.toLowerCase().includes("villa")) return "Villa"
  if (category.toLowerCase().includes("hotel")) return "Hotel"
  if (category.toLowerCase().includes("boutique")) return "Boutique"
  if (category.toLowerCase().includes("business")) return "Business"
  return category
}

function getImageUrl(mainImage: string, mainimage: string) {
  const img = mainImage || mainimage
  if (!img) return "/placeholder.svg"
  return img
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${BaseUrl}/api/hotels`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch hotels")
        return res.json()
      })
      .then((raw) => {
        const arr = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data?.hotels)
          ? raw.data.hotels
          : Array.isArray(raw?.hotels)
          ? raw.hotels
          : []
        setHotels(arr)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load hotels")
        setLoading(false)
      })
  }, [])

  // Memoize filtered and sorted hotels for performance
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Normalize fields
      const name = hotel.name || ""
      const location = hotel.location || ""
      const description = hotel.description || ""
      const category = getCategoryDisplay(hotel.category || "")
      const country = getCountryFromLocation(location)
      const type = getTypeFromCategory(hotel.category || "")
      const minprice = hotel.minprice || 0
      const maxprice = hotel.maxprice || 0
      const price = minprice // Use minprice for filtering/sorting

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" ||
        category === selectedCategory ||
        (selectedCategory === "Boutique Hotel" && category === "Boutique") ||
        (selectedCategory === "Luxury Resort" && category === "Resort") // fallback

      const matchesCountry =
        selectedCountry === "All" ||
        country === selectedCountry

      const matchesType =
        selectedType === "All" ||
        type === selectedType

      const matchesPrice =
        selectedPriceRange === "All" ||
        (selectedPriceRange === "Under $300" && price < 300) ||
        (selectedPriceRange === "$300-$500" && price >= 300 && price <= 500) ||
        (selectedPriceRange === "$500-$700" && price >= 500 && price <= 700) ||
        (selectedPriceRange === "Over $700" && price > 700)

      return matchesSearch && matchesCategory && matchesCountry && matchesType && matchesPrice
    })
  }, [hotels, searchTerm, selectedCategory, selectedCountry, selectedType, selectedPriceRange])

  const sortedHotels = useMemo(() => {
    return [...filteredHotels].sort((a, b) => {
      const priceA = a.minprice || 0
      const priceB = b.minprice || 0
      const ratingA = a.rating || 0
      const ratingB = b.rating || 0
      // Fallback to 0 if reviews not present
      const reviewsA = a.reviews || 0
      const reviewsB = b.reviews || 0
      switch (sortBy) {
        case "price-low":
          return priceA - priceB
        case "price-high":
          return priceB - priceA
        case "rating":
          return ratingB - ratingA
        default:
          return reviewsB - reviewsA
      }
    })
  }, [filteredHotels, sortBy])

  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel)
    setIsBookingOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-bronze-600 to-gold-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=600&fit=crop"
            alt="Hotels background"
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
            Luxury Hotels & Resorts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Discover exceptional accommodations worldwide, from luxury resorts to boutique hotels
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
                placeholder="Search hotels or destinations..."
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

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {hotelTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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

      {/* Hotels Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-bronze-600">
              {loading
                ? "Loading hotels..."
                : error
                ? "Failed to load hotels"
                : `Showing ${sortedHotels.length} of ${hotels.length} hotels`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-bronze-600">Loading hotels...</div>
          ) : error ? (
            <div className="text-center py-16 text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedHotels.map((hotel: any, index: number) => {
                  const imageUrl = getImageUrl(hotel.mainImage, hotel.mainimage)
                  const category = getCategoryDisplay(hotel.category)
                  const type = getTypeFromCategory(hotel.category)
                  const country = getCountryFromLocation(hotel.location)
                  const price = hotel.minprice || 0
                  const originalPrice = hotel.maxprice && hotel.maxprice > price ? hotel.maxprice : null
                  const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : []
                  const rating = hotel.rating || 0
                  // Fallback: reviews not in API, so fake a number for demo
                  const reviews = hotel.reviews || Math.floor(Math.random() * 500 + 50)
                  return (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                        <div className="relative overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={hotel.name}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {/* No featured in API, so skip */}
                            <Badge className="bg-white/90 text-bronze-900">{category}</Badge>
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
                                <span className="text-2xl font-bold">
                                  {hotel.currency ? (
                                    <>
                                      {hotel.currency.toUpperCase() === "USD" ? "$" : hotel.currency.toUpperCase() + " "}
                                    </>
                                  ) : "$"}
                                  {price}
                                </span>
                                {originalPrice && (
                                  <span className="text-sm line-through text-gray-300">
                                    {hotel.currency ? (
                                      <>
                                        {hotel.currency.toUpperCase() === "USD" ? "$" : hotel.currency.toUpperCase() + " "}
                                      </>
                                    ) : "$"}
                                    {originalPrice}
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
                                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-bronze-600">({reviews} reviews)</span>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-bronze-900 mb-3">Top Amenities</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {amenities.slice(0, 4).map((amenity: string, i: number) => {
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
                            <Link href={`/hotels/${hotel.slug || hotel.id}`} className="flex-1">
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
                  )
                })}
              </div>

              {sortedHotels.length === 0 && (
                <div className="text-center py-16">
                  <Filter className="w-16 h-16 text-bronze-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-bronze-900 mb-2">No hotels found</h3>
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
              Book Your Stay: {selectedHotel?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedHotel && (
            <TourBookingForm
              preSelectedTour={{
                id: selectedHotel.id,
                name: selectedHotel.name,
                price: selectedHotel.minprice || 0,
                duration: "per night",
                image: getImageUrl(selectedHotel.mainImage, selectedHotel.mainimage),
              }}
              itemType="hotel"
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
