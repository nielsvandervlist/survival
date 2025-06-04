"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../contexts/cart-context"
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer({
  isOpen,
  onClose
}) {
  const { state, dispatch } = useCart()

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const shipping = state.total > 75 ? 0 : 9.99
  const tax = state.total * 0.08
  const finalTotal = state.total + shipping + tax

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart ({state.itemCount})
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Your cart is empty</p>
                <Button className="mt-4" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-100 text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-slate-400 mt-1">{item.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-slate-100">${item.price.toFixed(2)}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0 border-slate-600"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium text-slate-100 w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0 border-slate-600"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                                onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-slate-800 p-4 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal:</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between font-semibold text-slate-100 text-base border-t border-slate-700 pt-2">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {state.total < 75 && (
                <Badge
                  variant="outline"
                  className="w-full justify-center border-orange-500 text-orange-400">
                  Add ${(75 - state.total).toFixed(2)} more for free shipping!
                </Badge>
              )}

              <Link href="/checkout" onClick={onClose}>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
