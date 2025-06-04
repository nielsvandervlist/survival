import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div
          className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <Badge
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-2">
                {"#1 Trusted Survival Gear Reviews"}
              </Badge>
              <h1
                className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Expert-Tested Survival Gear Reviews
              </h1>
              <p className="max-w-[600px] text-xl text-slate-600 leading-relaxed">
                Discover the best emergency preparedness equipment through our comprehensive reviews and expert testing.
                Make informed decisions for your family's safety.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg">
                  Browse Reviews
                </Button>
              </Link>
              <Link href="/articles">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg">
                  Read Our Guides
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Expert Tested
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Unbiased Reviews
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Best Prices
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center"
                width="500"
                height="500"
                alt="Survival gear and emergency supplies"
                className="relative mx-auto aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
