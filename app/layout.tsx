import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "travelsmoth - Premium Travel Agency | Discover Amazing Destinations",
  description:
    "Explore the world with travelsmoth Travel Agency. We offer expertly crafted tours, unique destinations, and unforgettable travel experiences. Book your next adventure today!",
  keywords:
    "travel agency, tours, destinations, vacation packages, adventure travel, cultural tours, sustainable tourism",
  authors: [{ name: "travelsmoth Travel Agency" }],
  openGraph: {
    title: "travelsmoth - Premium Travel Agency",
    description:
      "Discover amazing destinations and create unforgettable memories with our expertly crafted travel experiences.",
    url: "https://travelsmooth.com.pk/",
    siteName: "travelsmoth Travel Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "travelsmoth Travel Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "travelsmoth - Premium Travel Agency",
    description:
      "Discover amazing destinations and create unforgettable memories with our expertly crafted travel experiences.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://travelsmooth.com.pk/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="your-google-verification-code" />

        {/* Schema.org markup for travel agency */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "https://travelsmooth.com.pk/",
              description:
                "Premium travel agency offering expertly crafted tours and unique travel experiences worldwide.",
              url: "https://travelsmooth.com.pk/",
              telephone: "+1-555-123-4567",
              email: "info@travelsmoth-travel.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Travel Street",
                addressLocality: "Adventure City",
                addressRegion: "AC",
                postalCode: "12345",
                addressCountry: "US",
              },
              sameAs: [
                "https://facebook.com/travelsmoth",
                "https://twitter.com/travelsmoth",
                "https://instagram.com/travelsmoth",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1250",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
