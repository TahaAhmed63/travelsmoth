"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Users, Search, Filter } from "lucide-react"
import { BaseUrl } from "@/BaseUrl"

const categories = ["All", "Adventure", "Cultural", "Wildlife", "Luxury", "Budget"]
const durations = ["All", "1-7 days", "8-14 days", "15+ days"]
const priceRanges = ["All", "Under $1500", "$1500-$2500", "$2500-$3500", "Over $3500"]

// Helper to parse price string like "$120" to number 120
function parsePrice(price: string | number | undefined): number {
  if (typeof price === "number") return price
  if (typeof price === "string") {
    const match = price.match(/[\d,.]+/)
    if (match) {
      return parseFloat(match[0].replace(/,/g, ""))
    }
  }
  return 0
}

// Helper to get destination name(s) as string
function getDestinationName(tour: any): string {
  if (tour.destination) return tour.destination
  if (Array.isArray(tour.destinations) && tour.destinations.length > 0) {
    return tour.destinations.map((d: any) => d.name).join(", ")
  }
  return ""
}

// Helper to get highlights as array
function getHighlights(tour: any): string[] {
  if (Array.isArray(tour.highlights)) return tour.highlights
  if (typeof tour.highlights === "string" && tour.highlights.trim() !== "") {
    // Try to split by comma or new line
    return tour.highlights.split(/,|\n/).map((h: string) => h.trim()).filter(Boolean)
  }
  return []
}

// Helper to get image
function getMainImage(tour: any): string {
  if (tour.mainImage) return tour.mainImage
  if (Array.isArray(tour.archiveImages) && tour.archiveImages.length > 0) return tour.archiveImages[0]
  if (typeof tour.archiveImages === "string" && tour.archiveImages.trim() !== "") return tour.archiveImages
  if (tour.image) return tour.image
  // Try galleryImages
  if (Array.isArray(tour.destinations) && tour.destinations.length > 0) {
    const imgs = tour.destinations.flatMap((d: any) => d.galleryImages || [])
    if (imgs.length > 0) return imgs[0]
  }
  return "/placeholder.svg"
}

// Helper to get group size
function getGroupSize(tour: any): string {
  return tour.groupSize || tour.groupsize || ""
}

// Helper to get rating
function getRating(tour: any): number | null {
  if (typeof tour.rating === "number") return tour.rating
  if (typeof tour.rating === "string" && tour.rating.trim() !== "") {
    const n = Number(tour.rating)
    if (!isNaN(n)) return n
  }
  return null
}

// Helper to get category
function getCategory(tour: any): string {
  return tour.category || "General"
}

