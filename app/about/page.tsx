"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart, Star } from "lucide-react"

const stats = [
  { icon: Users, value: "50,000+", label: "Happy Travelers" },
  { icon: Globe, value: "120+", label: "Destinations" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Star, value: "4.9", label: "Average Rating" },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    bio: "With over 20 years in the travel industry, Sarah founded Travel Smooth with a vision to make extraordinary travel accessible to everyone.",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Michael ensures every tour runs smoothly with his expertise in logistics and passion for customer satisfaction.",
  },
  {
    name: "Emma Rodriguez",
    role: "Travel Experience Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Emma crafts unique itineraries that blend adventure, culture, and comfort for unforgettable experiences.",
  },
  {
    name: "David Kim",
    role: "Sustainability Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "David leads our commitment to responsible tourism and environmental conservation in all our destinations.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description:
      "We believe travel has the power to transform lives and create lasting memories that enrich the human experience.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every decision we make is centered around providing exceptional experiences and exceeding our travelers' expectations.",
  },
  {
    icon: Globe,
    title: "Sustainable Tourism",
    description:
      "We're committed to responsible travel that benefits local communities and preserves destinations for future generations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from tour planning to customer service and safety protocols.",
  },
]

const milestones = [
  {
    year: "2008",
    title: "Company Founded",
    description: "Started with a small team and big dreams to revolutionize travel experiences",
  },
  {
    year: "2012",
    title: "International Expansion",
    description: "Expanded operations to cover destinations across 6 continents",
  },
  {
    year: "2016",
    title: "Sustainability Initiative",
    description: "Launched our comprehensive responsible tourism program",
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description: "Introduced virtual tours and enhanced digital booking experiences",
  },
  {
    year: "2023",
    title: "50,000 Travelers",
    description: "Celebrated serving over 50,000 satisfied customers worldwide",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Our Journey</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                For over 15 years, Travel Smooth has been crafting extraordinary travel experiences that connect people
                with the world's most incredible destinations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-white/20 text-white text-lg px-4 py-2">Award-Winning Service</Badge>
                <Badge className="bg-white/20 text-white text-lg px-4 py-2">Sustainable Tourism</Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop&crop=center"
                alt="Travel team"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="text-4xl font-bold text-bronze-900 mb-2">{stat.value}</h3>
                <p className="text-bronze-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-6">Our Story</h2>
              <p className="text-lg text-bronze-700 mb-6">
                What started as a passion project by a group of travel enthusiasts has grown into one of the most
                trusted names in luxury travel. Our founder, Sarah Johnson, had a simple yet powerful vision: to make
                extraordinary travel experiences accessible to everyone while promoting sustainable and responsible
                tourism.
              </p>
              <p className="text-lg text-bronze-700 mb-6">
                Today, we're proud to have helped over 50,000 travelers discover the world's most incredible
                destinations. From the ancient temples of Angkor Wat to the pristine beaches of the Maldives, we've been
                there every step of the way, ensuring our travelers have safe, memorable, and transformative
                experiences.
              </p>
              <p className="text-lg text-bronze-700">
                Our commitment goes beyond just organizing trips. We believe in the power of travel to break down
                barriers, foster understanding between cultures, and create positive impact in the communities we visit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=600&fit=crop&crop=center"
                alt="Our story"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Our Values</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape every experience we create
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-bronze-900 mb-3">{value.title}</h3>
                <p className="text-bronze-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              The passionate individuals behind every extraordinary travel experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-bronze-900 mb-1">{member.name}</h3>
                    <p className="text-gold-600 font-medium mb-3">{member.role}</p>
                    <p className="text-bronze-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Our Journey</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Key milestones that have shaped our company and defined our commitment to excellence
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-gold-500 text-white text-lg px-3 py-1">{milestone.year}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-bronze-900 mb-2">{milestone.title}</h3>
                      <p className="text-bronze-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-4 h-4 bg-gold-500 rounded-full flex-shrink-0"></div>

                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-bronze-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Join Our Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Become part of our growing family of travelers and create your own unforgettable memories
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-gold-600 hover:bg-gray-100">
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gold-600"
              >
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
