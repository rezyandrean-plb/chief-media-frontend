"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Camera,
  Wifi,
  Car,
  Coffee,
  Zap,
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  Users,
  Square,
  CheckCircle,
  ArrowLeft,
  Video,
  Bluetooth,
  Palette,
  User,
  Archive,
  Volume2,
  Layout,
  Clock,
} from "lucide-react"
import Link from "next/link"

const studioData = {
  name: "North Studio",
  type: "Flexi Space",
  rating: 4.9,
  reviews: [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely fantastic studio! The lighting setup is professional grade and the space is incredibly versatile. Perfect for our real estate photography needs.",
    },
    {
      name: "Mike Chen",
      rating: 5,
      date: "1 month ago",
      comment:
        "Great location and excellent facilities. The team was very accommodating and the equipment quality exceeded our expectations.",
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      date: "1 month ago",
      comment:
        "Beautiful studio space with great natural light options. Only minor issue was parking availability during peak hours.",
    },
  ],
  location: "Downtown Austin, TX",
  address: "123 Creative District, Austin, TX 78701",
  phone: "(512) 555-0123",
  email: "north@kwchiefmedia.com",
  hourlyRate: 75,
  size: "1,200 sq ft",
  capacity: 8,
  description:
    "A premium photography and videography studio featuring professional lighting, multiple backdrop options, and state-of-the-art equipment. Perfect for real estate content creation, product photography, and creative projects.",

  openingHours: {
    monday: "8:00 AM - 10:00 PM",
    tuesday: "8:00 AM - 10:00 PM",
    wednesday: "8:00 AM - 10:00 PM",
    thursday: "8:00 AM - 10:00 PM",
    friday: "8:00 AM - 11:00 PM",
    saturday: "9:00 AM - 11:00 PM",
    sunday: "10:00 AM - 8:00 PM",
  },

  facilities: [
    { name: "Professional Lighting Kit", icon: Zap },
    { name: "Backdrop Collection", icon: Camera },
    { name: "High-Speed WiFi", icon: Wifi },
    { name: "Free Parking", icon: Car },
    { name: "Coffee Station", icon: Coffee },
    { name: "Climate Control", icon: CheckCircle },
  ],

  amenities: [
    "4K Video Equipment Available",
    "Wireless Tethering Setup",
    "Props and Styling Accessories",
    "Makeup/Changing Area",
    "Equipment Storage",
    "Sound System",
    "Flexible Layout Options",
    "24/7 Access Available",
  ],

  gallery: [
    "/modern-photography-studio-with-professional-lighti.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-dummer-aS4Duj2j7r4-unsplash%20%281%29.jpg-OyXrJcDVchT7Sg3CPX8DT3l8BZ9Zmj.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/william-f-santos--PyYwZf0SP0-unsplash.jpg-5jjzckg63C8uX9xHD7xCK7RD9z7ZzN.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-dummer-aS4Duj2j7r4-unsplash%20%281%29.jpg-OyXrJcDVchT7Sg3CPX8DT3l8BZ9Zmj.jpeg",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
}

