"use client";
import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../contexts/language-context"

export function NewsletterSignup() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setEmail("")
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section
      className="w-full py-20 md:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">{t("home.newsletter.title")}</h2>
            <p className="mx-auto max-w-[600px] text-xl text-blue-100 leading-relaxed">
              {t("home.newsletter.subtitle")}
            </p>
          </div>
          <div className="w-full max-w-md space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder={t("home.newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/90 border-white/20 text-slate-900 placeholder:text-slate-500 focus:bg-white" />
              <Button
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6">
                {isSubmitted ? "Subscribed!" : t("home.newsletter.button")}
              </Button>
            </form>
            <p className="text-sm text-blue-100">{t("home.newsletter.disclaimer")}</p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
                {t("home.hero.cta.browse")}
              </Button>
            </Link>
            <Link href="/articles">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                {t("home.hero.cta.guides")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
