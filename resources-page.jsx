"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Star, Calendar, FileText, Filter, Eye, Share2, Heart } from "lucide-react"
import Image from "next/image"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { downloadableResources, resourceCategories } from "./data/downloadable-resources"

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedFileType, setSelectedFileType] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  // Get unique file types
  const fileTypes = Array.from(new Set(downloadableResources.map((resource) => resource.fileType)))

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    const filtered = downloadableResources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty
      const matchesFileType = selectedFileType === "all" || resource.fileType === selectedFileType

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFileType
    })

    // Sort resources
    switch (sortBy) {
      case "downloads":
        filtered.sort((a, b) => b.downloadCount - a.downloadCount)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        )
        break
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedFileType, sortBy])

  const featuredResources = downloadableResources.filter((resource) => resource.featured)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-orange-500"
      case "advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDownloadCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="resources" />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Downloadable Preparedness Resources
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Free downloadable guides, checklists, templates, and reference materials to help you prepare for any
            emergency. All resources are created by experts and regularly updated.
          </p>
        </div>

        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.slice(0, 6).map((resource) => {
              const category = resourceCategories.find((cat) => cat.id === resource.category)
              return (
                <Card
                  key={resource.id}
                  className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <Image
                        src={resource.previewImage || "/placeholder.svg"}
                        alt={resource.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover" />
                      <Badge
                        className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        Featured
                      </Badge>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge className="bg-white/90 text-slate-700 text-xs">{resource.fileType}</Badge>
                        <Badge
                          className={`${getDifficultyColor(resource.difficulty)} text-white text-xs`}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category?.icon}</span>
                        <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                          {category?.name}
                        </Badge>
                      </div>

                      <h3
                        className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {resource.title}
                      </h3>

                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{resource.description}</p>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {formatDownloadCount(resource.downloadCount)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            {resource.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {resource.fileSize}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Search and Filters */}
        <div className="mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filter Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-slate-200" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {resourceCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="All File Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All File Types</SelectItem>
                      {fileTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="downloads">Most Downloaded</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">All Resources ({filteredResources.length})</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource) => {
              const category = resourceCategories.find((cat) => cat.id === resource.category)
              return (
                <Card
                  key={resource.id}
                  className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={resource.previewImage || "/placeholder.svg"}
                          alt={resource.title}
                          width={120}
                          height={80}
                          className="rounded-lg object-cover" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{category?.icon}</span>
                            <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                              {category?.name}
                            </Badge>
                            {resource.featured && (
                              <Badge
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Badge className="bg-white border border-slate-300 text-slate-700 text-xs">
                              {resource.fileType}
                            </Badge>
                            <Badge
                              className={`${getDifficultyColor(resource.difficulty)} text-white text-xs`}>
                              {resource.difficulty}
                            </Badge>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{resource.title}</h3>

                        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{resource.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {formatDownloadCount(resource.downloadCount)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current text-yellow-500" />
                              {resource.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {resource.fileSize}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(resource.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardContent className="p-16 text-center">
                <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No resources found</h3>
                <p className="text-slate-500">Try adjusting your search terms or filters</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <Card
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need More Resources?</h3>
            <p className="text-slate-700 mb-6 text-lg">
              Join our community to get access to exclusive resources, updates, and expert preparedness advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3">
                Join Our Newsletter
              </Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 px-8 py-3">
                Request a Resource
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
