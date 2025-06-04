"use client";
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ChecklistItem } from "./checklist-item"

export function ChecklistCategoryComponent({
  category,
  completedItems,
  onItemComplete,
  iconComponent: IconComponent
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  const categoryCompletedCount = category.items.filter((item) => completedItems.has(item.id)).length
  const categoryProgress = category.items.length > 0 ? (categoryCompletedCount / category.items.length) * 100 : 0

  // Group items by priority
  const essentialItems = category.items.filter((item) => item.priority === "essential")
  const importantItems = category.items.filter((item) => item.priority === "important")
  const recommendedItems = category.items.filter((item) => item.priority === "recommended")

  const priorityGroups = [
    { priority: "essential", label: "Essential Items", items: essentialItems, color: "from-red-500 to-orange-500" },
    { priority: "important", label: "Important Items", items: importantItems, color: "from-orange-500 to-yellow-500" },
    {
      priority: "recommended",
      label: "Recommended Items",
      items: recommendedItems,
      color: "from-blue-500 to-purple-500",
    },
  ].filter((group) => group.items.length > 0)

  return (
    <Card
      className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl overflow-hidden">
      {/* Category Header */}
      <CardHeader
        className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl text-slate-900 mb-2">{category.name}</CardTitle>
              <p className="text-slate-600 leading-relaxed">{category.description}</p>
            </div>
          </div>
          <div className="text-right space-y-3">
            <div>
              <p className="text-sm font-medium text-slate-700">
                {categoryCompletedCount} of {category.items.length} completed
              </p>
              <div className="w-40 mt-2">
                <Progress value={categoryProgress} className="h-3" />
              </div>
              <p className="text-xs text-slate-500 mt-1">{Math.round(categoryProgress)}% complete</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-600 hover:text-slate-900">
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Expand
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      {/* Category Items */}
      {isExpanded && (
        <CardContent className="p-0">
          {priorityGroups.map((group, groupIndex) => {
            const groupCompletedCount = group.items.filter((item) => completedItems.has(item.id)).length
            const groupProgress = group.items.length > 0 ? (groupCompletedCount / group.items.length) * 100 : 0

            return (
              <div
                key={group.priority}
                className={groupIndex > 0 ? "border-t border-slate-200/50" : ""}>
                {/* Priority Group Header */}
                <div
                  className="bg-gradient-to-r from-slate-25 to-slate-50 px-6 py-4 border-b border-slate-200/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${group.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm font-bold">
                          {group.priority === "essential" ? "!" : group.priority === "important" ? "★" : "◆"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{group.label}</h4>
                        <p className="text-sm text-slate-600">
                          {groupCompletedCount} of {group.items.length} items completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-32">
                        <Progress value={groupProgress} className="h-2" />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{Math.round(groupProgress)}%</p>
                    </div>
                  </div>
                </div>
                {/* Priority Group Items */}
                <div className="p-6 space-y-4">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={itemIndex > 0 ? "border-t border-slate-100 pt-4" : ""}>
                      <ChecklistItem
                        {...item}
                        isCompleted={completedItems.has(item.id)}
                        onToggleComplete={() => onItemComplete(item.id)} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
}
