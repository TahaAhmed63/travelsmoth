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
  Calendar,
  Users,
  Plane,
  Hotel,
  CheckCircle,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  Utensils,
} from "lucide-react"
import Link from "next/link"
import TourBookingForm from "@/components/tour-booking-popup"

// Mock Umrah package data
const umrahPackage = {
  id: "umrah-gold-2024",
  title: "Umrah Gold Package 2024",
  destination: "Makkah & Madinah, Saudi Arabia",
  duration: "14 days / 13 nights",
  price: 2499,
  originalPrice: 2999,
  rating: 4.8,
  reviewCount: 128,
  category: "Umrah",
  groupSize: "20-30 people",
  languages: ["English", "Arabic", "Urdu"],
  minAge: 12,
  description:
    "Experience a spiritually uplifting Umrah journey with our Gold Package. Enjoy premium accommodation, guided tours, and seamless travel between the holy cities of Makkah and Madinah.",
  highlights: [
    "5-star hotels near Haram in Makkah & Madinah",
    "Direct flights from major cities",
    "Guided Ziyarat tours in both cities",
    "Daily buffet breakfast and dinner",
    "24/7 group leader support",
    "Private air-conditioned transport",
    "Complimentary Ihram kit",
    "Visa processing included",
  ],
  included: [
    "Return international airfare",
    "13 nights in 5-star hotels",
    "Daily breakfast and dinner",
    "All ground transfers",
    "Umrah visa processing",
    "Ziyarat tours in Makkah & Madinah",
    "Group leader and religious guide",
    "Travel insurance",
  ],
  notIncluded: [
    "Personal expenses",
    "Lunches",
    "Laundry services",
    "Optional excursions",
    "Tips and gratuities",
  ],
  itinerary: [
    {
      day: 1,
      title: "Departure & Arrival in Jeddah",
      description:
        "Depart from your home country and arrive in Jeddah. Meet and greet at the airport, transfer to Makkah hotel.",
      activities: ["International flight", "Airport pickup", "Hotel check-in"],
      meals: ["Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 2,
      title: "Umrah Rituals & Orientation",
      description:
        "Perform Umrah rituals with group and guide. Orientation session in the evening.",
      activities: ["Umrah rituals", "Group orientation"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 3,
      title: "Makkah Ziyarat Tour",
      description:
        "Guided tour of historical sites in Makkah including Mina, Arafat, and Jabal al-Noor.",
      activities: ["Ziyarat tour", "Religious lectures"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 4,
      title: "Ibadah & Free Time",
      description:
        "Day for personal worship and prayers at Masjid al-Haram. Optional group activities in the evening.",
      activities: ["Personal worship", "Optional group activity"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 5,
      title: "Transfer to Madinah",
      description:
        "Travel to Madinah by private coach. Check-in at hotel near Masjid an-Nabawi.",
      activities: ["Coach transfer", "Hotel check-in"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Pullman Zamzam Madinah",
    },
    {
      day: 6,
      title: "Madinah Ziyarat Tour",
      description:
        "Guided tour of historical sites in Madinah including Quba Mosque, Uhud Mountain, and Qiblatain Mosque.",
      activities: ["Ziyarat tour", "Religious lectures"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Pullman Zamzam Madinah",
    },
    {
      day: 7,
      title: "Ibadah & Reflection",
      description:
        "Day for personal worship and reflection at Masjid an-Nabawi. Group discussion in the evening.",
      activities: ["Personal worship", "Group discussion"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Pullman Zamzam Madinah",
    },
    {
      day: 8,
      title: "Free Day in Madinah",
      description:
        "Enjoy a free day for shopping, rest, or additional prayers.",
      activities: ["Shopping", "Rest", "Optional excursions"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Pullman Zamzam Madinah",
    },
    {
      day: 9,
      title: "Return to Makkah",
      description:
        "Travel back to Makkah for final days of worship and reflection.",
      activities: ["Coach transfer", "Hotel check-in"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 10,
      title: "Ibadah & Group Activities",
      description:
        "Participate in group prayers and lectures. Free time for personal worship.",
      activities: ["Group prayers", "Religious lectures", "Personal worship"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 11,
      title: "Shopping & Farewell Dinner",
      description:
        "Shopping in local markets. Special farewell dinner with the group.",
      activities: ["Shopping", "Farewell dinner"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 12,
      title: "Final Worship & Reflections",
      description:
        "Last day for prayers and reflections at Masjid al-Haram.",
      activities: ["Personal worship", "Group reflection"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 13,
      title: "Preparation for Departure",
      description:
        "Pack and prepare for departure. Group debrief and feedback session.",
      activities: ["Packing", "Debrief session"],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Swissotel Makkah",
    },
    {
      day: 14,
      title: "Departure",
      description:
        "Check out and transfer to Jeddah airport for return flight home.",
      activities: ["Hotel check-out", "Airport transfer", "International flight"],
      meals: ["Breakfast"],
      accommodation: "-",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3c5c?w=800&h=600&fit=crop",
  ],
  accommodations: [
    {
      name: "Swissotel Makkah",
      type: "5-star Hotel",
      nights: 9,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      amenities: ["Near Haram", "Buffet meals", "WiFi", "Laundry"],
    },
    {
      name: "Pullman Zamzam Madinah",
      type: "5-star Hotel",
      nights: 4,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
      amenities: ["Near Masjid an-Nabawi", "Buffet meals", "WiFi", "Laundry"],
    },
  ],
  reviews: [
    {
      name: "Ahmed Khan",
      rating: 5,
      date: "2024-02-10",
      comment:
        "A truly spiritual and comfortable journey. The guides were knowledgeable and the hotels were excellent. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Fatima Zahra",
      rating: 5,
      date: "2024-02-05",
      comment:
        "Everything was well organized, from flights to Ziyarat tours. The group leader was very helpful throughout.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Mohammed Ali",
      rating: 4,
      date: "2024-01-28",
      comment:
        "Great value for money. The itinerary was well balanced between worship and sightseeing.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
  ],
}

export default function UmrahPackageDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % umrahPackage.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + umrahPackage.gallery.length) % umrahPackage.gallery.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={umrahPackage.gallery[currentImageIndex] || "/placeholder.svg"}
            alt={umrahPackage.title}
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
          {umrahPackage.gallery.map((_, index) => (
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
          href="/packages"
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
                <Badge className="bg-gold-500 text-white">{umrahPackage.category}</Badge>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{umrahPackage.rating}</span>
                  <span className="text-xs">({umrahPackage.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{umrahPackage.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {umrahPackage.destination}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {umrahPackage.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {umrahPackage.groupSize}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-gold-400">${umrahPackage.price}</span>
                <span className="line-through text-white/60">${umrahPackage.originalPrice}</span>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white shadow-lg ml-4">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Book Umrah Package</DialogTitle>
                    </DialogHeader>
                    <TourBookingForm
                      preSelectedTour={{
                        id: umrahPackage.id,
                        name: umrahPackage.title,
                        price: umrahPackage.price,
                        duration: umrahPackage.duration,
                        image: umrahPackage.gallery[0] || "/placeholder.svg",
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
      <main className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left/Main Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this Package</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{umrahPackage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {umrahPackage.languages.map((lang) => (
                    <Badge key={lang} className="bg-gray-200 text-gray-800">{lang}</Badge>
                  ))}
                  <Badge className="bg-gray-200 text-gray-800">Min Age: {umrahPackage.minAge}+</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {umrahPackage.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-500" /> {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="day-1" className="w-full">
                  <TabsList className="overflow-x-auto flex-nowrap">
                    {umrahPackage.itinerary.map((day) => (
                      <TabsTrigger key={day.day} value={`day-${day.day}`}>Day {day.day}</TabsTrigger>
                    ))}
                  </TabsList>
                  {umrahPackage.itinerary.map((day) => (
                    <TabsContent key={day.day} value={`day-${day.day}`}> 
                      <div className="mb-2 font-semibold text-lg">{day.title}</div>
                      <div className="mb-2 text-gray-700">{day.description}</div>
                      <div className="mb-2 text-sm text-gray-600">Accommodation: {day.accommodation}</div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                        {day.activities.map((act, i) => (
                          <Badge key={i} className="bg-gray-100 text-gray-700">{act}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        {day.meals.map((meal, i) => (
                          <Badge key={i} className="bg-gold-100 text-gold-700"><Utensils className="w-3 h-3 inline mr-1" />{meal}</Badge>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {umrahPackage.reviews.map((review, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-xs text-gray-500">{review.date}</span>
                          <span className="flex items-center ml-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </span>
                        </div>
                        <div className="text-gray-700 mt-1">{review.comment}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right/Sidebar Column */}
          <div className="space-y-8">
            {/* Inclusions/Exclusions */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  {umrahPackage.included.map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> {item}</li>
                  ))}
                </ul>
                <div className="font-semibold mb-2">Not Included</div>
                <ul className="list-disc pl-6 space-y-1">
                  {umrahPackage.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-400" /> {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Accommodations */}
            <Card>
              <CardHeader>
                <CardTitle>Accommodations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {umrahPackage.accommodations.map((hotel, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <img src={hotel.image} alt={hotel.name} className="w-16 h-16 rounded object-cover" />
                      <div>
                        <div className="font-semibold">{hotel.name}</div>
                        <div className="text-xs text-gray-500">{hotel.type} &bull; {hotel.nights} nights</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hotel.amenities.map((am, j) => (
                            <Badge key={j} className="bg-gray-100 text-gray-700 text-xs">{am}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 