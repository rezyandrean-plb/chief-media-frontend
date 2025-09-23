"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, CreditCard, Bell, Shield, Camera, Save, Eye, EyeOff, Trash2 } from "lucide-react"

export default function ProfileSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentCards, setPaymentCards] = useState([
    {
      id: 1,
      type: "VISA",
      last4: "4242",
      expiry: "12/25",
      isPrimary: true,
    },
  ])
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: value }))
  }

  const handleDeleteCard = (cardId: number) => {
    setPaymentCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  const handleAddPaymentCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const cardNumber = formData.get("cardNumber") as string
    const cardName = formData.get("cardName") as string
    const expiry = formData.get("expiry") as string

    if (cardNumber && cardName && expiry) {
      const newCard = {
        id: Date.now(), // Simple ID generation
        type: cardNumber.startsWith("4") ? "VISA" : cardNumber.startsWith("5") ? "MASTERCARD" : "CARD",
        last4: cardNumber.slice(-4),
        expiry: expiry,
        isPrimary: paymentCards.length === 0, // First card becomes primary
      }

      setPaymentCards((prev) => [...prev, newCard])
      setShowPaymentModal(false)

      // Reset form
      event.currentTarget.reset()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#273F4F] text-white py-12">
        <div className="w-full px-[7vw]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold mb-2 text-3xl">Profile Settings</h1>
              <p className="text-base text-background">
                Manage your personal information, payment details, and preferences
              </p>
            </div>
            <div className="flex gap-3"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-[7vw] py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm">
            <TabsTrigger value="personal" className="flex items-center gap-2 rounded-sm shadow-none border-0">
              <User className="h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 rounded-sm shadow-none border-0">
              <CreditCard className="h-4 w-4" />
              Payment Details
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-sm shadow-none border-0">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 rounded-sm shadow-none border-0">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="rounded-md shadow-none border-0">
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent shadow-none rounded-sm border border-gray-300"
                    >
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="firstName">
                        First Name
                      </Label>
                      <Input
                        className="border border-gray-300 shadow-none rounded-sm"
                        id="firstName"
                        defaultValue="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="lastName">
                        Last Name
                      </Label>
                      <Input
                        className="border border-gray-300 shadow-none rounded-sm"
                        id="lastName"
                        defaultValue="Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="email">
                        Email Address
                      </Label>
                      <Input
                        className="shadow-none border border-gray-300 rounded-sm"
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="phone">
                        Phone Number
                      </Label>
                      <Input
                        className="border-gray-300 shadow-none border rounded-sm"
                        id="phone"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4 mt-11">
                  <h3 className="text-lg font-semibold text-primary">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="company">
                        Company/Business Name
                      </Label>
                      <Input
                        className="shadow-none rounded-sm border border-gray-300"
                        id="company"
                        defaultValue="Doe Photography Studio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="title">
                        Professional Title
                      </Label>
                      <Input
                        className="shadow-none border border-gray-300 rounded-sm"
                        id="title"
                        defaultValue="Real Estate Photographer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="experience">
                        Years of Experience
                      </Label>
                      <Select defaultValue="5-10">
                        <SelectTrigger className="rounded-sm shadow-none border border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="location">
                        Service Area
                      </Label>
                      <Input
                        className="shadow-none rounded-sm border border-gray-300"
                        id="location"
                        defaultValue="Los Angeles, CA"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-950" htmlFor="bio">
                      Professional Bio
                    </Label>
                    <Textarea
                      className="rounded-sm shadow-none border border-gray-300"
                      id="bio"
                      rows={4}
                      defaultValue="Professional real estate photographer with over 8 years of experience capturing stunning property images that help sell homes faster."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#273F4F] hover:bg-[#273F4F]/90 rounded-sm bg-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Details Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card className="rounded-md shadow-none border-0">
              <CardHeader>
                <CardTitle className="text-slate-950">Payment Methods</CardTitle>
                <CardDescription className="text-slate-950">
                  Manage your payment methods for receiving payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Payment Methods */}
                <div className="space-y-4">
                  {paymentCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-4 border rounded-sm border-gray-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          {card.type}
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• {card.last4}</p>
                          <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {card.isPrimary && (
                          <Badge className="rounded-sm" variant="secondary">
                            Primary
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-transparent border border-gray-300 rounded-sm shadow-none w-3/12"
                    >
                      + Add New Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-slate-950">Add New Payment Method</DialogTitle>
                      <DialogDescription>Enter your card details to add a new payment method.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPaymentCard} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label className="text-slate-950" htmlFor="cardNumber">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="border border-gray-300 rounded-sm shadow-none"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-950" htmlFor="cardName">
                          Cardholder Name
                        </Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          className="border border-gray-300 rounded-sm shadow-none"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-950" htmlFor="expiry">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            className="border border-gray-300 rounded-sm shadow-none"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-950" htmlFor="cvv">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            className="border border-gray-300 rounded-sm shadow-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowPaymentModal(false)}
                          className="rounded-sm"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#273F4F] hover:bg-[#273F4F]/90 rounded-sm text-background bg-primary"
                        >
                          Add Payment Method
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Bank Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="bankName">
                        Bank Name
                      </Label>
                      <Input
                        className="border border-gray-300 rounded-sm shadow-none"
                        id="bankName"
                        defaultValue="Chase Bank"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="accountType">
                        Account Type
                      </Label>
                      <Select defaultValue="checking">
                        <SelectTrigger className="shadow-none rounded-sm border border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="routing">
                        Routing Number
                      </Label>
                      <Input
                        className="border border-gray-300 rounded-sm shadow-none"
                        id="routing"
                        defaultValue="•••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="account">
                        Account Number
                      </Label>
                      <Input
                        className="rounded-sm shadow-none border border-gray-300"
                        id="account"
                        defaultValue="••••••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Tax Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Tax Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="taxId">
                        Tax ID / SSN
                      </Label>
                      <Input
                        className="rounded-sm shadow-none border border-gray-300"
                        id="taxId"
                        defaultValue="•••-••-••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select defaultValue="sole-proprietor">
                        <SelectTrigger className="rounded-sm shadow-none border border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#273F4F] hover:bg-[#273F4F]/90 bg-primary rounded-sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Payment Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="rounded-md shadow-none border-0">
              <CardHeader>
                <CardTitle className="text-slate-950">Notification Preferences</CardTitle>
                <CardDescription className="text-slate-950">
                  Manage how and when you receive notifications about your projects and account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">New Project Inquiries</p>
                        <p className="text-sm text-gray-500">Get notified when clients request your services</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange("email", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Payment Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about payments and earnings</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Project Updates</p>
                        <p className="text-sm text-gray-500">Get notified about project status changes</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Marketing Communications</p>
                        <p className="text-sm text-gray-500">Receive tips, updates, and promotional content</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        checked={notifications.marketing}
                        onCheckedChange={(value) => handleNotificationChange("marketing", value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Instant Messages</p>
                        <p className="text-sm text-gray-500">Get notified immediately for new messages</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        checked={notifications.push}
                        onCheckedChange={(value) => handleNotificationChange("push", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Urgent Updates</p>
                        <p className="text-sm text-gray-500">Important notifications about your account</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* SMS Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Booking Confirmations</p>
                        <p className="text-sm text-gray-500">SMS confirmation for new bookings</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        checked={notifications.sms}
                        onCheckedChange={(value) => handleNotificationChange("sms", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Payment Alerts</p>
                        <p className="text-sm text-gray-500">SMS alerts for payment received</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#273F4F] hover:bg-[#273F4F]/90 rounded-sm bg-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="rounded-md shadow-none border-0">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-950" htmlFor="currentPassword">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          className="rounded-sm shadow-none border border-gray-300"
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        className="rounded-sm shadow-none border border-gray-300"
                        id="newPassword"
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        className="shadow-none rounded-sm border border-gray-300"
                        id="confirmPassword"
                        type="password"
                      />
                    </div>
                  </div>
                  <Button className="text-background bg-primary border-0 rounded-sm" variant="outline">
                    Update Password
                  </Button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-950">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border" />
                  </div>
                </div>

                <Separator />

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-950 text-base font-medium">Profile Visibility</p>
                        <p className="text-sm text-gray-500">Make your profile visible to potential clients</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Show Contact Information</p>
                        <p className="text-sm text-gray-500">Display your contact details on your profile</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-950">Allow Direct Messages</p>
                        <p className="text-sm text-gray-500">Let clients message you directly</p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 border"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Account Actions</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="justify-start rounded-sm shadow-none border-gray-300 bg-foreground text-background border-0"
                    >
                      Download Account Data
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start hover:text-red-700 bg-red-600 text-background border-0 rounded-sm"
                    >
                      Deactivate Account
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#273F4F] hover:bg-[#273F4F]/90 rounded-sm bg-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-[#273F4F] text-white py-16">
        <div className="w-full px-[7vw]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Chief Media</h3>
              <p className="text-gray-300">
                Connecting real estate professionals with top-tier media services for stunning property presentations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/studios" className="hover:text-white transition-colors">
                    Studio Booking
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Find Vendors
                  </a>
                </li>
                <li>
                  <a href="/become-vendor" className="hover:text-white transition-colors">
                    Become a Vendor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resource</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300">
            <p>© 2024 Chief Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
