"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { ResourceCard } from "./components/ui/resource-card"
import { SearchFilters } from "./components/ui/search-filters"
import { PageHeader } from "./components/ui/page-header"
import { EmptyState } from "./components/ui/empty-state"
import { downloadableResources, resourceCategories } from "./data/downloadable-resources"

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title A-Z" },
]

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

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="resources" />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <PageHeader
          title="Downloadable Preparedness Resources"
          subtitle="Free downloadable guides, checklists, templates, and reference materials to help you prepare for any emergency. All resources are created by experts and regularly updated." />

        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.slice(0, 6).map((resource) => {
              const category = resourceCategories.find((cat) => cat.id === resource.category)
              return (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  category={category}
                  variant="featured" />
              );
            })}
          </div>
        </section>

        <div className="mb-12">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={sortOptions}
            title="Search & Filter Resources" />
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">All Resources ({filteredResources.length})</h2>
          </div>

          {filteredResources.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No resources found"
              description="Try adjusting your search terms or filters" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const category = resourceCategories.find((cat) => cat.id === resource.category)
                return <ResourceCard key={resource.id} resource={resource} category={category} variant="list" />;
              })}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 text-center">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
