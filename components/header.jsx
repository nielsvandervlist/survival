import Link from "next/link"
import { Login } from "@/components/login"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              SurvivalReady
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-blue-600">
              Articles
            </Link>
            <Link href="/checklist" className="text-gray-600 hover:text-blue-600">
              Checklist
            </Link>
          </nav>
          <Login/>
        </div>
      </div>
    </header>
  )
}
