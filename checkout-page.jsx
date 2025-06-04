"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "./contexts/cart-context"
import { Shield, CreditCard, Truck, Lock, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const steps = [
  { id: 1, name: "Shipping", icon: Truck },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Confirmation", icon: CheckCircle },
]

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState("")

  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [billingForm, setBillingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const shipping = state.total > 75 ? 0 : shippingMethod === "express" ? 19.99 : 9.99
  const tax = state.total * 0.08
  const finalTotal = state.total + shipping + tax

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // Generate order number
    const orderNum = "SR" + Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderNumber(orderNum)
    setCurrentStep(3)
    // Clear cart after successful order
    dispatch({ type: "CLEAR_CART" })
  }

  if (state.items.length === 0 && currentStep < 3) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800">
          <Link href="/" className="flex items-center justify-center">
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-slate-100">SurvivalReady</span>
          </Link>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">Your cart is empty</h1>
          <p className="text-slate-400 mb-8">Add some items to your cart before checking out.</p>
          <Link href="/products">
            <Button className="bg-orange-500 hover:bg-orange-600 text-slate-900">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800">
        <Link href="/" className="flex items-center justify-center">
          <Shield className="h-8 w-8 text-orange-500" />
          <span className="ml-2 text-xl font-bold text-slate-100">SurvivalReady</span>
        </Link>
        <div className="ml-auto">
          <Link href="/products">
            <Button variant="ghost" className="text-slate-300 hover:text-slate-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-orange-500 border-orange-500 text-slate-900"
                        : "border-slate-600 text-slate-400"
                    }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? "text-orange-400" : "text-slate-400"
                    }`}>
                    {step.name}
                  </span>
                  {step.id < steps.length && (
                    <div
                      className={`w-16 h-0.5 ml-4 ${currentStep > step.id ? "bg-orange-500" : "bg-slate-600"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-100">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-slate-200">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100" />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-slate-200">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-200">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-slate-100" />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-slate-200">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-slate-100" />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-slate-200">
                        Address
                      </Label>
                      <Input
                        id="address"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-slate-200">
                          City
                        </Label>
                        <Input
                          id="city"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100" />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-slate-200">
                          State
                        </Label>
                        <Select
                          value={shippingForm.state}
                          onValueChange={(value) => setShippingForm({ ...shippingForm, state: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-slate-200">
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          required
                          value={shippingForm.zipCode}
                          onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100" />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="space-y-3">
                      <Label className="text-slate-200">Shipping Method</Label>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div
                          className="flex items-center space-x-2 p-3 border border-slate-600 rounded-md">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 text-slate-200">
                            Standard Shipping (5-7 business days) - {state.total > 75 ? "FREE" : "$9.99"}
                          </Label>
                        </div>
                        <div
                          className="flex items-center space-x-2 p-3 border border-slate-600 rounded-md">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 text-slate-200">
                            Express Shipping (2-3 business days) - $19.99
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-slate-100">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3">
                      <div
                        className="flex items-center space-x-2 p-3 border border-slate-600 rounded-md">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 text-slate-200 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div
                        className="flex items-center space-x-2 p-3 border border-slate-600 rounded-md opacity-50">
                        <RadioGroupItem value="paypal" id="paypal" disabled />
                        <Label htmlFor="paypal" className="flex-1 text-slate-400">
                          PayPal (Coming Soon)
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="nameOnCard" className="text-slate-200">
                          Name on Card
                        </Label>
                        <Input
                          id="nameOnCard"
                          required
                          value={paymentForm.nameOnCard}
                          onChange={(e) => setPaymentForm({ ...paymentForm, nameOnCard: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100" />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber" className="text-slate-200">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="text-slate-200">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            required
                            value={paymentForm.expiryDate}
                            onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-slate-100" />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-slate-200">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            required
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-slate-100" />
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sameAsShipping"
                            checked={sameAsShipping}
                            onCheckedChange={setSameAsShipping} />
                          <Label htmlFor="sameAsShipping" className="text-slate-200">
                            Billing address same as shipping
                          </Label>
                        </div>

                        {!sameAsShipping && (
                          <div className="space-y-4 p-4 border border-slate-600 rounded-md">
                            <h3 className="font-semibold text-slate-200">Billing Address</h3>
                            {/* Add billing address fields similar to shipping */}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 border-slate-600 text-slate-300">
                          Back to Shipping
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-slate-900 font-semibold">
                          Place Order
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">Order Confirmed!</h2>
                  <p className="text-slate-300 mb-4">Thank you for your order. Your survival gear is on its way!</p>
                  <div className="bg-slate-700 p-4 rounded-md mb-6">
                    <p className="text-sm text-slate-400 mb-1">Order Number</p>
                    <p className="text-lg font-bold text-orange-400">{orderNumber}</p>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">
                    You'll receive a confirmation email shortly with tracking information.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/products">
                      <Button variant="outline" className="border-slate-600 text-slate-300">
                        Continue Shopping
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-slate-900">Back to Home</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-slate-100">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-100 line-clamp-2">{item.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-slate-100">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700 pt-4 space-y-2">
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
                    className="flex justify-between font-semibold text-slate-100 text-lg border-t border-slate-700 pt-2">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {state.total < 75 && currentStep < 3 && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-md p-3">
                    <p className="text-xs text-orange-400 text-center">
                      Add ${(75 - state.total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
