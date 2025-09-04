"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
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
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Phone,
  Mail,
} from "lucide-react"
import TourBookingForm from "@/components/tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

const amenityIcons: Record<string, any> = {
  "WiFi": Wifi,
  "Pool": Waves,
  "Parking": Car,
  "Gym": Dumbbell,
  "Business Center": Car,
  "Air Conditioning": CheckCircle,
  "Laundry": CheckCircle,
  "Airport Shuttle": Car,
  "Restaurant": Utensils,
  "Spa": Waves,
}

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount} ${currency}`
  }
}

function normalizeHotelData(apiData: any) {
  // Accepts the API response and returns a normalized hotel object
  if (!apiData) return null
  // If wrapped in { success, data }, unwrap
  const hotel = apiData.data ? apiData.data : apiData

  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    destination_id: hotel.destination_id,
    rating: hotel.rating,
    category: hotel.category,
    rooms: hotel.rooms,
    price: hotel.price ?? hotel.min_price,
    min_price: hotel.min_price ?? hotel.price,
    max_price: hotel.max_price ?? hotel.price,
    currency: hotel.currency,
    amenities: hotel.amenities,
    description: hotel.description,
    main_image: hotel.main_image ?? hotel.mainimage ?? hotel.mainImage,
    gallery_images: hotel.gallery_images ?? hotel.galleryimages ?? hotel.galleryImages ?? [],
    address: hotel.address,
    contact_phone: hotel.contact_phone ?? hotel.contactphone,
    contact_email: hotel.contact_email ?? hotel.contactemail,
    website: hotel.website,
    check_in_time: hotel.check_in_time ?? hotel.checkintime,
    check_out_time: hotel.check_out_time ?? hotel.checkouttime,
    cancellation_policy: hotel.cancellation_policy ?? hotel.cancellationpolicy,
    additional_policies: hotel.additional_policies ?? hotel.additionalpolicies,
    additional_amenities: hotel.additional_amenities ?? hotel.additionalamenities,
    slug: hotel.slug,
  }
}

export default function HotelDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [hotel, setHotel] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch(`${BaseUrl}/api/hotels/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch hotel")
        const data = await res.json()
        const normalized = normalizeHotelData(data)
        setHotel(normalized)
        setCurrentImageIndex(0)
        setError(null)
      })
      .catch((err) => setError(err.message || "Error loading hotel"))
      .finally(() => setLoading(false))
  }, [slug])

  // Compose images array
  const allImages = [
    hotel?.main_image || "/placeholder.svg",
    ...(Array.isArray(hotel?.gallery_images) ? hotel.gallery_images : []),
  ].filter(Boolean).map((img: string) => (typeof img === 'string' ? img : "/placeholder.svg"))

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (allImages.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (allImages.length || 1)) % (allImages.length || 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-lg text-bronze-700">Loading hotel details...</span>
      </div>
    )
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-lg text-red-600">{error || "Hotel not found."}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={allImages[currentImageIndex] || "/placeholder.svg"}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Gallery Navigation */}
        {allImages.length > 1 && (
          <>
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
          </>
        )}

        {/* Gallery Indicators */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

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
                <Badge className="bg-gold-500 text-white capitalize">{hotel.category}</Badge>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{hotel.rating}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hotel.name}</h1>

              <div className="flex items-center gap-2 text-white mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-xl">{hotel.location}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-white">
                  <span className="text-2xl md:text-3xl font-bold">
                    {formatCurrency(hotel.min_price, hotel.currency)}
                  </span>
                  {hotel.max_price && hotel.max_price > hotel.min_price && (
                    <span className="text-lg text-gray-300 ml-2">
                      {formatCurrency(hotel.max_price, hotel.currency)}
                    </span>
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
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
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
                      <p className="text-bronze-700 leading-relaxed mb-6">{hotel.description}</p>

                      <div>
                        <h3 className="text-xl font-semibold text-bronze-900 mb-4">Hotel Amenities</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {(hotel.amenities || []).map((amenity: string, index: number) => {
                            const IconComponent = amenityIcons[amenity] || CheckCircle
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-gold-500" />
                                <span className="text-bronze-700">{amenity}</span>
                              </div>
                            )
                          })}
                        </div>
                        {hotel.additional_amenities && (
                          <div className="mt-2 text-bronze-700 text-sm whitespace-pre-line">
                            {hotel.additional_amenities}
                          </div>
                        )}
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
                        {hotel.cancellation_policy && (
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                            <span className="text-bronze-700 text-sm whitespace-pre-line">
                              {hotel.cancellation_policy}
                            </span>
                          </div>
                        )}
                        {hotel.additional_policies &&
                          hotel.additional_policies
                            .split("\n")
                            .filter((p: string) => p.trim())
                            .map((policy: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                                <span className="text-bronze-700 text-sm">{policy}</span>
                              </div>
                            ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Facilities Tab */}
                <TabsContent value="facilities" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-bronze-900">Facilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {(hotel.amenities || []).map((amenity: string, index: number) => {
                          const IconComponent = amenityIcons[amenity] || CheckCircle
                          return (
                            <div key={index} className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-gold-500" />
                              <span className="text-bronze-700">{amenity}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allImages.map((image: string, index: number) => (
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
                          {[...Array(hotel.rating || 0)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-bronze-900">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-bronze-700">No reviews available.</div>
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
                    <div className="text-3xl font-bold text-gold-600">
                      {formatCurrency(hotel.min_price, hotel.currency)}
                    </div>
                    <div className="text-bronze-600">per night</div>
                    <div className="text-sm text-bronze-500 mt-1">{hotel.name}</div>
                  </div>

                  <Button
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Book Now
                  </Button>

                  <div className="text-center text-sm text-bronze-600">
                    <p>✓ {hotel.cancellation_policy?.replace(/\n/g, " ") || "Free cancellation up to 48 hours"}</p>
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
                    <span className="text-bronze-700">
                      Check-in: {hotel.check_in_time ? hotel.check_in_time.slice(0,5) : "15:00"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">
                      Check-out: {hotel.check_out_time ? hotel.check_out_time.slice(0,5) : "11:00"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">
                      Rooms: {hotel.rooms || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-gold-600" />
                    <span className="text-bronze-700">
                      {hotel.amenities?.includes("WiFi") ? "Free WiFi included" : "WiFi available"}
                    </span>
                  </div>
                  {hotel.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gold-600" />
                      <span className="text-bronze-700">{hotel.address}</span>
                    </div>
                  )}
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
                    asChild
                  >
                    <a href={hotel.website || "#"} target="_blank" rel="noopener noreferrer">
                      Contact Us
                    </a>
                  </Button>
                  <div className="text-center text-sm text-bronze-600">
                    {hotel.contact_phone && (
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Phone className="w-4 h-4" />
                        <span>{hotel.contact_phone}</span>
                      </div>
                    )}
                    {hotel.contact_email && (
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{hotel.contact_email}</span>
                      </div>
                    )}
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
            <DialogTitle className="text-2xl font-bold text-bronze-900">
              Book Your Stay: {hotel.name}
            </DialogTitle>
          </DialogHeader>
          <TourBookingForm
            preSelectedTour={{
              id: hotel.id || slug,
              name: hotel.name,
              price: hotel.min_price,
              duration: "per night",
              image: allImages[0],
            }}
            itemType="hotel"
            onClose={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
