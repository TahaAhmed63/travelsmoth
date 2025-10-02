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
import { BaseUrl } from "@/BaseUrl"

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

type MenuCategory = { name: string; items: { name: string; href: string }[] }
const defaultTourCategories: MenuCategory[] = [
  { name: "Popular", items: [] },
  // { name: "Themes", items: [] },
  // { name: "Experiences", items: [] },
]

const defaultFeaturedDestinations: { name: string; href: string; image: string }[] = []

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isToursMenuOpen, setIsToursMenuOpen] = useState(false)
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined)
  const [tourCategories, setTourCategories] = useState<MenuCategory[]>(defaultTourCategories)
  const [featuredDestinations, setFeaturedDestinations] = useState<{ name: string; href: string; image: string }[]>(defaultFeaturedDestinations)

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

  useEffect(() => {
    async function loadMenu() {
      try {
        const [toursRes, destRes] = await Promise.all([
          fetch(`${BaseUrl}/api/tours`),
          fetch(`${BaseUrl}/api/destinations`),
        ])
        const toursRaw = await toursRes.json()
        const destRaw = await destRes.json()
        const tours: any[] = Array.isArray(toursRaw)
          ? toursRaw
          : Array.isArray(toursRaw?.data?.tours)
          ? toursRaw.data.tours
          : Array.isArray(toursRaw?.tours)
          ? toursRaw.tours
          : []
        const destinations: any[] = Array.isArray(destRaw)
          ? destRaw
          : Array.isArray(destRaw?.data?.destinations)
          ? destRaw.data.destinations
          : Array.isArray(destRaw?.destinations)
          ? destRaw.destinations
          : []

        const byCategory: Record<string, number> = {}
        tours.forEach((t) => {
          const c = (t.category || "Popular").toString()
          byCategory[c] = (byCategory[c] || 0) + 1
        })
        const topCats = Object.keys(byCategory).sort((a,b)=>byCategory[b]-byCategory[a]).slice(0,3)
        const builtCats: MenuCategory[] = topCats.map((c) => ({
          name: c,
          items: tours.filter((t)=>t.category===c).slice(0,4).map((t)=>({ name: t.title || t.name || "Tour", href: t.slug ? `/tours/${t.slug}` : "/tours" }))
        }))
        setTourCategories(builtCats.length ? builtCats : defaultTourCategories)

        setFeaturedDestinations(
          destinations.slice(0,3).map((d)=>({
            name: d.name,
            href: d.slug ? `/destinations/${d.slug}` : "/destinations",
            image: typeof d.image_url === 'string' && d.image_url ? d.image_url : "/placeholder.svg",
          }))
        )
      } catch {}
    }
    loadMenu()
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-bronze-900 text-cream-50 py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>0301 880 0022</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Travelsmoothpk@gmail.com</span>
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
              <div className="relative w-[180px] h-[80px] md:w-[200px] md:h-[90px]">
                <Image src="/newlogo.png" alt="Travel Smooth" fill className="object-contain" />
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
              {/* CTA reserved */}
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
                  {/* WhatsApp (Mobile) */}
                  <a
                    href="https://wa.me/923018800022?text=Hi%20Travel%20Smooth!%20I%20would%20like%20to%20inquire."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg shadow px-6 py-3 transition-colors text-base flex items-center gap-2 justify-center mt-2"
                    style={{ boxShadow: '0 2px 8px 0 rgba(218,165,32,0.15)' }}
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp Us
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
      {/* Floating WhatsApp (left) */}
      <a
        href="https://wa.me/923018800022?text=Hi%20Travel%20Smooth!%20I%20would%20like%20to%20inquire."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 left-6 rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition-transform hover:scale-105"
        style={{ backgroundColor: '#25D366', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
          aria-hidden="true"
        >
          <path d="M19.11 17.19c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.15.18-.31.21-.58.07-.27-.14-1.12-.41-2.14-1.31-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.12-.56.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.44-.82-1.97-.22-.53-.44-.45-.6-.46-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24 0 1.32.96 2.59 1.09 2.77.14.18 1.89 2.89 4.59 4.05.64.28 1.14.45 1.53.57.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.81-1.26.22-.62.22-1.15.15-1.26-.07-.11-.25-.18-.52-.32z"/>
          <path d="M26.76 5.24A11.92 11.92 0 0 0 16 1a12 12 0 0 0-10.39 17.94L3 31l12.28-2.57A12 12 0 0 0 31 16a11.92 11.92 0 0 0-4.24-10.76zM16 27.52a11.5 11.5 0 0 1-5.87-1.61l-.42-.25-7.14 1.5 1.5-6.95-.27-.45A11.52 11.52 0 1 1 27.52 16 11.54 11.54 0 0 1 16 27.52z"/>
        </svg>
      </a>

      {/* Floating Call (right) */}
      <a
        href="tel:+923018800022"
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
