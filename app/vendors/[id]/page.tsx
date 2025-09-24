"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Star, MapPin, ArrowLeft, Clock, CheckCircle, Users, Send, MessageCircle, Search, X } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Mock vendor data (same as vendors page)
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
    image: "/professional-real-estate-photography-portfolio.png",
    services: ["Photography", "Drone", "Virtual Tours"],
    priceRange: "$200-500",
    description: "Professional real estate photography with 10+ years experience",
    bio: "Elite Photography Studios has been the premier choice for real estate photography in Los Angeles for over a decade. Our team of certified photographers specializes in capturing properties in their best light, using state-of-the-art equipment and proven techniques to showcase every detail.",
    portfolio: [
      {
        image: "/luxury-home-exterior.png",
        title: "Luxury Estate Photography",
        description:
          "Stunning exterior shots of a $2.5M luxury estate featuring dramatic lighting and architectural details that highlight the property's premium features.",
        date: "March 2024",
        cost: "$400-600",
        duration: "2-3 days",
        category: "Luxury Properties",
      },
      {
        image: "/modern-kitchen.png",
        title: "Modern Kitchen Interior",
        description:
          "Contemporary kitchen photography showcasing clean lines, premium appliances, and natural lighting to create an inviting atmosphere for potential buyers.",
        date: "February 2024",
        cost: "$250-350",
        duration: "1-2 days",
        category: "Interior Design",
      },
      {
        image: "/master-bedroom-staging.png",
        title: "Master Bedroom Staging",
        description:
          "Professional staging photography that transforms the master bedroom into a serene retreat, emphasizing space, comfort, and luxury amenities.",
        date: "January 2024",
        cost: "$300-450",
        duration: "1-2 days",
        category: "Staging & Design",
      },
      {
        image: "/interior-real-estate-photography.png",
        title: "Living Room Showcase",
        description:
          "Expertly composed living room shots that capture the flow of natural light and highlight the open floor plan and designer finishes.",
        date: "December 2023",
        cost: "$200-300",
        duration: "1 day",
        category: "Residential",
      },
      {
        image: "/3d-virtual-tour-real-estate.png",
        title: "Virtual Tour Experience",
        description:
          "Interactive 3D virtual tour allowing potential buyers to explore every corner of this stunning property from the comfort of their home.",
        date: "November 2023",
        cost: "$500-750",
        duration: "3-4 days",
        category: "Virtual Tours",
      },
      {
        image: "/drone-aerial-real-estate-video.png",
        title: "Aerial Property Overview",
        description:
          "Breathtaking drone footage showcasing the property's location, surrounding amenities, and neighborhood context from unique aerial perspectives.",
        date: "October 2023",
        cost: "$350-500",
        duration: "2-3 days",
        category: "Aerial Photography",
      },
      {
        image: "/real-estate-video-walkthrough.png",
        title: "Cinematic Property Tour",
        description:
          "Professional video walkthrough with smooth camera movements and cinematic lighting that tells the story of this beautiful home.",
        date: "September 2023",
        cost: "$600-800",
        duration: "3-5 days",
        category: "Video Production",
      },
      {
        image: "/3d-home-tour-technology.png",
        title: "Commercial Space Photography",
        description:
          "High-end commercial photography for office spaces, highlighting modern design elements and professional atmosphere for corporate clients.",
        date: "August 2023",
        cost: "$450-650",
        duration: "2-3 days",
        category: "Commercial",
      },
      {
        image: "/professional-real-estate-photography-portfolio.png",
        title: "Twilight Photography Session",
        description:
          "Magical twilight shots capturing the property's exterior lighting and ambiance during the golden hour for maximum visual impact.",
        date: "July 2023",
        cost: "$300-400",
        duration: "1-2 days",
        category: "Twilight Photography",
      },
      {
        image: "/luxury-home-exterior.png",
        title: "Pool & Outdoor Living",
        description:
          "Stunning outdoor photography showcasing pool areas, landscaping, and outdoor entertainment spaces that highlight the property's lifestyle appeal.",
        date: "June 2023",
        cost: "$250-400",
        duration: "1-2 days",
        category: "Outdoor Spaces",
      },
    ],
    serviceDetails: [
      {
        name: "Standard Photography Package",
        price: "$200",
        description: "20-30 high-resolution photos, basic editing",
        features: ["20-30 high-resolution photos", "Basic editing", "Online gallery"],
      },
      {
        name: "Premium Photography Package",
        price: "$350",
        description: "40-50 photos, advanced editing, twilight shots",
        features: ["40-50 photos", "Advanced editing", "Twilight shots", "Drone shots"],
      },
      {
        name: "Drone Add-on",
        price: "$150",
        description: "Aerial exterior shots and neighborhood views",
        features: ["Aerial exterior shots", "Neighborhood views", "Edited footage"],
      },
      {
        name: "Virtual Tour",
        price: "$300",
        description: "Interactive 3D walkthrough experience",
        features: ["Interactive 3D walkthrough", "24/7 availability", "Mobile-friendly"],
      },
      {
        name: "Luxury Estate Package",
        price: "$500",
        description: "Complete luxury property showcase with premium editing",
        features: [
          "60+ high-resolution photos",
          "Professional staging consultation",
          "Luxury brochure design",
          "Social media content",
        ],
      },
      {
        name: "Commercial Property Package",
        price: "$450",
        description: "Comprehensive commercial space documentation",
        features: [
          "Interior & exterior shots",
          "Floor plan photography",
          "Business hour flexibility",
          "Rush delivery available",
        ],
      },
    ],
    availability: "Available 7 days a week",
    responseTime: "Within 2 hours",
    completedJobs: 450,
    yearsExperience: 12,
    profileImage: "/professional-real-estate-photography-portfolio.png",
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
    image: "/drone-aerial-real-estate-video.png",
    services: ["Drone", "Video", "Photography"],
    priceRange: "$300-800",
    description: "Certified drone pilots specializing in stunning aerial content",
    bio: "SkyView Drone Services brings a unique perspective to real estate marketing with our certified drone pilots and cutting-edge aerial technology. We specialize in capturing breathtaking aerial footage that showcases properties and their surroundings like never before.",
    portfolio: [
      {
        image: "/drone-aerial-real-estate-video.png",
        title: "Aerial Property Overview",
        description:
          "Comprehensive aerial footage showcasing the entire property, surrounding neighborhood, and proximity to local amenities from a bird's eye perspective.",
        date: "March 2024",
        cost: "$500-800",
        duration: "3-4 days",
        category: "Aerial Views",
      },
      {
        image: "/luxury-home-exterior.png",
        title: "Dramatic Aerial Angles",
        description:
          "Creative aerial photography capturing unique angles and perspectives that ground-level photography simply cannot achieve, highlighting architectural beauty.",
        date: "February 2024",
        cost: "$400-600",
        duration: "2-3 days",
        category: "Architectural Highlights",
      },
      {
        image: "/3d-home-tour-technology.png",
        title: "Neighborhood Context",
        description:
          "Wide-angle aerial shots that provide context of the property within its neighborhood, showing nearby parks, schools, and community features.",
        date: "January 2024",
        cost: "$350-500",
        duration: "2-3 days",
        category: "Neighborhood Views",
      },
      {
        image: "/real-estate-video-walkthrough.png",
        title: "Cinematic Aerial Video",
        description:
          "Hollywood-style aerial cinematography with smooth tracking shots and dynamic movements that create an emotional connection with the property.",
        date: "December 2023",
        cost: "$700-1000",
        duration: "4-5 days",
        category: "Cinematic Video",
      },
      {
        image: "/professional-real-estate-photography-portfolio.png",
        title: "Sunset Aerial Photography",
        description:
          "Breathtaking sunset aerial shots that capture the property bathed in golden light, creating stunning marketing materials for luxury listings.",
        date: "November 2023",
        cost: "$450-650",
        duration: "2-3 days",
        category: "Golden Hour",
      },
      {
        image: "/3d-virtual-tour-real-estate.png",
        title: "Commercial Development Aerial",
        description:
          "Large-scale aerial documentation of commercial developments, construction progress, and site planning for developers and investors.",
        date: "October 2023",
        cost: "$800-1200",
        duration: "5-7 days",
        category: "Commercial Development",
      },
      {
        image: "/interior-real-estate-photography.png",
        title: "Waterfront Property Showcase",
        description:
          "Spectacular aerial views of waterfront properties highlighting water access, dock facilities, and scenic surroundings that define luxury living.",
        date: "September 2023",
        cost: "$600-900",
        duration: "3-4 days",
        category: "Waterfront Properties",
      },
      {
        image: "/modern-kitchen.png",
        title: "Agricultural Land Survey",
        description:
          "Comprehensive aerial mapping and photography of agricultural properties, showcasing land boundaries, irrigation systems, and crop conditions.",
        date: "August 2023",
        cost: "$400-700",
        duration: "2-4 days",
        category: "Agricultural",
      },
    ],
    serviceDetails: [
      { name: "Aerial Photography", price: "$300", description: "15-20 stunning aerial photos" },
      { name: "Aerial Video Package", price: "$500", description: "2-3 minute cinematic aerial video" },
      { name: "Complete Aerial Package", price: "$700", description: "Photos + video + raw footage" },
    ],
    availability: "Monday - Saturday",
    responseTime: "Within 4 hours",
    completedJobs: 280,
    yearsExperience: 8,
    profileImage: "/drone-aerial-real-estate-video.png",
  },
]

