"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Mock gigs data
const mockGigs = [
  {
    id: 1,
    title: "Professional Real Estate Photography",
    category: "Photography",
    price: "$150-300",
    status: "active",
    description:
      "High-quality real estate photography with professional lighting and editing. Perfect for showcasing properties in their best light.",
    deliveryTime: "2-3 days",
  },
  {
    id: 2,
    title: "Drone Aerial Photography & Video",
    category: "Videography",
    price: "$200-500",
    status: "active",
    description: "Stunning aerial shots and videos using professional drone equipment.",
    deliveryTime: "3-5 days",
  },
]

export default function EditGigPage({ params }: { params: { id: string; gigId: string } }) {
  const vendorId = Number.parseInt(params.id)
  const gigId = Number.parseInt(params.gigId)

  const gig = mockGigs.find((g) => g.id === gigId)

  if (!gig) {
    notFound()
  }

  const [formData, setFormData] = useState({
    title: gig.title,
    category: gig.category,
    description: gig.description,
    price: gig.price,
    deliveryTime: gig.deliveryTime,
    status: gig.status,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("[v0] Updating gig:", formData)
    // Redirect back to gig view
    window.location.href = `/vendors/${vendorId}/gigs/${gigId}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link
                href={`/vendors/${vendorId}/gigs/${gigId}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Gig
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#273F4F] mb-2">Edit Gig</h1>
          <p className="text-muted-foreground">Update your gig details and settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#273F4F]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Gig Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter gig title"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Videography">Videography</SelectItem>
                    <SelectItem value="Virtual Tours">Virtual Tours</SelectItem>
                    <SelectItem value="Drone Services">Drone Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your gig"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#273F4F]">Pricing & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Price Range</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., $150-300"
                />
              </div>

              <div>
                <Label htmlFor="deliveryTime">Delivery Time</Label>
                <Select
                  value={formData.deliveryTime}
                  onValueChange={(value) => setFormData({ ...formData, deliveryTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="2-3 days">2-3 days</SelectItem>
                    <SelectItem value="3-5 days">3-5 days</SelectItem>
                    <SelectItem value="5-7 days">5-7 days</SelectItem>
                    <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="bg-[#F37521] hover:bg-[#E06A1E]">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href={`/vendors/${vendorId}/gigs/${gigId}`}>Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
