"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Grid3X3, List, X, Calendar, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Mock vendor data (same as vendor detail page)
const vendors = [
  {
    id: 1,
    name: "Elite Photography Studios",
    specialty: "Real Estate Photography",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    phone: "(555) 123-4567",
    email: "contact@elitephoto.com",
    image: "/professional-real-estate-photography-portfolio.png",
    avatar: "/placeholder.svg?height=60&width=60",
    priceRange: "$150-500",
    responseTime: "1 hour",
    completedProjects: 340,
    isOnline: true,
    portfolio: [
      {
        id: 1,
        title: "Luxury Manhattan Penthouse",
        description:
          "Complete real estate photography package for a $15M penthouse featuring panoramic city views, modern architecture, and luxury finishes.",
        image: "/luxury-home-exterior.png",
        date: "March 2024",
        cost: "$450-650",
        duration: "2-3 days",
        category: "Luxury Residential",
        services: ["Interior Photography", "Exterior Photography", "Twilight Shots", "Drone Photography"],
        clientTestimonial: "Absolutely stunning work! The photos helped us sell the property 20% above asking price.",
        additionalImages: ["/modern-kitchen.png", "/master-bedroom-staging.png"],
      },
      {
        id: 2,
        title: "Modern Family Home",
        description:
          "Comprehensive photography session for a contemporary 4-bedroom family home with open floor plan and designer finishes.",
        image: "/modern-kitchen.png",
        date: "February 2024",
        cost: "$300-450",
        duration: "1-2 days",
        category: "Residential",
        services: ["Interior Photography", "Exterior Photography", "Virtual Staging"],
        clientTestimonial: "Professional service and amazing results. Highly recommend!",
        additionalImages: ["/luxury-home-exterior.png", "/master-bedroom-staging.png"],
      },
      {
        id: 3,
        title: "Commercial Office Space",
        description:
          "Professional photography for a 10,000 sq ft commercial office space featuring modern design and collaborative workspaces.",
        image: "/interior-real-estate-photography.png",
        date: "January 2024",
        cost: "$500-750",
        duration: "1 day",
        category: "Commercial",
        services: ["Interior Photography", "Architectural Photography", "Detail Shots"],
        clientTestimonial: "Captured our space perfectly. The photos showcase our modern work environment beautifully.",
        additionalImages: ["/modern-kitchen.png", "/luxury-home-exterior.png"],
      },
      {
        id: 4,
        title: "Historic Brownstone Renovation",
        description:
          "Before and after photography documenting a complete renovation of a 19th-century Brooklyn brownstone.",
        image: "/master-bedroom-staging.png",
        date: "December 2023",
        cost: "$400-600",
        duration: "2 days",
        category: "Historic Renovation",
        services: ["Before/After Photography", "Progress Documentation", "Final Showcase"],
        clientTestimonial: "Documented our renovation journey perfectly. Great attention to detail!",
        additionalImages: ["/interior-real-estate-photography.png", "/modern-kitchen.png"],
      },
      {
        id: 5,
        title: "Luxury Condo Development",
        description:
          "Marketing photography for a new luxury condominium development featuring 50 units with premium amenities.",
        image: "/3d-virtual-tour-real-estate.png",
        date: "November 2023",
        cost: "$800-1200",
        duration: "3-5 days",
        category: "Development Marketing",
        services: ["Unit Photography", "Amenity Photography", "Lifestyle Shots", "Virtual Tours"],
        clientTestimonial: "Outstanding work that helped us achieve 90% pre-sales before completion.",
        additionalImages: ["/luxury-home-exterior.png", "/modern-kitchen.png"],
      },
      {
        id: 6,
        title: "Boutique Hotel Photography",
        description:
          "Complete hospitality photography package for a 25-room boutique hotel including rooms, common areas, and dining spaces.",
        image: "/professional-real-estate-photography-portfolio.png",
        date: "October 2023",
        cost: "$1000-1500",
        duration: "4-6 days",
        category: "Hospitality",
        services: ["Room Photography", "Common Area Photography", "Restaurant Photography", "Exterior Photography"],
        clientTestimonial: "Exceptional quality that perfectly represents our brand and atmosphere.",
        additionalImages: ["/interior-real-estate-photography.png", "/master-bedroom-staging.png"],
      },
      {
        id: 7,
        title: "Retail Space Documentation",
        description:
          "Professional photography for a high-end retail flagship store featuring custom fixtures and luxury brand displays.",
        image: "/drone-aerial-real-estate-video.png",
        date: "September 2023",
        cost: "$600-900",
        duration: "2-3 days",
        category: "Retail",
        services: ["Interior Photography", "Product Display Photography", "Architectural Details"],
        clientTestimonial:
          "Captured the essence of our brand perfectly. Photos are being used across all marketing materials.",
        additionalImages: ["/luxury-home-exterior.png", "/modern-kitchen.png"],
      },
      {
        id: 8,
        title: "Waterfront Estate",
        description:
          "Luxury estate photography featuring waterfront views, infinity pool, and custom outdoor entertainment areas.",
        image: "/real-estate-video-walkthrough.png",
        date: "August 2023",
        cost: "$700-1000",
        duration: "2-4 days",
        category: "Luxury Waterfront",
        services: ["Aerial Photography", "Twilight Photography", "Pool Photography", "Landscape Photography"],
        clientTestimonial: "Stunning aerial shots and perfect timing for golden hour photography.",
        additionalImages: ["/3d-virtual-tour-real-estate.png", "/interior-real-estate-photography.png"],
      },
      {
        id: 9,
        title: "Corporate Headquarters",
        description:
          "Architectural photography for a new corporate headquarters featuring sustainable design and innovative workspace solutions.",
        image: "/3d-home-tour-technology.png",
        date: "July 2023",
        cost: "$900-1300",
        duration: "3-5 days",
        category: "Corporate Architecture",
        services: ["Architectural Photography", "Interior Design Photography", "Sustainability Features"],
        clientTestimonial: "Professional documentation of our new headquarters that showcases our company values.",
        additionalImages: ["/professional-real-estate-photography-portfolio.png", "/modern-kitchen.png"],
      },
      {
        id: 10,
        title: "Vacation Rental Portfolio",
        description:
          "Photography package for a portfolio of 12 vacation rental properties across the Hamptons featuring coastal luxury.",
        image: "/luxury-home-exterior.png",
        date: "June 2023",
        cost: "$1200-1800",
        duration: "5-7 days",
        category: "Vacation Rental",
        services: [
          "Multiple Property Photography",
          "Lifestyle Photography",
          "Amenity Photography",
          "Drone Photography",
        ],
        clientTestimonial: "Comprehensive coverage that increased our booking rates by 40%.",
        additionalImages: ["/master-bedroom-staging.png", "/real-estate-video-walkthrough.png"],
      },
    ],
  },
]

