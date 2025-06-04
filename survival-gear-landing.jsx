"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Compass,
  Users,
  Star,
  CheckCircle,
  Package,
  FileText,
  Backpack,
  AlertTriangle,
  List,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { NewsletterSignup } from "./components/newsletter-signup"
import { useLanguage } from "./contexts/language-context"

export default function Component() {
  const { t } = useLanguage()

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="home" />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div
              className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <Badge
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-2">
                    {"#1 " + t("site.tagline")}
                  </Badge>
                  <h1
                    className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    {t("home.hero.title")}
                  </h1>
                  <p className="max-w-[600px] text-xl text-slate-600 leading-relaxed">{t("home.hero.subtitle")}</p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg">
                      {t("home.hero.cta.browse")}
                    </Button>
                  </Link>
                  <Link href="/articles">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg">
                      {t("home.hero.cta.guides")}
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-8 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Expert Tested
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Unbiased Reviews
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Interactive Tools
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

        {/* Interactive Tools Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div
              className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <h2
                  className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {t("home.tools.title")}
                </h2>
                <p className="max-w-[900px] text-xl text-slate-600 leading-relaxed">{t("home.tools.subtitle")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bug Out Bag Builder */}
              <Card
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Backpack className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{t("home.bugOutBag.title")}</CardTitle>
                  <CardDescription className="text-slate-600">{t("home.bugOutBag.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Drag & Drop</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Weight Tracking</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Cost Calculator</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Priority System</p>
                    </div>
                  </div>
                  <Link href="/bug-out-bag">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                      <Backpack className="h-4 w-4 mr-2" />
                      {t("home.bugOutBag.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Scenario Planner */}
              <Card
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{t("home.scenarios.title")}</CardTitle>
                  <CardDescription className="text-slate-600">{t("home.scenarios.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-700">EMP</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-700">Natural Disaster</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-700">Civil Unrest</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-700">Pandemic</p>
                    </div>
                  </div>
                  <Link href="/scenario-planner">
                    <Button
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {t("home.scenarios.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Downloadable Resources */}
              <Card
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{t("home.resources.title")}</CardTitle>
                  <CardDescription className="text-slate-600">{t("home.resources.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Checklists</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Guides</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Templates</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Reference</p>
                    </div>
                  </div>
                  <Link href="/resources">
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">
                      <Download className="h-4 w-4 mr-2" />
                      {t("home.resources.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="w-full py-20 md:py-32 bg-white/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div
              className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <h2
                  className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {t("home.features.title")}
                </h2>
                <p className="max-w-[900px] text-xl text-slate-600 leading-relaxed">{t("home.features.subtitle")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Checklist */}
              <Card
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <List className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{t("home.checklist.title")}</CardTitle>
                  <CardDescription className="text-slate-600">{t("home.checklist.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Track your progress
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Prioritized categories
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Expert recommendations
                    </li>
                  </ul>
                  <Link href="/checklist">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0">
                      <List className="h-4 w-4 mr-2" />
                      {t("home.checklist.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{t("home.reviews.title")}</CardTitle>
                  <CardDescription className="text-slate-600">{t("home.reviews.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Unbiased testing
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Price comparisons
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Pros and cons analysis
                    </li>
                  </ul>
                  <Link href="/products">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
                      <Package className="h-4 w-4 mr-2" />
                      {t("home.reviews.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Guides */}
              <Card
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{t("home.guides.title")}</CardTitle>
                  <CardDescription className="text-slate-600">{t("home.guides.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Step-by-step instructions
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Expert advice
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Practical techniques
                    </li>
                  </ul>
                  <Link href="/articles">
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white border-0">
                      <Compass className="h-4 w-4 mr-2" />
                      {t("home.guides.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div
              className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <h2
                  className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {t("home.testimonials.title")}
                </h2>
                <div className="flex items-center justify-center gap-2 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                  <span className="ml-3 text-slate-600 text-lg">4.9/5 from 2,847 reviews</span>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-3">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-2 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "The emergency kit recommendations saved our family during the power outage. Everything we needed
                    was right there. Quality gear that actually works!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Sarah M.</p>
                      <p className="text-sm text-slate-500">Verified Reader</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-2 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "The bug-out bag builder tool helped me create the perfect emergency kit. I love how it tracks
                    weight and shows what I'm missing. Brilliant resource!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Mike R.</p>
                      <p className="text-sm text-slate-500">Verified Reader</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-2 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "The scenario planner helped me prepare for specific emergencies in my area. The downloadable
                    resources are incredibly detailed and practical."
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">David L.</p>
                      <p className="text-sm text-slate-500">Verified Reader</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <NewsletterSignup />

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div
              className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <Badge
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-2">
                    Since 2015
                  </Badge>
                  <h2
                    className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Built by Experts, for Families
                  </h2>
                  <p className="max-w-[600px] text-xl text-slate-600 leading-relaxed">
                    We're not just another review site. We're a team of survival experts, emergency responders, and
                    outdoor enthusiasts who understand that quality equipment and proper planning can mean the
                    difference between surviving and thriving.
                  </p>
                </div>
                <ul className="grid gap-4 py-4">
                  <li className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Real-world testing by survival experts
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Interactive planning tools and calculators
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Comprehensive scenario-based recommendations
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Free downloadable resources and guides
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop&crop=center"
                    width="400"
                    height="400"
                    alt="Team of survival experts"
                    className="relative mx-auto aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
