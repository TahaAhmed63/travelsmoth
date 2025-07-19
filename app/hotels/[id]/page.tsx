"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  CheckCircle,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Phone,
  Mail,
  Clock,
} from "lucide-react"
import Link from "next/link"
import TourBookingForm from "@/components/tour-booking-popup"

// Mock hotel data - in real app, this would come from API/database
const hotelData = {
  id: "maldives-luxury-resort",
  name: "Maldives Luxury Resort & Spa",
  location: "Maldives",
  rating: 4.9,
  reviews: 342,
  price: 899,
  originalPrice: 1199,
  category: "Luxury Resort",
  description:
    "Experience the ultimate in luxury at our exclusive Maldives resort. Featuring overwater villas with direct ocean access, world-class spa treatments, and exceptional dining experiences. Each villa offers complete privacy with stunning panoramic views of the Indian Ocean.",
  amenities: [
    "Private Beach Access",
    "Overwater Villas",
    "World-Class Spa",
    "Fine Dining Restaurants",
    "Water Sports Center",
    "Infinity Pool",
    "24/7 Butler Service",
    "WiFi Throughout",
    "Fitness Center",
    "Dive Center",
    "Kids Club",
    "Business Center",
  ],
  roomTypes: [
    {
      name: "Beach Villa",
      size: "120 sqm",
      occupancy: "2 adults",
      price: 699,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      amenities: ["Private Beach", "Outdoor Shower", "King Bed", "Mini Bar"],
    },
    {
      name: "Overwater Villa",
      size: "150 sqm",
      occupancy: "2 adults",
      price: 899,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop",
      amenities: ["Direct Ocean Access", "Glass Floor Panel", "Private Deck", "Butler Service"],
    },
    {
      name: "Presidential Suite",
      size: "300 sqm",
      occupancy: "4 adults",
      price: 1599,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      amenities: ["Private Pool", "Personal Chef", "Spa Room", "Multiple Bedrooms"],
    },
  ],
  facilities: [
    {
      name: "Serenity Spa",
      description: "Award-winning spa offering traditional and modern treatments",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      hours: "6:00 AM - 10:00 PM",
    },
    {
      name: "Aqua Restaurant",
      description: "Fine dining with fresh seafood and international cuisine",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      hours: "6:00 PM - 11:00 PM",
    },
    {
      name: "Water Sports Center",
      description: "Snorkeling, diving, kayaking, and jet ski rentals",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
      hours: "8:00 AM - 6:00 PM",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
  ],
  policies: [
    "Check-in: 3:00 PM",
    "Check-out: 12:00 PM",
    "Free cancellation up to 48 hours before arrival",
    "Children under 12 stay free",
    "Pets not allowed",
    "No smoking in rooms",
    "Valid ID required at check-in",
  ],
  reviews: [
    {
      name: "Emma Thompson",
      rating: 5,
      date: "2024-01-20",
      comment:
        "Absolutely magical experience! The overwater villa was stunning and the service was impeccable. The spa treatments were world-class and the dining exceeded all expectations.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Perfect honeymoon destination! The privacy and luxury were exactly what we were looking for. The butler service made us feel like royalty.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Sarah Johnson",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Beautiful resort with amazing facilities. The water sports were fantastic and the food was delicious. Only minor issue was the WiFi speed in some areas.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
  ],
}

const amenityIcons = {
  "Private Beach Access": Waves,
  "Overwater Villas": Waves,
  "World-Class Spa": Star,
  "Fine Dining Restaurants": Utensils,
  "Water Sports Center": Waves,
  "Infinity Pool": Waves,
  "24/7 Butler Service": Star,
  "WiFi Throughout": Wifi,
  "Fitness Center": Dumbbell,
  "Dive Center": Waves,
  "Kids Club": Users,
  "Business Center": Car,
}

export default function HotelDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(hotelData.roomTypes[1]) // Default to Overwater Villa

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelData.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelData.gallery.length) % hotelData.gallery.length)
  }

  const handleBookRoom = (room: any) => {
    setSelectedRoom(room)
    setIsBookingOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hotelData.gallery[currentImageIndex] || "/placeholder.svg"}
            alt={hotelData.name}
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
          {hotelData.gallery.map((_, index) => (
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
        <Link
          href="/hotels"
          className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>

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
                <Badge className="bg-gold-500 text-white">{hotelData.category}</Badge>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{hotelData.rating}</span>
                  <span className="text-gray-300">({hotelData.reviews.length} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hotelData.name}</h1>

              <div className="flex items-center gap-2 text-white mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-xl">{hotelData.location}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-white">
                  <span className="text-3xl font-bold">${hotelData.price}</span>
                  {hotelData.originalPrice && (
                    <span className="text-lg text-gray-300 line-through ml-2">${hotelData.originalPrice}</span>
                  )}
                  <span className="text-gray-300 ml-2">per night</span>
                </div>

                <Button
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-600 text-white"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  {/* <TabsTrigger value="rooms">Rooms</TabsTrigger> */}
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-bronze-900">About This Hotel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-bronze-700 leading-relaxed mb-6">{hotelData.description}</p>

                      <div>
                        <h3 className="text-xl font-semibold text-bronze-900 mb-4">Hotel Amenities</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {hotelData.amenities.map((amenity, index) => {
                            const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || CheckCircle
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-gold-500" />
                                <span className="text-bronze-700">{amenity}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Policies */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-bronze-900">Hotel Policies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {hotelData.policies.map((policy, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                            <span className="text-bronze-700 text-sm">{policy}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Rooms Tab */}
                <TabsContent value="rooms" className="space-y-6">
                  {hotelData.roomTypes.map((room, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <img
                            src={room.image || "/placeholder.svg"}
                            alt={room.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />

                          <div className="md:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-bronze-900">{room.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-bronze-600 mt-2">
                                  <span>{room.size}</span>
                                  <span>•</span>
                                  <span>{room.occupancy}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gold-600">${room.price}</div>
                                <div className="text-sm text-bronze-500">per night</div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <h4 className="font-semibold text-bronze-900 mb-2">Room Amenities</h4>
                              <div className="flex flex-wrap gap-2">
                                {room.amenities.map((amenity, i) => (
                                  <Badge key={i} variant="secondary" className="bg-bronze-100 text-bronze-700">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button className="bg-gold-500 hover:bg-gold-600" onClick={() => handleBookRoom(room)}>
                              Book This Room
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Facilities Tab */}
                <TabsContent value="facilities" className="space-y-6">
                  {hotelData.facilities.map((facility, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <img
                            src={facility.image || "/placeholder.svg"}
                            alt={facility.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />

                          <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-bronze-900 mb-2">{facility.name}</h3>
                            <p className="text-bronze-700 mb-4">{facility.description}</p>
                            <div className="flex items-center gap-2 text-bronze-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">Hours: {facility.hours}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotelData.gallery.map((image, index) => (
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
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-bronze-900">Guest Reviews</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-bronze-900">{hotelData.rating}</span>
                        <span className="text-bronze-600">({hotelData.reviews.length} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {hotelData.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
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
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-xl text-bronze-900">Book Your Stay</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-600">${selectedRoom.price}</div>
                    <div className="text-bronze-600">per night</div>
                    <div className="text-sm text-bronze-500 mt-1">{selectedRoom.name}</div>
                  </div>

                  <Button
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Book Now
                  </Button>

                  <div className="text-center text-sm text-bronze-600">
                    <p>✓ Free cancellation up to 48 hours</p>
                    <p>✓ Best price guarantee</p>
                    <p>✓ Instant confirmation</p>
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
                    <Calendar className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">Check-in: 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">Check-out: 12:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">Max occupancy: 4 guests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">Free WiFi included</span>
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
                    Have questions about this hotel? Our travel experts are here to help!
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white"
                  >
                    Contact Us
                  </Button>
                  <div className="text-center text-sm text-bronze-600">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Phone className="w-4 h-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>hotels@travelsmooth.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-bronze-900">Book Your Stay: {hotelData.name}</DialogTitle>
          </DialogHeader>
          <TourBookingForm
            preSelectedTour={{
              id: hotelData.id,
              name: `${hotelData.name} - ${selectedRoom.name}`,
              price: selectedRoom.price,
              duration: "per night",
              image: hotelData.gallery[0],
            }}
            onClose={() => setIsBookingOpen(false)}
            isHotel={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
