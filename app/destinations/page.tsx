"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Camera, Star } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop&crop=center",
    tours: 12,
    rating: 4.9,
    highlights: ["Beaches", "Temples", "Rice Terraces", "Culture"],
    bestTime: "Apr - Oct",
    featured: true,
  },
  {
    id: 2,
    name: "Paris, France",
    description: "The City of Light with iconic landmarks, world-class museums, and romantic atmosphere",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop&crop=center",
    tours: 8,
    rating: 4.8,
    highlights: ["Eiffel Tower", "Louvre", "Cuisine", "Architecture"],
    bestTime: "May - Sep",
    featured: true,
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    description: "Modern metropolis blending traditional culture with cutting-edge technology",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&h=400&fit=crop&crop=center",
    tours: 15,
    rating: 4.9,
    highlights: ["Cherry Blossoms", "Temples", "Technology", "Cuisine"],
    bestTime: "Mar - May",
    featured: true,
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop&crop=center",
    tours: 6,
    rating: 4.9,
    highlights: ["Ancient Ruins", "Hiking", "History", "Mountains"],
    bestTime: "May - Sep",
    featured: false,
  },
  {
    id: 5,
    name: "Santorini, Greece",
    description: "Stunning island with white-washed buildings and breathtaking sunsets",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop&crop=center",
    tours: 9,
    rating: 4.8,
    highlights: ["Sunsets", "Architecture", "Beaches", "Wine"],
    bestTime: "Apr - Oct",
    featured: false,
  },
  {
    id: 6,
    name: "Safari Kenya",
    description: "Wildlife paradise with the Big Five and the Great Migration",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=center",
    tours: 7,
    rating: 4.9,
    highlights: ["Wildlife", "Safari", "Masai Mara", "Culture"],
    bestTime: "Jul - Oct",
    featured: false,
  },
]

const continents = [
  {
    name: "Asia",
    destinations: 25,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    description: "Diverse cultures, ancient traditions, and modern marvels",
  },
  {
    name: "Europe",
    destinations: 18,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop&crop=center",
    description: "Rich history, stunning architecture, and culinary delights",
  },
  {
    name: "Africa",
    destinations: 12,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop&crop=center",
    description: "Wildlife adventures, cultural experiences, and natural wonders",
  },
  {
    name: "Americas",
    destinations: 20,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop&crop=center",
    description: "From ancient civilizations to modern cities and natural beauty",
  },
]

export default function DestinationsPage() {
  const featuredDestinations = destinations.filter((dest) => dest.featured)
  const otherDestinations = destinations.filter((dest) => !dest.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-bronze-600 to-gold-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop&crop=center"
            alt="Destinations background"
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
            Explore Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Discover breathtaking destinations around the world, each offering unique experiences and unforgettable
            memories
          </motion.p>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Our most popular destinations that offer extraordinary experiences and adventures
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-gold-500 text-white">Featured</Badge>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-bronze-900 mb-2">{destination.name}</h3>
                    <p className="text-bronze-600 mb-4">{destination.description}</p>

                    <div className="flex items-center gap-4 text-sm text-bronze-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Plane className="w-4 h-4" />
                        {destination.tours} tours
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        Best: {destination.bestTime}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-bronze-900 mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-gold-500 hover:bg-gold-600">Explore Tours</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Continent */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Browse by Continent</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Explore destinations organized by continent to find your perfect adventure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {continents.map((continent, index) => (
              <motion.div
                key={continent.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={continent.image || "/placeholder.svg"}
                      alt={continent.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{continent.name}</h3>
                        <p className="text-sm">{continent.destinations} destinations</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <p className="text-bronze-600 text-sm">{continent.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">More Destinations</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Discover even more incredible destinations waiting to be explored
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-bronze-900 mb-2">{destination.name}</h3>
                    <p className="text-bronze-600 mb-4 text-sm">{destination.description}</p>

                    <div className="flex items-center gap-4 text-sm text-bronze-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Plane className="w-4 h-4" />
                        {destination.tours} tours
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        {destination.bestTime}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white"
                    >
                      View Tours
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bronze-600 to-gold-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Can't Find Your Dream Destination?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us create a custom itinerary tailored to your preferences and interests
            </p>

            <Button size="lg" variant="secondary" className="bg-white text-gold-600 hover:bg-gray-100">
              Contact Our Travel Experts
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
