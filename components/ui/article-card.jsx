"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ArticleCard({
  article,
  variant = "featured"
}) {
  if (variant === "list") {
    return (
      <Card
        className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-48 flex-shrink-0">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={200}
                height={150}
                className="w-full h-32 md:h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} min read
                </span>
                <Badge variant="outline" className="border-slate-300 text-slate-600">
                  {article.category}
                </Badge>
              </div>
              <h3
                className="text-2xl font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="text-slate-600 line-clamp-2 leading-relaxed">{article.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-slate-100 text-slate-600 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{article.author}</p>
                  </div>
                </div>
                <Link href={`/articles/${article.slug}`}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
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
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover" />
          {article.featured && (
            <Badge
              className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.publishDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min read
            </span>
          </div>
          <Badge variant="outline" className="border-slate-300 text-slate-600">
            {article.category}
          </Badge>
          <h3
            className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-slate-600 line-clamp-3">{article.excerpt}</p>
        </div>
        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-slate-600">{article.author}</span>
          </div>
          <Link href={`/articles/${article.slug}`}>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Read More
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
