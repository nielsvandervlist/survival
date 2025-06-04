"use client";
import { useDrag, useDrop } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Info } from "lucide-react"
import Image from "next/image"

export function DragDropItem({
  item,
  isInBag = false,
  quantity = 0,
  onAdd,
  onRemove,
  onInfo
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id: item.id, item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const priorityColors = {
    essential: "bg-gradient-to-r from-red-500 to-orange-500",
    important: "bg-gradient-to-r from-orange-500 to-yellow-500",
    optional: "bg-gradient-to-r from-blue-500 to-purple-500",
  }

  const priorityLabels = {
    essential: "Essential",
    important: "Important",
    optional: "Optional",
  }

  return (
    <Card
      ref={(node) => {
        drag(node)
        drop(node)
      }}
      className={`cursor-move transition-all duration-200 hover:shadow-lg ${
        isDragging ? "opacity-50 scale-95" : ""
      } ${isOver ? "ring-2 ring-blue-500" : ""} ${
        isInBag ? "bg-green-50 border-green-200" : "bg-white border-slate-200"
      }`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Item Image and Basic Info */}
          <div className="flex gap-3">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">{item.name}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1">{item.description}</p>
            </div>
          </div>

          {/* Priority and Stats */}
          <div className="flex items-center justify-between">
            <Badge
              className={`${priorityColors[item.priority]} text-white border-0 text-xs`}>
              {priorityLabels[item.priority]}
            </Badge>
            <div className="text-xs text-slate-600">
              {item.weight}oz • ${item.cost}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onInfo}
              className="text-slate-500 hover:text-slate-700 p-1">
              <Info className="h-4 w-4" />
            </Button>

            {isInBag ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onRemove} className="h-7 w-7 p-0">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium min-w-[20px] text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={onAdd} className="h-7 w-7 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={onAdd} className="text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
