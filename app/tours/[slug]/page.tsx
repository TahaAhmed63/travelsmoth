"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
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

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <span className="text-bronze-700 text-lg">Loading tour details...</span>
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <span className="text-red-600 text-lg">{message}</span>
    </div>
  )
}

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ""
  const [tourData, setTourData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    setTourData(null)
    // Replace with your actual API endpoint
    fetch(`http://localhost:3001/api/tours/${slug}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Tour not found")
        }
        return res.json()
      })
      .then((data) => {
        setTourData(data)
        setCurrentImageIndex(0)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Failed to load tour")
        setLoading(false)
      })
  }, [slug])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!tourData) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (tourData.gallery?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (tourData.gallery?.length || 1)) % (tourData.gallery?.length || 1))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`http://localhost:3001${tourData.mainImage}` || "/placeholder.svg"}
            alt={tourData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Gallery Navigation */}
        {tourData.gallery?.length > 1 && (
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
        {tourData.gallery?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
            {tourData.gallery.map((_: any, index: number) => (
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

        {/* Back Button */}
        <Link
          href="/tours"
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
                {tourData.category && (
                  <Badge className="bg-gold-500 text-white">{tourData.category}</Badge>
                )}
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tourData.rating}</span>
                  <span className="text-gray-300">
                    ({Array.isArray(tourData.reviews) ? tourData.reviews.length : 0} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tourData.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-white mb-6">
                {tourData.destination && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{tourData.destination}</span>
                  </div>
                )}
                {tourData.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{tourData.duration}</span>
                  </div>
                )}
                {tourData.groupSize && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{tourData.groupSize}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-white">
                  <span className="text-3xl font-bold">${tourData.price}</span>
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
                        image: tourData.gallery?.[0],
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="accommodations">Hotels</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-bronze-900">Tour Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-bronze-700 leading-relaxed mb-6">{tourData.description}</p>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold text-bronze-900 mb-4">Tour Highlights</h3>
                          <ul className="space-y-2">
                            {(tourData.highlights || []).map((highlight: string, index: number) => (
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
                            {tourData.duration && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">Duration:</span>
                                <span className="font-medium text-bronze-900">{tourData.duration}</span>
                              </div>
                            )}
                            {tourData.groupSize && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">Group Size:</span>
                                <span className="font-medium text-bronze-900">{tourData.groupSize}</span>
                              </div>
                            )}
                            {tourData.difficulty && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">Difficulty:</span>
                                <span className="font-medium text-bronze-900">{tourData.difficulty}</span>
                              </div>
                            )}
                            {tourData.minAge && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">Min Age:</span>
                                <span className="font-medium text-bronze-900">{tourData.minAge}+</span>
                              </div>
                            )}
                            {tourData.languages && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">Languages:</span>
                                <span className="font-medium text-bronze-900">
                                  {Array.isArray(tourData.languages)
                                    ? tourData.languages.join(", ")
                                    : tourData.languages}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Included/Not Included */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-bronze-900 flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          What's Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {(tourData.included || []).map((item: string, index: number) => (
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
                          {(tourData.notIncluded || []).map((item: string, index: number) => (
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
                <TabsContent value="itinerary" className="space-y-6">
                  {(tourData.itinerary || []).map((day: any, index: number) => (
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

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-bronze-900 mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Activities
                            </h4>
                            <ul className="space-y-1">
                              {(day.activities || []).map((activity: string, i: number) => (
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
                              {(day.meals || []).map((meal: string, i: number) => (
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
                <TabsContent value="accommodations" className="space-y-6">
                  {(tourData.accommodations || []).map((hotel: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
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
                                {(hotel.amenities || []).map((amenity: string, i: number) => (
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(tourData.destinations || []).flatMap((destination: any) =>
                      (destination.galleryImages || []).map((image: string, index: number) => (
                        <motion.div
                          key={`${destination.id}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="relative group cursor-pointer"
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={`http://localhost:3001/${image}` || "/placeholder.svg"}
                            alt={`Gallery ${index + 1} - ${destination.name}`}
                            className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-bronze-900">Customer Reviews</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-bronze-900">{tourData.rating}</span>
                        <span className="text-bronze-600">
                          ({Array.isArray(tourData.reviews) ? tourData.reviews.length : 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {(tourData.reviews || []).map((review: any, index: number) => (
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
                              {[...Array(review.rating)].map((_: any, i: number) => (
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
                  <CardTitle className="text-xl text-bronze-900">Book This Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-600">${tourData.price}</div>
                    {tourData.originalPrice && (
                      <div className="text-lg text-bronze-500 line-through">${tourData.originalPrice}</div>
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
                          image: tourData.gallery?.[0],
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
                  {tourData.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gold-600" />
                      <span className="text-bronze-700">{tourData.duration}</span>
                    </div>
                  )}
                  {tourData.groupSize && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gold-600" />
                      <span className="text-bronze-700">{tourData.groupSize}</span>
                    </div>
                  )}
                  {tourData.destination && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gold-600" />
                      <span className="text-bronze-700">{tourData.destination}</span>
                    </div>
                  )}
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
