"use client";
import { useState, useMemo } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Weight, DollarSign, AlertTriangle, Download, Share2, RotateCcw, Target } from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { DragDropItem } from "./components/drag-drop-item"
import { bugOutBagItems, bugOutBagCategories } from "./data/bug-out-bag-items";

export default function BugOutBagPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [bagItems, setBagItems] = useState({})
  const [selectedItem, setSelectedItem] = useState(null)

  // Calculate bag statistics
  const bagStats = useMemo(() => {
    const items = Object.values(bagItems)
    const totalWeight = items.reduce((sum, bagItem) => sum + bagItem.item.weight * bagItem.quantity, 0)
    const totalCost = items.reduce((sum, bagItem) => sum + bagItem.item.cost * bagItem.quantity, 0)
    const totalItems = items.reduce((sum, bagItem) => sum + bagItem.quantity, 0)

    const essentialItems = items.filter((bagItem) => bagItem.item.priority === "essential").length
    const importantItems = items.filter((bagItem) => bagItem.item.priority === "important").length
    const optionalItems = items.filter((bagItem) => bagItem.item.priority === "optional").length

    const categoryCoverage = bugOutBagCategories.reduce((acc, category) => {
      const hasItems = items.some((bagItem) => bagItem.item.category === category.id)
      acc[category.id] = hasItems
      return acc
    }, {})

    const coveragePercentage =
      (Object.values(categoryCoverage).filter(Boolean).length / bugOutBagCategories.length) * 100

    return {
      totalWeight,
      totalCost,
      totalItems,
      essentialItems,
      importantItems,
      optionalItems,
      categoryCoverage,
      coveragePercentage,
    }
  }, [bagItems])

  // Filter available items
  const filteredItems = useMemo(() => {
    return bugOutBagItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority

      return matchesSearch && matchesCategory && matchesPriority
    });
  }, [searchTerm, selectedCategory, selectedPriority])

  const addItemToBag = (item) => {
    setBagItems((prev) => ({
      ...prev,
      [item.id]: {
        item,
        quantity: (prev[item.id]?.quantity || 0) + 1,
      },
    }))
  }

  const removeItemFromBag = (itemId) => {
    setBagItems((prev) => {
      const current = prev[itemId]
      if (!current || current.quantity <= 1) {
        const { [itemId]: removed, ...rest } = prev
        return rest
      }
      return {
        ...prev,
        [itemId]: {
          ...current,
          quantity: current.quantity - 1,
        },
      }
    })
  }

  const clearBag = () => {
    setBagItems({})
  }

  const getWeightStatus = () => {
    const weightInPounds = bagStats.totalWeight / 16
    if (weightInPounds <= 15) return { status: "excellent", color: "text-green-600", message: "Excellent weight!" }
    if (weightInPounds <= 25) return { status: "good", color: "text-blue-600", message: "Good weight" }
    if (weightInPounds <= 35) return { status: "heavy", color: "text-orange-600", message: "Getting heavy" }
    return { status: "too-heavy", color: "text-red-600", message: "Too heavy!" }
  }

  const weightStatus = getWeightStatus()

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header currentPage="bug-out-bag" />

        <div className="container mx-auto px-4 max-w-7xl py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Virtual Bug-Out Bag Builder
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Customize your perfect bug-out bag with our interactive tool. Drag and drop items, track weight and cost,
              and ensure you have everything needed for emergency evacuation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Available Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900">Available Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-slate-200" />
                    </div>
                    <div className="flex gap-4">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white border-slate-200">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {bugOutBagCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                        <SelectTrigger className="bg-white border-slate-200">
                          <SelectValue placeholder="All Priorities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="essential">Essential</SelectItem>
                          <SelectItem value="important">Important</SelectItem>
                          <SelectItem value="optional">Optional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <DragDropItem
                    key={item.id}
                    item={item}
                    onAdd={() => addItemToBag(item)}
                    onInfo={() => setSelectedItem(item)} />
                ))}
              </div>
            </div>

            {/* Bug-Out Bag */}
            <div className="space-y-6">
              {/* Bag Statistics */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Your Bug-Out Bag
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Weight Status */}
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${weightStatus.color} mb-2`}>
                      {(bagStats.totalWeight / 16).toFixed(1)} lbs
                    </div>
                    <p className={`text-sm ${weightStatus.color}`}>{weightStatus.message}</p>
                    <div className="mt-2">
                      <Progress
                        value={Math.min((bagStats.totalWeight / 16 / 35) * 100, 100)}
                        className="h-2" />
                    </div>
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <div className="font-bold text-slate-900">${bagStats.totalCost.toFixed(2)}</div>
                      <div className="text-xs text-slate-600">Total Cost</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <div className="font-bold text-slate-900">{bagStats.totalItems}</div>
                      <div className="text-xs text-slate-600">Items</div>
                    </div>
                  </div>

                  {/* Priority Breakdown */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">Priority Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Essential</span>
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                          {bagStats.essentialItems}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Important</span>
                        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                          {bagStats.importantItems}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Optional</span>
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {bagStats.optionalItems}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Category Coverage */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">Category Coverage</h4>
                    <Progress value={bagStats.coveragePercentage} className="h-2" />
                    <p className="text-xs text-slate-600">
                      {Math.round(bagStats.coveragePercentage)}% of categories covered
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={clearBag} className="flex-1">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bag Contents */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-900">Bag Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Object.values(bagItems).length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Your bag is empty</p>
                        <p className="text-sm">Drag items here or click Add</p>
                      </div>
                    ) : (
                      Object.values(bagItems).map(({ item, quantity }) => (
                        <DragDropItem
                          key={item.id}
                          item={item}
                          isInBag={true}
                          quantity={quantity}
                          onAdd={() => addItemToBag(item)}
                          onRemove={() => removeItemFromBag(item.id)}
                          onInfo={() => setSelectedItem(item)} />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommendations */}
          <Card
            className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Bug-Out Bag Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Start with Essentials</h4>
                    <p className="text-sm text-slate-600">
                      Focus on the "Big 4": Shelter, Water, Fire, and First Aid before adding other items.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Weight className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Watch the Weight</h4>
                    <p className="text-sm text-slate-600">
                      Keep your bag under 25% of your body weight. Aim for 15-25 lbs for most people.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Test Your Gear</h4>
                    <p className="text-sm text-slate-600">
                      Practice with your bag regularly. Know how to use every item before you need it.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </DndProvider>
  );
}
