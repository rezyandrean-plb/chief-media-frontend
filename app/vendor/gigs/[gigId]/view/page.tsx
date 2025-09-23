"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, DollarSign, Users, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"

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

interface PortfolioItem {
  id: number
  title: string
  image: string
  date: string
  client: string
}

interface ServicePackage {
  name: string
  price: string
  duration: string
  features: string[]
  popular: boolean
}

export default function ViewGigPage() {
  const params = useParams()
  const router = useRouter()
  const [gig, setGig] = useState<Gig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedGigs = localStorage.getItem("vendorGigs")
    if (savedGigs) {
      const gigs: Gig[] = JSON.parse(savedGigs)
      const foundGig = gigs.find((g) => g.id === params.gigId)
      setGig(foundGig || null)
    }
    setLoading(false)
  }, [params.gigId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-white"
      case "paused":
        return "bg-secondary text-white"
      case "completed":
        return "bg-muted text-[#273F4F]"
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#273F4F]">Loading...</div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#273F4F] mb-4">Gig Not Found</h1>
          <Button onClick={() => router.back()} className="bg-primary hover:bg-[#E06A1E] text-white">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      <div className="bg-[#273F4F] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => router.back()} className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{gig.title}</h1>
              <p className="text-[#FCEBDC] mt-2">Detailed gig information and performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="w-full">
          <div className="space-y-6">
            <Card className="border-[#273F4F]/20 shadow-none border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-[#273F4F]">{gig.title}</CardTitle>
                    <p className="text-[#273F4F]/70 mt-2">{gig.category}</p>
                  </div>
                  <Badge className={`${getStatusColor(gig.status)} flex items-center gap-1`}>
                    {getStatusIcon(gig.status)}
                    {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 rounded-lg overflow-hidden bg-muted mb-6">
                  <img src={gig.image || "/placeholder.svg"} alt={gig.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#273F4F] mb-2">Description</h3>
                    <p className="text-[#273F4F]/80 leading-relaxed">{gig.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#273F4F]/20 border-0 shadow-lg bg-gradient-to-br from-white to-[#FCEBDC]/30">
              <CardHeader className="bg-[#273F4F] text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#F37521]" />
                  Gig Performance
                </CardTitle>
                <p className="text-[#FCEBDC]/80 text-sm">Key metrics and statistics</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F37521] p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-white">Price Range</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{gig.price}</span>
                  </div>

                  <div className="bg-[#03809C] p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-white">Total Orders</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{gig.orders}</span>
                  </div>

                  <div className="bg-[#F2A16D] p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Star className="h-4 w-4 text-white fill-white" />
                      </div>
                      <span className="font-medium text-[#273F4F]">Rating</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#273F4F]">{gig.rating}</span>
                      <span className="text-sm text-[#273F4F]/80">({gig.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="bg-[#273F4F] p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-white">Created</span>
                    </div>
                    <span className="text-lg font-bold text-white">
                      {new Date(gig.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {gig.lastOrder && (
                  <div className="mt-4 p-4 bg-[#FCEBDC] rounded-lg border border-[#F37521]/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F37521] rounded-full">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-[#273F4F]">Last Order</span>
                      </div>
                      <span className="font-bold text-[#273F4F]">{new Date(gig.lastOrder).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-[#273F4F]/20 border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-[#273F4F]">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src="/luxury-home-exterior.png"
                        alt="Luxury Estate Photography"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-[#273F4F]/60 mb-2">From: March 2024</p>
                        <h3 className="text-2xl font-bold text-[#273F4F] mb-3">Luxury Estate Photography</h3>
                        <p className="text-[#273F4F]/80 mb-4">
                          Stunning exterior shots of a $2.5M luxury estate featuring dramatic lighting and architectural
                          details that highlight the property's premium features.
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-[#F2A16D] text-[#273F4F]">Luxury Properties</Badge>
                          <Badge className="bg-[#03809C] text-white">+9</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#FCEBDC] p-4 rounded-lg text-center">
                          <p className="text-sm text-[#273F4F]/60 mb-1">Project Cost</p>
                          <p className="text-xl font-bold text-[#F37521]">$400-600</p>
                        </div>
                        <div className="bg-[#273F4F]/5 p-4 rounded-lg text-center">
                          <p className="text-sm text-[#273F4F]/60 mb-1">Duration</p>
                          <p className="text-xl font-bold text-[#03809C]">2-3 days</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2 overflow-x-auto">
                        {[
                          "/luxury-home-exterior.png",
                          "/modern-kitchen.png",
                          "/master-bedroom-staging.png",
                          "/professional-real-estate-photography-portfolio.png",
                          "/interior-real-estate-photography.png",
                          "/3d-virtual-tour-real-estate.png",
                          "/drone-aerial-real-estate-video.png",
                          "/real-estate-video-walkthrough.png",
                          "/3d-home-tour-technology.png",
                        ].map((image, index) => (
                          <div
                            key={index}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${index === 0 ? "border-[#F37521]" : "border-transparent"} cursor-pointer`}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-dashed border-[#273F4F]/30 flex items-center justify-center cursor-pointer">
                          <div className="text-center">
                            <p className="text-xs font-medium text-[#273F4F]/60">+4</p>
                            <p className="text-xs text-[#273F4F]/60">More</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="border-[#273F4F]/20 text-[#273F4F] bg-transparent">
                        ←
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#273F4F]/20 text-[#273F4F] bg-transparent">
                        →
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#273F4F]/20 border-0 shadow-none">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#273F4F]">Service Packages</CardTitle>
                <p className="text-[#273F4F]/70">Choose the perfect package for your needs</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#273F4F] text-white rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Standard Photography Package</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold">$200</span>
                        <span className="text-white/70">starting at</span>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <p className="text-white/90 mb-4">20-30 high-resolution photos, basic editing</p>
                      <div className="space-y-3 mb-6">
                        <p className="font-semibold text-white">WHAT'S INCLUDED:</p>
                        <div className="space-y-2">
                          {["20-30 high-resolution photos", "Basic editing", "Online gallery"].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#03809C] flex-shrink-0 text-white" />
                              <span className="text-white/90">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-[#03809C] hover:bg-[#03809C]/90 text-white">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Order Now - $200
                      </Button>
                    </div>
                  </div>

                  <div className="bg-[#F37521] text-white rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Premium Photography Package</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold">$350</span>
                        <span className="text-white/70">starting at</span>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <p className="text-white/90 mb-4">40-50 photos, advanced editing, twilight shots</p>
                      <div className="space-y-3 mb-6">
                        <p className="font-semibold text-white">WHAT'S INCLUDED:</p>
                        <div className="space-y-2">
                          {["40-50 photos", "Advanced editing", "Twilight shots", "Drone shots"].map(
                            (feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                                <span className="text-white/90">{feature}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <Button className="w-full bg-white text-[#F37521] hover:bg-white/90">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Order Now - $350
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-[#273F4F]">
        <div className="w-full px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Social%20Media-AMMTZS4OnQoBwb9d4BRrcy7CcnpKQT.png"
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
              <ul className="space-y-2">
                <li>
                  <a href="/vendors" className="text-white/80 hover:text-white transition-colors">
                    Photography
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="text-white/80 hover:text-white transition-colors">
                    Videography
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="text-white/80 hover:text-white transition-colors">
                    Drone Services
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="text-white/80 hover:text-white transition-colors">
                    Virtual Tours
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="text-white/80 hover:text-white transition-colors">
                    Copywriting
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="text-white/80 hover:text-white transition-colors">
                    Social Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Resource</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/become-vendor" className="text-white/80 hover:text-white transition-colors">
                    Become a Chief Media Vendor
                  </a>
                </li>
                <li>
                  <a href="/studios" className="text-white/80 hover:text-white transition-colors">
                    Studio Booking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-white/80 hover:text-white transition-colors">
                    About Chief Media
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-white/80 hover:text-white transition-colors">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-white/80 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-white/80 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-white/80 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/press" className="text-white/80 hover:text-white transition-colors">
                    Press Releases
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 KW Chief Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
