'use client'

import { useState } from "react"
import Link from "next/link"
import { Login } from "@/components/login"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              SurvivalReady
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</Link>
            <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors">Resources</Link>
            <Link href="/bug-out-bag" className="text-gray-700 hover:text-blue-600 transition-colors">Bug-out Bag</Link>
            <Link href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors">Articles</Link>
            <Link href="/scenario-planner" className="text-gray-700 hover:text-blue-600 transition-colors">Scenario Planner</Link>
            <Link href="/checklist" className="text-gray-700 hover:text-blue-600 transition-colors">Checklist</Link>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Login */}
          <div className="hidden md:block">
            <Login />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-2 bg-white border-t border-gray-200 text-sm font-medium">
          <Link href="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/products" className="block text-gray-700 hover:text-blue-600">Products</Link>
          <Link href="/resources" className="block text-gray-700 hover:text-blue-600">Resources</Link>
          <Link href="/bug-out-bag" className="block text-gray-700 hover:text-blue-600">Bug-out Bag</Link>
          <Link href="/articles" className="block text-gray-700 hover:text-blue-600">Articles</Link>
          <Link href="/scenario-planner" className="block text-gray-700 hover:text-blue-600">Scenario Planner</Link>
          <Link href="/checklist" className="block text-gray-700 hover:text-blue-600">Checklist</Link>
          <div className="pt-2">
            <Login />
          </div>
        </div>
      )}
    </header>
  )
}
