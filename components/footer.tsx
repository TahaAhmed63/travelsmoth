"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
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
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/travelsmooth" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/travelsmooth" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/travelsmooth" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/travelsmooth" },
]

export default function Footer() {
  return (
    <footer className="bg-bronze-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/travel-smooth-logo.png" // Path to your Travel Smooth logo image
                alt="Travel Smooth Logo"
                width={150} // Adjust the width as needed
                height={40} // Adjust the height as needed
                className="rounded-full"
              />
              {/* <span className="text-2xl font-bold">Travel Smooth</span> */}
            </Link>

            <p className="text-gray-300 mb-6 max-w-md">
              Curating premium travel experiences with unparalleled service. We connect discerning travelers with the
              world's most exclusive destinations, ensuring seamless and unforgettable journeys.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">123 Travel Street, Adventure City, AC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">info@travelsmooth.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
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

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for travel tips, exclusive deals, and destination inspiration.
              </p>
            </div>
            <div className="flex gap-4">
              <Input
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gold-500 hover:bg-gold-700 whitespace-nowrap">Subscribe</Button>
            </div>
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

            <div className="flex items-center gap-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
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
            <p>Design & Powered By <a href="https://www.vortexsolution.io/" className="hover:opacity-80"><span className="text-purple-500">Vortex</span><span className="text-[#0066ff]">Solution</span></a>      </p>    </div>
        </div>
      </div>
    </footer>
  )
}