export default function FlexiStudioPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [currentThumbnailPage, setCurrentThumbnailPage] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedReviewImage, setSelectedReviewImage] = useState<string>("")

  const thumbnailsPerPage = 3
  const totalThumbnailPages = Math.ceil(studioData.gallery.length / thumbnailsPerPage)
  const startIndex = currentThumbnailPage * thumbnailsPerPage
  const endIndex = startIndex + thumbnailsPerPage
  const currentThumbnails = studioData.gallery.slice(startIndex, endIndex)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateAvailable = (date: Date) => {
    const unavailableDates = [5, 12, 18, 25, 31]
    return !unavailableDates.includes(date.getDate())
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const filteredReviews = selectedStarFilter
    ? studioData.reviews.filter((review) => review.rating === selectedStarFilter)
    : studioData.reviews

  const ratingDistribution = [
    {
      stars: 5,
      count: studioData.reviews.filter((r) => r.rating === 5).length,
      percentage: (studioData.reviews.filter((r) => r.rating === 5).length / studioData.reviews.length) * 100,
    },
    {
      stars: 4,
      count: studioData.reviews.filter((r) => r.rating === 4).length,
      percentage: (studioData.reviews.filter((r) => r.rating === 4).length / studioData.reviews.length) * 100,
    },
    {
      stars: 3,
      count: studioData.reviews.filter((r) => r.rating === 3).length,
      percentage: (studioData.reviews.filter((r) => r.rating === 3).length / studioData.reviews.length) * 100,
    },
    {
      stars: 2,
      count: studioData.reviews.filter((r) => r.rating === 2).length,
      percentage: (studioData.reviews.filter((r) => r.rating === 2).length / studioData.reviews.length) * 100,
    },
    {
      stars: 1,
      count: studioData.reviews.filter((r) => r.rating === 1).length,
      percentage: (studioData.reviews.filter((r) => r.rating === 1).length / studioData.reviews.length) * 100,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <section className="py-6 bg-white border-b-0 pb-0 pt-12">
        <div className="w-full px-[7vw]">
          <Link
            href="/studios"
            className="inline-flex items-center text-[#03809C] hover:text-[#03809C]/80 transition-colors text-slate-950 text-sm"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Studios
          </Link>
        </div>
      </section>

      {/* Hero Section with Gallery */}
      <section className="py-12 pb-12 pt-5">
        <div className="w-full px-[7vw]">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={studioData.gallery[selectedImage] || "/placeholder.svg"}
                  alt={`${studioData.name} - View ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {currentThumbnails.map((image, index) => {
                  const actualIndex = startIndex + index
                  return (
                    <button
                      key={actualIndex}
                      onClick={() => setSelectedImage(actualIndex)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === actualIndex ? "border-[#03809C]" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${studioData.name} - Thumbnail ${actualIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-center space-x-2 pt-4">
                {Array.from({ length: totalThumbnailPages }).map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => setCurrentThumbnailPage(pageIndex)}
                    className={`rounded-full transition-all duration-200 w-2 h-2 text-slate-950 ${
                      currentThumbnailPage === pageIndex ? "bg-[#03809C] scale-110" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`View thumbnail page ${pageIndex + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Studio Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-[#273F4F] mb-2 text-slate-950">{studioData.name}</h1>
                <p className="text-lg text-[#F37521] font-medium mb-4">{studioData.type}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{studioData.rating}</span>
                    <span className="ml-1 text-slate-950">({studioData.reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-4 pl-2.5">
                    <div className="flex items-center">
                      <Square className="h-4 w-4 text-[#03809C] mr-2" />
                      <span className="text-slate-950 text-sm font-semibold">{studioData.size}</span>
                    </div>
                    <div className="flex items-center pl-3.5">
                      <Users className="h-4 w-4 text-[#03809C] mr-2" />
                      <span className="text-slate-950 text-sm font-semibold">Up to {studioData.capacity} people</span>
                    </div>
                  </div>
                </div>

                <p className="leading-relaxed mb-6 text-slate-950 text-base">{studioData.description}</p>

                <div className="p-6 bg-gradient-to-br from-white to-gray-50/30 rounded-2xl border-gray-100 px-0 border-0 shadow-none py-0 mb-7">
                  <h3 className="text-lg font-semibold text-[#273F4F] mb-4 flex items-center">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center group hover:bg-white/60 p-3 rounded-xl transition-all duration-200 py-0 px-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#03809C]/10 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-[#03809C]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#273F4F] text-slate-950">Address</p>
                        <p className="text-sm text-slate-950">{studioData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center group hover:bg-white/60 p-3 rounded-xl transition-all duration-200 py-0 px-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#03809C]/10 rounded-full flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-[#03809C]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#273F4F] text-slate-950">Phone</p>
                        <p className="text-sm text-slate-950">{studioData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center group hover:bg-white/60 p-3 rounded-xl transition-all duration-200 py-0 px-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#03809C]/10 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-[#03809C]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#273F4F] text-slate-950">Email</p>
                        <p className="text-sm text-slate-950">{studioData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FCEBDC]/30 rounded-lg p-6">
                  <div className="text-3xl font-bold text-[#273F4F] mb-2 text-slate-950">
                    ${studioData.hourlyRate}/hour
                  </div>
                  <p className="text-[#273F4F] mb-2 text-slate-950 font-normal text-base">
                    Free platform until Dec 31, 2025
                  </p>
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-[#03809C] hover:bg-[#03809C]/90 text-white py-3 text-lg font-semibold bg-primary"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours & Availability */}
      <section className="py-12 pt-0">
        <div className="w-full px-[7vw] pt-12">
          <h2 className="text-2xl font-bold text-[#273F4F] mb-6 text-slate-950">Opening Hours & Availability</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Opening Hours */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-none">
              <div className="p-6 border-0 shadow-none rounded-md">
                <h3 className="text-lg font-semibold text-[#273F4F] mb-4 text-slate-950">Studio Hours</h3>
                <div className="grid gap-3.5">
                  <div className="flex justify-between items-center py-3 px-4 hover:bg-gray-100 transition-colors rounded-md bg-transparent border-b">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Monday</span>
                    <span className="text-slate-950 font-normal">8:00 AM - 10:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors border-0 border-b bg-transparent">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Tuesday</span>
                    <span className="text-slate-950 font-normal">8:00 AM - 10:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors bg-transparent border-b">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Wednesday</span>
                    <span className="text-slate-950 font-normal">8:00 AM - 10:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors border-b bg-transparent">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Thursday</span>
                    <span className="text-slate-950 font-normal">8:00 AM - 10:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors bg-transparent border-b">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Friday</span>
                    <span className="text-slate-950 font-normal">8:00 AM - 11:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors border-b bg-transparent">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Saturday</span>
                    <span className="text-slate-950 text-left font-normal">9:00 AM - 11:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors bg-transparent border-b-0">
                    <span className="text-[#273F4F] text-slate-950 font-normal">Sunday</span>
                    <span className="text-slate-950 font-normal">10:00 AM - 8:00 PM</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 text-center mt-2.5">
                  <p className="text-sm text-gray-600">Extended hours available by appointment</p>
                </div>
              </div>
            </div>

            {/* Availability Calendar */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-none">
              <div className="p-6 shadow-none border-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#273F4F] text-slate-950">Availability Calendar</h3>
                  <div className="flex items-center space-x-2 text-slate-950">
                    <button
                      onClick={() => navigateMonth("prev")}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 text-slate-950" />
                    </button>
                    <span className="text-sm font-medium text-[#273F4F] min-w-[120px] text-center text-slate-950">
                      {formatMonth(currentMonth)}
                    </span>
                    <button
                      onClick={() => navigateMonth("next")}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 rotate-180 text-slate-950" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  ))}

                  {/* Calendar days */}
                  {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1)
                    const isAvailable = isDateAvailable(date)
                    const isPast = isPastDate(date)
                    const isSelected = selectedDate?.toDateString() === date.toDateString()

                    return (
                      <button
                        key={index + 1}
                        onClick={() => !isPast && setSelectedDate(date)}
                        disabled={isPast}
                        className={`aspect-square text-sm rounded-lg transition-all ${
                          isPast
                            ? "text-gray-300 cursor-not-allowed"
                            : isSelected
                              ? "bg-[#03809C] text-white"
                              : isAvailable
                                ? "hover:bg-[#03809C]/10 text-slate-950"
                                : "bg-red-50 text-red-400 cursor-not-allowed"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-[#03809C] rounded"></div>
                      <span className="text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-100 rounded"></div>
                      <span className="text-gray-600">Booked</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gray-200 rounded"></div>
                      <span className="text-gray-600">Past</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Amenities */}
      <section className="py-12 bg-gray-50">
        <div className="w-full px-[7vw]">
          <h2 className="text-2xl font-bold text-[#273F4F] mb-8 text-slate-950">Facilities & Amenities</h2>
          <p className="text-slate-950 mb-8 leading-relaxed text-base mt-[-20px]">
            Everything you need for professional content creation, from high-end equipment to comfort amenities.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {studioData.facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border-gray-100 border-0 shadow-xs">
                <div className="flex items-center space-x-3">
                  <facility.icon className="h-5 w-5 text-[#03809C]" />
                  <span className="text-[#273F4F] text-slate-950 font-normal">{facility.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[-15px]">
            {studioData.amenities.map((amenity, index) => {
              const getAmenityIcon = (amenityText: string) => {
                if (amenityText.includes("4K Video Equipment")) return Video
                if (amenityText.includes("Wireless Tethering")) return Bluetooth
                if (amenityText.includes("Props and Styling")) return Palette
                if (amenityText.includes("Makeup/Changing")) return User
                if (amenityText.includes("Equipment Storage")) return Archive
                if (amenityText.includes("Sound System")) return Volume2
                if (amenityText.includes("Flexible Layout")) return Layout
                if (amenityText.includes("24/7 Access")) return Clock
                return CheckCircle // fallback
              }

              const IconComponent = getAmenityIcon(amenity)

              return (
                <div key={index} className="flex items-center space-x-2 bg-white rounded-lg p-3 border-gray-100 py-4 border-0 shadow-xs px-4">
                  <IconComponent className="text-[#03809C] flex-shrink-0 h-5 w-5" />
                  <span className="text-[#273F4F] text-slate-950 text-base">{amenity}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12">
        <div className="w-full px-[7vw]">
          <div className="flex items-center mb-8 justify-start">
            <h2 className="text-3xl font-bold text-slate-950">Reviews</h2>
            <div className="flex items-center space-x-2 pl-5">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <span className="text-2xl font-bold text-slate-950">4.7</span>
            </div>
          </div>

          <p className="text-lg text-slate-950 mb-8">
            {selectedStarFilter ? filteredReviews.length : studioData.reviews.length} reviews for this Studio
            {selectedStarFilter && (
              <span className="ml-2 text-sm text-gray-600">
                (filtered by {selectedStarFilter} star{selectedStarFilter !== 1 ? "s" : ""})
              </span>
            )}
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedStarFilter(selectedStarFilter === rating.stars ? null : rating.stars)}
                      className={`text-sm font-medium w-16 text-left hover:text-[#03809C] transition-colors ${
                        selectedStarFilter === rating.stars ? "text-[#03809C] font-semibold" : "text-slate-950"
                      }`}
                    >
                      {rating.stars} Stars
                    </button>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${rating.percentage}%` }} />
                    </div>
                    <span className="text-sm text-slate-950 w-8">({rating.count})</span>
                  </div>
                ))}
              </div>

              {/* Clear filter button */}
              {selectedStarFilter && (
                <button
                  onClick={() => setSelectedStarFilter(null)}
                  className="text-sm text-[#03809C] hover:text-[#03809C]/80 transition-colors"
                >
                  Clear filter
                </button>
              )}

              {/* Search Reviews */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reviews"
                  className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03809C] focus:border-transparent py-2"
                />
              </div>

              {/* Filter Options */}
              <div className="flex items-center justify-between">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03809C] focus:border-transparent">
                  <option>Most relevant</option>
                  <option>Most recent</option>
                  <option>Highest rated</option>
                  <option>Lowest rated</option>
                </select>
                <label className="flex items-center space-x-2 text-sm text-slate-950">
                  <input type="checkbox" className="rounded" />
                  <span>Only show reviews with files (1)</span>
                </label>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {filteredReviews.map((review, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 shadow-none">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-950">{review.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-slate-950 mb-4">{review.comment}</p>

                    {/* Sample attached images */}
                    {index === 0 && (
                      <div className="flex space-x-2">
                        {[
                          "/placeholder.svg?height=64&width=64",
                          "/placeholder.svg?height=64&width=64",
                          "/placeholder.svg?height=64&width=64",
                        ].map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => {
                              setSelectedReviewImage(img)
                              setShowImageModal(true)
                            }}
                            className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Review image ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {filteredReviews.length === 0 && selectedStarFilter && (
                  <div className="text-center py-8 text-gray-500">
                    No reviews found with {selectedStarFilter} star{selectedStarFilter !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-950 mb-6">Rating Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-950">Studio communication level</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-950">Quality of facilities</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-950">Value for money</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-[#273F4F] mb-4">Book {studioData.name}</h3>
            <p className="text-gray-600 mb-6">
              Contact us to check availability and complete your booking for this premium studio space.
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-[#03809C] hover:bg-[#03809C]/90 text-white py-3" asChild>
                <Link href="/contact">Contact to Book</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowBookingModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal for review images */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
            <img
              src={selectedReviewImage || "/placeholder.svg"}
              alt="Review image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
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
