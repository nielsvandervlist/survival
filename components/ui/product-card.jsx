"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ExternalLink, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

export function ProductCard({
  product
}) {
  return (
    <Card
      className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-56 object-cover bg-slate-50" />
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
              <span className="text-white font-semibold bg-slate-800 px-3 py-1 rounded-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-6 flex flex-col flex-1">
        <div className="space-y-4 flex-1">
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
        </div>

        {/* Affiliate links at bottom */}
        <div className="space-y-2 mt-4">
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
      </CardContent>
    </Card>
  );
}
