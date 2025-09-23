"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
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
    description: "High-quality real estate photography with professional lighting and editing.",
  },
  {
    id: 2,
    title: "Drone Aerial Photography & Video",
    category: "Videography",
    price: "$200-500",
    status: "active",
    description: "Stunning aerial shots and videos using professional drone equipment.",
  },
]

// Mock vendor data
const vendors = [
  {
    id: 1,
    name: "Elite Photography Studios",
    specialty: "Real Estate Photography & Videography",
  },
  {
    id: 2,
    name: "SkyView Drone Services",
    specialty: "Aerial Photography & Virtual Tours",
  },
]

export default function EditGigsPage({ params }: { params: { id: string } }) {
  const vendorId = Number.parseInt(params.id)
  const vendor = vendors.find((v) => v.id === vendorId)

  if (!vendor) {
    notFound()
  }

  const [gigs, setGigs] = useState(mockGigs)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link
                href={`/vendors/${vendorId}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {vendor.name}
              </Link>
            </Button>
            <Button className="bg-[#F37521] hover:bg-[#E06A1E]" asChild>
              <Link href={`/vendors/${vendorId}/gigs/new`}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Gig
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#273F4F] mb-2">Edit Gigs</h1>
          <p className="text-muted-foreground">Manage all your service offerings</p>
        </div>

        <div className="space-y-6">
          {gigs.map((gig) => (
            <Card key={gig.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{gig.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          gig.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {gig.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{gig.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-[#F37521]">{gig.price}</span>
                      <span className="text-muted-foreground">{gig.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/vendors/${vendorId}/gigs/${gig.id}`}>View</Link>
                    </Button>
                    <Button size="sm" className="bg-[#F37521] hover:bg-[#E06A1E]" asChild>
                      <Link href={`/vendors/${vendorId}/gigs/${gig.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {gigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No gigs found.</p>
            <Button className="bg-[#F37521] hover:bg-[#E06A1E]" asChild>
              <Link href={`/vendors/${vendorId}/gigs/new`}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Gig
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
