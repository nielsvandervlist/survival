"use client";
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function SearchFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
  additionalFilters,
  actions,
  title = "Search & Filter"
}) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-full md:w-48 h-12 bg-white border-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {additionalFilters && <div className="space-y-4">{additionalFilters}</div>}

          {actions && <div className="flex gap-2 pt-2">{actions}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
