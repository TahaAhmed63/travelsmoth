"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tours", href: "/tours" },
  // { name: "Destinations", href: "/destinations" },
  // { name: "Hotels", href: "/hotels" },
  // { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const tourCategories = [
  {
    name: "Adventure Tours",
    items: [
      { name: "Hiking & Trekking", href: "/tours/hiking" },
      { name: "Safari Tours", href: "/tours/safari" },
      { name: "Water Sports", href: "/tours/water-sports" },
      { name: "Mountain Climbing", href: "/tours/mountain-climbing" },
    ],
  },
  {
    name: "Cultural Tours",
    items: [
      { name: "Historical Sites", href: "/tours/historical" },
      { name: "Local Experiences", href: "/tours/local" },
      { name: "Food & Wine", href: "/tours/food-wine" },
      { name: "Festivals & Events", href: "/tours/festivals" },
    ],
  },
  {
    name: "Luxury Tours",
    items: [
      { name: "Private Tours", href: "/tours/private" },
      { name: "VIP Experiences", href: "/tours/vip" },
      { name: "Luxury Cruises", href: "/tours/cruises" },
      { name: "Exclusive Resorts", href: "/tours/resorts" },
    ],
  },
]

const featuredDestinations = [
  { name: "Bali, Indonesia", href: "/destinations/bali", image: "/destinations/bali.jpg" },
  { name: "Santorini, Greece", href: "/destinations/santorini", image: "/destinations/santorini.jpg" },
  { name: "Kyoto, Japan", href: "/destinations/kyoto", image: "/destinations/kyoto.jpg" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isToursMenuOpen, setIsToursMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-bronze-900 text-cream-50 py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@travelsmooth.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>24/7 Customer Support Available</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        style={{ top: "40px" }}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-[200px] h-[95px]">
                <Image src="/travel-smooth-logo.png" alt="Travel Smooth" fill className="object-contain" />
              </div>
              {/* <span className={`text-2xl font-bold transition-colors ${isScrolled ? "text-bronze-900" : "text-white"}`}>
                Travel Smooth
              </span> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors hover:text-gold-500 flex items-center gap-1 ${
                      pathname === item.href ? "text-gold-500" : isScrolled ? "text-bronze-700" : "text-white"
                    }`}
                    onMouseEnter={() => item.name === "Tours" && setIsToursMenuOpen(true)}
                    onMouseLeave={() => item.name === "Tours" && setIsToursMenuOpen(false)}
                  >
                    {item.name}
                    {item.name === "Tours" && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Mega Menu */}
                  {item.name === "Tours" && isToursMenuOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-[50%] top-[60%] mt-2 w-[95vw] max-w-[1000px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-8 z-50"
                      style={{ minWidth: '320px' }}
                      onMouseEnter={() => setIsToursMenuOpen(true)}
                      onMouseLeave={() => setIsToursMenuOpen(false)}
                    >
                      {/* Tour Categories */}
                      <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tourCategories.map((category) => (
                          <div key={category.name}>
                            <h3 className="font-semibold text-bronze-900 mb-3 text-lg">{category.name}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-bronze-700 hover:text-gold-500 transition-colors text-base"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Featured Destinations */}
                      <div className="col-span-1 border-l border-bronze-100 pl-6">
                        <h3 className="font-semibold text-bronze-900 mb-3 text-lg">Featured Destinations</h3>
                        <div className="flex flex-col gap-4">
                          {featuredDestinations.map((destination) => (
                            <Link
                              key={destination.name}
                              href={destination.href}
                              className="block group"
                            >
                              <div className="relative h-20 w-full rounded-lg overflow-hidden mb-1">
                                <Image
                                  src={destination.image}
                                  alt={destination.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                                <span className="absolute bottom-2 left-2 text-white font-medium text-sm md:text-base">
                                  {destination.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white">Book Now</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${isScrolled ? "text-bronze-900" : "text-white"}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t shadow-lg"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.name === "Tours" ? (
                        <div className="space-y-4">
                          <div className="font-medium py-2 text-bronze-700">Tours</div>
                          <div className="pl-4 space-y-6">
                            {tourCategories.map((category) => (
                              <div key={category.name}>
                                <h3 className="font-semibold text-bronze-900 mb-2">{category.name}</h3>
                                <ul className="space-y-2">
                                  {category.items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-bronze-700 hover:text-gold-500 transition-colors block py-1"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <div>
                              <h3 className="font-semibold text-bronze-900 mb-2">Featured Destinations</h3>
                              <div className="space-y-3">
                                {featuredDestinations.map((destination) => (
                                  <Link
                                    key={destination.name}
                                    href={destination.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block"
                                  >
                                    <div className="relative h-20 rounded-lg overflow-hidden">
                                      <Image
                                        src={destination.image}
                                        alt={destination.name}
                                        fill
                                        className="object-cover"
                                      />
                                      <div className="absolute inset-0 bg-black/40" />
                                      <span className="absolute bottom-2 left-2 text-white font-medium">
                                        {destination.name}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`font-medium py-2 transition-colors hover:text-gold-500 ${
                            pathname === item.href ? "text-gold-500" : "text-bronze-700"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Button className="bg-gold-500 hover:bg-gold-600 text-white mt-4">Book Now</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
