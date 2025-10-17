"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Phone, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Vendor {
  id: number;
  name: string;
  phone: string;
  email: string;
  specialty?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  image?: string;
  profileImage?: string;
  services?: string[];
  priceRange?: string;
  description?: string;
  status?: string;
  company?: string;
  address?: string;
  website?: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 6;

  // Fetch vendors from database
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/vendors');
        if (response.ok) {
          const result = await response.json();
          setVendors(result.data);
        } else {
          console.error('Failed to fetch vendors');
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Mock data for fallback (remove this after testing)
  const mockVendors = [
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

  // Filter vendors based on search and specialty
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = searchTerm === "" || 
      (vendor.name && vendor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vendor.specialty && vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vendor.location && vendor.location.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSpecialty = selectedSpecialty === "all" || 
      (vendor.specialty && vendor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()))

    return matchesSearch && matchesSpecialty
  })

  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage)
  const startIndex = (currentPage - 1) * vendorsPerPage
  const endIndex = startIndex + vendorsPerPage
  const currentVendors = filteredVendors.slice(startIndex, endIndex)

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "search") setSearchTerm(value)
    if (filterType === "specialty") setSelectedSpecialty(value)
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
            <Select value={selectedSpecialty} onValueChange={(value) => handleFilterChange("specialty", value)}>
              <SelectTrigger className="w-full md:w-48 border">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="drone">Drone</SelectItem>
                <SelectItem value="virtual tours">Virtual Tours</SelectItem>
                <SelectItem value="real estate">Real Estate</SelectItem>
                <SelectItem value="aerial">Aerial</SelectItem>
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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden shadow-none h-full flex flex-col">
                  <div className="relative h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="px-6 pb-6 pt-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                        <div>
                          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentVendors.map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.id}`} className="block h-full">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow shadow-none cursor-pointer h-full flex flex-col mt-0 pt-[-50px] pt-[-0px] pt-0 pb-[-50px] pb-[-0px] pb-0 rounded-md">
                  <div className="relative h-48 overflow-hidden">
                    {vendor.image ? (
                      <Image
                        src={vendor.image}
                        alt={vendor.name || "Vendor"}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 mt-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-4xl mb-2">📷</div>
                          <div className="text-sm">No Image Available</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="px-6 pb-6 pt-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-3 items-start">
                        <div className="relative">
                          {vendor.profileImage ? (
                            <Image
                              src={vendor.profileImage}
                              alt={`${vendor.name || "Vendor"} profile`}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white shadow-sm flex items-center justify-center">
                              <div className="text-gray-600 text-sm font-medium">
                                {vendor.name ? vendor.name.charAt(0).toUpperCase() : "?"}
                              </div>
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">{vendor.name || "TBC"}</h3>
                          <p className="font-medium text-sm text-[rgba(3,128,156,1)]">{vendor.specialty || "TBC"}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center py-0 pt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vendor.rating || "TBC"}</span>
                        <span className="text-sm text-muted-foreground">({vendor.reviews || "TBC"})</span>
                      </div>
                    </div>

                    <p className="text-sm mb-4 text-slate-950">{vendor.description || "TBC"}</p>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-black" />
                        <span>{vendor.location || "TBC"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-black" />
                        <span>{vendor.phone || "TBC"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="text-foreground flex flex-col">
                        <span className="font-bold text-base text-slate-950">Up to</span>
                        <span className="font-bold text-[rgba(243,117,33,1)] text-xl">{vendor.priceRange || "TBC"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            </div>
          )}

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
                  setSelectedSpecialty("all")
                  setCurrentPage(1)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
