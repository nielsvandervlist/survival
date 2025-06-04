"use client"

import { useState, useMemo } from "react"
import { Package, Compass, Zap, Droplets, Utensils, Shield } from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { ProductCard } from "./components/ui/product-card"
import { SearchFilters } from "./components/ui/search-filters"
import { PageHeader } from "./components/ui/page-header"
import { EmptyState } from "./components/ui/empty-state"
import { TrustIndicators } from "./components/ui/trust-indicators"
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

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
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
        <PageHeader
          title="Best Survival Gear Reviews"
          subtitle="Expert-tested emergency preparedness equipment. We research, test, and review the best survival gear so you can make informed decisions for your family's safety.">
          <div
            className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-slate-600">
              <strong>Affiliate Disclosure:</strong> We earn a commission from qualifying purchases made through our
              links at no extra cost to you.
            </p>
          </div>
        </PageHeader>

        <div className="mb-12">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={sortOptions} />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <div>
              <label className="block text-sm">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md">
                <option>All Products</option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm">Price Range</label>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="mt-1 w-full" />
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="mt-1 w-full" />
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={() => setShowInStockOnly(!showInStockOnly)}
                  className="mr-2" />
                In Stock Only
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={showSaleOnly}
                  onChange={() => setShowSaleOnly(!showSaleOnly)}
                  className="mr-2" />
                On Sale Only
              </label>
            </div>
          </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No products found"
                description="Try adjusting your filters or search terms" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        <TrustIndicators />
      </div>
      <Footer />
    </div>
  );
}
