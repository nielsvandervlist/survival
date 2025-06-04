"use client"
import { Shield, Award, TrendingUp } from "lucide-react"

export function TrustIndicators() {
  return (
    <div className="mt-20 text-center">
      <div
        className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Trust Our Reviews?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Expert Testing</h4>
            <p className="text-sm text-slate-600">
              Our team of survival experts personally tests every product in real-world conditions.
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Unbiased Reviews</h4>
            <p className="text-sm text-slate-600">
              We provide honest, unbiased reviews to help you make the best decisions for your family.
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Best Prices</h4>
            <p className="text-sm text-slate-600">
              We compare prices across multiple retailers to ensure you get the best deals available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
