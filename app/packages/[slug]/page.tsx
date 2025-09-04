"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, MapPin, Calendar, Users, ChevronLeft, ChevronRight, CheckCircle, Shield, Plane, Hotel } from "lucide-react"
import TourBookingForm from "@/components/tour-booking-popup"
import { BaseUrl } from "@/BaseUrl"

function currency(amount?: number) {
  if (typeof amount !== "number") return "";
  try { return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount) } catch { return `$${amount}` }
}

export default function UmrahPackageDetailPage() {
  const { slug } = useParams() as { slug: string }
  const [pkg, setPkg] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [idx, setIdx] = useState(0)
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
        setPkg(Array.isArray(data) ? data[0] : data)
        setIdx(0)
      })
      .catch((e: any) => setError(e?.message || "Failed to load package"))
      .finally(() => setLoading(false))
  }, [slug])

  const gallery: string[] = useMemo(() => {
    if (!pkg) return []
    const g = (pkg.gallery || pkg.gallery_images || []) as string[]
    const main = pkg.mainimage || pkg.main_image || pkg.image
    const merged = [main, ...g].filter(Boolean)
    return merged.length ? merged : ["/placeholder.svg"]
  }, [pkg])

  if (loading) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><span className="text-bronze-700">Loading package...</span></div>)
  if (error || !pkg) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><span className="text-red-600">{error || "Package not found"}</span></div>)

  const title = pkg.title || pkg.name || "Umrah Package"
  const destination = pkg.destination || pkg.locations || "Makkah & Madinah"
  const duration = pkg.duration || "10 days"
  const price = pkg.price || pkg.min_price || 0
  const originalPrice = pkg.originalPrice || pkg.max_price
  const rating = pkg.rating || 5
  const reviews = pkg.reviews || pkg.reviewCount || 0
  const category = pkg.category || "Umrah"

  const hotels = Array.isArray(pkg.hotels) ? pkg.hotels : []
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : []
  const included = Array.isArray(pkg.included) ? pkg.included : []
  const notIncluded = Array.isArray(pkg.notIncluded) ? pkg.notIncluded : []
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : []

  const next = () => setIdx((p) => (p + 1) % gallery.length)
  const prev = () => setIdx((p) => (p - 1 + gallery.length) % gallery.length)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={typeof gallery[idx] === 'string' ? gallery[idx] : "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        {gallery.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30"><ChevronLeft className="w-6 h-6" /></button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30"><ChevronRight className="w-6 h-6" /></button>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gold-500 text-white">{category}</Badge>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-xs">({typeof reviews === 'number' ? reviews : 0} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {destination}</div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {duration}</div>
                {pkg.groupSize && <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {pkg.groupSize}</div>}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-1xl md:text-2xl font-bold text-gold-400">{currency(price)}</span>
                {originalPrice && <span className="line-through text-white/60">{currency(originalPrice)}</span>}
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white shadow-lg ml-4">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Book Umrah Package: {title}</DialogTitle>
                    </DialogHeader>
                    <TourBookingForm
                      preSelectedTour={{ id: pkg.id || slug, name: title, price, duration, image: gallery[0] || "/placeholder.svg" }}
                      itemType="umrah"
                      onClose={() => setIsBookingOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {pkg.description && (
              <Card>
                <CardHeader><CardTitle>About this Package</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{pkg.description}</p>
                </CardContent>
              </Card>
            )}

            {highlights.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-500" /> {h}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {itinerary.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Itinerary</CardTitle></CardHeader>
                <CardContent>
                  <Tabs defaultValue={String((itinerary[0]?.day) || 1)} className="w-full">
                    <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2 overflow-x-auto">
                      {itinerary.map((d: any) => (
                        <TabsTrigger key={d.day} value={String(d.day)}>Day {d.day}</TabsTrigger>
                      ))}
                    </TabsList>
                    {itinerary.map((d: any) => (
                      <TabsContent key={d.day} value={String(d.day)}>
                        <div className="mb-2 font-semibold text-lg">{d.title}</div>
                        <div className="mb-2 text-gray-700">{d.description}</div>
                        {d.accommodation && <div className="mb-2 text-sm text-gray-600">Accommodation: {d.accommodation}</div>}
                        {Array.isArray(d.activities) && (
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            {d.activities.map((a: string, i: number) => (<Badge key={i} className="bg-gray-100 text-gray-700">{a}</Badge>))}
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {Array.isArray(pkg.reviews) && (
              <Card>
                <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pkg.reviews.map((r: any, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <img src={r.avatar || "/placeholder.svg"} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{r.name}</span>
                            {r.date && <span className="text-xs text-gray-500">{r.date}</span>}
                            <span className="flex items-center ml-2">{[...Array(r.rating || 0)].map((_, j) => (<Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />))}</span>
                          </div>
                          <div className="text-gray-700 mt-1">{r.comment}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            {included.length > 0 || notIncluded.length > 0 ? (
              <Card>
                <CardHeader><CardTitle>What's Included</CardTitle></CardHeader>
                <CardContent>
                  {included.length > 0 && (
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      {included.map((it: string, i: number) => (<li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> {it}</li>))}
                    </ul>
                  )}
                  {notIncluded.length > 0 && (
                    <>
                      <div className="font-semibold mb-2">Not Included</div>
                      <ul className="list-disc pl-6 space-y-1">
                        {notIncluded.map((it: string, i: number) => (<li key={i} className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-400" /> {it}</li>))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : null}

            {hotels.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Accommodations</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hotels.map((h: any, i: number) => (
                      <div key={i} className="flex gap-4 items-center">
                        <img src={h.image || "/placeholder.svg"} alt={h.name} className="w-16 h-16 rounded object-cover" />
                        <div>
                          <div className="font-semibold">{h.name}</div>
                          <div className="text-xs text-gray-500">{h.type || "Hotel"}{h.nights ? ` • ${h.nights} nights` : ""}</div>
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
