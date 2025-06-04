"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar, ArrowLeft, Share2, Bookmark, Heart, ArrowRight, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

// This would typically come from a database or API based on the slug
const article = {
  id: 1,
  title: "The Ultimate 72-Hour Emergency Kit Checklist",
  slug: "ultimate-72-hour-emergency-kit-checklist",
  excerpt:
    "A comprehensive guide to building the perfect 72-hour emergency kit for your family. Learn what essentials you need to survive the first critical days of any disaster.",
  content: `When disaster strikes, the first 72 hours are critical. Emergency services may be overwhelmed, and you'll need to be self-sufficient. Here's your complete guide to building a 72-hour emergency kit that could save your life.

## Why 72 Hours?

Emergency management experts recommend preparing for at least 72 hours because:
- Emergency responders may not reach you immediately
- Supply chains can be disrupted
- Infrastructure may be damaged
- You may need to evacuate quickly

## Essential Categories

### Water and Hydration
- 1 gallon per person per day (3 gallons total per person)
- Water purification tablets or portable filters
- Electrolyte packets for rehydration

### Food and Nutrition
- Non-perishable, ready-to-eat meals
- High-energy snacks (nuts, energy bars)
- Manual can opener
- Disposable plates, cups, and utensils

### Shelter and Warmth
- Emergency blankets or sleeping bags
- Tarps for shelter
- Duct tape for repairs
- Warm clothing for each family member

### First Aid and Medical
- Comprehensive first aid kit
- Prescription medications (7-day supply)
- Over-the-counter pain relievers
- Medical supplies for chronic conditions

### Tools and Equipment
- Multi-tool or Swiss Army knife
- Flashlights with extra batteries
- Battery-powered or hand-crank radio
- Whistle for signaling help
- Local maps in waterproof container

### Communication and Documentation
- Fully charged portable phone chargers
- Emergency contact list
- Copies of important documents in waterproof bag
- Cash in small bills

## Storage and Maintenance

Store your kit in an easily accessible location and check it every six months. Replace expired food, water, and medications. Update documents and contact information as needed.

## Customization Tips

Tailor your kit to your family's specific needs:
- Infant supplies (formula, diapers, baby food)
- Pet supplies (food, medications, carriers)
- Special dietary requirements
- Climate-specific items

Remember, the best emergency kit is one you've practiced using. Conduct regular drills with your family to ensure everyone knows where the kit is and how to use its contents.`,
  category: "Emergency Preparedness",
  author: "Sarah Mitchell",
  authorBio:
    "Emergency preparedness expert with 15 years of experience in disaster response and family safety planning.",
  publishDate: "2024-01-15",
  readTime: 8,
  image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center",
  tags: ["Emergency Kit", "72-Hour Kit", "Disaster Preparedness", "Family Safety"],
  featured: true,
}

const relatedArticles = [
  {
    id: 2,
    title: "Water Storage and Purification: Your Complete Survival Guide",
    slug: "water-storage-purification-survival-guide",
    excerpt:
      "Water is life. Learn the essential methods for storing, purifying, and accessing clean water during emergencies.",
    category: "Water & Hydration",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop&crop=center",
  },
  {
    id: 3,
    title: "Building the Perfect Bug-Out Bag: Essential Gear for Quick Evacuation",
    slug: "perfect-bug-out-bag-essential-gear",
    excerpt: "When you need to leave home quickly, your bug-out bag could mean the difference between life and death.",
    category: "Bug-Out Bags",
    readTime: 15,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop&crop=center",
  },
  {
    id: 6,
    title: "First Aid Essentials: Medical Preparedness for Emergencies",
    slug: "first-aid-essentials-medical-preparedness",
    excerpt: "When professional medical help isn't available, your first aid knowledge and supplies could save lives.",
    category: "Medical Preparedness",
    readTime: 22,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop&crop=center",
  },
]

export default function ArticleDetailPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="articles" />
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/articles">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-6">
              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    {article.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.publishDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime} min read
                  </span>
                </div>

                <h1
                  className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed">{article.excerpt}</p>

                {/* Author Info */}
                <div
                  className="flex items-center justify-between py-4 border-y border-slate-200">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{article.author}</p>
                      <p className="text-sm text-slate-600">{article.authorBio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-xl" />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-slate-700 leading-relaxed space-y-6">
                  {article.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-3xl font-bold text-slate-900 mt-12 mb-6">
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    } else if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    } else if (paragraph.startsWith("- ")) {
                      const listItems = paragraph.split("\n").filter((item) => item.startsWith("- "))
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                          {listItems.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-slate-700">
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    } else {
                      return (
                        <p key={index} className="text-slate-700 leading-relaxed text-lg">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-500">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Build Your Emergency Kit?</h3>
                  <p className="text-slate-700 mb-6 text-lg">
                    Get everything you need for a complete 72-hour emergency kit from our curated selection of survival
                    gear.
                  </p>
                  <Link href="/products">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg">
                      Shop Emergency Kits
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Table of Contents */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900 text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="#why-72-hours"
                  className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  Why 72 Hours?
                </Link>
                <Link
                  href="#essential-categories"
                  className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  Essential Categories
                </Link>
                <Link
                  href="#storage-maintenance"
                  className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  Storage and Maintenance
                </Link>
                <Link
                  href="#customization-tips"
                  className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  Customization Tips
                </Link>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Stay Prepared</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Get weekly preparedness tips and exclusive content delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-500" />
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Related Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Image
                      src="https://m.media-amazon.com/images/I/81VGvQqLVyL._AC_SL1500_.jpg"
                      alt="Emergency Kit"
                      width={60}
                      height={60}
                      className="rounded-md object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900">Ready America Emergency Kit</h4>
                      <p className="text-sm text-slate-600">$79.99</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Image
                      src="https://m.media-amazon.com/images/I/61VGvQqLVyL._AC_SL1500_.jpg"
                      alt="Water Filter"
                      width={60}
                      height={60}
                      className="rounded-md object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900">LifeStraw Personal Water Filter</h4>
                      <p className="text-sm text-slate-600">$19.95</p>
                    </div>
                  </div>
                </div>
                <Link href="/products">
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700">
                    View All Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <Card
                key={relatedArticle.id}
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="p-0">
                  <Image
                    src={relatedArticle.image || "/placeholder.svg"}
                    alt={relatedArticle.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                        {relatedArticle.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {relatedArticle.readTime} min
                      </span>
                    </div>
                    <h3
                      className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{relatedArticle.excerpt}</p>
                    <Link href={`/articles/${relatedArticle.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 mt-2">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
