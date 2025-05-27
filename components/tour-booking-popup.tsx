"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ArrowRight, ArrowLeft, Check, X } from "lucide-react"

const steps = [
  { id: 1, title: "Tour Details", icon: Calendar },
  { id: 2, title: "Travel Info", icon: Calendar },
  { id: 3, title: "Travelers", icon: Users },
  { id: 4, title: "Confirmation", icon: Check },
]

interface PreSelectedTour {
  id: string
  name: string
  price: number
  duration: string
  image: string
}

interface TourBookingPopupProps {
  preSelectedTour: PreSelectedTour
  onClose: () => void
}

export default function TourBookingPopup({ preSelectedTour, onClose }: TourBookingPopupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
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
    onClose()
  }

  const calculateTotal = () => {
    const basePrice = preSelectedTour.price
    return basePrice * (formData.adults + formData.children * 0.7)
  }

  const getCurrentStepIcon = () => {
    const currentStepData = steps[currentStep - 1]
    const IconComponent = currentStepData.icon
    return <IconComponent className="w-6 h-6" />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
        <X className="w-5 h-5" />
      </button>

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
              <div className={`w-8 md:w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-gold-500" : "bg-bronze-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-gold-500 to-bronze-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-3">
            {getCurrentStepIcon()}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Tour Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-cream-50 to-gold-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-bronze-900 mb-4">Selected Tour</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <img
                      src={preSelectedTour.image || "/placeholder.svg"}
                      alt={preSelectedTour.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="md:col-span-2">
                      <h4 className="text-xl font-semibold text-bronze-900">{preSelectedTour.name}</h4>
                      <p className="text-bronze-600 mb-2">{preSelectedTour.duration}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-gold-600">${preSelectedTour.price}</span>
                        <Badge className="bg-gold-100 text-gold-700">Tour Package</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Travel Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate" className="text-lg font-semibold">
                      Departure Date
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
                      Return Date
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

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Accommodation Preference</Label>
                  <Select
                    value={formData.accommodation}
                    onValueChange={(value) => updateFormData("accommodation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Hotels (4-star)</SelectItem>
                      <SelectItem value="luxury">Luxury Hotels (5-star)</SelectItem>
                      <SelectItem value="boutique">Boutique Properties</SelectItem>
                      <SelectItem value="resort">Resort & Spa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

            {/* Step 3: Traveler Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
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

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-cream-50 to-gold-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-bronze-900 mb-4">Booking Summary</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={preSelectedTour.image || "/placeholder.svg"}
                        alt={preSelectedTour.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-xl font-semibold text-bronze-900">{preSelectedTour.name}</h4>
                      <p className="text-bronze-600">{preSelectedTour.duration}</p>
                      <Badge className="mt-2 bg-gold-100 text-gold-700">Tour Package</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-bronze-600">Departure:</span>
                        <span className="font-semibold">{formData.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-bronze-600">Return:</span>
                        <span className="font-semibold">{formData.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-bronze-600">Travelers:</span>
                        <span className="font-semibold">
                          {formData.adults} Adults{formData.children > 0 && `, ${formData.children} Children`}
                        </span>
                      </div>
                      {formData.accommodation && (
                        <div className="flex justify-between">
                          <span className="text-bronze-600">Accommodation:</span>
                          <span className="font-semibold capitalize">{formData.accommodation}</span>
                        </div>
                      )}
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-xl font-bold text-gold-600">
                          <span>Total Estimate:</span>
                          <span>${calculateTotal().toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-bronze-500 mt-1">*Final price may vary based on availability</p>
                      </div>
                    </div>
                  </div>
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
                  (currentStep === 2 && !formData.startDate) ||
                  (currentStep === 3 && (!formData.firstName || !formData.lastName || !formData.email))
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
  )
}
