"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, ArrowLeft, Clock, Users, Edit, Package } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock gigs data
const mockGigs = [
  {
    id: 1,
    title: "Professional Real Estate Photography",
    category: "Photography",
    price: "$150-300",
    rating: 4.9,
    reviews: 127,
    orders: 89,
    status: "active",
    image: "/professional-real-estate-photography-portfolio.png",
    description:
      "High-quality real estate photography with professional lighting and editing. Perfect for showcasing properties in their best light.",
    deliveryTime: "2-3 days",
    features: ["Professional lighting", "HDR processing", "Virtual staging available", "Same-day turnaround option"],
    packages: [
      { name: "Basic", price: "$150", deliveryTime: "2-3 days", revisions: 2, photos: "Up to 20 photos" },
      { name: "Standard", price: "$225", deliveryTime: "2-3 days", revisions: 3, photos: "Up to 35 photos" },
      { name: "Premium", price: "$300", deliveryTime: "1-2 days", revisions: "Unlimited", photos: "Up to 50 photos" },
    ],
  },
  {
    id: 2,
    title: "Drone Aerial Photography & Video",
    category: "Videography",
    price: "$200-500",
    rating: 4.8,
    reviews: 94,
    orders: 67,
    status: "active",
    image: "/drone-aerial-real-estate-video.png",
    description: "Stunning aerial shots and videos using professional drone equipment.",
    deliveryTime: "3-5 days",
    features: ["4K video recording", "Professional drone pilot", "Weather contingency", "Multiple angles"],
    packages: [
      { name: "Basic", price: "$200", deliveryTime: "3-5 days", revisions: 2, photos: "10 aerial photos" },
      { name: "Standard", price: "$350", deliveryTime: "3-5 days", revisions: 3, photos: "20 photos + 2min video" },
      {
        name: "Premium",
        price: "$500",
        deliveryTime: "2-3 days",
        revisions: "Unlimited",
        photos: "30 photos + 5min video",
      },
    ],
  },
]

// Mock vendor data
const vendors = [
  {
    id: 1,
    name: "Elite Photography Studios",
    specialty: "Real Estate Photography & Videography",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 127,
    image: "/professional-real-estate-photography-portfolio.png",
  },
  {
    id: 2,
    name: "SkyView Drone Services",
    specialty: "Aerial Photography & Virtual Tours",
    location: "Miami, FL",
    rating: 4.8,
    reviews: 94,
    image: "/drone-aerial-real-estate-video.png",
  },
]

export default function GigDetailPage({ params }: { params: { id: string; gigId: string } }) {
  const vendorId = Number.parseInt(params.id)
  const gigId = Number.parseInt(params.gigId)

  const vendor = vendors.find((v) => v.id === vendorId)
  const gig = mockGigs.find((g) => g.id === gigId)

  if (!vendor || !gig) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link
                href={`/vendors/${vendor.id}/gigs`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Gigs
              </Link>
            </Button>
            <Button className="bg-[#F37521] hover:bg-[#E06A1E]" asChild>
              <Link href={`/vendors/${vendor.id}/gigs/${gig.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Gig
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Gig Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="aspect-video w-96 rounded-lg overflow-hidden">
              <img src={gig.image || "/placeholder.svg"} alt={gig.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{gig.category}</Badge>
                <Badge
                  variant={gig.status === "active" ? "default" : "secondary"}
                  className={gig.status === "active" ? "bg-green-500" : ""}
                >
                  {gig.status}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-[#273F4F] mb-3">{gig.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{gig.description}</p>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{gig.rating}</span>
                  <span className="text-muted-foreground">({gig.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{gig.orders} orders</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{gig.deliveryTime}</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-[#F37521]">{gig.price}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#273F4F]">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {gig.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F37521] rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#273F4F]">Pricing Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gig.packages.map((pkg, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:border-[#F37521] transition-colors">
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <div className="text-2xl font-bold text-[#F37521] mt-2">{pkg.price}</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{pkg.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-3 w-3 text-muted-foreground" />
                          <span>{pkg.photos}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Edit className="h-3 w-3 text-muted-foreground" />
                          <span>{pkg.revisions} revisions</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vendor Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#273F4F]">About the Vendor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
                    <AvatarFallback>
                      {vendor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground">{vendor.specialty}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>
                      {vendor.rating} ({vendor.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{vendor.location}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-[#F37521] hover:bg-[#E06A1E]" asChild>
                  <Link href={`/vendors/${vendor.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