const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely incredible work! The photos made our listing stand out and we received multiple offers within days.",
    hasFiles: true,
    images: ["/luxury-home-exterior.png", "/modern-kitchen.png", "/master-bedroom-staging.png"],
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 5,
    date: "1 month ago",
    comment: "Professional, punctual, and delivered exactly what was promised. Highly recommend!",
    hasFiles: false,
    images: [],
  },
  {
    id: 3,
    author: "Lisa Rodriguez",
    rating: 4,
    date: "2 months ago",
    comment: "Great quality photos and very responsive communication. Will definitely use again.",
    hasFiles: true,
    images: ["/commercial-office-space.png", "/luxury-bathroom-design.png"],
  },
  {
    id: 4,
    author: "David Wilson",
    rating: 5,
    date: "3 weeks ago",
    comment: "Outstanding service! The drone footage was spectacular and really showcased our property beautifully.",
    hasFiles: true,
    images: ["/drone-aerial-real-estate-video.png", "/3d-virtual-tour-real-estate.png"],
  },
  {
    id: 5,
    author: "Emma Thompson",
    rating: 5,
    date: "1 week ago",
    comment: "Fast turnaround, excellent communication, and the final photos exceeded our expectations.",
    hasFiles: false,
    images: [],
  },
  {
    id: 6,
    author: "Robert Garcia",
    rating: 4,
    date: "1 month ago",
    comment: "Very professional work. Minor delay in delivery but the quality made up for it.",
    hasFiles: true,
    images: ["/interior-real-estate-photography.png"],
  },
]

