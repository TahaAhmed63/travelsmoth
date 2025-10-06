"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Globe, Facebook, Instagram, LinkedinIcon } from "lucide-react"

const contactInfo: { icon: any; title: string; details: React.ReactNode[]; color: string }[] = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: [
      "OFFICE F17 GROUND FLOOR",
      "QAMAR ARCADE",
      "GULSHAN E IQBAL BLOCK 3 KARACHI.",
    ],
    color: "bg-gold-100 text-gold-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      <a key="p1" href="tel:+923018800022" className="hover:underline">0301 880 0022</a>,
      <a key="p2" href="tel:+923242177731" className="hover:underline">0324 217 7731</a>,
      <a key="p3" href="tel:+923242100041" className="hover:underline">0324 210 0041</a>,
      <a key="p4" href="tel:+966581286853" className="hover:underline">+966 58 128 6853</a>,
    ],
    color: "bg-bronze-100 text-bronze-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      <a key="e1" href="mailto:Travelsmoothpk@gmail.com" className="hover:underline">Travelsmoothpk@gmail.com</a>,
    ],
    color: "bg-cream-100 text-bronze-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM", "Sun: Closed"],
    color: "bg-gold-100 text-gold-600",
  },
  {
    icon: MessageCircle,
    title: "Connect With Us",
    details: [
      <a key="s1" href="https://www.facebook.com/travelsmoothkhi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Facebook className="w-4 h-4" />Facebook</a>,
      <a key="s2" href="https://instagram.com/travelsmooth_iata?igshid=MjEwN2IyYWYwYw==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Instagram className="w-4 h-4" />Instagram</a>,
      <a key="s3" href="https://www.tiktok.com/@travelsmoothiata?_t=8doPyq2hsMD&_r=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Globe className="w-4 h-4" />TikTok</a>,
      <a key="s4" href="https://www.linkedin.com/in/travel-smooth-iata-808a8414b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><LinkedinIcon className="w-4 h-4" />LinkedIn</a>,
    ],
    color: "bg-bronze-100 text-bronze-600",
  },
]

const inquiryTypes = [
  "General Information",
  "Tour Booking",
  "Custom Itinerary",
  "Group Travel",
  "Corporate Travel",
  "Travel Insurance",
  "Cancellation/Refund",
  "Other",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    destination: "",
    travelDate: "",
    groupSize: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your inquiry! We'll get back to you within 24 hours.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      destination: "",
      travelDate: "",
      groupSize: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Ready to start your next adventure? Our travel experts are here to help you plan the perfect trip
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Contact Information</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <info.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-bronze-900 mb-4">{info.title}</h3>
                    <div className="space-y-2">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-bronze-600">{detail}</p>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-bronze-900 flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-gold-600" />
                    Send Us a Message
                  </CardTitle>
                  <p className="text-bronze-600">Fill out the form below and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="0301 880 0022"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Inquiry Type *</label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => handleInputChange("inquiryType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Preferred Destination</label>
                        <Input
                          value={formData.destination}
                          onChange={(e) => handleInputChange("destination", e.target.value)}
                          placeholder="e.g., Bali, Europe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Travel Date</label>
                        <Input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-bronze-700 mb-2">Group Size</label>
                        <Input
                          type="number"
                          min="1"
                          value={formData.groupSize}
                          onChange={(e) => handleInputChange("groupSize", e.target.value)}
                          placeholder="2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-bronze-700 mb-2">Message *</label>
                      <Textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your travel plans, preferences, or any specific requirements..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gold-500 hover:bg-gold-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      title="Travel Smooth Office Location"
                      src="https://www.google.com/maps?q=OFFICE+F17+GROUND+FLOOR+QAMAR+ARCADE+GULSHAN+E+IQBAL+BLOCK+3+KARACHI&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, width: "100%", height: "100%" }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-bronze-900">Why Choose Travel Smooth?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bronze-900">Expert Team</h4>
                      <p className="text-sm text-bronze-600">15+ years of travel expertise</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bronze-100 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-bronze-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bronze-900">Global Reach</h4>
                      <p className="text-sm text-bronze-600">120+ destinations worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bronze-900">24/7 Support</h4>
                      <p className="text-sm text-bronze-600">Always here when you need us</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="mb-4 text-gold-100">Subscribe to our newsletter for travel tips and exclusive deals</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button variant="secondary" className="bg-white text-gold-600 hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking 2-3 months in advance for international trips and 4-6 weeks for domestic travel to ensure availability and better rates.",
              },
              {
                question: "What's included in your tour packages?",
                answer:
                  "Our packages typically include accommodation, transportation, guided tours, some meals, and 24/7 support. Specific inclusions vary by tour.",
              },
              {
                question: "Do you offer travel insurance?",
                answer:
                  "Yes, we offer comprehensive travel insurance options to protect your investment and provide peace of mind during your travels.",
              },
              {
                question: "Can you create custom itineraries?",
                answer:
                  "We specialize in creating personalized itineraries tailored to your interests, budget, and travel style.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-bronze-900 mb-3">{faq.question}</h3>
                    <p className="text-bronze-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
