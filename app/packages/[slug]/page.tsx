"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
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
import { useParams } from "next/navigation"
import { BaseUrl } from "@/BaseUrl"

function currency(amount?: number, currencyCode?: string) {
  if (typeof amount !== "number") return ""
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode || "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `$${amount}`
  }
}

export default function UmrahPackageDetailPage() {
  const { slug } = useParams() as { slug: string }
  const [pkg, setPkg] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    fetch(`${BaseUrl}/api/umrah/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch package")
        return res.json()
      })
      .then((data) => {
        const pkgData = Array.isArray(data?.data) ? data?.data : data?.data
        setPkg(pkgData)
        setCurrentImageIndex(0)
      })
      .catch((e: any) => setError(e?.message || "Failed to load package"))
      .finally(() => setLoading(false))
  }, [slug])

  // Gallery images
  const gallery: string[] = useMemo(() => {
    if (!pkg) return []
    const g = (pkg.gallery || pkg.gallery_images || []) as string[]
    const main = pkg.mainimage || pkg.main_image || pkg.image
    const merged = [main, ...g].filter(Boolean)
    return merged.length ? merged : ["/placeholder.svg"]
  }, [pkg])

  // Accommodations
  const accommodations: any[] = useMemo(() => {
    if (!pkg) return []
    if (Array.isArray(pkg.accommodations) && pkg.accommodations.length > 0) return pkg.accommodations
    if (Array.isArray(pkg.hotels) && pkg.hotels.length > 0) {
      // Map hotels to accommodations shape
      return pkg.hotels.map((h: any) => ({
        name: h.name,
        type: h.type || h.category || "Hotel",
        nights: h.nights,
        image: h.image,
        amenities: h.amenities || [],
      }))
    }
    return []
  }, [pkg])

  // Fallbacks and data mapping for new API structure
  const title = pkg?.name || pkg?.title || "Umrah Package"
  const description = pkg?.description || ""
  const duration = pkg?.duration || pkg?.total_duration || ""
  const durationMakkah = pkg?.duration_makkah
  const durationMadinah = pkg?.duration_madinah
  const price = pkg?.price || 0
  const currencyCode = pkg?.currency || "USD"
  const packageType = pkg?.package_type
  const groupSize = pkg?.group_size
  const availableSeats = pkg?.available_seats
  const bookingsCount = pkg?.bookings_count
  const departureTime = pkg?.departure_time
  const returnTime = pkg?.return_time
  const departureDate = pkg?.departure_date
  const returnDate = pkg?.return_date
  const status = pkg?.status
  const mainImage = pkg?.main_image || pkg?.mainimage || pkg?.image
  const included: string[] = Array.isArray(pkg?.included) ? pkg.included : (Array.isArray(pkg?.package_include) ? pkg.package_include : [])
  const notIncluded: string[] = Array.isArray(pkg?.not_included) ? pkg.not_included : (Array.isArray(pkg?.notIncluded) ? pkg.notIncluded : [])
  const accommodation = pkg?.accommodation
  const flightsIncluded = pkg?.flights_included
  const transportation = pkg?.transportation
  const meals = pkg?.meals
  const visaAssistance = pkg?.visa_assistance
  const itinerary: any[] = Array.isArray(pkg?.itinerary) ? pkg.itinerary : []
  const hotels: any[] = Array.isArray(pkg?.hotels) ? pkg.hotels : []
  const hotelIds: string[] = Array.isArray(pkg?.hotel_ids) ? pkg.hotel_ids : []
  const createdAt = pkg?.created_at
  const updatedAt = pkg?.updated_at
  const slugValue = pkg?.slug
  const category = pkg?.category || "Umrah"
  const rating = pkg?.rating || 5
  const reviewCount = pkg?.reviewCount || 0
  const reviews: any[] = Array.isArray(pkg?.reviews) ? pkg.reviews : []

  // Gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-bronze-700">Loading package...</span>
      </div>
    )
  if (error || !pkg)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-red-600">{error || "Package not found"}</span>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={gallery[currentImageIndex] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Gallery Navigation */}
        {gallery.length > 1 && (
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
        {gallery.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
            {gallery.map((_, index) => (
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
                <Badge className="bg-gold-500 text-white">{category}</Badge>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-xs">({reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {pkg?.destination || "Makkah & Madinah"}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {duration} days
                </div>
                {groupSize && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {groupSize}
                  </div>
                )}
                {packageType && (
                  <div className="flex items-center gap-1">
                    <Badge className="bg-blue-100 text-blue-700">{packageType}</Badge>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span className="text-1xl md:text-2xl font-bold text-gold-400">{currency(price, currencyCode)}</span>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white shadow-lg ml-4">
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Book Umrah Package</DialogTitle>
                    </DialogHeader>
                    <TourBookingForm
                      preSelectedTour={{
                        id: pkg.id || slug,
                        name: title,
                        price,
                        duration,
                        image: gallery[0] || "/placeholder.svg",
                      }}
                      onClose={() => setIsBookingOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-white/80 text-sm">
                {availableSeats !== undefined && (
                  <span>
                    <b>Available Seats:</b> {availableSeats}
                  </span>
                )}
                {bookingsCount !== undefined && (
                  <span>
                    <b>Bookings:</b> {bookingsCount}
                  </span>
                )}
                {status && (
                  <span>
                    <b>Status:</b> {status}
                  </span>
                )}
                {departureTime && (
                  <span>
                    <b>Departure Time:</b> {departureTime}
                  </span>
                )}
                {returnTime && (
                  <span>
                    <b>Return Time:</b> {returnTime}
                  </span>
                )}
                {departureDate && (
                  <span>
                    <b>Departure Date:</b> {departureDate}
                  </span>
                )}
                {returnDate && (
                  <span>
                    <b>Return Date:</b> {returnDate}
                  </span>
                )}
                {durationMakkah && (
                  <span>
                    <b>Makkah:</b> {durationMakkah} nights
                  </span>
                )}
                {durationMadinah && (
                  <span>
                    <b>Madinah:</b> {durationMadinah} nights
                  </span>
                )}
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
                <p className="text-gray-700 mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {packageType && (
                    <Badge className="bg-gray-200 text-gray-800">Type: {packageType}</Badge>
                  )}
                  {groupSize && (
                    <Badge className="bg-gray-200 text-gray-800">Group Size: {groupSize}</Badge>
                  )}
                  {flightsIncluded && (
                    <Badge className="bg-green-100 text-green-700">Flights Included</Badge>
                  )}
                  {transportation && (
                    <Badge className="bg-blue-100 text-blue-700">{transportation}</Badge>
                  )}
                  {meals && (
                    <Badge className="bg-yellow-100 text-yellow-700">{meals}</Badge>
                  )}
                  {visaAssistance && (
                    <Badge className="bg-purple-100 text-purple-700">Visa Assistance</Badge>
                  )}
                  {accommodation && (
                    <Badge className="bg-gray-100 text-gray-700">{accommodation}</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                  {createdAt && <span>Created: {new Date(createdAt).toLocaleString()}</span>}
                  {updatedAt && <span>Updated: {new Date(updatedAt).toLocaleString()}</span>}
                  {slugValue && <span>Slug: {slugValue}</span>}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                {itinerary.length === 0 ? (
                  <div className="text-gray-500">No itinerary details provided.</div>
                ) : (
                  <Tabs defaultValue={`day-${itinerary[0]?.day || 1}`} className="w-full">
                    <TabsList className="grid grid-cols-5 md:grid-cols-8 gap-2 overflow-x-auto h-[9.5rem] md:h-[5.5rem] ">
                      {itinerary.map((day) => (
                        <TabsTrigger key={day.day} value={`day-${day.day}`}>
                          Day {day.day}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {itinerary.map((day) => (
                      <TabsContent key={day.day} value={`day-${day.day}`}>
                        <div className="mb-2 font-semibold text-lg">{day.title}</div>
                        <div className="mb-2 text-gray-700">{day.description}</div>
                        <div className="mb-2 text-sm text-gray-600">
                          Accommodation: {day.accommodation}
                        </div>
                        {Array.isArray(day.activities) && day.activities.length > 0 && (
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            {day.activities.map((act: string, i: number) => (
                              <Badge key={i} className="bg-gray-100 text-gray-700">
                                {act}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {Array.isArray(day.meals) && day.meals.length > 0 && (
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            {day.meals.map((meal: string, i: number) => (
                              <Badge key={i} className="bg-gold-100 text-gold-700">
                                <Utensils className="w-3 h-3 inline mr-1" />
                                {meal}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            {reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review: any, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{review.name}</span>
                            {review.date && (
                              <span className="text-xs text-gray-500">{review.date}</span>
                            )}
                            <span className="flex items-center ml-2">
                              {[...Array(review.rating || 0)].map((_, i) => (
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
            )}
          </div>

          {/* Right/Sidebar Column */}
          <div className="space-y-8">
            {/* Inclusions/Exclusions */}
            {(included.length > 0 || notIncluded.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  {included.length > 0 && (
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      {included.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {notIncluded.length > 0 && (
                    <>
                      <div className="font-semibold mb-2">Not Included</div>
                      <ul className="list-disc pl-6 space-y-1">
                        {notIncluded.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-400" /> {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Accommodations */}
            {(accommodations.length > 0 || hotels.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Accommodations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accommodations.length > 0 &&
                      accommodations.map((hotel, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <img
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div>
                            <div className="font-semibold">{hotel.name}</div>
                            <div className="text-xs text-gray-500">
                              {hotel.type}
                              {hotel.nights ? ` • ${hotel.nights} nights` : ""}
                            </div>
                            {Array.isArray(hotel.amenities) && hotel.amenities.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {hotel.amenities.map((am: string, j: number) => (
                                  <Badge key={j} className="bg-gray-100 text-gray-700 text-xs">
                                    {am}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    {/* If no accommodations, but hotel_ids or hotels exist, show them */}
                    {accommodations.length === 0 && hotels.length === 0 && hotelIds.length > 0 && (
                      <div>
                        <div className="text-gray-700">Hotel IDs:</div>
                        <ul className="list-disc pl-6">
                          {hotelIds.map((id) => (
                            <li key={id} className="text-xs text-gray-600">{id}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {hotels.length > 0 &&
                      hotels.map((hotel, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <img
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div>
                            <div className="font-semibold">{hotel.name}</div>
                            <div className="text-xs text-gray-500">
                              {hotel.type || hotel.category || "Hotel"}
                              {hotel.nights ? ` • ${hotel.nights} nights` : ""}
                            </div>
                            {Array.isArray(hotel.amenities) && hotel.amenities.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {hotel.amenities.map((am: string, j: number) => (
                                  <Badge key={j} className="bg-gray-100 text-gray-700 text-xs">
                                    {am}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