export default function ToursPage() {
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")

  const router = useRouter()

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${BaseUrl}/api/tours`)
        if (!res.ok) throw new Error("Failed to fetch tours")
        const raw = await res.json()
        const arr = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.tours)
          ? raw.tours
          : []
        setTours(arr)
      } catch (err: any) {
        setError(err.message || "Error fetching tours")
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])

  // Filtering logic adapted to new data structure
  const filteredTours = tours.filter((tour) => {
    const title = tour.title || ""
    const destination = getDestinationName(tour)
    const category = getCategory(tour)
    const durationStr = tour.duration || ""
    const priceNum = parsePrice(tour.price)
    // Search
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.toLowerCase().includes(searchTerm.toLowerCase())
    // Category
    const matchesCategory = selectedCategory === "All" || category === selectedCategory
    // Duration
    let durationDays = 0
    if (typeof durationStr === "string") {
      const match = durationStr.match(/(\d+)/)
      if (match) durationDays = parseInt(match[1])
    }
    const matchesDuration =
      selectedDuration === "All" ||
      (selectedDuration === "1-7 days" && durationDays >= 1 && durationDays <= 7) ||
      (selectedDuration === "8-14 days" && durationDays >= 8 && durationDays <= 14) ||
      (selectedDuration === "15+ days" && durationDays >= 15)
    // Price
    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $1500" && priceNum < 1500) ||
      (selectedPriceRange === "$1500-$2500" && priceNum >= 1500 && priceNum <= 2500) ||
      (selectedPriceRange === "$2500-$3500" && priceNum >= 2500 && priceNum <= 3500) ||
      (selectedPriceRange === "Over $3500" && priceNum > 3500)

    return matchesSearch && matchesCategory && matchesDuration && matchesPrice
  })

  // Sorting logic adapted to new data structure
  const sortedTours = [...filteredTours].sort((a, b) => {
    const priceA = parsePrice(a.price)
    const priceB = parsePrice(b.price)
    const ratingA = getRating(a) ?? 0
    const ratingB = getRating(b) ?? 0
    // For popularity, fallback to bookings or reviews if available
    const popularityA = a.bookings ?? a.reviews ?? 0
    const popularityB = b.bookings ?? b.reviews ?? 0
    // Duration
    const durationA = (() => {
      const match = (a.duration || "").match(/(\d+)/)
      return match ? parseInt(match[1]) : 0
    })()
    const durationB = (() => {
      const match = (b.duration || "").match(/(\d+)/)
      return match ? parseInt(match[1]) : 0
    })()
    switch (sortBy) {
      case "price-low":
        return priceA - priceB
      case "price-high":
        return priceB - priceA
      case "rating":
        return ratingB - ratingA
      case "duration":
        return durationA - durationB
      default:
        return popularityB - popularityA
    }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop&crop=center"
            alt="Travel background"
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
            Discover Amazing Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Explore our carefully curated collection of tours and experiences designed to create unforgettable memories
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
                placeholder="Search tours or destinations..."
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
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-bronze-600">
              {loading
                ? "Loading tours..."
                : error
                ? "Error loading tours"
                : `Showing ${sortedTours.length} of ${tours.length} tours`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-bronze-600">Loading tours...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-bronze-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTours.map((tour, index) => {
                  const highlights = getHighlights(tour)
                  const mainImage = getMainImage(tour)
                  const destination = getDestinationName(tour)
                  const groupSize = getGroupSize(tour)
                  const rating = getRating(tour)
                  const price = parsePrice(tour.price)
                  const category = getCategory(tour)
                  return (
                    <motion.div
                      key={tour.slug || tour.id || `${tour.title}-${index}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative overflow-hidden">
                          {(() => {
                            const imageUrl = mainImage
                              ? (typeof mainImage === "string" && mainImage.startsWith("http")
                                  ? mainImage
                                  : `${BaseUrl}${mainImage.startsWith('/') ? '' : '/'}${mainImage}`)
                              : "/placeholder.svg"
                            return (
                              <img
                                src={imageUrl}
                                alt={tour.title}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            )
                          })()}
                          <Badge className="absolute top-4 left-4 bg-gold-500 text-white">{category}</Badge>
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{rating !== null ? rating : "N/A"}</span>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-bronze-900 mb-2">{tour.title}</h3>

                          <div className="flex items-center gap-4 text-sm text-bronze-600 mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {destination}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {tour.duration}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-bronze-600 mb-4">
                            <Users className="w-4 h-4" />
                            {groupSize}
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-bronze-900 mb-2">Highlights:</h4>
                            <div className="flex flex-wrap gap-1">
                              {highlights.slice(0, 3).map((highlight: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                                  {highlight}
                                </Badge>
                              ))}
                              {highlights.length > 3 && (
                                <Badge variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                                  +{highlights.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-gold-600">
                                {typeof tour.price === "string" && tour.price.trim().startsWith("$")
                                  ? tour.price
                                  : `$${price}`}
                              </span>
                              <span className="text-sm text-bronze-500 ml-1">per person</span>
                            </div>
                            <Button
                              className="bg-gold-500 hover:bg-gold-600"
                              onClick={() => {
                                if (tour.slug) {
                                  router.push(`/tours/${tour.slug}`)
                                }
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {sortedTours.length === 0 && (
                <div className="text-center py-16">
                  <Filter className="w-16 h-16 text-bronze-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-bronze-900 mb-2">No tours found</h3>
                  <p className="text-bronze-600">Try adjusting your filters to see more results</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
