"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, ArrowLeft, Clock, Users, Search, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Mock gigs data for the vendor
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
    description: "High-quality real estate photography with professional lighting and editing.",
    deliveryTime: "2-3 days",
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
  },
  {
    id: 3,
    title: "3D Virtual Home Tours",
    category: "Virtual Tours",
    price: "$300-600",
    rating: 4.9,
    reviews: 156,
    orders: 112,
    status: "active",
    image: "/3d-virtual-tour-real-estate.png",
    description: "Immersive 3D virtual tours that showcase properties in stunning detail.",
    deliveryTime: "5-7 days",
  },
  {
    id: 4,
    title: "Interior Design Photography",
    category: "Photography",
    price: "$100-250",
    rating: 4.7,
    reviews: 83,
    orders: 45,
    status: "paused",
    image: "/interior-real-estate-photography.png",
    description: "Professional interior photography highlighting design elements.",
    deliveryTime: "1-2 days",
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

export default function VendorGigsPage({ params }: { params: { id: string } }) {
  const vendorId = Number.parseInt(params.id)
  const vendor = vendors.find((v) => v.id === vendorId)

  if (!vendor) {
    notFound()
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredGigs = mockGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || gig.status === statusFilter
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link
                href={`/vendors/${vendor.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {vendor.name}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Vendor Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
              <AvatarFallback>
                {vendor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-[#273F4F]">{vendor.name} - Gigs</h1>
              <p className="text-lg text-muted-foreground">{vendor.specialty}</p>
              <div className="flex items-center gap-4 text-sm mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{vendor.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search gigs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Videography">Videography</SelectItem>
                  <SelectItem value="Virtual Tours">Virtual Tours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <Card key={gig.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img src={gig.image || "/placeholder.svg"} alt={gig.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant={gig.status === "active" ? "default" : "secondary"}
                    className={gig.status === "active" ? "bg-green-500" : ""}
                  >
                    {gig.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{gig.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{gig.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{gig.category}</Badge>
                    <span className="font-medium text-[#F37521]">{gig.price}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{gig.rating}</span>
                      <span className="text-muted-foreground">({gig.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{gig.orders} orders</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{gig.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <Link href={`/vendors/${vendor.id}/gigs/${gig.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#F37521] hover:bg-[#E06A1E]" asChild>
                      <Link href={`/vendors/${vendor.id}/gigs/${gig.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No gigs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
