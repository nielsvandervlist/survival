"use client";
import { Shield, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "../contexts/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"

export function Header({
  currentPage = ""
}) {
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
        <Link
          href="/"
          className="flex items-center justify-center"
          onClick={closeMobileMenu}>
          <div
            className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span
            className="ml-3 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {t("site.name")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              currentPage === "home" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.home")}
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium transition-colors ${
              currentPage === "products" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.reviews")}
          </Link>
          <Link
            href="/articles"
            className={`text-sm font-medium transition-colors ${
              currentPage === "articles" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.guides")}
          </Link>
          <Link
            href="/checklist"
            className={`text-sm font-medium transition-colors ${
              currentPage === "checklist" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.checklist")}
          </Link>
          <Link
            href="/bug-out-bag"
            className={`text-sm font-medium transition-colors ${
              currentPage === "bug-out-bag" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.bugOutBag")}
          </Link>
          <Link
            href="/scenario-planner"
            className={`text-sm font-medium transition-colors ${
              currentPage === "scenario-planner" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.scenarios")}
          </Link>
          <Link
            href="/resources"
            className={`text-sm font-medium transition-colors ${
              currentPage === "resources" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}>
            {t("nav.resources")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-2"
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/50">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "home" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.home")}
            </Link>
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "products" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.reviews")}
            </Link>
            <Link
              href="/articles"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "articles" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.guides")}
            </Link>
            <Link
              href="/checklist"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "checklist" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.checklist")}
            </Link>
            <Link
              href="/bug-out-bag"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "bug-out-bag" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.bugOutBag")}
            </Link>
            <Link
              href="/scenario-planner"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "scenario-planner" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.scenarios")}
            </Link>
            <Link
              href="/resources"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-colors py-2 ${
                currentPage === "resources" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}>
              {t("nav.resources")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
