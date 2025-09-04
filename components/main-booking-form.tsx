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

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    price: 1299,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
    type: "tours",
  },
  {
    id: "europe",
    name: "European Grand Tour",
    price: 2899,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop",
    type: "tours",
  },
  {
    id: "maldives-resort",
    name: "Maldives Luxury Resort",
    price: 899,
    duration: "per night",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300&h=200&fit=crop",
    type: "hotels",
  },
  {
    id: "dubai-hotel",
    name: "Dubai Premium Hotel",
    price: 450,
    duration: "per night",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop",
    type: "hotels",
  },
  {
    id: "honeymoon-package",
    name: "Romantic Honeymoon Package",
    price: 3999,
    duration: "10 days",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
    type: "packages",
  },
  {
    id: "family-package",
    name: "Family Adventure Package",
    price: 4599,
    duration: "12 days",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
    type: "packages",
  },
  {
    id: "umrah-economy",
    name: "Economy Umrah Package",
    price: 1899,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=300&h=200&fit=crop",
    type: "umrah",
  },
  {
    id: "umrah-premium",
    name: "Premium Umrah Package",
    price: 2899,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=300&h=200&fit=crop",
    type: "umrah",
  },
  {
    id: "umrah-executive",
    name: "Executive Umrah Package",
    price: 4299,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    type: "umrah",
  },
]

export default function MainBookingForm() {
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

  const selectedDestination = destinations.find((d) => d.id === formData.destination)
  const filteredDestinations = destinations.filter((d) => d.type === formData.serviceType)

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

  const handleSubmit = () => {
    alert("Booking request submitted! We'll contact you within 24 hours.")
  }

  const calculateTotal = () => {
    if (!selectedDestination) return 0
    const basePrice = selectedDestination.price
    if (formData.serviceType === "hotels") {
      return basePrice * formData.rooms * 7 // Assuming 7 nights
    }
    return basePrice * (formData.adults + formData.children * 0.7)
  }

  const getCurrentStepIcon = () => {
    const currentStepData = steps[currentStep - 1]
    const IconComponent = currentStepData.icon
    return <IconComponent className="w-6 h-6" />
  }

  return (
    <section className="w-full max-w-[100%] p-2 sm:p-4 overflow-y-auto max-h-[90vh] bg-gradient-to-br from-cream-50 to-gold-100">
      <div className="px-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-bronze-900 mb-2">Book Your Perfect Experience</h2>
          <p className="text-base text-bronze-600 max-w-2xl mx-auto">
            Choose from tours, hotels, or complete packages for your dream vacation
          </p>
        </motion.div>

        <div className="max-w-full mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-6 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center min-w-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: currentStep >= step.id ? 1 : 0.8,
                    opacity: currentStep >= step.id ? 1 : 0.5,
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-gold-500 border-gold-500 text-white"
                      : "bg-white border-bronze-300 text-bronze-400"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </motion.div>
                {/* Hide step text for compact popup */}
                {/* <div className="ml-2 hidden md:block">
                  <p className={`text-xs font-medium ${currentStep >= step.id ? "text-gold-600" : "text-bronze-400"}`}>Step {step.id}</p>
                  <p className={`text-xs ${currentStep >= step.id ? "text-bronze-900" : "text-bronze-400"}`}>{step.title}</p>
                </div> */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-6 md:w-10 h-0.5 mx-2 ${currentStep > step.id ? "bg-gold-500" : "bg-bronze-300"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <Card className="border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gold-500 to-bronze-600 text-white rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-3">
                {getCurrentStepIcon()}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Type Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-base font-semibold mb-4 block">What would you like to book?</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => updateFormData("serviceType", type.id)}
                            className={`flex flex-col items-center border-2 rounded-lg p-3 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                              formData.serviceType === type.id
                                ? `${type.color} border-gold-500 scale-105 shadow-lg`
                                : "bg-white border-bronze-200 hover:border-gold-400"
                            }`}
                          >
                            <type.icon className="w-8 h-8 mb-2" />
                            <span className="font-bold text-base mb-1">{type.name}</span>
                            <span className="text-xs text-center">{type.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData.serviceType}
                        className="bg-gold-500 hover:bg-gold-600 text-white"
                      >
                        Next <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
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
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Select your {formData.serviceType === "tours" ? "tour" : formData.serviceType === "hotels" ? "hotel" : "umrah package"}:</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredDestinations.map((dest) => (
                          <button
                            key={dest.id}
                            type="button"
                            onClick={() => updateFormData("destination", dest.id)}
                            className={`flex flex-col items-center border-2 rounded-lg p-3 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                              formData.destination === dest.id
                                ? "bg-gold-100 border-gold-500 scale-105 shadow-lg"
                                : "bg-white border-bronze-200 hover:border-gold-400"
                            }`}
                          >
                            <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover rounded mb-2" />
                            <span className="font-bold text-base mb-1">{dest.name}</span>
                            <span className="text-xs text-center">{dest.duration} &bull; ${dest.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="bg-bronze-200 text-bronze-700 hover:bg-bronze-300"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData.destination}
                        className="bg-gold-500 hover:bg-gold-600 text-white"
                      >
                        Next <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}
                {/* Step 3: Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateFormData("startDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => updateFormData("endDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      {formData.serviceType === "hotels" && (
                        <div>
                          <Label htmlFor="rooms">Rooms</Label>
                          <Input
                            id="rooms"
                            type="number"
                            min={1}
                            value={formData.rooms}
                            onChange={(e) => updateFormData("rooms", Number(e.target.value))}
                            className="mt-1"
                          />
                        </div>
                      )}
                      {formData.serviceType === "hotels" && (
                        <div>
                          <Label htmlFor="accommodation">Accommodation</Label>
                          <Input
                            id="accommodation"
                            type="text"
                            value={formData.accommodation}
                            onChange={(e) => updateFormData("accommodation", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => updateFormData("specialRequests", e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="bg-bronze-200 text-bronze-700 hover:bg-bronze-300"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gold-500 hover:bg-gold-600 text-white"
                      >
                        Next <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}
                {/* Step 4: Travelers */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="adults">Adults</Label>
                        <Input
                          id="adults"
                          type="number"
                          min={1}
                          value={formData.adults}
                          onChange={(e) => updateFormData("adults", Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="children">Children</Label>
                        <Input
                          id="children"
                          type="number"
                          min={0}
                          value={formData.children}
                          onChange={(e) => updateFormData("children", Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="bg-bronze-200 text-bronze-700 hover:bg-bronze-300"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gold-500 hover:bg-gold-600 text-white"
                      >
                        Next <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
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
                    className="space-y-4 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Check className="w-12 h-12 text-green-500" />
                      <h3 className="text-2xl font-bold text-bronze-900">Booking Submitted!</h3>
                      <p className="text-bronze-700">Thank you for your booking. We'll contact you soon to confirm your details.</p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="bg-gold-500 hover:bg-gold-600 text-white"
                      >
                        Book Another
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
