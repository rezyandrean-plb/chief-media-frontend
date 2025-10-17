"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Search,
  Edit,
  Eye,
  Star,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Briefcase,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Gig {
  id: string
  title: string
  category: string
  description: string
  price: string
  status: "active" | "paused" | "completed"
  orders: number
  rating: number
  reviews: number
  createdDate: string
  lastOrder?: string
  image: string
}

export default function MyGigsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [gigs, setGigs] = useState<Gig[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const [isCreateGigOpen, setIsCreateGigOpen] = useState(false)
  const [isEditGigOpen, setIsEditGigOpen] = useState(false)
  const [editingGig, setEditingGig] = useState<Gig | null>(null)
  const [newGig, setNewGig] = useState({
    title: "",
    category: "",
    description: "",
    priceMin: "",
    priceMax: "",
    image: "",
    status: "active" as "active" | "paused" | "completed",
  })

  useEffect(() => {
    console.log("[v0] MY GIGS PAGE LOADED - Gig Management Interface")

    const savedGigs = localStorage.getItem("vendorGigs")
    if (savedGigs) {
      setGigs(JSON.parse(savedGigs))
    } else {
      const defaultGigs: Gig[] = [
        {
          id: "1",
          title: "Professional Real Estate Photography",
          category: "Photography",
          description: "High-quality interior and exterior photography for real estate listings",
          price: "$150-$300",
          status: "active",
          orders: 24,
          rating: 4.9,
          reviews: 18,
          createdDate: "2024-01-15",
          lastOrder: "2024-03-10",
          image: "/professional-real-estate-photography-portfolio.png",
        },
        {
          id: "2",
          title: "Drone Aerial Photography & Video",
          category: "Videography",
          description: "Stunning aerial shots and videos for properties and events",
          price: "$200-$500",
          status: "active",
          orders: 15,
          rating: 5.0,
          reviews: 12,
          createdDate: "2024-02-01",
          lastOrder: "2024-03-08",
          image: "/drone-aerial-real-estate-video.png",
        },
        {
          id: "3",
          title: "3D Virtual Tours",
          category: "Virtual Tours",
          description: "Interactive 3D virtual tours for real estate properties",
          price: "$300-$600",
          status: "active",
          orders: 8,
          rating: 4.8,
          reviews: 6,
          createdDate: "2024-02-15",
          lastOrder: "2024-03-05",
          image: "/3d-virtual-tour-real-estate.png",
        },
        {
          id: "4",
          title: "Event Photography Package",
          category: "Photography",
          description: "Complete event photography coverage with editing",
          price: "$400-$800",
          status: "completed",
          orders: 12,
          rating: 4.7,
          reviews: 10,
          createdDate: "2023-11-01",
          lastOrder: "2024-01-20",
          image: "/interior-real-estate-photography.png",
        },
        {
          id: "5",
          title: "Corporate Video Production",
          category: "Videography",
          description: "Professional corporate videos and promotional content",
          price: "$500-$1200",
          status: "paused",
          orders: 6,
          rating: 4.6,
          reviews: 5,
          createdDate: "2023-12-01",
          lastOrder: "2024-02-15",
          image: "/real-estate-video-walkthrough.png",
        },
        {
          id: "6",
          title: "Social Media Content Creation",
          category: "Social Media",
          description: "Custom social media posts, stories, and promotional content for real estate",
          price: "$75-$200",
          status: "active",
          orders: 32,
          rating: 4.8,
          reviews: 25,
          createdDate: "2024-01-20",
          lastOrder: "2024-03-12",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "7",
          title: "Website Design & Development",
          category: "Web Design",
          description: "Modern, responsive websites for real estate professionals and agencies",
          price: "$800-$2500",
          status: "active",
          orders: 4,
          rating: 5.0,
          reviews: 4,
          createdDate: "2024-02-10",
          lastOrder: "2024-03-01",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "8",
          title: "Property Brochure Design",
          category: "Graphic Design",
          description: "Professional print and digital brochures for luxury properties",
          price: "$100-$250",
          status: "active",
          orders: 18,
          rating: 4.7,
          reviews: 14,
          createdDate: "2024-01-05",
          lastOrder: "2024-03-09",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "9",
          title: "Virtual Staging Services",
          category: "Virtual Tours",
          description: "Digital furniture and decor placement for empty properties",
          price: "$50-$150",
          status: "paused",
          orders: 22,
          rating: 4.5,
          reviews: 18,
          createdDate: "2023-10-15",
          lastOrder: "2024-01-30",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "10",
          title: "Real Estate Blog Writing",
          category: "Content Writing",
          description: "SEO-optimized blog posts and property descriptions",
          price: "$25-$100",
          status: "active",
          orders: 45,
          rating: 4.9,
          reviews: 38,
          createdDate: "2023-12-20",
          lastOrder: "2024-03-11",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "11",
          title: "Mobile App Development",
          category: "App Development",
          description: "Custom mobile apps for real estate agencies and property management",
          price: "$2000-$8000",
          status: "completed",
          orders: 2,
          rating: 5.0,
          reviews: 2,
          createdDate: "2023-08-01",
          lastOrder: "2023-12-15",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "12",
          title: "Twilight Photography Sessions",
          category: "Photography",
          description: "Dramatic twilight exterior photography for luxury properties",
          price: "$200-$400",
          status: "active",
          orders: 11,
          rating: 4.8,
          reviews: 9,
          createdDate: "2024-02-05",
          lastOrder: "2024-03-07",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "13",
          title: "Property Video Tours",
          category: "Videography",
          description: "Cinematic walkthrough videos with professional narration",
          price: "$300-$700",
          status: "paused",
          orders: 9,
          rating: 4.6,
          reviews: 7,
          createdDate: "2023-11-10",
          lastOrder: "2024-02-20",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "14",
          title: "Drone Mapping Services",
          category: "Drone Services",
          description: "Detailed aerial mapping and surveying for large properties",
          price: "$400-$1000",
          status: "completed",
          orders: 5,
          rating: 4.9,
          reviews: 5,
          createdDate: "2023-09-15",
          lastOrder: "2024-01-10",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "15",
          title: "Audio Production for Property Videos",
          category: "Videography",
          description: "Professional audio editing and background music for property videos",
          price: "$50-$200",
          status: "active",
          orders: 16,
          rating: 4.7,
          reviews: 12,
          createdDate: "2024-01-25",
          lastOrder: "2024-03-06",
          image: "/placeholder.svg?height=200&width=300",
        },
      ]
      setGigs(defaultGigs)
      localStorage.setItem("vendorGigs", JSON.stringify(defaultGigs))
    }
  }, [])

  const filteredGigs = gigs.filter(
    (gig) =>
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFilteredGigsByStatus = () => {
    switch (filterStatus) {
      case "active":
        return filteredGigs.filter((gig) => gig.status === "active")
      case "past":
        return filteredGigs.filter((gig) => gig.status === "completed" || gig.status === "paused")
      case "paused":
        return filteredGigs.filter((gig) => gig.status === "paused")
      case "completed":
        return filteredGigs.filter((gig) => gig.status === "completed")
      case "all":
        return filteredGigs
      default:
        return filteredGigs
    }
  }

  const displayedGigs = getFilteredGigsByStatus()
  const activeGigs = filteredGigs.filter((gig) => gig.status === "active")
  const pastGigs = filteredGigs.filter((gig) => gig.status === "completed" || gig.status === "paused")

  const totalPages = Math.ceil(displayedGigs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedGigs = displayedGigs.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterStatus, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-white"
      case "paused":
        return "bg-amber-500 text-white"
      case "completed":
        return "bg-green-600 text-white"
      default:
        return "bg-muted text-[#273F4F]"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "paused":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const GigCard = ({ gig }: { gig: Gig }) => (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-[#F2A16D] bg-white h-full overflow-hidden shadow-none border">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative w-full h-40 bg-[#FCEBDC] bg-white">
          <img
            src={gig.image || "/placeholder.svg"}
            alt={gig.title}
            className="w-full h-full object-cover mt-[-25px]"
          />
          <div className="absolute top-3 right-3">
            <Badge className={`${getStatusColor(gig.status)} flex items-center gap-1 shadow-lg mt-[-25px]`}>
              {getStatusIcon(gig.status)}
              {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 py-0">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-[#273F4F] line-clamp-2 mb-2 leading-tight">{gig.title}</h3>
            <p className="text-sm text-[#273F4F]/70 line-clamp-3 leading-relaxed">{gig.description}</p>
          </div>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center justify-between p-3 bg-[#FCEBDC] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#F37521] rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#273F4F]/60 font-medium">Price Range</p>
                  <p className="font-bold text-[#273F4F]">{gig.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#03809C] rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#273F4F]/60 font-medium">Orders</p>
                  <p className="font-bold text-[#273F4F]">{gig.orders}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FCEBDC] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#F2A16D] rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
                <div>
                  <p className="text-xs text-[#273F4F]/60 font-medium">Rating</p>
                  <p className="font-bold text-[#273F4F]">
                    {gig.rating} ({gig.reviews})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#273F4F] rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#273F4F]/60 font-medium">Created</p>
                  <p className="font-bold text-[#273F4F] text-xs">{new Date(gig.createdDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Button
              size="sm"
              onClick={() => handleViewGig(gig)}
              className="flex-1 bg-[#03809C] hover:bg-[#026B85] border-0 font-medium py-2.5 bg-white text-[rgba(3,128,156,1)] border border-[rgba(3,128,156,1)]"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              size="sm"
              onClick={() => handleEditGig(gig)}
              className="flex-1 bg-[#F37521] hover:bg-[#E06A1E] font-medium py-2.5 bg-white text-[rgba(243,117,33,1)] border border-[rgba(243,117,33,1)]"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Gig
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const handleCreateGig = () => {
    if (!newGig.title || !newGig.category || !newGig.description || !newGig.priceMin || !newGig.priceMax) {
      alert("Please fill in all required fields")
      return
    }

    const gigToAdd: Gig = {
      id: Date.now().toString(),
      title: newGig.title,
      category: newGig.category,
      description: newGig.description,
      price: `$${newGig.priceMin}-$${newGig.priceMax}`,
      status: newGig.status,
      orders: 0,
      rating: 0,
      reviews: 0,
      createdDate: new Date().toISOString().split("T")[0],
      image: newGig.image || "/placeholder.svg?height=200&width=300",
    }

    const updatedGigs = [...gigs, gigToAdd]
    setGigs(updatedGigs)
    localStorage.setItem("vendorGigs", JSON.stringify(updatedGigs))

    // Reset form and close modal
    setNewGig({
      title: "",
      category: "",
      description: "",
      priceMin: "",
      priceMax: "",
      image: "",
      status: "active",
    })
    setIsCreateGigOpen(false)
  }

  const handleEditGig = (gig: Gig) => {
    setEditingGig(gig)
    const priceRange = gig.price.replace(/\$/g, "").split("-")
    setNewGig({
      title: gig.title,
      category: gig.category,
      description: gig.description,
      priceMin: priceRange[0] || "",
      priceMax: priceRange[1] || "",
      image: gig.image,
      status: gig.status,
    })
    setIsEditGigOpen(true)
  }

  const handleViewGig = (gig: Gig) => {
    // Navigate to detailed gig view page
    window.location.href = `/vendor/gigs/${gig.id}/view`
  }

  const handleUpdateGig = () => {
    if (
      !editingGig ||
      !newGig.title ||
      !newGig.category ||
      !newGig.description ||
      !newGig.priceMin ||
      !newGig.priceMax
    ) {
      alert("Please fill in all required fields")
      return
    }

    const updatedGig: Gig = {
      ...editingGig,
      title: newGig.title,
      category: newGig.category,
      description: newGig.description,
      price: `$${newGig.priceMin}-$${newGig.priceMax}`,
      status: newGig.status,
      image: newGig.image || "/placeholder.svg?height=200&width=300",
    }

    const updatedGigs = gigs.map((gig) => (gig.id === editingGig.id ? updatedGig : gig))
    setGigs(updatedGigs)
    localStorage.setItem("vendorGigs", JSON.stringify(updatedGigs))

    // Reset form and close modal
    setNewGig({
      title: "",
      category: "",
      description: "",
      priceMin: "",
      priceMax: "",
      image: "",
      status: "active",
    })
    setEditingGig(null)
    setIsEditGigOpen(false)
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <section className="relative py-12 lg:py-16 bg-[rgba(39,63,79,1)] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/professional-real-estate-photography-portfolio.png"
            alt="Professional gig management"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Manage Your<span className="block font-normal">Service Gigs</span>
            </h1>

            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Create, edit, and track your service offerings with our comprehensive gig management platform. Monitor
              performance, manage pricing, and grow your real estate media business.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-0">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search gigs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#273F4F]/20 focus:ring-secondary shadow-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 border-[#273F4F]/20 shadow-none">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gigs ({filteredGigs.length})</SelectItem>
                  <SelectItem value="active">Active Gigs ({activeGigs.length})</SelectItem>
                  <SelectItem value="past">Past Gigs ({pastGigs.length})</SelectItem>
                  <SelectItem value="paused">
                    Paused Gigs ({filteredGigs.filter((g) => g.status === "paused").length})
                  </SelectItem>
                  <SelectItem value="completed">
                    Completed Gigs ({filteredGigs.filter((g) => g.status === "completed").length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isCreateGigOpen} onOpenChange={setIsCreateGigOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-[#E06A1E] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Gig
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#273F4F]">Create New Gig</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#273F4F] font-medium">
                      Gig Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Professional Real Estate Photography"
                      value={newGig.title}
                      onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                      className="border-[#273F4F]/20 focus:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#273F4F] font-medium">
                      Category *
                    </Label>
                    <Select
                      value={newGig.category}
                      onValueChange={(value) => setNewGig({ ...newGig, category: value })}
                    >
                      <SelectTrigger className="border-[#273F4F]/20">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Videography">Videography</SelectItem>
                        <SelectItem value="Virtual Tours">Virtual Tours</SelectItem>
                        <SelectItem value="Drone Services">Drone Services</SelectItem>
                        <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Content Writing">Content Writing</SelectItem>
                        <SelectItem value="Web Design">Web Design</SelectItem>
                        <SelectItem value="App Development">App Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#273F4F] font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your service in detail..."
                      value={newGig.description}
                      onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                      className="border-[#273F4F]/20 focus:ring-secondary min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceMin" className="text-[#273F4F] font-medium">
                        Minimum Price *
                      </Label>
                      <Input
                        id="priceMin"
                        type="number"
                        placeholder="150"
                        value={newGig.priceMin}
                        onChange={(e) => setNewGig({ ...newGig, priceMin: e.target.value })}
                        className="border-[#273F4F]/20 focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priceMax" className="text-[#273F4F] font-medium">
                        Maximum Price *
                      </Label>
                      <Input
                        id="priceMax"
                        type="number"
                        placeholder="300"
                        value={newGig.priceMax}
                        onChange={(e) => setNewGig({ ...newGig, priceMax: e.target.value })}
                        className="border-[#273F4F]/20 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-[#273F4F] font-medium">
                      Portfolio Image URL (Optional)
                    </Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={newGig.image}
                      onChange={(e) => setNewGig({ ...newGig, image: e.target.value })}
                      className="border-[#273F4F]/20 focus:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-[#273F4F] font-medium">
                      Status *
                    </Label>
                    <Select
                      value={newGig.status}
                      onValueChange={(value: "active" | "paused" | "completed") =>
                        setNewGig({ ...newGig, status: value })
                      }
                    >
                      <SelectTrigger className="border-[#273F4F]/20">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateGigOpen(false)}
                      className="border-[#273F4F]/20 text-[#273F4F] hover:bg-[#273F4F] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateGig} className="bg-primary hover:bg-[#E06A1E] text-white">
                      Create Gig
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isEditGigOpen} onOpenChange={setIsEditGigOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#273F4F]">Edit Gig</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title" className="text-[#273F4F] font-medium">
                      Gig Title *
                    </Label>
                    <Input
                      id="edit-title"
                      placeholder="e.g., Professional Real Estate Photography"
                      value={newGig.title}
                      onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                      className="border-[#273F4F]/20 focus:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-category" className="text-[#273F4F] font-medium">
                      Category *
                    </Label>
                    <Select
                      value={newGig.category}
                      onValueChange={(value) => setNewGig({ ...newGig, category: value })}
                    >
                      <SelectTrigger className="border-[#273F4F]/20">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Videography">Videography</SelectItem>
                        <SelectItem value="Virtual Tours">Virtual Tours</SelectItem>
                        <SelectItem value="Drone Services">Drone Services</SelectItem>
                        <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Content Writing">Content Writing</SelectItem>
                        <SelectItem value="Web Design">Web Design</SelectItem>
                        <SelectItem value="App Development">App Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description" className="text-[#273F4F] font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="edit-description"
                      placeholder="Describe your service in detail..."
                      value={newGig.description}
                      onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                      className="border-[#273F4F]/20 focus:ring-secondary min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-priceMin" className="text-[#273F4F] font-medium">
                        Minimum Price *
                      </Label>
                      <Input
                        id="edit-priceMin"
                        type="number"
                        placeholder="150"
                        value={newGig.priceMin}
                        onChange={(e) => setNewGig({ ...newGig, priceMin: e.target.value })}
                        className="border-[#273F4F]/20 focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-priceMax" className="text-[#273F4F] font-medium">
                        Maximum Price *
                      </Label>
                      <Input
                        id="edit-priceMax"
                        type="number"
                        placeholder="300"
                        value={newGig.priceMax}
                        onChange={(e) => setNewGig({ ...newGig, priceMax: e.target.value })}
                        className="border-[#273F4F]/20 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-image" className="text-[#273F4F] font-medium">
                      Portfolio Image URL (Optional)
                    </Label>
                    <Input
                      id="edit-image"
                      placeholder="https://example.com/image.jpg"
                      value={newGig.image}
                      onChange={(e) => setNewGig({ ...newGig, image: e.target.value })}
                      className="border-[#273F4F]/20 focus:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-status" className="text-[#273F4F] font-medium">
                      Status *
                    </Label>
                    <Select
                      value={newGig.status}
                      onValueChange={(value: "active" | "paused" | "completed") =>
                        setNewGig({ ...newGig, status: value })
                      }
                    >
                      <SelectTrigger className="border-[#273F4F]/20">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditGigOpen(false)}
                      className="border-[#273F4F]/20 text-[#273F4F] hover:bg-[#273F4F] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateGig} className="bg-primary hover:bg-[#E06A1E] text-white">
                      Update Gig
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mb-8">
          {paginatedGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center border-[#273F4F]/20">
              <div className="text-[#273F4F]">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-medium mb-2">No {filterStatus === "all" ? "" : filterStatus} gigs found</h3>
                <p className="text-sm text-[#273F4F]/70">
                  {filterStatus === "active"
                    ? "Create your first gig to start offering your services"
                    : `No ${filterStatus} gigs match your search criteria`}
                </p>
                {filterStatus === "active" && (
                  <Button
                    className="mt-4 bg-primary hover:bg-[#E06A1E] text-white"
                    onClick={() => setIsCreateGigOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Gig
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#273F4F]/70">
              Showing {startIndex + 1}-{Math.min(endIndex, displayedGigs.length)} of {displayedGigs.length} gigs
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-[#273F4F]/20 text-[#273F4F] hover:bg-[#273F4F] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-primary hover:bg-[#E06A1E] text-white"
                        : "border-[#273F4F]/20 text-[#273F4F] hover:bg-[#273F4F] hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-[#273F4F]/20 text-[#273F4F] hover:bg-[#273F4F] hover:text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
