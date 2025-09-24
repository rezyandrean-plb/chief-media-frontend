"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Phone, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const vendors = [
  {
    id: 1,
    name: "Elite Photography Studios",
    specialty: "Real Estate Photography",
    rating: 4.9,
    reviews: 127,
    location: "Los Angeles, CA",
    phone: "(555) 123-4567",
    email: "contact@elitephoto.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eyestetix-studio-9UXIpg75ing-unsplash.jpg-giNzb0MH0JIZcCe6XZHHch9cvo3OdQ.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Drone", "Virtual Tours"],
    priceRange: "$200-500",
    description: "Professional real estate photography with 10+ years experience",
  },
  {
    id: 2,
    name: "SkyView Drone Services",
    specialty: "Aerial Photography & Video",
    rating: 4.8,
    reviews: 89,
    location: "San Francisco, CA",
    phone: "(555) 234-5678",
    email: "info@skyviewdrone.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-shatov-UVfvFrp4x4E-unsplash.jpg-LUM8B39L3nD41wrN3KNkVNMfafpHuz.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Drone", "Video", "Photography"],
    priceRange: "$300-800",
    description: "Certified drone pilots specializing in stunning aerial content",
  },
  {
    id: 3,
    name: "Virtual Tour Pro",
    specialty: "3D Virtual Tours",
    rating: 4.7,
    reviews: 156,
    location: "New York, NY",
    phone: "(555) 345-6789",
    email: "hello@virtualtourpro.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente--ZS3S9a3jEQ-unsplash.jpg-8O0nHhZ05syTtIoz3nYz7nzhagHyzs.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Virtual Tours", "3D Modeling", "Photography"],
    priceRange: "$400-1000",
    description: "Creating immersive 3D experiences for real estate marketing",
  },
  {
    id: 4,
    name: "Luxury Home Media",
    specialty: "High-End Property Marketing",
    rating: 5.0,
    reviews: 73,
    location: "Miami, FL",
    phone: "(555) 456-7890",
    email: "luxury@homemedia.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-shatov-ENOcRpYwT68-unsplash.jpg-BdQJ1ZdUfHOB9V4x7EFNI7IwSiTuEn.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Video", "Drone", "Virtual Tours"],
    priceRange: "$500-1500",
    description: "Premium media services for luxury real estate properties",
  },
  {
    id: 5,
    name: "Interior Focus Studios",
    specialty: "Interior Photography",
    rating: 4.6,
    reviews: 94,
    location: "Chicago, IL",
    phone: "(555) 567-8901",
    email: "studio@interiorfocus.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-ykpxtjAPmMk-unsplash.jpg-ehXqvpfDk0UwD4XSHvqv6gUDhBdHGg.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Staging Consultation"],
    priceRange: "$150-400",
    description: "Specializing in beautiful interior photography and staging advice",
  },
  {
    id: 6,
    name: "Motion Real Estate",
    specialty: "Video Walkthroughs",
    rating: 4.8,
    reviews: 112,
    location: "Austin, TX",
    phone: "(555) 678-9012",
    email: "video@motionre.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-0PbFjeSptx4-unsplash.jpg-T2wDbSd55JX99PsPgoBZPNPZoZvrvK.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Video", "Photography", "Editing"],
    priceRange: "$250-600",
    description: "Dynamic video content that brings properties to life",
  },
  {
    id: 7,
    name: "Prime Property Photos",
    specialty: "Commercial Photography",
    rating: 4.5,
    reviews: 68,
    location: "Seattle, WA",
    phone: "(555) 789-0123",
    email: "info@primephotos.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-hAlQcTXj1R8-unsplash.jpg-a9oRRQGQiZZtSpJFXH7HzY8ExcPSBI.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Commercial", "Retail"],
    priceRange: "$180-450",
    description: "Expert commercial and retail property photography services",
  },
  {
    id: 8,
    name: "Staging & Media Co",
    specialty: "Home Staging & Photography",
    rating: 4.7,
    reviews: 145,
    location: "Denver, CO",
    phone: "(555) 890-1234",
    email: "hello@stagingmedia.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-tnVDpxUW6og-unsplash.jpg-55F1saQ6snChxbQ2c5L47QqXcuMcgl.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Staging", "Consultation"],
    priceRange: "$220-550",
    description: "Complete staging and photography packages for faster sales",
  },
  {
    id: 9,
    name: "360 Vision Studios",
    specialty: "360° Photography & VR",
    rating: 4.9,
    reviews: 203,
    location: "Phoenix, AZ",
    phone: "(555) 901-2345",
    email: "contact@360vision.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-wIBDrEv73xY-unsplash.jpg-QJnSgl5cTs4B6KXhJI0CJjWG0Aqrnf.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Virtual Tours", "360° Photography", "VR"],
    priceRange: "$350-900",
    description: "Cutting-edge 360° and VR technology for immersive experiences",
  },
  {
    id: 10,
    name: "Coastal Media Group",
    specialty: "Waterfront Property Specialist",
    rating: 4.8,
    reviews: 87,
    location: "San Diego, CA",
    phone: "(555) 012-3456",
    email: "info@coastalmedia.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-CmQ9bOHqACY-unsplash.jpg-iNItsIwpX3CykFUk0bCqDOr6f6wnI3.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Drone", "Video"],
    priceRange: "$280-700",
    description: "Specializing in stunning waterfront and coastal property marketing",
  },
  {
    id: 11,
    name: "Urban Lens Photography",
    specialty: "City & Condo Photography",
    rating: 4.6,
    reviews: 134,
    location: "Boston, MA",
    phone: "(555) 123-4567",
    email: "urban@lensphotography.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-z87yLIfnrB8-unsplash.jpg-bZZVznS68hvCKCIhzvzQiUflu3M6ke.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Urban", "Condo"],
    priceRange: "$160-380",
    description: "Expert urban and high-rise property photography services",
  },
  {
    id: 12,
    name: "Twilight Photography Pro",
    specialty: "Twilight & Night Photography",
    rating: 4.9,
    reviews: 76,
    location: "Las Vegas, NV",
    phone: "(555) 234-5678",
    email: "twilight@photographypro.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente--ZS3S9a3jEQ-unsplash.jpg-fv9136i9sWeWDqYylXDj4evvWYAOLc.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Twilight", "Night"],
    priceRange: "$300-650",
    description: "Stunning twilight and night photography that showcases properties beautifully",
  },
  {
    id: 13,
    name: "Heritage Home Media",
    specialty: "Historic Property Photography",
    rating: 4.7,
    reviews: 92,
    location: "Charleston, SC",
    phone: "(555) 345-6789",
    email: "heritage@homemedia.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-nbYlcC98lUk-unsplash.jpg-pvfgwkvCs7XAE3QKZaO7XApzd1O6J6.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Historic", "Restoration"],
    priceRange: "$200-500",
    description: "Preserving the beauty and character of historic properties through photography",
  },
  {
    id: 14,
    name: "Modern Space Studios",
    specialty: "Contemporary Design Photography",
    rating: 4.8,
    reviews: 118,
    location: "Portland, OR",
    phone: "(555) 456-7890",
    email: "modern@spacestudios.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-fN4YeoA14OI-unsplash.jpg-QEu0v9XGrqS0bCBgwTZ6oulbgdyBr2.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Modern", "Design"],
    priceRange: "$240-580",
    description: "Showcasing contemporary and modern architectural design through expert photography",
  },
  {
    id: 15,
    name: "Ranch & Rural Media",
    specialty: "Rural & Ranch Photography",
    rating: 4.5,
    reviews: 65,
    location: "Dallas, TX",
    phone: "(555) 567-8901",
    email: "ranch@ruralmedia.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boliviainteligente-xM1gGTGBbHo-unsplash.jpg-RTErs3wBnzLs1KYTDP1ZUBqQDznf5w.jpeg",
    profileImage: "/placeholder.svg?height=40&width=40",
    services: ["Photography", "Drone", "Rural"],
    priceRange: "$320-800",
    description: "Specializing in large properties, ranches, and rural real estate marketing",
  },
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const vendorsPerPage = 9

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService =
      selectedService === "all" ||
      vendor.services.some((service) => service.toLowerCase().includes(selectedService.toLowerCase()))
    const matchesLocation =
      selectedLocation === "all" || vendor.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesService && matchesLocation
  })

  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage)
  const startIndex = (currentPage - 1) * vendorsPerPage
  const endIndex = startIndex + vendorsPerPage
  const currentVendors = filteredVendors.slice(startIndex, endIndex)

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "search") setSearchTerm(value)
    if (filterType === "service") setSelectedService(value)
    if (filterType === "location") setSelectedLocation(value)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-12 lg:py-16 bg-[rgba(39,63,79,1)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/austin-distel-jpHw8ndwJ_Q-unsplash.jpg-6V1jGGg1QhcA1uAnzGb5OlRT8ZUPKa.jpeg"
            alt="Professional vendors and media specialists"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pl-6">
          <div className="max-w-2xl">
            <h1 className="leading-relaxed text-background text-5xl mb-0">
              <span className="block font-normal">Find Expert Vendors</span>
            </h1>

            <p className="text-lg leading-relaxed mb-12 text-background">
              Connect with professional photographers, videographers, and media specialists who deliver exceptional
              results for your real estate projects.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 pt-20 border-b">
        <div className="px-[7vw]">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vendors by name or specialty..."
                value={searchTerm}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10 border border-gray-300"
              />
            </div>
            <Select value={selectedService} onValueChange={(value) => handleFilterChange("service", value)}>
              <SelectTrigger className="w-full md:w-48 border">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="drone">Drone</SelectItem>
                <SelectItem value="virtual tours">Virtual Tours</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={(value) => handleFilterChange("location", value)}>
              
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="florida">Florida</SelectItem>
                <SelectItem value="illinois">Illinois</SelectItem>
                <SelectItem value="texas">Texas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-12 pb-20 text-slate-950">
        <div className="px-[7vw]">
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="font-normal text-base">Available Vendors ({filteredVendors.length})</h2>
            {totalPages > 1 && (
              <p className="text-slate-950 text-base">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVendors.map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.id}`} className="block h-full">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow shadow-none cursor-pointer h-full flex flex-col mt-0 pt-[-50px] pt-[-0px] pt-0 pb-[-50px] pb-[-0px] pb-0 rounded-md">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 mt-0"
                    />
                  </div>

                  <CardContent className="px-6 pb-6 pt-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-3 items-start">
                        <div className="relative">
                          <img
                            src={vendor.profileImage || "/placeholder.svg"}
                            alt={`${vendor.name} profile`}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">{vendor.name}</h3>
                          <p className="font-medium text-sm text-[rgba(3,128,156,1)]">{vendor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center py-0 pt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-sm text-muted-foreground">({vendor.reviews})</span>
                      </div>
                    </div>

                    <p className="text-sm mb-4 text-slate-950">{vendor.description}</p>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-black" />
                        <span>{vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-black" />
                        <span>{vendor.phone}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="text-foreground flex flex-col">
                        <span className="font-bold text-base text-slate-950">Up to</span>
                        <span className="font-bold text-[rgba(243,117,33,1)] text-xl">{vendor.priceRange}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                className="rounded-sm bg-transparent"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 rounded-sm bg-background ${
                      currentPage === page
                        ? "bg-[rgba(243,117,33,1)] hover:bg-[rgba(243,117,33,0.9)] text-white border-[rgba(243,117,33,1)]"
                        : ""
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                className="rounded-sm bg-transparent"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No vendors found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedService("all")
                  setSelectedLocation("all")
                  setCurrentPage(1)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
        <div className="w-full px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/chiefmedia.png"
                  alt="Chief Media Logo"
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-white/80">
                Connecting real estate professionals with premium media services and studio spaces.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Service</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Photography
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Videography
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Drone Services
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Virtual Tours
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Copywriting
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Social Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Resource</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/become-vendor" className="hover:text-white transition-colors">
                    Become a Chief Media Vendor
                  </a>
                </li>
                <li>
                  <a href="/studios" className="hover:text-white transition-colors">
                    Studio Booking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About Chief Media
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/press" className="hover:text-white transition-colors">
                    Press Releases
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>Chief Media ® is a part of KW Singapore Real Estate Pte. Ltd.</p>
            <p>Copyright © 2025 KW Singapore Official Gig Economy Vendor</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