export default function VendorPage({ params }: { params: { id: string } }) {
  const vendorId = Number.parseInt(params.id)
  const vendor = vendors.find((v) => v.id === vendorId)

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0)
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false)
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null)
  const [reviewSearch, setReviewSearch] = useState("")
  const [sortBy, setSortBy] = useState("most-relevant")
  const [showOnlyWithFiles, setShowOnlyWithFiles] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm ${vendor?.name?.split(" ")[0] || "our"} assistant. How can I help you today?`,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any>(null)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string>("")

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [serviceCurrentIndex, setServiceCurrentIndex] = useState(0)

  const openGallery = (images: string[], startIndex = 0) => {
    setGalleryImages(images)
    setCurrentImageIndex(startIndex)
    setGalleryOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you shortly with more details about our services.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const totalReviews = reviews.length
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  const reviewsWithFiles = reviews.filter((r) => r.hasFiles).length

  const filteredReviews = reviews.filter((review) => {
    if (selectedStarFilter && review.rating !== selectedStarFilter) return false
    if (
      reviewSearch &&
      !review.comment.toLowerCase().includes(reviewSearch.toLowerCase()) &&
      !review.author.toLowerCase().includes(reviewSearch.toLowerCase())
    )
      return false
    if (showOnlyWithFiles && !review.hasFiles) return false
    return true
  })

  if (!vendor) {
    notFound()
  }

  const nextPortfolioItem = () => {
    setCurrentPortfolioIndex((prev) => (prev + 1) % vendor!.portfolio.length)
  }

  const prevPortfolioItem = () => {
    setCurrentPortfolioIndex((prev) => (prev - 1 + vendor!.portfolio.length) % vendor!.portfolio.length)
  }

  const openPortfolioModal = (item: any) => {
    setSelectedPortfolioItem(item)
    setSelectedGalleryImage(item.image || "/placeholder.svg")
    setIsPortfolioModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white sticky top-0 z-10 border-b-0">
        <div className="w-full py-4 px-[7vw]">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/vendors" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Vendors
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full px-[7vw] py-8 pb-20">
        <div className="space-y-12">
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[3/1] rounded-lg overflow-hidden bg-muted w-full">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eyestetix-studio-9UXIpg75ing-unsplash.jpg-itt62kZ9k9sliaLGiv8vGhKZwhkDR9.jpeg"
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vendor Info */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <img
                    src={vendor.profileImage || "/placeholder.svg"}
                    alt={vendor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1 text-slate-950">{vendor.name}</h1>
                    <p className="text-lg mb-2 text-slate-950">{vendor.specialty}</p>
                    <div className="flex items-center gap-4 text-sm mb-2.5">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-slate-950">{vendor.rating}</span>
                        <span className="text-slate-950">({vendor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-slate-950" />
                        <span className="text-slate-950">{vendor.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {vendor.services.map((service) => (
                        <Badge className="bg-muted text-slate-950" key={service} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="leading-relaxed text-slate-950 text-base mt-4">{vendor.bio}</p>
              </div>

              <div className="lg:w-80 lg:ml-auto">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold text-slate-950">{vendor.completedJobs}+</div>
                      <div className="text-sm font-medium text-slate-600">Orders Completed</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold text-slate-950">{vendor.responseTime}</div>
                      <div className="text-sm font-medium text-slate-600">Response Time</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Users className="h-6 w-6 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold text-slate-950">{vendor.yearsExperience} Years</div>
                      <div className="text-sm font-medium text-slate-600">Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Section */}
          <section className="space-y-6">
            <div className="space-y-6"></div>
          </section>

          {/* Portfolio Section */}
          <section className="space-y-6 mb-20 mt-20">
            <div>
              <h2 className="font-bold border-b-0 pb-0 text-slate-950 text-center text-3xl">Portfolio</h2>
              <p className="mt-2 text-slate-950 text-center">Explore our recent projects and creative work</p>
            </div>
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4">
                  {vendor.portfolio.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-80 aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                      onClick={() => {
                        openPortfolioModal(item)
                      }}
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-white/80 text-xs">{item.category}</span>
                          <span className="text-white/80 text-xs">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Price List Section */}
          <section className="space-y-6 mb-20">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-slate-950">Service Packages</h2>
              <p className="text-slate-950">Choose the perfect package for your needs</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out min-h-[500px] py-0 my-0 mb-[-40px]"
                  style={{ transform: `translateX(-${serviceCurrentIndex * (100 / 3)}%)` }}
                >
                  {vendor.serviceDetails.map((service, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 px-3 h-full">
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group shadow-none border border-gray-300 pt-[-50px] pt-[-0px] pt-[-70px] pt-0 h-full flex flex-col pb-0">
                        <div className="relative">
                          <div
                            className="p-6 text-white relative overflow-hidden bg-foreground"
                            style={{
                              backgroundColor: "#273F4F",
                            }}
                          >
                            <div className="relative z-10">
                              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">{service.price}</span>
                                <span className="text-white/80 text-sm">starting at</span>
                              </div>
                            </div>
                          </div>

                          <CardContent className="p-6 bg-white flex-1 flex flex-col">
                            <p className="leading-relaxed mb-6 text-slate-950">{service.description}</p>

                            <div className="space-y-3 mb-6 flex-1">
                              <h4 className="font-semibold text-[rgba(39,63,79,1)] text-sm uppercase tracking-wide">
                                What's Included:
                              </h4>
                              <div className="space-y-2">
                                {service.features?.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                      <CheckCircle className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-sm text-slate-950">{feature}</span>
                                  </div>
                                )) || (
                                  // Default features if none specified
                                  <>
                                    <div className="flex items-center gap-3">
                                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                      </div>
                                      <span className="text-sm text-gray-700">Professional quality delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                      </div>
                                      <span className="text-sm text-gray-700">Fast turnaround time</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                      </div>
                                      <span className="text-sm text-gray-700">Unlimited revisions</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <Button
                              className="w-full font-semibold py-6 text-white hover:opacity-90 transition-all duration-300 group-hover:scale-[1.02] mt-auto bg-primary"
                              style={{
                                backgroundColor: "#F37521",
                              }}
                            >
                              Order Now - {service.price}
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {vendor.serviceDetails.length > 3 && <></>}

              {vendor.serviceDetails.length > 3 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(vendor.serviceDetails.length / 3) }).map((_, groupIndex) => (
                    <button
                      key={groupIndex}
                      onClick={() => setServiceCurrentIndex(groupIndex * 3)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        Math.floor(serviceCurrentIndex / 3) === groupIndex
                          ? "bg-[#F37521] w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <Card className="border-2 border-gray-200 bg-[rgba(252,235,220,0.3)] shadow-none border-none">
              <CardContent className="p-8 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[rgba(243,117,33,0.1)] flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-[rgba(243,117,33,1)]" />
                  </div>
                  <h4 className="text-xl font-bold text-[rgba(39,63,79,1)]">Need Something Custom?</h4>
                  <p className="text-muted-foreground">
                    Have a unique project in mind? Let's discuss your specific requirements and create a tailored
                    solution.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[rgba(243,117,33,1)] text-[rgba(243,117,33,1)] hover:bg-[rgba(243,117,33,1)] hover:text-white bg-transparent"
                    onClick={() => setIsChatOpen(true)}
                  >
                    Get Custom Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Review Section */}
          <section className="space-y-6">
            <div className="flex items-center border-b pb-4 justify-start">
              <h2 className="text-2xl font-bold text-slate-950">Reviews</h2>
              <div className="flex items-center gap-2 pl-5">
                <div className="flex items-center gap-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Star
                      key={stars}
                      className={`h-4 w-4 ${
                        stars < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-950">{totalReviews} reviews for this Gig</h3>
                </div>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setSelectedStarFilter(selectedStarFilter === stars ? null : stars)}
                      className={`w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors ${
                        selectedStarFilter === stars ? "bg-blue-50 border border-blue-200" : ""
                      }`}
                    >
                      <span className="text-sm font-medium w-12 whitespace-nowrap text-slate-950">
                        {stars} Star{stars !== 1 ? "s" : ""}
                      </span>
                      <Progress
                        value={(ratingDistribution[stars as keyof typeof ratingDistribution] / totalReviews) * 100}
                        className="flex-1 h-2"
                      />
                      <span className="text-sm w-8 text-slate-950">
                        ({ratingDistribution[stars as keyof typeof ratingDistribution]})
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reviews"
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      className="pl-10 border-gray-200 shadow-none border"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 border border-gray-200 shadow-none">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="most-relevant">Most relevant</SelectItem>
                        <SelectItem value="newest">Newest first</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                        <SelectItem value="highest-rating">Highest rating</SelectItem>
                        <SelectItem value="lowest-rating">Lowest rating</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="files-filter" checked={showOnlyWithFiles} onCheckedChange={setShowOnlyWithFiles} />
                      <label htmlFor="files-filter" className="text-sm text-slate-950">
                        Only show reviews with files ({reviewsWithFiles})
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                      <Card className="rounded-md shadow-none" key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-slate-950">{review.author}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                              {/* {review.hasFiles && <div className="text-xs text-blue-600 mt-1">📎 Has files</div>} */}
                            </div>
                          </div>
                          <p className="mb-4 text-slate-950">{review.comment}</p>

                          {review.images && review.images.length > 0 && (
                            <div className="mt-4">
                              <div className="flex flex-wrap gap-2">
                                {review.images.map((image, index) => (
                                  <button
                                    key={index}
                                    onClick={() => openGallery(review.images, index)}
                                    className="relative group cursor-pointer"
                                  >
                                    <img
                                      src={image || "/placeholder.svg"}
                                      alt={`Review image ${index + 1}`}
                                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-opacity flex items-center justify-center">
                                      <svg
                                        className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              {/* <p className="text-xs text-muted-foreground mt-2">Click images to view in gallery</p> */}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No reviews match your current filters.</div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="shadow-none">
                  <CardContent className="p-6 py-0">
                    <h4 className="font-semibold mb-4 text-slate-950">Rating Breakdown</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start pb-[-10px] pb-[-0px] pt-[-10px] pt-0 mb-0">
                        <span className="mb-4 text-slate-950 font-normal text-sm">Seller communication level</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-950">Quality of delivery</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-950">Value of delivery</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <Card className="w-80 h-96 shadow-2xl border-2">
            <CardContent className="p-0 h-full flex flex-col">
              <div
                className="border-b p-4 bg-[rgba(39,63,79,1)]"
                style={{ background: "linear-gradient(135deg, #273F4F 0%, #03809C 100%)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F37521" }}
                      >
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">San</h4>
                      <p className="text-xs text-white/80">AI Assistant • Online</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsChatOpen(false)}
                    className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white" style={{ backgroundColor: "#FCEBDC" }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: "#F37521" }}
                      >
                        <MessageCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                        message.sender === "user"
                          ? "text-white rounded-br-md"
                          : "bg-white text-foreground shadow-sm border rounded-bl-md"
                      }`}
                      style={message.sender === "user" ? { backgroundColor: "#03809C" } : {}}
                    >
                      <p className="text-xs leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/80" : "text-gray-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-3 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask San anything..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 text-sm h-8 rounded-full border-gray-200"
                    style={{ focusBorderColor: "#03809C" }}
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    className="h-8 w-8 p-0 rounded-full hover:opacity-90"
                    style={{ backgroundColor: "#03809C" }}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">San replies instantly ✨</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div></div>
        )}
      </div>

      {galleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close button */}
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main image */}
            <img
              src={galleryImages[currentImageIndex] || "/placeholder.svg"}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      {isPortfolioModalOpen && selectedPortfolioItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => {
                  setIsPortfolioModalOpen(false)
                  setSelectedPortfolioItem(null)
                }}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors px-1 py-1"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Project Image */}
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={selectedGalleryImage || "/placeholder.svg"}
                  alt={selectedPortfolioItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Gallery */}
              <div className="p-6 border-b">
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                  {/* Main project image as first thumbnail */}
                  <div
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                      selectedGalleryImage === selectedPortfolioItem.image ? "border-blue-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedGalleryImage(selectedPortfolioItem.image || "/placeholder.svg")}
                  >
                    <img
                      src={selectedPortfolioItem.image || "/placeholder.svg"}
                      alt={selectedPortfolioItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Additional gallery images */}
                  {[1, 2, 3, 4, 5].map((imageIndex) => (
                    <div
                      key={imageIndex}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                        selectedGalleryImage === "/abstract-geometric-shapes.png"
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedGalleryImage("/abstract-geometric-shapes.png")}
                    >
                      <img
                        src="/abstract-geometric-shapes.png"
                        alt={`Gallery image ${imageIndex}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900 text-2xl">{selectedPortfolioItem.title}</h2>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-slate-950">
                      {selectedPortfolioItem.category}
                    </span>
                  </div>
                  <p className="leading-relaxed text-base text-slate-950">{selectedPortfolioItem.description}</p>
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Project Date</h3>
                    <p className="text-slate-950">{selectedPortfolioItem.date}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                    <p className="text-slate-950">{selectedPortfolioItem.duration}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Investment</h3>
                    <p className="text-slate-950">{selectedPortfolioItem.cost}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors bg-primary">
                    Request Similar Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
        <div className="w-full px-[7vw]">
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
