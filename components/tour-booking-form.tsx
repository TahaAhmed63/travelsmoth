"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft, Check, Plane, Hotel, Package } from "lucide-react"
import { BaseUrl } from "@/BaseUrl"

const steps = [
  { id: 1, title: "Service Type", icon: Package },
  { id: 2, title: "Selection", icon: MapPin },
  { id: 3, title: "Details", icon: Calendar },
  { id: 4, title: "Travelers", icon: Users },
  { id: 5, title: "Confirmation", icon: Check },
]

const serviceTypes = [
  {
    id: "tours",
    name: "Tour Packages",
    description: "Guided tours with expert local guides",
    icon: Plane,
    color: "bg-gold-100 text-gold-700 border-gold-300",
  },
  {
    id: "hotels",
    name: "Hotel Bookings",
    description: "Luxury accommodations worldwide",
    icon: Hotel,
    color: "bg-bronze-100 text-bronze-700 border-bronze-300",
  },
  {
    id: "umrah",
    name: "Umrah Packages",
    description: "Sacred pilgrimage experiences",
    icon: Package,
    color: "bg-cream-100 text-bronze-700 border-cream-300",
  },
]

type ItemType = "tours" | "hotels" | "umrah"

type Item = {
  id: string
  slug?: string
  name: string
  price: number
  duration: string
  image: string
  type: ItemType
}

