"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Shield,
  CheckCircle,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import TourBookingForm from "@/components/tour-booking-popup"

// Mock tour data - in real app, this would come from API/database
const tourData = {
  id: "bali-paradise",
  title: "Bali Paradise Adventure",
  destination: "Bali, Indonesia",
  duration: "7 days / 6 nights",
  price: 1299,
  originalPrice: 1599,
  rating: 4.9,
  reviews: 234,
  category: "Adventure",
  groupSize: "8-12 people",
  difficulty: "Moderate",
  languages: ["English", "Indonesian"],
  minAge: 18,
  description:
    "Immerse yourself in the magical beauty of Bali with this comprehensive 7-day adventure. From ancient temples to pristine beaches, rice terraces to vibrant markets, experience the best of what this Indonesian paradise has to offer.",
  highlights: [
    "Visit iconic Tanah Lot and Uluwatu temples",
    "Explore the stunning Tegallalang Rice Terraces",
    "Relax on the beautiful beaches of Seminyak",
    "Experience traditional Balinese culture and cuisine",
    "Enjoy a sunrise trek up Mount Batur",
    "Discover the artistic village of Ubud",
    "Snorkeling in crystal clear waters",
    "Traditional cooking class with local family",
  ],
  included: [
    "6 nights accommodation in 4-star hotels",
    "Daily breakfast and 4 dinners",
    "All transportation in air-conditioned vehicle",
    "Professional English-speaking guide",
    "All entrance fees and activities",
    "Airport transfers",
    "Travel insurance",
    "24/7 support hotline",
  ],
  notIncluded: [
    "International flights",
    "Visa fees",
    "Personal expenses",
    "Lunches (except specified)",
    "Alcoholic beverages",
    "Tips and gratuities",
    "Optional activities",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Denpasar",
      description:
        "Arrive at Ngurah Rai International Airport. Transfer to your hotel in Seminyak. Evening welcome dinner and orientation.",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Tour briefing"],
      meals: ["Dinner"],
      accommodation: "Seminyak Beach Resort",
    },
    {
      day: 2,
      title: "Temples & Culture",
      description:
        "Visit the iconic Tanah Lot temple during sunset. Explore traditional markets and experience Balinese culture.",
      activities: ["Tanah Lot Temple", "Traditional market visit", "Cultural performance", "Sunset viewing"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Seminyak Beach Resort",
    },
    {
      day: 3,
      title: "Ubud Adventure",
      description: "Journey to Ubud, visit rice terraces, monkey forest, and enjoy a traditional cooking class.",
      activities: ["Tegallalang Rice Terraces", "Sacred Monkey Forest", "Cooking class", "Ubud Palace"],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "Ubud Jungle Resort",
    },
    {
      day: 4,
      title: "Mount Batur Sunrise",
      description: "Early morning trek to Mount Batur for spectacular sunrise views. Afternoon at leisure.",
      activities: ["Mount Batur trek", "Sunrise viewing", "Hot springs", "Free time"],
      meals: ["Breakfast"],
      accommodation: "Ubud Jungle Resort",
    },
    {
      day: 5,
      title: "Beach & Water Activities",
      description: "Transfer to Sanur. Enjoy snorkeling, beach activities, and water sports.",
      activities: ["Snorkeling trip", "Beach relaxation", "Water sports", "Beachside lunch"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "Sanur Beach Hotel",
    },
    {
      day: 6,
      title: "Uluwatu & Kecak Dance",
      description: "Visit Uluwatu Temple perched on dramatic cliffs. Watch traditional Kecak fire dance performance.",
      activities: ["Uluwatu Temple", "Cliff walking", "Kecak dance", "Seafood dinner"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Sanur Beach Hotel",
    },
    {
      day: 7,
      title: "Departure",
      description: "Free morning for last-minute shopping or relaxation. Transfer to airport for departure.",
      activities: ["Free time", "Shopping", "Airport transfer"],
      meals: ["Breakfast"],
      accommodation: "Day use only",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555400082-8c5cd5b3c0e0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  ],
  accommodations: [
    {
      name: "Seminyak Beach Resort",
      type: "4-star Beach Resort",
      nights: 2,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      amenities: ["Beach access", "Pool", "Spa", "Restaurant", "WiFi"],
    },
    {
      name: "Ubud Jungle Resort",
      type: "4-star Eco Resort",
      nights: 2,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop",
      amenities: ["Jungle view", "Pool", "Yoga deck", "Restaurant", "WiFi"],
    },
    {
      name: "Sanur Beach Hotel",
      type: "4-star Beach Hotel",
      nights: 2,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      amenities: ["Beach access", "Pool", "Spa", "Multiple restaurants", "WiFi"],
    },
  ],
  reviews: [
    {
      name: "Sarah Mitchell",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely incredible experience! The tour was perfectly organized and our guide was knowledgeable and friendly. Bali exceeded all expectations!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "James Wilson",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Best vacation ever! The Mount Batur sunrise was breathtaking and the cultural experiences were authentic. Highly recommend Travel Smooth!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Maria Garcia",
      rating: 4,
      date: "2024-01-05",
      comment:
        "Wonderful tour with great accommodations. The cooking class was a highlight! Only minor issue was some transportation delays.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
  ],
}

export default function TourDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourData.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourData.gallery.length) % tourData.gallery.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={tourData.gallery[currentImageIndex] || "/placeholder.svg"}
            alt={tourData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Gallery Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Gallery Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {tourData.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Back Button */}
        {/* <Link
          href="/tours"
          className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link> */}

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gold-500 text-white">{tourData.category}</Badge>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tourData.rating}</span>
                  <span className="text-gray-300">({tourData.reviews.length} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tourData.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-white mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tourData.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{tourData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{tourData.groupSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-white">
                  <span className="text-1xl md:text-3xl font-bold">${tourData.price}</span>
                  {tourData.originalPrice && (
                    <span className="text-lg text-gray-300 line-through ml-2">${tourData.originalPrice}</span>
                  )}
                  <span className="text-gray-300 ml-2">per person</span>
                </div>

                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white">
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-bronze-900">
                        Book Your Tour: {tourData.title}
                      </DialogTitle>
                    </DialogHeader>
                    <TourBookingForm
                      preSelectedTour={{
                        id: tourData.id,
                        name: tourData.title,
                        price: tourData.price,
                        duration: tourData.duration,
                        image: tourData.gallery[0],
                      }}
                      onClose={() => setIsBookingOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 w-full">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 sm:grid-cols-3 md:grid-cols-5 mb-4 sm:mb-8 overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="accommodations">Hotels</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 sm:space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-bronze-900">Tour Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-bronze-700 leading-relaxed mb-6">{tourData.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div>
                          <h3 className="text-xl font-semibold text-bronze-900 mb-4">Tour Highlights</h3>
                          <ul className="space-y-2">
                            {tourData.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                                <span className="text-bronze-700">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-bronze-900 mb-4">Tour Details</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Duration:</span>
                              <span className="font-medium text-bronze-900">{tourData.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Group Size:</span>
                              <span className="font-medium text-bronze-900">{tourData.groupSize}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Difficulty:</span>
                              <span className="font-medium text-bronze-900">{tourData.difficulty}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Min Age:</span>
                              <span className="font-medium text-bronze-900">{tourData.minAge}+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Languages:</span>
                              <span className="font-medium text-bronze-900">{tourData.languages.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Included/Not Included */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-bronze-900 flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          What's Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tourData.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-bronze-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-bronze-900 flex items-center gap-2">
                          <Shield className="w-6 h-6 text-red-600" />
                          Not Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tourData.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-4 h-4 border-2 border-red-600 rounded-full mt-1 flex-shrink-0" />
                              <span className="text-bronze-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="space-y-4 sm:space-y-6">
                  {tourData.itinerary.map((day, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-xl text-bronze-900 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          {day.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-bronze-700 mb-4">{day.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                          <div>
                            <h4 className="font-semibold text-bronze-900 mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Activities
                            </h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, i) => (
                                <li key={i} className="text-sm text-bronze-600">
                                  • {activity}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-bronze-900 mb-2 flex items-center gap-2">
                              <Utensils className="w-4 h-4" />
                              Meals
                            </h4>
                            <ul className="space-y-1">
                              {day.meals.map((meal, i) => (
                                <li key={i} className="text-sm text-bronze-600">
                                  • {meal}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-bronze-900 mb-2 flex items-center gap-2">
                              <Hotel className="w-4 h-4" />
                              Accommodation
                            </h4>
                            <p className="text-sm text-bronze-600">{day.accommodation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Accommodations Tab */}
                <TabsContent value="accommodations" className="space-y-4 sm:space-y-6">
                  {tourData.accommodations.map((hotel, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                          <img
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />

                          <div className="md:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-bronze-900">{hotel.name}</h3>
                                <p className="text-bronze-600">{hotel.type}</p>
                                <p className="text-sm text-bronze-500">{hotel.nights} nights</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(4)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-bronze-900 mb-2">Amenities</h4>
                              <div className="flex flex-wrap gap-2">
                                {hotel.amenities.map((amenity, i) => (
                                  <Badge key={i} variant="secondary" className="bg-bronze-100 text-bronze-700">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {tourData.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                    <div>
                      <h3 className="text-2xl font-bold text-bronze-900">Customer Reviews</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-bronze-900">{tourData.rating}</span>
                        <span className="text-bronze-600">({tourData.reviews.length} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {tourData.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0">
                              <h4 className="font-semibold text-bronze-900">{review.name}</h4>
                              <span className="text-sm text-bronze-500">{review.date}</span>
                            </div>

                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>

                            <p className="text-bronze-700">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 mt-8 lg:mt-0">
              {/* Booking Card */}
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-xl text-bronze-900">Book This Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-1xl md:text-3xl font-bold text-gold-600">${tourData.price}</div>
                    {tourData.originalPrice && (
                      <div className="text-1xl md:text-lg text-bronze-500 line-through">${tourData.originalPrice}</div>
                    )}
                    <div className="text-bronze-600">per person</div>
                  </div>

                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gold-500 hover:bg-gold-600 text-white">Book Now</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-bronze-900">
                          Book Your Tour: {tourData.title}
                        </DialogTitle>
                      </DialogHeader>
                      <TourBookingForm
                        preSelectedTour={{
                          id: tourData.id,
                          name: tourData.title,
                          price: tourData.price,
                          duration: tourData.duration,
                          image: tourData.gallery[0],
                        }}
                        onClose={() => setIsBookingOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>

                  <div className="text-center text-sm text-bronze-600">
                    <p>✓ Free cancellation up to 24 hours</p>
                    <p>✓ Reserve now, pay later</p>
                    <p>✓ Best price guarantee</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bronze-900">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">{tourData.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">{tourData.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">{tourData.destination}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">Airport transfers included</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bronze-900">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-bronze-700">
                    Have questions about this tour? Our travel experts are here to help!
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white"
                  >
                    Contact Us
                  </Button>
                  <div className="text-center text-sm text-bronze-600">
                    <p>📞 +1 (555) 123-4567</p>
                    <p>✉️ info@travelsmooth.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