export default function VendorPortfolioPage({ params }: { params: { id: string } }) {
  const vendorId = Number.parseInt(params.id)
  const vendor = vendors.find((v) => v.id === vendorId)

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!vendor) {
    notFound()
  }

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(vendor.portfolio.map((item) => item.category)))]

  // Filter and sort portfolio
  const filteredPortfolio = vendor.portfolio
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "price-high":
          return Number.parseInt(b.cost.split("-")[1]) - Number.parseInt(a.cost.split("-")[1])
        case "price-low":
          return Number.parseInt(a.cost.split("-")[0]) - Number.parseInt(b.cost.split("-")[0])
        default:
          return 0
      }
    })

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[rgba(39,63,79,1)] text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/vendors/${vendor.id}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <img
              src={vendor.avatar || "/placeholder.svg"}
              alt={vendor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{vendor.name} Portfolio</h1>
              <p className="text-white/80">
                {vendor.portfolio.length} Projects • {vendor.specialty}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredPortfolio.length} of {vendor.portfolio.length} projects
          </div>
        </div>
      </div>

      {/* Portfolio Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredPortfolio.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No projects found matching your criteria</div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {filteredPortfolio.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-lg transition-shadow shadow-none cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className={viewMode === "grid" ? "" : "grid md:grid-cols-2 gap-0"}>
                  {/* Image */}
                  <div
                    className={`relative ${viewMode === "grid" ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-square"} bg-muted overflow-hidden group`}
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className={`p-6 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg text-[rgba(39,63,79,1)] line-clamp-2">{project.title}</h3>
                        <div className="text-right flex-shrink-0"></div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

                      {/* Services */}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Portfolio Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[rgba(39,63,79,1)]">{selectedProject.title}</h2>
              <Button variant="ghost" size="sm" onClick={closeProjectModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Main Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Details Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-[rgba(39,63,79,1)]" />
                  <div>
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="font-medium">{selectedProject.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-4 w-4 text-[rgba(243,117,33,1)]" />
                  <div>
                    <div className="text-xs text-muted-foreground">Cost</div>
                    <div className="font-medium">{selectedProject.cost}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-[rgba(3,128,156,1)]" />
                  <div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                    <div className="font-medium">{selectedProject.duration}</div>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div>
                <Badge variant="secondary" className="bg-[rgba(39,63,79,1)] text-white">
                  {selectedProject.category}
                </Badge>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Services Included */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Services Included</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.services.map((service: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-[rgba(243,117,33,1)] text-[rgba(243,117,33,1)]"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Additional Images */}
              {selectedProject.additionalImages && selectedProject.additionalImages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Additional Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.additionalImages.map((image: string, index: number) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${selectedProject.title} - Additional ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1 bg-[rgba(243,117,33,1)] hover:bg-[rgba(243,117,33,0.9)]">
                  Contact for Similar Project
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Vendor Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[rgba(39,63,79,1)] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[rgba(243,117,33,1)] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="font-bold text-xl">Chief Media</span>
              </div>
              <p className="text-white/70 text-sm">
                Professional real estate media services for agents, brokers, and property developers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/studios" className="hover:text-white transition-colors">
                    Studio Booking
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="hover:text-white transition-colors">
                    Find Vendors
                  </Link>
                </li>
                <li>
                  <Link href="/become-vendor" className="hover:text-white transition-colors">
                    Become Vendor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resource</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/70">
            <p>&copy; 2024 Chief Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