export default function TourBookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: "",
    destination: "",
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
    rooms: 1,
    accommodation: "",
    specialRequests: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const [items, setItems] = useState<Item[]>([])
  const [loadingItems, setLoadingItems] = useState(false)
  const [itemsError, setItemsError] = useState<string | null>(null)

  const selectedDestination = useMemo(() => items.find((d) => d.id === formData.destination || d.slug === formData.destination), [items, formData.destination])
  const filteredDestinations = useMemo(() => items.filter((d) => d.type === formData.serviceType), [items, formData.serviceType])

  useEffect(() => {
    if (!formData.serviceType) return
    setLoadingItems(true)
    setItemsError(null)
    setFormData((prev) => ({ ...prev, destination: "" }))

    const url = formData.serviceType === "tours" ? `${BaseUrl}/api/tours` : formData.serviceType === "hotels" ? `${BaseUrl}/api/hotels` : `${BaseUrl}/api/umrah`

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load options")
        return res.json()
      })
      .then((raw) => {
        const arr: any[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data?.tours) ? raw.data.tours
          : Array.isArray(raw?.data?.hotels) ? raw.data.hotels
          : Array.isArray(raw?.data?.packages) ? raw.data.packages
          : Array.isArray(raw?.tours) ? raw.tours
          : Array.isArray(raw?.hotels) ? raw.hotels
          : Array.isArray(raw?.umrah) ? raw.umrah
          : []

        const normalized: Item[] = arr.map((it: any): Item => {
          if (formData.serviceType === "tours") {
            const image = it.mainImage || it.archiveImages?.[0] || it.image || "/placeholder.svg"
            const name = it.title || it.name || "Tour"
            return {
              id: it.id,
              slug: it.slug,
              name,
              price: typeof it.price === "number" ? it.price : (typeof it.price === "string" ? Number(it.price.replace(/[^\d.]/g, "")) : 0),
              duration: it.duration || "",
              image: typeof image === "string" ? image : "/placeholder.svg",
              type: "tours",
            }
          }
          if (formData.serviceType === "hotels") {
            const image = it.mainImage || it.mainimage || it.main_image || it.gallery_images?.[0] || "/placeholder.svg"
            return {
              id: it.slug || it.id || it.name,
              slug: it.slug,
              name: it.name,
              price: it.minprice || it.min_price || 0,
              duration: "per night",
              image: typeof image === "string" ? image : "/placeholder.svg",
              type: "hotels",
            }
          }
          const image = it.mainimage || it.main_image || it.image || "/placeholder.svg"
          return {
            id: it.slug || it.id || it.name,
            slug: it.slug,
            name: it.name || it.title || "Umrah Package",
            price: it.price || it.min_price || 0,
            duration: it.duration || "",
            image: typeof image === "string" ? image : "/placeholder.svg",
            type: "umrah",
          }
        })
        setItems(normalized)
      })
      .catch((e: any) => setItemsError(e?.message || "Failed to load options"))
      .finally(() => setLoadingItems(false))
  }, [formData.serviceType])

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      const selected = items.find((d) => d.id === formData.destination || d.slug === formData.destination)
      const itemType = formData.serviceType === "tours" ? "tour" : formData.serviceType === "hotels" ? "hotel" : "umrah"
      const payload: any = {
        customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
        customer_email: formData.email,
        customer_phone: formData.phone,
        item_type: itemType,
        item_id: selected?.id || null,
        item_name: selected?.name || null,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        total_price: calculateTotal(),
        currency: "USD",
        number_of_guests: formData.adults + formData.children,
        adults: formData.adults,
        children: formData.children,
        accommodation_preference: formData.accommodation || null,
        selected_package: selected?.id || null,
      }
      const { BaseUrl } = await import("@/BaseUrl")
      const res = await fetch(`${BaseUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to submit booking")
      alert("Booking submitted! Our team will contact you shortly.")
    } catch (e: any) {
      alert(e?.message || "Failed to submit booking")
    }
  }

  const calculateTotal = () => {
    if (!selectedDestination) return 0
    const basePrice = selectedDestination.price || 0
    if (formData.serviceType === "hotels") {
      return basePrice * Math.max(1, formData.rooms) * 7
    }
    return basePrice * Math.max(1, (formData.adults + formData.children * 0.7))
  }

  const getCurrentStepIcon = () => {
    const currentStepData = steps[currentStep - 1]
    const IconComponent = currentStepData.icon
    return <IconComponent className="w-6 h-6" />
  }

  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 to-gold-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Book Your Perfect Experience</h2>
          <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
            Choose from tours, hotels, or complete packages for your dream vacation
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center min-w-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: currentStep >= step.id ? 1 : 0.8,
                    opacity: currentStep >= step.id ? 1 : 0.5,
                  }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-gold-500 border-gold-500 text-white"
                      : "bg-white border-bronze-300 text-bronze-400"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </motion.div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? "text-gold-600" : "text-bronze-400"}`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${currentStep >= step.id ? "text-bronze-900" : "text-bronze-400"}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-gold-500" : "bg-bronze-300"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <Card className="border-0 shadow-2xl bg-white/60 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gold-500 to-bronze-600 text-white rounded-t-lg backdrop-blur-md bg-opacity-95">
              <CardTitle className="text-2xl flex items-center gap-3">
                {getCurrentStepIcon()}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Type Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-lg font-semibold mb-6 block">What would you like to book?</Label>
                      <div className="grid md:grid-cols-3 gap-6">
                        {serviceTypes.map((service) => (
                          <motion.div
                            key={service.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateFormData("serviceType", service.id)}
                            className={`cursor-pointer p-6 rounded-lg border-2 text-center transition-all duration-300 ${
                              formData.serviceType === service.id
                                ? "border-gold-500 bg-gold-50"
                                : "border-bronze-200 hover:border-gold-300"
                            }`}
                          >
                            <service.icon className="w-12 h-12 mx-auto mb-4 text-gold-600" />
                            <h3 className="text-xl font-semibold text-bronze-900 mb-2">{service.name}</h3>
                            <p className="text-bronze-600">{service.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Choose Your{" "}
                        {formData.serviceType === "tours"
                          ? "Tour"
                          : formData.serviceType === "hotels"
                            ? "Hotel"
                            : "Package"}
                      </Label>
                      <div className="mb-4">
                        <Select value={formData.destination} onValueChange={(v) => updateFormData("destination", v)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={loadingItems ? "Loading..." : "Select option"} />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredDestinations.map((d) => (
                              <SelectItem key={d.id} value={d.slug || d.id}>{d.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {itemsError && <div className="text-sm text-red-600 mt-2">{itemsError}</div>}
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDestinations.map((destination) => (
                          <motion.div
                            key={destination.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateFormData("destination", destination.slug || destination.id)}
                            className={`cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                              formData.destination === (destination.slug || destination.id)
                                ? "border-gold-500 bg-gold-50"
                                : "border-bronze-200 hover:border-gold-300"
                            }`}
                          >
                            <img
                              src={destination.image || "/placeholder.svg"}
                              alt={destination.name}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                              <h3 className="font-semibold text-bronze-900">{destination.name}</h3>
                              <div className="flex items-center justify-between mt-2">
                                {destination.price ? (
                                  <span className="text-gold-600 font-bold">${destination.price}</span>
                                ) : <span />}
                                <Badge variant="secondary" className="bg-bronze-100 text-bronze-700">
                                  {destination.duration}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Travel Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="startDate" className="text-lg font-semibold">
                          {formData.serviceType === "hotels" ? "Check-in Date" : "Departure Date"}
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateFormData("startDate", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate" className="text-lg font-semibold">
                          {formData.serviceType === "hotels" ? "Check-out Date" : "Return Date"}
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => updateFormData("endDate", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {formData.serviceType === "hotels" && (
                      <div>
                        <Label className="text-lg font-semibold mb-4 block">Number of Rooms</Label>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateFormData("rooms", Math.max(1, formData.rooms - 1))}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center font-semibold">{formData.rooms}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateFormData("rooms", formData.rooms + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    )}

                    {formData.serviceType !== "packages" && (
                      <div>
                        <Label className="text-lg font-semibold mb-4 block">
                          {formData.serviceType === "hotels" ? "Room Type" : "Accommodation Preference"}
                        </Label>
                        <Select
                          value={formData.accommodation}
                          onValueChange={(value) => updateFormData("accommodation", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select accommodation type" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.serviceType === "hotels" ? (
                              <>
                                <SelectItem value="standard">Standard Room</SelectItem>
                                <SelectItem value="deluxe">Deluxe Room</SelectItem>
                                <SelectItem value="suite">Suite</SelectItem>
                                <SelectItem value="presidential">Presidential Suite</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="budget">Budget Hotels (3-star)</SelectItem>
                                <SelectItem value="standard">Standard Hotels (4-star)</SelectItem>
                                <SelectItem value="luxury">Luxury Hotels (5-star)</SelectItem>
                                <SelectItem value="boutique">Boutique Properties</SelectItem>
                                <SelectItem value="resort">Resort & Spa</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="specialRequests" className="text-lg font-semibold">
                        Special Requests
                      </Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any dietary restrictions, accessibility needs, or special occasions..."
                        value={formData.specialRequests}
                        onChange={(e) => updateFormData("specialRequests", e.target.value)}
                        className="mt-2"
                        rows={4}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Traveler Information */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Number of Travelers</Label>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="adults">Adults (18+)</Label>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateFormData("adults", Math.max(1, formData.adults - 1))}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center font-semibold">{formData.adults}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateFormData("adults", formData.adults + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="children">Children (0-17)</Label>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateFormData("children", Math.max(0, formData.children - 1))}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center font-semibold">{formData.children}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateFormData("children", formData.children + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-lg font-semibold">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          className="mt-2"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-lg font-semibold">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          className="mt-2"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-lg font-semibold">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="mt-2"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-lg font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="mt-2"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-cream-50 to-gold-50 p-6 rounded-lg">
                      <h3 className="text-2xl font-bold text-bronze-900 mb-4 flex items-center gap-2">
                        <Plane className="w-6 h-6 text-gold-600" />
                        Booking Summary
                      </h3>

                      {selectedDestination && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <img
                              src={selectedDestination.image || "/placeholder.svg"}
                              alt={selectedDestination.name}
                              className="w-full h-32 object-cover rounded-lg mb-4"
                            />
                            <h4 className="text-xl font-semibold text-bronze-900">{selectedDestination.name}</h4>
                            <p className="text-bronze-600">{selectedDestination.duration}</p>
                            <Badge className="mt-2 bg-gold-100 text-gold-700">
                              {formData.serviceType === "tours"
                                ? "Tour Package"
                                : formData.serviceType === "hotels"
                                  ? "Hotel Booking"
                                  : "Complete Package"}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Service Type:</span>
                              <span className="font-semibold capitalize">{formData.serviceType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-bronze-600">
                                {formData.serviceType === "hotels" ? "Check-in:" : "Departure:"}
                              </span>
                              <span className="font-semibold">{formData.startDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-bronze-600">Travelers:</span>
                              <span className="font-semibold">
                                {formData.adults} Adults{formData.children > 0 && `, ${formData.children} Children`}
                              </span>
                            </div>
                            {formData.serviceType === "hotels" && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">Rooms:</span>
                                <span className="font-semibold">{formData.rooms}</span>
                              </div>
                            )}
                            {formData.accommodation && (
                              <div className="flex justify-between">
                                <span className="text-bronze-600">
                                  {formData.serviceType === "hotels" ? "Room Type:" : "Accommodation:"}
                                </span>
                                <span className="font-semibold capitalize">{formData.accommodation}</span>
                              </div>
                            )}
                            <div className="border-t pt-3 mt-3">
                              <div className="flex justify-between text-xl font-bold text-gold-600">
                                <span>Total Estimate:</span>
                                <span>${calculateTotal().toLocaleString()}</span>
                              </div>
                              <p className="text-sm text-bronze-500 mt-1">
                                *Final price may vary based on availability
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">What happens next?</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Our travel experts will review your request within 24 hours</li>
                        <li>• We'll send you a detailed itinerary and final pricing</li>
                        <li>• You can make changes before confirming your booking</li>
                        <li>• Secure payment options available upon confirmation</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2 text-sm text-bronze-500">
                  Step {currentStep} of {steps.length}
                </div>

                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !formData.serviceType) ||
                      (currentStep === 2 && !formData.destination) ||
                      (currentStep === 3 && !formData.startDate) ||
                      (currentStep === 4 && (!formData.firstName || !formData.lastName || !formData.email))
                    }
                    className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4" />
                    Submit Request
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
