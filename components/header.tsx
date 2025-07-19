"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TourBookingForm from "@/components/tour-booking-form"
import MainBookingForm from "@/components/main-booking-form"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tours", href: "/tours" },
  { name: "Destinations", href: "/destinations" },
  { name: "Hotels", href: "/hotels" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  // { name: "Blog", href: "/" },
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
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function updateMenuWidth() {
      if (navRef.current) {
        setMenuWidth(navRef.current.offsetWidth)
      }
    }
    updateMenuWidth()
    window.addEventListener('resize', updateMenuWidth)
    return () => window.removeEventListener('resize', updateMenuWidth)
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
          isScrolled ? "bg-black backdrop-blur-md shadow-lg py-3" : "bg-transparent"
        }`}
        style={{ top: "40px" }}
      >
        <nav ref={navRef} className="container mx-auto px-4">
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

                  {/* Desktop Mega Menu */}
                  {item.name === "Tours" && isToursMenuOpen && (
                    <div
                      className="absolute z-50 mt-2 bg-white shadow-xl rounded-lg p-4 md:p-6
                        left-3/2 -translate-x-1/2 flex flex-col gap-6
                        md:w-[1000px] md:max-w-[90vw] md:left-[18vw] md:-translate-x-1/2 md:grid md:grid-cols-4 md:gap-8 hidden md:grid"
                        style={{ minWidth: 320 }}
                      onMouseEnter={() => setIsToursMenuOpen(true)}
                      onMouseLeave={() => setIsToursMenuOpen(false)}
                    >
                      {/* Tour Categories */}
                      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div className="md:col-span-1 md:border-l border-bronze-100 md:pl-6">
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
              {/* Call Our Expert Button */}
              {/* <a
                href="tel:+15551234567"
                className="ml-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg shadow px-6 py-2 transition-colors text-base flex items-center gap-2"
                style={{ boxShadow: '0 2px 8px 0 rgba(218,165,32,0.15)' }}
              >
                <Phone className="w-5 h-5" />
                Call Our Expert
              </a> */}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen} >
                <DialogTrigger asChild>
                  <Button className="bg-gold-500 hover:bg-gold-600 text-white">Book Now</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[50%]">
                  <MainBookingForm />
                </DialogContent>
              </Dialog>
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
                        <button
                          className="w-full text-left font-medium py-2 text-bronze-700 flex items-center justify-between"
                          onClick={() => setIsMobileToursOpen(true)}
                        >
                          Tours <ChevronDown className="w-4 h-4" />
                        </button>
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
                  {/* Call Our Expert Button (Mobile) */}
                  <a
                    href="tel:+15551234567"
                    className="bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg shadow px-6 py-3 transition-colors text-base flex items-center gap-2 justify-center mt-2"
                    style={{ boxShadow: '0 2px 8px 0 rgba(218,165,32,0.15)' }}
                  >
                    <Phone className="w-5 h-5" />
                    Call Our Expert
                  </a>
                  <Button className="bg-gold-500 hover:bg-gold-600 text-white mt-4">Book Now</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Tours Flyout Mega Menu */}
        <AnimatePresence>
          {isMobileToursOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-50"
                onClick={() => setIsMobileToursOpen(false)}
              />
              {/* Flyout */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="fixed top-0 left-0 h-full w-[85vw] max-w-xs bg-white z-50 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-bold text-lg text-bronze-900">Tours</span>
                  <button onClick={() => setIsMobileToursOpen(false)}>
                    <X className="w-6 h-6 text-bronze-900" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {tourCategories.map((category) => (
                    <div key={category.name}>
                      <h3 className="font-semibold text-bronze-900 mb-2">{category.name}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => {
                                setIsMobileToursOpen(false)
                                setIsOpen(false)
                              }}
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
                          onClick={() => {
                            setIsMobileToursOpen(false)
                            setIsOpen(false)
                          }}
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      <a
        href="tel:+15551234567"
        className="fixed z-50 bottom-6 right-6 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full shadow-lg px-4 py-3 flex items-center gap-2 transition-all duration-300 text-lg group"
        style={{ boxShadow: '0 2px 16px 0 rgba(218,165,32,0.25)' }}
      >
        <Phone className="w-6 h-6" />
        <span
          className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-focus:max-w-xs group-focus:opacity-100 transition-all duration-300 whitespace-nowrap"
        >
          Call Our Expert
        </span>
      </a>
    </>
  )
}
