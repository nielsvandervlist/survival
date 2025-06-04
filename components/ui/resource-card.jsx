"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Calendar, FileText, Eye, Share2, Heart } from "lucide-react"
import Image from "next/image"

export function ResourceCard({
  resource,
  category,
  variant = "featured"
}) {
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

  if (variant === "list") {
    return (
      <Card
        className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="px-6">
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
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">Featured</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Badge className="bg-white border border-slate-300 text-slate-700 text-xs">{resource.fileType}</Badge>
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
  }

  return (
    <Card
      className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={resource.previewImage || "/placeholder.svg"}
            alt={resource.title}
            width={300}
            height={200}
            className="w-full h-40 object-cover" />
          {resource.featured && (
            <Badge
              className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className="bg-white/90 text-slate-700 text-xs">{resource.fileType}</Badge>
            <Badge
              className={`${getDifficultyColor(resource.difficulty)} text-white text-xs`}>
              {resource.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 flex flex-col flex-1">
        <div className="space-y-4 flex-1">
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
        </div>

        {/* Move buttons to bottom */}
        <div className="flex gap-2 pt-4 mt-auto">
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
      </CardContent>
    </Card>
  );
}
