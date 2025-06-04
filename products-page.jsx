"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Filter,
  Star,
  Heart,
  Package,
  Compass,
  Zap,
  Droplets,
  Utensils,
  ExternalLink,
  Award,
  TrendingUp,
  Shield,
} from "lucide-react"
import Image from "next/image"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { products } from "./data/products"

const categories = [
  { name: "All Products", icon: Package, count: products.length },
  { name: "Emergency Kits", icon: Shield, count: products.filter((p) => p.category === "Emergency Kits").length },
  { name: "Survival Tools", icon: Compass, count: products.filter((p) => p.category === "Survival Tools").length },
  {
    name: "Power & Communication",
    icon: Zap,
    count: products.filter((p) => p.category === "Power & Communication").length,
  },
  { name: "Water Filtration", icon: Droplets, count: products.filter((p) => p.category === "Water Filtration").length },
  { name: "Food Storage", icon: Utensils, count: products.filter((p) => p.category === "Food Storage").length },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showSaleOnly, setShowSaleOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStock = !showInStockOnly || product.inStock
      const matchesSale = !showSaleOnly || product.originalPrice

      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesSale
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy, priceRange, showInStockOnly, showSaleOnly])

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="products" />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Best Survival Gear Reviews
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Expert-tested emergency preparedness equipment. We research, test, and review the best survival gear so you
            can make informed decisions for your family's safety.
          </p>
          <div
            className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-slate-600">
              <strong>Affiliate Disclosure:</strong> We earn a commission from qualifying purchases made through our
              links at no extra cost to you.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 h-12 bg-white border-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all ${
                            selectedCategory === category.name
                              ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}>
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4" />
                            {category.name}
                          </div>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{category.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={5}
                      className="w-full" />
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Availability</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="in-stock"
                        checked={showInStockOnly}
                        onCheckedChange={setShowInStockOnly} />
                      <label htmlFor="in-stock" className="text-sm text-slate-600">
                        In Stock Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="on-sale" checked={showSaleOnly} onCheckedChange={setShowSaleOnly} />
                      <label htmlFor="on-sale" className="text-sm text-slate-600">
                        On Sale Only
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-56 object-contain bg-white p-4" />
                      {product.badge && (
                        <Badge
                          className={`absolute top-3 left-3 ${
                            product.badge === "Great Value" || product.badge === "Budget Pick"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : product.badge === "Best Value" || product.badge === "Best Seller"
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                : product.badge === "Editor's Choice"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                  : product.badge === "Most Popular"
                                    ? "bg-gradient-to-r from-orange-500 to-red-500"
                                    : "bg-gradient-to-r from-indigo-500 to-blue-500"
                          } text-white border-0`}>
                          {product.badge === "Editor's Choice" && <Award className="h-3 w-3 mr-1" />}
                          {product.badge === "Most Popular" && <TrendingUp className="h-3 w-3 mr-1" />}
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      {!product.inStock && (
                        <div
                          className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                          <span className="text-white font-semibold bg-slate-800 px-3 py-1 rounded-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-slate-300"}`} />
                        ))}
                        <span className="text-sm text-slate-600 ml-1">({product.reviews.toLocaleString()})</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>

                      {/* Pros and Cons */}
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-xs font-medium text-green-700 mb-1">Pros:</h4>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {product.pros.slice(0, 2).map((pro, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-red-700 mb-1">Cons:</h4>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {product.cons.slice(0, 2).map((con, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>

                      {/* Affiliate Links */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-700">Compare Prices:</h4>
                        <div className="space-y-2">
                          {product.affiliateLinks.slice(0, 2).map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-700">{link.retailer}</span>
                                <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
                              </div>
                              <span className="text-sm font-bold text-slate-900">${link.price}</span>
                            </a>
                          ))}
                        </div>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                          disabled={!product.inStock}>
                          <a
                            href={product.affiliateLinks[0]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            {product.inStock ? "Check Best Price" : "Out of Stock"}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div
            className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Trust Our Reviews?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Expert Testing</h4>
                <p className="text-sm text-slate-600">
                  Our team of survival experts personally tests every product in real-world conditions.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Unbiased Reviews</h4>
                <p className="text-sm text-slate-600">
                  We provide honest, unbiased reviews to help you make the best decisions for your family.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Best Prices</h4>
                <p className="text-sm text-slate-600">
                  We compare prices across multiple retailers to ensure you get the best deals available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
