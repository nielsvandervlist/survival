"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Filter } from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { ArticleCard } from "./components/ui/article-card"
import { SearchFilters } from "./components/ui/search-filters"
import { PageHeader } from "./components/ui/page-header"
import { EmptyState } from "./components/ui/empty-state"

// Mock articles data
const articles = [
  {
    id: 1,
    title: "The Ultimate 72-Hour Emergency Kit Checklist",
    slug: "ultimate-72-hour-emergency-kit-checklist",
    excerpt:
      "A comprehensive guide to building the perfect 72-hour emergency kit for your family. Learn what essentials you need to survive the first critical days of any disaster.",
    category: "Emergency Preparedness",
    author: "Sarah Mitchell",
    publishDate: "2024-01-15",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
    tags: ["Emergency Kit", "72-Hour Kit", "Disaster Preparedness", "Family Safety"],
    featured: true,
  },
  {
    id: 2,
    title: "Water Storage and Purification: Your Complete Survival Guide",
    slug: "water-storage-purification-survival-guide",
    excerpt:
      "Water is life. Learn the essential methods for storing, purifying, and accessing clean water during emergencies. From basic storage to advanced filtration systems.",
    content: `Water is your most critical survival resource. You can survive weeks without food, but only days without water. Here's everything you need to know about water storage and purification for emergency preparedness.`,
    category: "Water & Hydration",
    author: "Mike Rodriguez",
    authorBio: "Water systems engineer and survival instructor specializing in emergency water solutions.",
    publishDate: "2024-01-10",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&crop=center",
    tags: ["Water Storage", "Water Purification", "Emergency Water", "Survival Skills"],
    featured: true,
  },
  {
    id: 3,
    title: "Building the Perfect Bug-Out Bag: Essential Gear for Quick Evacuation",
    slug: "perfect-bug-out-bag-essential-gear",
    excerpt:
      "When you need to leave home quickly, your bug-out bag could mean the difference between life and death. Learn how to pack the perfect 72-hour survival kit.",
    content: `A bug-out bag (BOB) is your lifeline when you need to evacuate quickly. Whether facing natural disasters, civil unrest, or other emergencies, having a well-prepared bag can save your life.`,
    category: "Bug-Out Bags",
    author: "David Chen",
    authorBio:
      "Former military survival instructor and wilderness guide with expertise in emergency evacuation planning.",
    publishDate: "2024-01-05",
    readTime: 15,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop&crop=center",
    tags: ["Bug-Out Bag", "Evacuation", "Survival Gear", "Emergency Planning"],
    featured: false,
  },
  {
    id: 4,
    title: "Home Security During Emergencies: Protecting Your Family and Property",
    slug: "home-security-during-emergencies",
    excerpt:
      "When normal security systems fail, how do you protect your home and family? Learn essential security measures for emergency situations and civil unrest.",
    content: `During emergencies, normal security systems may fail, and law enforcement may be overwhelmed. Here's how to protect your home and family when you're on your own.`,
    category: "Home Security",
    author: "Lisa Thompson",
    authorBio:
      "Former law enforcement officer and security consultant specializing in residential emergency security planning.",
    publishDate: "2023-12-28",
    readTime: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    tags: ["Home Security", "Emergency Security", "Self-Defense", "OPSEC"],
    featured: false,
  },
  {
    id: 5,
    title: "Power Outage Preparedness: Backup Power Solutions for Every Budget",
    slug: "power-outage-preparedness-backup-solutions",
    excerpt:
      "From simple battery backups to whole-house generators, learn how to keep the lights on when the grid goes down. Complete guide to emergency power solutions.",
    content: `Power outages can last from hours to weeks. Whether caused by storms, equipment failure, or grid attacks, losing electricity affects every aspect of modern life. Here's your complete guide to backup power solutions.`,
    category: "Power & Energy",
    author: "Robert Kim",
    authorBio:
      "Electrical engineer and renewable energy specialist with 20 years of experience in backup power systems.",
    publishDate: "2023-12-20",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&crop=center",
    tags: ["Power Outage", "Backup Power", "Generators", "Solar Power"],
    featured: true,
  },
  {
    id: 6,
    title: "First Aid Essentials: Medical Preparedness for Emergencies",
    slug: "first-aid-essentials-medical-preparedness",
    excerpt:
      "When professional medical help isn't available, your first aid knowledge and supplies could save lives. Learn essential medical preparedness for any emergency.",
    content: `In emergencies, professional medical help may be delayed or unavailable. Your first aid knowledge and medical supplies could mean the difference between life and death. Here's your comprehensive guide to medical preparedness.`,
    category: "Medical Preparedness",
    author: "Dr. Jennifer Walsh",
    authorBio:
      "Emergency medicine physician and wilderness medicine instructor with expertise in austere medical care.",
    publishDate: "2023-12-15",
    readTime: 22,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
    tags: ["First Aid", "Medical Preparedness", "Emergency Medicine", "Trauma Care"],
    featured: false,
  },
]

const categories = [
  { name: "All Articles", count: articles.length },
  { name: "Emergency Preparedness", count: articles.filter((a) => a.category === "Emergency Preparedness").length },
  { name: "Water & Hydration", count: articles.filter((a) => a.category === "Water & Hydration").length },
  { name: "Bug-Out Bags", count: articles.filter((a) => a.category === "Bug-Out Bags").length },
  { name: "Home Security", count: articles.filter((a) => a.category === "Home Security").length },
  { name: "Power & Energy", count: articles.filter((a) => a.category === "Power & Energy").length },
  { name: "Medical Preparedness", count: articles.filter((a) => a.category === "Medical Preparedness").length },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "reading-time", label: "Reading Time" },
  { value: "title", label: "Title A-Z" },
]

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Articles")
  const [sortBy, setSortBy] = useState("newest")

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort articles
    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
        )
        break
      case "reading-time":
        filtered.sort((a, b) => a.readTime - b.readTime)
        break
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "newest":
      default:
        filtered.sort(
          (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        )
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const featuredArticles = articles.filter((article) => article.featured)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="articles" />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <PageHeader
          title="Preparedness Knowledge Base"
          subtitle="Expert guides, tips, and strategies for emergency preparedness and survival. Learn from professionals who've been there." />

        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>

        <div className="mb-12">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={sortOptions} />
        </div>

        <div className="flex flex-col gap-12">
          <div className="lg:w-80 space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}>
                    <span>{category.name}</span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{category.count}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Get the latest preparedness articles and tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white border-slate-200 text-slate-900" />
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-600">
                Showing {filteredArticles.length} of {articles.length} articles
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No articles found"
                description="Try adjusting your search terms or filters" />
            ) : (
              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
