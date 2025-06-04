"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  CheckCircle,
  Users,
  Download,
  PrinterIcon as Print,
  Share2,
  Droplets,
  Home,
  Heart,
  Wrench,
  Phone,
  AlertTriangle,
  Target,
  TrendingUp,
} from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { ChecklistCategoryComponent } from "./components/checklist-category"
import { checklistCategories } from "./data/checklist-data"

const iconMap = {
  droplets: Droplets,
  home: Home,
  heart: Heart,
  wrench: Wrench,
  phone: Phone,
}

export default function ChecklistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [completedItems, setCompletedItems] = useState(new Set())

  // Calculate progress
  const totalItems = checklistCategories.reduce((sum, category) => sum + category.items.length, 0)
  const completedCount = completedItems.size
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0

  // Calculate priority breakdown
  const essentialItems = checklistCategories.reduce(
    (sum, category) => sum + category.items.filter((item) => item.priority === "essential").length,
    0
  )
  const importantItems = checklistCategories.reduce(
    (sum, category) => sum + category.items.filter((item) => item.priority === "important").length,
    0
  )
  const recommendedItems = checklistCategories.reduce(
    (sum, category) => sum + category.items.filter((item) => item.priority === "recommended").length,
    0
  )

  const essentialCompleted = checklistCategories.reduce((sum, category) =>
    sum + category.items.filter((item) => item.priority === "essential" && completedItems.has(item.id)).length, 0)
  const importantCompleted = checklistCategories.reduce((sum, category) =>
    sum + category.items.filter((item) => item.priority === "important" && completedItems.has(item.id)).length, 0)
  const recommendedCompleted = checklistCategories.reduce((sum, category) =>
    sum + category.items.filter((item) => item.priority === "recommended" && completedItems.has(item.id)).length, 0)

  // Filter categories
  const filteredCategories = useMemo(() => {
    return checklistCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
          const matchesCategory = selectedCategory === "all" || category.id === selectedCategory
          const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority

          return matchesSearch && matchesCategory && matchesPriority
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchTerm, selectedCategory, selectedPriority])

  const handleItemComplete = (itemId) => {
    setCompletedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="checklist" />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Disaster Preparedness Checklist
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            A comprehensive guide to help you and your family prepare for emergencies. Check off items as you complete
            them and track your progress across all categories.
          </p>

          {/* Progress Overview */}
          <Card
            className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Overall Progress */}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Your Preparedness Progress</h3>
                  <p className="text-slate-600 text-lg">
                    {completedCount} of {totalItems} items completed
                  </p>
                </div>

                <div className="space-y-4">
                  <Progress value={progressPercentage} className="h-4" />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>0%</span>
                    <span className="font-bold text-lg text-slate-900">{Math.round(progressPercentage)}% Complete</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Priority Breakdown */}
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  <div className="text-center space-y-3">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                      <AlertTriangle className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">Essential Items</p>
                      <p className="text-sm text-slate-600">Must-have for basic survival</p>
                      <div className="mt-2">
                        <Progress
                          value={essentialItems > 0 ? (essentialCompleted / essentialItems) * 100 : 0}
                          className="h-2" />
                        <p className="text-xs text-slate-500 mt-1">
                          {essentialCompleted} of {essentialItems} completed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">Important Items</p>
                      <p className="text-sm text-slate-600">High priority preparations</p>
                      <div className="mt-2">
                        <Progress
                          value={importantItems > 0 ? (importantCompleted / importantItems) * 100 : 0}
                          className="h-2" />
                        <p className="text-xs text-slate-500 mt-1">
                          {importantCompleted} of {importantItems} completed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">Recommended Items</p>
                      <p className="text-sm text-slate-600">Enhanced preparedness</p>
                      <div className="mt-2">
                        <Progress
                          value={recommendedItems > 0 ? (recommendedCompleted / recommendedItems) * 100 : 0}
                          className="h-2" />
                        <p className="text-xs text-slate-500 mt-1">
                          {recommendedCompleted} of {recommendedItems} completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Filter & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search checklist items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500" />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-64 h-12 bg-white border-slate-200">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All Categories</SelectItem>
                    {checklistCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Priority Filter */}
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full lg:w-48 h-12 bg-white border-slate-200">
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="essential">Essential Only</SelectItem>
                    <SelectItem value="important">Important Only</SelectItem>
                    <SelectItem value="recommended">Recommended Only</SelectItem>
                  </SelectContent>
                </Select>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Print className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checklist Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || Droplets
            return (
              <ChecklistCategoryComponent
                key={category.id}
                category={category}
                completedItems={completedItems}
                onItemComplete={handleItemComplete}
                iconComponent={IconComponent} />
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
            <CardContent className="p-16 text-center">
              <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No items found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        )}

        {/* Emergency Tips */}
        <section className="mt-20">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-slate-900">Remember: Preparation Saves Lives</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">Make a Family Plan</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Discuss and practice your emergency plan with all family members regularly. Everyone should know
                      what to do.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">Regular Maintenance</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Check and update your emergency supplies every 6 months. Rotate food, water, and medications.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">Stay Informed</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Monitor local emergency alerts and weather conditions. Know the risks specific to your area.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <Footer />
    </div>
  );
}
