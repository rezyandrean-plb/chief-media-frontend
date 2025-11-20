"use client"

import { useEffect, useMemo, useState, type MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Camera, Wifi, Car, Coffee, Zap, Building2, Calendar, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type StudioCardData = {
  id: string
  name: string
  type: string
  rating: number
  reviews: number
  location: string
  hourlyRate: number
  image: string
  amenities: string[]
  size: string
  capacity: number
  availability: string
  featured?: boolean
}

type ApiStudio = {
  id: string
  name: string
  location: string
  hourlyRate: number
  description?: string | null
  capacity?: number | null
  photos?: string[] | null
  amenities?: string[] | null
  size?: string | null
  status?: string | null
}

const studioTypes = [
  {
    id: "photography",
    name: "Photography Studios",
    icon: Camera,
    description: "Professional photo studios with lighting",
    count: 12,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "video",
    name: "Video Production",
    icon: Building2,
    description: "Video studios with equipment",
    count: 8,
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: "multipurpose",
    name: "Multi-Purpose Studios",
    icon: Zap,
    description: "Flexible spaces for all media types",
    count: 15,
    color: "bg-accent/20 text-accent-foreground",
  },
]

const featuredStudios: StudioCardData[] = [
  {
    id: "featured-1",
    name: "Luxe Media Studio",
    type: "photography",
    rating: 4.9,
    reviews: 84,
    location: "Downtown Austin, TX",
    hourlyRate: 75,
    image: "/modern-photography-studio-with-professional-lighti.png",
    amenities: ["Professional Lighting", "Backdrop Collection", "WiFi", "Parking", "Coffee"],
    size: "1,200 sq ft",
    capacity: 8,
    availability: "Available Today",
    featured: true,
  },
  {
    id: "featured-2",
    name: "Skyline Video Productions",
    type: "video",
    rating: 4.8,
    reviews: 67,
    location: "Dallas, TX",
    hourlyRate: 120,
    image: "/professional-video-production-studio-with-cameras.png",
    amenities: ["4K Cameras", "Green Screen", "Audio Equipment", "WiFi", "Parking"],
    size: "2,000 sq ft",
    capacity: 12,
    availability: "Available Tomorrow",
  },
]

const amenityIcons = {
  "Professional Lighting": Zap,
  "Backdrop Collection": Camera,
  WiFi: Wifi,
  Parking: Car,
  Coffee: Coffee,
  "4K Cameras": Camera,
  "Green Screen": Building2,
  "Audio Equipment": Building2,
  "Flexible Setup": Building2,
  "Lighting Kit": Zap,
  Kitchen: Coffee,
  "Natural Light": Building2,
  "Studio Lighting": Zap,
  Props: Building2,
  "Cinema Cameras": Camera,
  "Lighting Grid": Zap,
  "Sound Booth": Building2,
  Catering: Coffee,
  "Flexible Layout": Building2,
  "Basic Lighting": Zap,
}

export default function StudiosPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [studios, setStudios] = useState<StudioCardData[]>(featuredStudios)
  const [isLoadingStudios, setIsLoadingStudios] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [isScrolled, setIsScrolled] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false)
  const [showTermsConditions, setShowTermsConditions] = useState(false)
  const handleProtectedNavigation = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isAuthenticated) {
      return
    }

    event.preventDefault()
    setPendingRoute(path)
    setShowLoginPrompt(true)
  }

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false)
    router.push("/login")
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const normalizeStudio = (studio: ApiStudio): StudioCardData => {
      const amenities = Array.isArray(studio.amenities) ? studio.amenities.filter(Boolean) : []
      const photos = Array.isArray(studio.photos) ? studio.photos.filter(Boolean) : []

      return {
        id: studio.id,
        name: studio.name,
        type: "multipurpose",
        rating: 0,
        reviews: 0,
        location: studio.location,
        hourlyRate: studio.hourlyRate,
        image: photos[0] || "/modern-photography-studio-with-professional-lighti.png",
        amenities,
        size: studio.size || "Contact for details",
        capacity: studio.capacity ?? 0,
        availability:
          studio.status === "maintenance"
            ? "Under Maintenance"
            : studio.status === "inactive"
              ? "Unavailable"
              : "Available",
      }
    }

    const fetchStudios = async () => {
      try {
        setIsLoadingStudios(true)
        setFetchError(null)

        const response = await fetch("/api/studios", { signal: controller.signal })

        if (!response.ok) {
          throw new Error("Failed to fetch studios")
        }

        const payload = await response.json()
        if (!isMounted) return

        if (Array.isArray(payload?.data) && payload.data.length > 0) {
          setStudios(payload.data.map((studio: ApiStudio) => normalizeStudio(studio)))
        } else {
          setStudios(featuredStudios)
        }
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return
        console.error("[StudiosPage] Error loading studios:", error)

        if (isMounted) {
          setFetchError("Unable to load the latest studios. Showing featured spaces instead.")
          setStudios(featuredStudios)
        }
      } finally {
        if (isMounted) {
          setIsLoadingStudios(false)
        }
      }
    }

    fetchStudios()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const amenities = studio.amenities ?? []
      const matchesSearch =
        studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        amenities.some((amenity) => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesType = selectedType === "all" || studio.type === selectedType
      const matchesLocation =
        selectedLocation === "all" || studio.location.toLowerCase().includes(selectedLocation.toLowerCase())
      return matchesSearch && matchesType && matchesLocation
    })
  }, [searchQuery, selectedLocation, selectedType, studios])

  const sortedStudios = [...filteredStudios].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0)
      case "price-low":
        return a.hourlyRate - b.hourlyRate
      case "price-high":
        return b.hourlyRate - a.hourlyRate
      case "reviews":
        return (b.reviews ?? 0) - (a.reviews ?? 0)
      default:
        return 0
    }
  })

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Using global Header from layout */}
      <section className="relative py-12 lg:py-16 bg-[rgba(39,63,79,1)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full z-30 overflow-hidden py-3">
          <div className="flex animate-scroll whitespace-nowrap">
            <span className="text-white font-semibold text-lg mx-8">
              Limited Time Offer: Free Studio Booking Platform until December 31, 2025!
            </span>
            <span className="text-white font-semibold text-lg mx-8">
              Limited Time Offer: Free Studio Booking Platform until December 31, 2025!
            </span>
            <span className="text-white font-semibold text-lg mx-8">
              Limited Time Offer: Free Studio Booking Platform until December 31, 2025!
            </span>
            <span className="text-white font-semibold text-lg mx-8">
              Limited Time Offer: Free Studio Booking Platform until December 31, 2025!
            </span>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/william-f-santos--PyYwZf0SP0-unsplash.jpg-5jjzckg63C8uX9xHD7xCK7RD9z7ZzN.jpeg"
            alt="Professional photography studio with lighting equipment"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 py-[-90px] py-0"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-[7vw] mt-5">
          <div className="max-w-2xl mt-0 pt-0">
            <h1 className="mb-6 text-4xl tracking-tight text-white sm:text-5xl font-normal lg:text-5xl">
              Book Premium<span className="block font-normal">Studio Spaces</span>
            </h1>

            <p className="text-lg text-white/90 leading-relaxed mb-[-40px]">
              Access our 2 professional studio spaces equipped with everything you need for exceptional real estate
              content creation. Studio booking platform - free from now till December 31, 2025.
            </p>

            <div className="mb-12"></div>
          </div>
        </div>
      </section>
      {/* Discover Studio Section */}
      <section className="py-20">
        <div className="w-full px-[7vw]">
          <div className="text-center mb-16">
            <div className="inline-block mb-4"></div>
            <h2 className="font-bold text-[#273F4F] mb-6 leading-tight text-slate-950 text-4xl">
              Discover Our{" "}
              <span className="bg-gradient-to-r from-[#F37521] to-[#F2A16D] bg-clip-text text-slate-950">
                Exceptional
              </span>{" "}
              Studios
            </h2>
            <p className="text-[#273F4F]/70 max-w-3xl mx-auto leading-relaxed text-slate-950 text-base">
              Step into professionally designed spaces equipped with cutting-edge technology and premium amenities. Each
              studio is crafted to bring your creative vision to life with unparalleled quality and style.
            </p>
          </div>

          <div className="mt-10">
            {isLoadingStudios ? (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-[#273F4F]/20 p-12 text-[#273F4F]/70">
                Loading latest studios…
              </div>
            ) : sortedStudios.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {sortedStudios.map((studio) => (
                  <div
                    key={studio.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#273F4F]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={studio.image}
                        alt={studio.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-[#273F4F]">
                        {studio.availability}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-[#273F4F]">{studio.name}</h3>
                          <span className="text-sm font-medium text-[#03809C]">${studio.hourlyRate}/hr</span>
                        </div>
                        <p className="text-sm text-[#273F4F]/70">{studio.location}</p>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-[#273F4F]/80">
                        <span>Capacity: {studio.capacity || "—"}</span>
                        <span>Size: {studio.size}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(studio.amenities ?? []).slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity as keyof typeof amenityIcons] ?? Building2
                          return (
                            <span
                              key={`${studio.id}-${amenity}`}
                              className="inline-flex items-center gap-2 rounded-full bg-[#273F4F]/5 px-3 py-1 text-xs font-medium text-[#273F4F]"
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {amenity}
                            </span>
                          )
                        })}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <Link
                          href={`/studios/${studio.id}`}
                          className="text-sm font-semibold text-[#03809C] hover:underline"
                          onClick={(event) => handleProtectedNavigation(event, `/studios/${studio.id}`)}
                        >
                          View details →
                        </Link>
                        <Button className="bg-[#F37521] text-white hover:bg-[#F37521]/90" asChild>
                          <Link
                            href={`/studios/${studio.id}`}
                            onClick={(event) => handleProtectedNavigation(event, `/studios/${studio.id}`)}
                          >
                            Book studio
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-[#273F4F]/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-[#273F4F]">No studios found</h3>
                <p className="text-[#273F4F]/70">Try adjusting your search criteria or browse all types</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent border-[#03809C] text-[#03809C] hover:bg-[#03809C] hover:text-white"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedType("all")
                    setSelectedLocation("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="w-full px-[7vw]">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Header Content */}
            <div className="lg:sticky lg:top-8">
              <div className="mb-12">
                <h2 className="font-bold text-[#273F4F] mb-4 text-slate-950 text-4xl">Frequently Asked Questions</h2>
                <p className="text-[#273F4F]/70 max-w-lg text-slate-950 text-base">
                  Get answers to common questions about booking our studio spaces
                </p>
              </div>

              {/* Still have questions section */}
              <div className="rounded-2xl p-8 border-[#03809C]/20 border-0 bg-background px-8">
                <h3 className="text-2xl font-bold text-[#F37521] mb-1.5">Still have questions?</h3>
                <p className="text-[#273F4F]/70 mb-6 text-slate-950">
                  Our support team is here to help you with your studio booking
                </p>
                <Button
                  size="lg"
                  className="bg-[#03809C] hover:bg-[#03809C]/90 px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 shadow-none bg-primary text-background"
                  asChild
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - FAQ Questions with Simple Lines */}
            <div className="space-y-0">
              {[
                {
                  question: "How do I book a studio space?",
                  answer:
                    "Simply browse our available studios, select your preferred time slot, and complete the booking process. Our platform is completely free to use until December 31, 2025!",
                },
                {
                  question: "What's included with each studio rental?",
                  answer:
                    "Each studio comes fully equipped with professional lighting, backdrop options, WiFi, and parking. Specific amenities vary by location - check each studio's details for the complete list.",
                },
                {
                  question: "Can I cancel or reschedule my booking?",
                  answer:
                    "Yes, you can cancel or reschedule your booking up to 24 hours before your scheduled time without any fees. Same-day changes may incur additional charges.",
                },
                {
                  question: "Are there any additional fees?",
                  answer:
                    "During our promotional period (until Dec 31, 2025), there are no platform fees! You only pay the hourly studio rate. Additional equipment rentals may have separate charges.",
                },
                {
                  question: "What if I need the studio for longer than expected?",
                  answer:
                    "If the studio is available, you can extend your booking on-site. Extensions are charged at the same hourly rate and subject to availability.",
                },
                {
                  question: "Do you provide technical support during shoots?",
                  answer:
                    "Basic technical support is available for all bookings. For complex setups or specialized equipment, we recommend booking our technical assistance service in advance.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-[#273F4F]/10 last:border-b-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left hover:bg-[#FCEBDC]/10 transition-colors duration-200 group py-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-8 text-slate-950">
                        <h3 className="text-[#273F4F] mb-2 group-hover:text-[#03809C] transition-colors font-medium text-lg">
                          {faq.question}
                        </h3>
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            openFaqIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-[#273F4F]/80 leading-relaxed text-base text-slate-950">{faq.answer}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#03809C] flex items-center justify-center font-bold text-lg group-hover:bg-[#F37521] transition-colors duration-300 bg-[rgba(252,235,220,1)] text-[rgba(39,63,79,1)]">
                        {openFaqIndex === index ? "−" : "+"}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="w-full px-[7vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#273F4F] mb-4 text-slate-950">Policies & Terms</h2>
            <p className="text-[#273F4F]/70 max-w-3xl mx-auto text-slate-950 text-base">
              Please review our cancellation policy and terms of service before booking your studio space
            </p>
          </div>

          <div className="flex justify-center gap-8 my-0 mt-[-40px]">
            <Button
              onClick={() => setShowCancellationPolicy(true)}
              className="bg-[#03809C] hover:bg-[#03809C]/90 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-none bg-primary text-background"
            >
              <Calendar className="h-5 w-5 mr-3" />
              Cancellation Policy
            </Button>

            <Button
              onClick={() => setShowTermsConditions(true)}
              className="bg-[#F37521] hover:bg-[#F37521]/90 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-none text-primary bg-background border border-primary"
            >
              <Building2 className="h-5 w-5 mr-3" />
              Terms & Conditions
            </Button>
          </div>
        </div>
      </section>
      {showCancellationPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#03809C] rounded-full flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#273F4F]">Cancellation Policy</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCancellationPolicy(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Free Cancellation</h4>
                <p className="text-[#273F4F]/70">
                  Cancel your booking up to 24 hours before your scheduled time for a full refund with no fees.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Same-Day Cancellation</h4>
                <p className="text-[#273F4F]/70">
                  Cancellations within 24 hours of your booking may incur a 50% cancellation fee.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">No-Show Policy</h4>
                <p className="text-[#273F4F]/70">
                  Failure to show up for your booking without prior notice will result in forfeiture of the full booking
                  amount.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Rescheduling</h4>
                <p className="text-[#273F4F]/70">
                  Free rescheduling is available up to 24 hours before your booking, subject to studio availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTermsConditions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#F37521] rounded-full flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#273F4F]">Terms & Conditions</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTermsConditions(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Studio Usage</h4>
                <p className="text-[#273F4F]/70">
                  Studios must be used for their intended purpose. Commercial photography and videography only.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Equipment Responsibility</h4>
                <p className="text-[#273F4F]/70">
                  Renters are responsible for any damage to studio equipment or facilities during their booking period.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Capacity Limits</h4>
                <p className="text-[#273F4F]/70">
                  Maximum occupancy limits must be strictly observed for safety and insurance compliance.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Clean-Up Policy</h4>
                <p className="text-[#273F4F]/70">
                  Studios must be left in the same condition as found. Additional cleaning fees may apply.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#273F4F] mb-2">Liability</h4>
                <p className="text-[#273F4F]/70">
                  Renters assume full liability for their activities and any injuries that may occur during their
                  booking.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#273F4F]/10">
                <p className="text-sm text-[#273F4F]/60">
                  By booking a studio space, you agree to our full{" "}
                  <Link href="/terms" className="text-[#F37521] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#F37521] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login required</DialogTitle>
            <DialogDescription>
              You need to be logged in to view studio details or request a booking. Logging in lets us keep your requests
              and availability in sync.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm text-[#273F4F]/80">
            <p>
              {pendingRoute
                ? "After you log in, you can come right back and continue with this studio."
                : "Sign in to continue exploring studio availability and bookings."}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              Stay on this page
            </Button>
            <Button onClick={handleLoginRedirect} className="bg-[#03809C] text-white hover:bg-[#03809C]/90">
              Go to login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
