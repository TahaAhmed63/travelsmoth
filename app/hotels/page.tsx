"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, MapPin, Search, Filter, Wifi, Car, Utensils, Waves, Dumbbell, Coffee } from "lucide-react"
import Link from "next/link"
import TourBookingForm from "@/components/tour-booking-popup"

const hotels = [
  {
    id: "maldives-luxury-resort",
    name: "Maldives Luxury Resort & Spa",
    location: "Maldives",
    country: "Maldives",
    rating: 4.9,
    reviews: 342,
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&h=350&fit=crop",
    category: "Luxury Resort",
    amenities: ["Private Beach", "Spa", "Water Sports", "Fine Dining", "WiFi", "Pool"],
    description: "Overwater villas with pristine ocean views and world-class amenities",
    featured: true,
    type: "Resort",
  },
  {
    id: "dubai-premium-hotel",
    name: "Dubai Premium Hotel",
    location: "Dubai, UAE",
    country: "UAE",
    rating: 4.8,
    reviews: 567,
    price: 450,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=350&fit=crop",
    category: "City Hotel",
    amenities: ["Pool", "Spa", "Business Center", "Restaurant", "WiFi", "Gym"],
    description: "Modern luxury in the heart of Dubai with stunning city views",
    featured: true,
    type: "Hotel",
  },
  {
    id: "bali-beach-resort",
    name: "Bali Beach Resort",
    location: "Bali, Indonesia",
    country: "Indonesia",
    rating: 4.7,
    reviews: 423,
    price: 320,
    originalPrice: 420,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=350&fit=crop",
    category: "Beach Resort",
    amenities: ["Beach Access", "Pool", "Yoga", "Restaurant", "WiFi", "Spa"],
    description: "Tropical paradise with traditional Balinese hospitality",
    featured: true,
    type: "Resort",
  },
  {
    id: "paris-boutique-hotel",
    name: "Paris Boutique Hotel",
    location: "Paris, France",
    country: "France",
    rating: 4.6,
    reviews: 289,
    price: 380,
    originalPrice: 480,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=350&fit=crop",
    category: "Boutique Hotel",
    amenities: ["Restaurant", "Bar", "WiFi", "Concierge", "Room Service"],
    description: "Charming boutique hotel in the heart of the City of Light",
    featured: false,
    type: "Hotel",
  },
  {
    id: "tokyo-modern-hotel",
    name: "Tokyo Modern Hotel",
    location: "Tokyo, Japan",
    country: "Japan",
    rating: 4.5,
    reviews: 512,
    price: 280,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1555400082-8c5cd5b3c0e0?w=500&h=350&fit=crop",
    category: "Business Hotel",
    amenities: ["Business Center", "Restaurant", "WiFi", "Gym", "Spa"],
    description: "Contemporary hotel with traditional Japanese hospitality",
    featured: false,
    type: "Hotel",
  },
  {
    id: "santorini-villa",
    name: "Santorini Sunset Villa",
    location: "Santorini, Greece",
    country: "Greece",
    rating: 4.8,
    reviews: 198,
    price: 650,
    originalPrice: 850,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=350&fit=crop",
    category: "Villa",
    amenities: ["Private Pool", "Ocean View", "WiFi", "Kitchen", "Terrace"],
    description: "Stunning villa with breathtaking sunset views over the Aegean Sea",
    featured: false,
    type: "Villa",
  },
]

const categories = ["All", "Luxury Resort", "City Hotel", "Beach Resort", "Boutique Hotel", "Business Hotel", "Villa"]
const countries = ["All", "Maldives", "UAE", "Indonesia", "France", "Japan", "Greece"]
const priceRanges = ["All", "Under $300", "$300-$500", "$500-$700", "Over $700"]
const hotelTypes = ["All", "Hotel", "Resort", "Villa"]

const amenityIcons = {
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
}

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<any>(null)

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || hotel.category === selectedCategory
    const matchesCountry = selectedCountry === "All" || hotel.country === selectedCountry
    const matchesType = selectedType === "All" || hotel.type === selectedType
    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $300" && hotel.price < 300) ||
      (selectedPriceRange === "$300-$500" && hotel.price >= 300 && hotel.price <= 500) ||
      (selectedPriceRange === "$500-$700" && hotel.price >= 500 && hotel.price <= 700) ||
      (selectedPriceRange === "Over $700" && hotel.price > 700)

    return matchesSearch && matchesCategory && matchesCountry && matchesType && matchesPrice
  })

  const sortedHotels = [...filteredHotels].sort((a, b) => {
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
              Showing {sortedHotels.length} of {hotels.length} hotels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedHotels.map((hotel, index) => (
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
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {hotel.featured && <Badge className="bg-gold-500 text-white font-semibold">Featured</Badge>}
                      <Badge className="bg-white/90 text-bronze-900">{hotel.category}</Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-bronze-900">{hotel.rating}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 bg-bronze-900/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">${hotel.price}</span>
                          {hotel.originalPrice && (
                            <span className="text-sm line-through text-gray-300">${hotel.originalPrice}</span>
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
                              i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-bronze-600">({hotel.reviews} reviews)</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-bronze-900 mb-3">Top Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {hotel.amenities.slice(0, 4).map((amenity, i) => {
                          const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Star
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

          {sortedHotels.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-bronze-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-bronze-900 mb-2">No hotels found</h3>
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
              Book Your Stay: {selectedHotel?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedHotel && (
            <TourBookingForm
              preSelectedTour={{
                id: selectedHotel.id,
                name: selectedHotel.name,
                price: selectedHotel.price,
                duration: "per night",
                image: selectedHotel.image,
              }}
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
