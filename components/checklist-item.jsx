"use client";
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, ExternalLink, Info, Clock, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ChecklistItem({
  id,
  title,
  description,
  priority,
  estimatedCost,
  timeToComplete,
  tips,
  relatedProducts,
  subItems,
  isCompleted = false,
  onToggleComplete
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [subItemsCompleted, setSubItemsCompleted] = useState({})

  const priorityColors = {
    essential: "bg-gradient-to-r from-red-500 to-orange-500",
    important: "bg-gradient-to-r from-orange-500 to-yellow-500",
    recommended: "bg-gradient-to-r from-blue-500 to-purple-500",
  }

  const priorityLabels = {
    essential: "Essential",
    important: "Important",
    recommended: "Recommended",
  }

  const handleSubItemToggle = (subItemId) => {
    setSubItemsCompleted((prev) => ({
      ...prev,
      [subItemId]: !prev[subItemId],
    }))
  }

  const hasExpandableContent = tips || relatedProducts || subItems

  return (
    <div className="space-y-4">
      {/* Main Item */}
      <div className="flex items-start gap-4">
        <Checkbox
          id={id}
          checked={isCompleted}
          onCheckedChange={onToggleComplete}
          className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <label
                htmlFor={id}
                className={`text-lg font-semibold cursor-pointer transition-colors block ${
                  isCompleted ? "text-slate-500 line-through" : "text-slate-900"
                }`}>
                {title}
              </label>
              {description && (
                <p
                  className={`mt-2 leading-relaxed ${isCompleted ? "text-slate-400" : "text-slate-600"}`}>
                  {description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge
                className={`${priorityColors[priority]} text-white border-0 text-xs px-2 py-1`}>
                {priorityLabels[priority]}
              </Badge>
              {hasExpandableContent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-slate-500 hover:text-slate-700 p-1">
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            {estimatedCost && (
              <span className="flex items-center gap-1 text-slate-600">
                <DollarSign className="h-3 w-3" />
                <span className="font-medium">Cost:</span> {estimatedCost}
              </span>
            )}
            {timeToComplete && (
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="h-3 w-3" />
                <span className="font-medium">Time:</span> {timeToComplete}
              </span>
            )}
          </div>

          {/* Expanded Content */}
          {isExpanded && hasExpandableContent && (
            <Card className="bg-slate-50/50 border-slate-200/50">
              <CardContent className="p-4 space-y-4">
                {/* Sub Items */}
                {subItems && subItems.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      Detailed Steps:
                    </h4>
                    <div className="space-y-2 ml-6">
                      {subItems.map((subItem) => (
                        <div key={subItem.id} className="flex items-center gap-3">
                          <Checkbox
                            id={subItem.id}
                            checked={subItemsCompleted[subItem.id] || false}
                            onCheckedChange={() => handleSubItemToggle(subItem.id)}
                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
                          <label
                            htmlFor={subItem.id}
                            className={`text-sm cursor-pointer transition-colors ${
                              subItemsCompleted[subItem.id] ? "text-slate-500 line-through" : "text-slate-700"
                            }`}>
                            {subItem.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                {tips && tips.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <Info className="h-4 w-4 text-green-500" />
                      Pro Tips:
                    </h4>
                    <ul className="space-y-2 ml-6">
                      {tips.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                      Recommended Products:
                    </h4>
                    <div className="grid gap-3">
                      {relatedProducts.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                            <p className="text-sm text-green-600 font-medium">{product.price}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="border-blue-300 text-blue-700 hover:bg-blue-50">
                            <a href={product.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
