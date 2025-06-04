"use client"

import { Shield, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-white/70 backdrop-blur-sm border-t border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <div
                className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span
                className="ml-3 text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {t("site.name")}
              </span>
            </div>
            <p className="text-sm text-slate-600">{t("footer.trusted")}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">{t("footer.reviews")}</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link
                  href="/products?category=Emergency+Kits"
                  className="hover:text-slate-900 transition-colors">
                  {t("footer.emergencyKits")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Survival+Tools"
                  className="hover:text-slate-900 transition-colors">
                  {t("footer.survivalTools")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Food+Storage"
                  className="hover:text-slate-900 transition-colors">
                  {t("footer.foodStorage")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Water+Filtration"
                  className="hover:text-slate-900 transition-colors">
                  {t("footer.waterFiltration")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">{t("footer.resources")}</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/articles" className="hover:text-slate-900 transition-colors">
                  {t("footer.buyingGuides")}
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-slate-900 transition-colors">
                  {t("footer.howToArticles")}
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-slate-900 transition-colors">
                  {t("footer.expertTips")}
                </Link>
              </li>
              <li>
                <Link href="#newsletter" className="hover:text-slate-900 transition-colors">
                  {t("footer.newsletter")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1-800-REVIEWS
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                hello@survivalready.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Denver, CO
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-slate-200 mt-12">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} SurvivalReady. {t("footer.rights")}
          </p>
          <nav className="flex gap-6 mt-4 sm:mt-0">
            <Link
              href="/terms"
              className="text-sm hover:underline underline-offset-4 text-slate-500">
              {t("footer.terms")}
            </Link>
            <Link
              href="/privacy"
              className="text-sm hover:underline underline-offset-4 text-slate-500">
              {t("footer.privacy")}
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="text-sm hover:underline underline-offset-4 text-slate-500">
              {t("footer.affiliate")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
