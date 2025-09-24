"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Wifi, Car, Coffee, Zap, Building2, Calendar, X } from "lucide-react"
import Link from "next/link"

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

const featuredStudios = [
  {
    id: 1,
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
    id: 2,
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
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [isScrolled, setIsScrolled] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false)
  const [showTermsConditions, setShowTermsConditions] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredStudios = featuredStudios.filter((studio) => {
    const matchesSearch =
      studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.amenities.some((amenity) => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "all" || studio.type === selectedType
    const matchesLocation = selectedLocation === "all" || studio.location.includes(selectedLocation)
    return matchesSearch && matchesType && matchesLocation
  })

  const sortedStudios = [...filteredStudios].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.hourlyRate - b.hourlyRate
      case "price-high":
        return b.hourlyRate - a.hourlyRate
      case "reviews":
        return b.reviews - a.reviews
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

          <div className="grid md:grid-cols-2 gap-12">
            {/* Flexi Rental Card */}
            <div className="group relative overflow-hidden rounded-md bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-96 overflow-hidden">
                <img
                  src="/modern-photography-studio-with-professional-lighti.png"
                  alt="Professional photography studio with lighting equipment"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">North Studio </h3>
                    </div>
                  </div>

                  <p className="text-lg mb-6 text-white/90">Need a flexi space by the hour/day? Book here.</p>

                  <Button
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-md"
                    asChild
                  >
                    <Link href="/studios/flexi">
                      Book Now
                      <span className="ml-2">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Fixed Rental Card */}
            <div className="group relative overflow-hidden rounded-md bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-96 overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-dummer-aS4Duj2j7r4-unsplash%20%281%29.jpg-OyXrJcDVchT7Sg3CPX8DT3l8BZ9Zmj.jpeg"
                  alt="Professional photography studio with lighting equipment and backdrop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">East Studio </h3>
                    </div>
                  </div>

                  <p className="text-lg mb-6 text-white/90">Need commercial space to expand your business?</p>

                  <Button
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-md"
                    asChild
                  >
                    <Link href="/studios/fixed">
                      Book Now
                      <span className="ml-2">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {sortedStudios.length === 0 && (
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
