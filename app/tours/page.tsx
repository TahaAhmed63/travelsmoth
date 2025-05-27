"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Users, Search, Filter } from "lucide-react"

const tours = [
  {
    id: 1,
    title: "Bali Paradise Adventure",
    destination: "Bali, Indonesia",
    duration: "7 days",
    price: 1299,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop&crop=center",
    category: "Adventure",
    groupSize: "8-12 people",
    highlights: ["Temple visits", "Rice terraces", "Beach relaxation", "Cultural experiences"],
  },
  {
    id: 2,
    title: "European Grand Tour",
    destination: "Europe",
    duration: "14 days",
    price: 2899,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop&crop=center",
    category: "Cultural",
    groupSize: "12-16 people",
    highlights: ["Historic cities", "Art museums", "Local cuisine", "Architecture tours"],
  },
  {
    id: 3,
    title: "Safari Kenya Experience",
    destination: "Kenya, Africa",
    duration: "10 days",
    price: 2199,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop&crop=center",
    category: "Wildlife",
    groupSize: "6-10 people",
    highlights: ["Big Five safari", "Masai Mara", "Cultural villages", "Hot air balloon"],
  },
  {
    id: 4,
    title: "Japan Cherry Blossom",
    destination: "Japan",
    duration: "12 days",
    price: 3299,
    rating: 4.9,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop&crop=center",
    category: "Cultural",
    groupSize: "10-14 people",
    highlights: ["Cherry blossoms", "Traditional temples", "Bullet trains", "Tea ceremonies"],
  },
  {
    id: 5,
    title: "Patagonia Trekking",
    destination: "Argentina & Chile",
    duration: "15 days",
    price: 3799,
    rating: 4.7,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop&crop=center",
    category: "Adventure",
    groupSize: "8-12 people",
    highlights: ["Torres del Paine", "Glacier hiking", "Wildlife spotting", "Mountain lodges"],
  },
  {
    id: 6,
    title: "Morocco Desert Adventure",
    destination: "Morocco",
    duration: "9 days",
    price: 1899,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop&crop=center",
    category: "Adventure",
    groupSize: "8-14 people",
    highlights: ["Sahara Desert", "Camel trekking", "Berber villages", "Atlas Mountains"],
  },
]

const categories = ["All", "Adventure", "Cultural", "Wildlife", "Luxury", "Budget"]
const durations = ["All", "1-7 days", "8-14 days", "15+ days"]
const priceRanges = ["All", "Under $1500", "$1500-$2500", "$2500-$3500", "Over $3500"]

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || tour.category === selectedCategory
    const matchesDuration =
      selectedDuration === "All" ||
      (selectedDuration === "1-7 days" && Number.parseInt(tour.duration) <= 7) ||
      (selectedDuration === "8-14 days" &&
        Number.parseInt(tour.duration) >= 8 &&
        Number.parseInt(tour.duration) <= 14) ||
      (selectedDuration === "15+ days" && Number.parseInt(tour.duration) >= 15)
    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $1500" && tour.price < 1500) ||
      (selectedPriceRange === "$1500-$2500" && tour.price >= 1500 && tour.price <= 2500) ||
      (selectedPriceRange === "$2500-$3500" && tour.price >= 2500 && tour.price <= 3500) ||
      (selectedPriceRange === "Over $3500" && tour.price > 3500)

    return matchesSearch && matchesCategory && matchesDuration && matchesPrice
  })

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "duration":
        return Number.parseInt(a.duration) - Number.parseInt(b.duration)
      default:
        return b.reviews - a.reviews
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
              Showing {sortedTours.length} of {tours.length} tours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-gold-500 text-white">{tour.category}</Badge>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-bronze-900 mb-2">{tour.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-bronze-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.destination}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-bronze-600 mb-4">
                      <Users className="w-4 h-4" />
                      {tour.groupSize}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-bronze-900 mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.slice(0, 3).map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                            {highlight}
                          </Badge>
                        ))}
                        {tour.highlights.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                            +{tour.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gold-600">${tour.price}</span>
                        <span className="text-sm text-bronze-500 ml-1">per person</span>
                      </div>
                      <Button className="bg-gold-500 hover:bg-gold-600">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {sortedTours.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-bronze-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-bronze-900 mb-2">No tours found</h3>
              <p className="text-bronze-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
