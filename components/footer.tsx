"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, LinkedinIcon } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  services: [
    { name: "Tours", href: "/tours" },
    { name: "Destinations", href: "/destinations" },
    { name: "Custom Trips", href: "/custom" },
    { name: "Group Travel", href: "/group" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Travel Insurance", href: "/insurance" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Travel Guides", href: "/guides" },
    { name: "Travel Tips", href: "/tips" },
    { name: "Visa Information", href: "/visa" },
    { name: "Hotels", href: "/hotels" },
    { name: "Packages", href: "/packages" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/travelsmoothkhi/" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/travelsmooth_iata?igshid=MjEwN2IyYWYwYw==" },
  { name: "TikTok", icon: Youtube, href: "https://www.tiktok.com/@travelsmoothiata?_t=8doPyq2hsMD&_r=1" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/travel-smooth-iata-808a8414b" },
]

export default function Footer() {
  return (
    <footer className="bg-bronze-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-0">
          {/* Logo & Company Info */}
          <div className="w-full flex flex-col items-center lg:items-start lg:w-[22%] flex-shrink-0 mb-8 lg:mb-0 lg:pr-8">
            <div className="flex flex-col items-center lg:items-start h-full justify-center">
              <Link href="/" className="flex items-center justify-center lg:justify-start mb-4">
                <div className="relative w-[180px] h-[90px]">
                  <Image
                    src="/newlogo.png"
                    alt="Travel Smooth Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <div className="mb-4 text-center lg:text-left">
                <div className="flex items-start gap-3 mb-2 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5 text-gold-400 mt-1" />
                  <span className="text-gray-300 leading-snug">
                  OFFICE F17, GROUND FLOOR QAMAR ARCADE,<br /> GULSHAN E IQBAL BLOCK 3 KARACHI.
                
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <Phone className="w-5 h-5 text-gold-400" />
                    <Link href="tel:+923018800022" className="text-gray-300 hover:text-white transition-colors font-medium">0301 880 0022</Link>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <Phone className="w-5 h-5 text-gold-400" />
                    <Link href="tel:+923242177731" className="text-gray-300 hover:text-white transition-colors font-medium">0324 217 7731</Link>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <Phone className="w-5 h-5 text-gold-400" />
                    <Link href="tel:+923242100041" className="text-gray-300 hover:text-white transition-colors font-medium">0324 210 0041</Link>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <Phone className="w-5 h-5 text-gold-400" />
                    <Link href="tel:+966581286853" className="text-gray-300 hover:text-white transition-colors font-medium">+966 58 128 6853</Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 justify-center lg:justify-start">
                  <Mail className="w-5 h-5 text-gold-400" />
                  <a href="mailto:Travelsmoothpk@gmail.com" className="text-gray-300 hover:text-white transition-colors font-medium">
                    Travelsmoothpk@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="w-full flex-1 flex flex-col sm:flex-row gap-8 lg:gap-0">
            <div className="flex flex-col sm:flex-row w-full justify-between items-stretch">
              <div className="flex-1 min-w-[150px] px-2 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 min-w-[150px] px-2 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Services</h3>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 min-w-[150px] px-2 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Support</h3>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for travel tips, exclusive deals, and destination inspiration.
              </p>
            </div>
            <form className="flex gap-4 w-full md:w-auto">
              <Input
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gold-500 hover:bg-gold-700 whitespace-nowrap">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Follow us:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 justify-center md:justify-end">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="https://wa.me/923018800022?text=Hi%20Travel%20Smooth!%20I%20would%20like%20to%20inquire." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 Travel Smooth. All rights reserved.</p>
            <p>
              Design & Powered By{" "}
              <a href="https://www.vortexsolution.io/" className="hover:opacity-80">
                <span className="text-purple-500">Vortex</span>
                <span className="text-[#0066ff]">Solution</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
