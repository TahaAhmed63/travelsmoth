"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, Clock, Search, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Travel Tips for First-Time Backpackers",
    excerpt:
      "Planning your first backpacking adventure? Here are the essential tips every beginner should know before hitting the road.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop&crop=center",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Travel Tips",
    tags: ["Backpacking", "Budget Travel", "Tips"],
    featured: true,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Japanese Cherry Blossom Season",
    excerpt:
      "Discover the best times and places to experience Japan's famous cherry blossoms, plus insider tips for the perfect hanami experience.",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&h=300&fit=crop&crop=center",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Destinations",
    tags: ["Japan", "Cherry Blossoms", "Spring Travel"],
    featured: true,
  },
  {
    id: 3,
    title: "Sustainable Tourism: How to Travel Responsibly",
    excerpt:
      "Learn how to minimize your environmental impact while traveling and support local communities in your destinations.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop&crop=center",
    author: "Emma Rodriguez",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Sustainable Travel",
    tags: ["Sustainability", "Eco-Tourism", "Responsible Travel"],
    featured: true,
  },
  {
    id: 4,
    title: "Hidden Gems of Southeast Asia",
    excerpt:
      "Explore lesser-known destinations in Southeast Asia that offer incredible experiences away from the crowds.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "15 min read",
    category: "Destinations",
    tags: ["Southeast Asia", "Hidden Gems", "Off the Beaten Path"],
    featured: false,
  },
  {
    id: 5,
    title: "Photography Tips for Travel Enthusiasts",
    excerpt:
      "Capture stunning travel photos with these professional tips and techniques for documenting your adventures.",
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=500&h=300&fit=crop&crop=center",
    author: "Lisa Park",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Photography",
    tags: ["Photography", "Travel Tips", "Camera Gear"],
    featured: false,
  },
  {
    id: 6,
    title: "Budget Travel: How to See the World for Less",
    excerpt: "Practical strategies for traveling on a budget without compromising on experiences and memories.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop&crop=center",
    author: "Tom Wilson",
    date: "2024-01-03",
    readTime: "11 min read",
    category: "Budget Travel",
    tags: ["Budget Travel", "Money Saving", "Travel Hacks"],
    featured: false,
  },
]

const categories = [
  "All Posts",
  "Travel Tips",
  "Destinations",
  "Sustainable Travel",
  "Photography",
  "Budget Travel",
  "Culture",
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-bronze-600 to-gold-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&h=600&fit=crop&crop=center"
            alt="Blog background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Travel Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Discover travel tips, destination guides, and inspiring stories from around the world
          </motion.p>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bronze-400 w-5 h-5" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="hover:bg-gold-500 hover:text-white">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Featured Articles</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Our most popular and recent travel insights and guides
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-gold-500 text-white">Featured</Badge>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-bronze-900">{post.category}</Badge>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 text-sm text-bronze-600 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-bronze-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-bronze-600 mb-4 flex-grow">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gold-500 group-hover:text-white transition-colors"
                    >
                      <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bronze-900 mb-4">Recent Articles</h2>
            <p className="text-xl text-bronze-600 max-w-2xl mx-auto">
              Stay updated with our latest travel insights and destination guides
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-bronze-900">{post.category}</Badge>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 text-sm text-bronze-600 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-bronze-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-bronze-600 mb-4 flex-grow text-sm">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-bronze-100 text-bronze-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-gold-500 group-hover:text-white transition-colors"
                    >
                      <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white"
            >
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-bronze-600 to-gold-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest travel tips, destination guides, and exclusive offers
              delivered to your inbox
            </p>

            <div className="max-w-md mx-auto flex gap-4">
              <Input
                placeholder="Enter your email address"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" className="bg-white text-gold-600 hover:bg-gray-100 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
