"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Camera,
  MapPin,
  Star,
  Users,
  Wifi,
  Car,
  Coffee,
  Zap,
  Building2,
  CalendarIcon,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Wrench,
  Armchair,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { format } from "date-fns"

// Mock studio data - in a real app, this would come from an API
const studioData = {
  1: {
    id: 1,
    name: "Luxe Media Studio",
    type: "photography",
    rating: 4.9,
    reviews: 84,
    location: "Downtown Austin, TX",
    address: "123 Creative Drive, Austin, TX 78701",
    hourlyRate: 75,
    halfDayRate: 300,
    fullDayRate: 500,
    images: [
      "/modern-photography-studio-with-professional-lighti.png",
      "/photography-studio-backdrop-area-with-various-back.png",
      "/studio-equipment-room-with-cameras-and-lighting.png",
      "/comfortable-client-waiting-area-in-photography-stu.png",
    ],
    amenities: [
      "Professional Lighting System",
      "Backdrop Collection (10+ options)",
      "High-Speed WiFi",
      "Free Parking",
      "Coffee & Refreshments",
      "Changing Room",
      "Equipment Storage",
      "Climate Control",
    ],
    size: "1,200 sq ft",
    capacity: 8,
    description:
      "Luxe Media Studio is a premier photography space in the heart of downtown Austin. Our studio features state-of-the-art lighting equipment, a diverse collection of backdrops, and all the amenities you need for a successful shoot. Perfect for real estate photography, headshots, product photography, and more.",
    rules: [
      "No smoking inside the studio",
      "Clean up after use",
      "Maximum capacity: 8 people",
      "Equipment must be handled with care",
      "Additional fees apply for damages",
    ],
    phone: "(512) 555-0123",
    email: "booking@luxemediastudio.com",
    availability: {
      "2024-01-15": ["9:00 AM", "1:00 PM", "5:00 PM"],
      "2024-01-16": ["10:00 AM", "2:00 PM"],
      "2024-01-17": ["9:00 AM", "11:00 AM", "3:00 PM", "6:00 PM"],
      "2024-01-18": ["8:00 AM", "12:00 PM", "4:00 PM"],
      "2024-01-19": ["9:00 AM", "1:00 PM", "5:00 PM"],
    },
  },
  2: {
    id: 2,
    name: "Skyline Video Productions",
    type: "videography",
    rating: 4.8,
    reviews: 67,
    location: "East Austin, TX",
    address: "456 Production Way, Austin, TX 78702",
    hourlyRate: 85,
    halfDayRate: 350,
    fullDayRate: 600,
    images: [
      "/drone-aerial-real-estate-video.png",
      "/real-estate-video-walkthrough.png",
      "/3d-virtual-tour-real-estate.png",
      "/luxury-home-exterior.png",
    ],
    amenities: [
      "4K Video Equipment",
      "Drone Technology",
      "Professional Audio Setup",
      "Free Parking",
      "Coffee & Refreshments",
      "Editing Suite Access",
      "Green Screen Setup",
      "Climate Control",
    ],
    size: "1,500 sq ft",
    capacity: 10,
    description:
      "Skyline Video Productions specializes in high-end video content creation for real estate and commercial projects. Our state-of-the-art facility features 4K video equipment, drone technology, and professional audio setup. Perfect for property walkthroughs, promotional videos, virtual tours, and commercial content creation.",
    rules: [
      "No smoking inside the studio",
      "Clean up after use",
      "Maximum capacity: 10 people",
      "Equipment must be handled with care",
      "Additional fees apply for damages",
    ],
    phone: "(512) 555-0456",
    email: "booking@skylinevideoproductions.com",
    availability: {
      "2024-01-15": ["8:00 AM", "12:00 PM", "4:00 PM"],
      "2024-01-16": ["9:00 AM", "1:00 PM", "6:00 PM"],
      "2024-01-17": ["10:00 AM", "2:00 PM", "5:00 PM"],
      "2024-01-18": ["8:00 AM", "11:00 AM", "3:00 PM"],
      "2024-01-19": ["9:00 AM", "12:00 PM", "4:00 PM"],
    },
  },
}

const amenityIcons = {
  "Professional Lighting System": Zap,
  "Backdrop Collection (10+ options)": Camera,
  "High-Speed WiFi": Wifi,
  "Free Parking": Car,
  "Coffee & Refreshments": Coffee,
  "Changing Room": Building2,
  "Equipment Storage": Building2,
  "Climate Control": Building2,
  "4K Video Equipment": Camera,
  "Drone Technology": Zap,
  "Professional Audio Setup": Zap,
  "Editing Suite Access": Building2,
  "Green Screen Setup": Camera,
}

export default function StudioBookingPage() {
  const params = useParams()
  const studioId = Number.parseInt(params.id as string)
  const studio = studioData[studioId as keyof typeof studioData]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [duration, setDuration] = useState("2")
  const [bookingType, setBookingType] = useState("hourly")
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientCompany, setClientCompany] = useState("")
  const [bookingPurpose, setBookingPurpose] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState("")
  const [projectDetails, setProjectDetails] = useState("")

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getAvailableTimes = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return studio.availability[dateStr] || []
  }

  const calculateTotal = () => {
    if (bookingType === "hourly") {
      return studio.hourlyRate * Number.parseInt(duration)
    } else if (bookingType === "half-day") {
      return studio.halfDayRate
    } else {
      return studio.fullDayRate
    }
  }

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return selectedDate && selectedTime && bookingType && (bookingType !== "hourly" || duration)
      case 2:
        return clientName && clientEmail && clientPhone
      case 3:
        return bookingPurpose && numberOfPeople
      case 4:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#F37521] text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-bold text-[#273F4F]">Date & Time Selection</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] transition-colors bg-transparent"
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-[#03809C]" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Available Times *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime} disabled={!selectedDate}>
                  <SelectTrigger className="border-2 border-[#03809C]/20 hover:border-[#03809C] transition-colors h-16">
                    <SelectValue placeholder={selectedDate ? "Select time" : "Select date first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDate &&
                      getAvailableTimes(selectedDate).map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Booking Duration *</Label>
                <Select value={bookingType} onValueChange={setBookingType}>
                  <SelectTrigger className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="half-day">Half Day (4 hours)</SelectItem>
                    <SelectItem value="full-day">Full Day (8 hours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {bookingType === "hourly" && (
                <div className="space-y-2">
                  <Label className="text-[#273F4F] font-semibold">Number of Hours *</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] focus:border-[#03809C] transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F37521] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#273F4F]">Contact Information</h3>
                <p className="text-[#273F4F]/70">Provide your contact details for booking confirmation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Full Name *</Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] focus:border-[#03809C] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Email Address *</Label>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] focus:border-[#03809C] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Phone Number *</Label>
                <Input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] focus:border-[#03809C] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Company/Organization</Label>
                <Input
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="Your company name (optional)"
                  className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] focus:border-[#03809C] transition-colors"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F37521] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#273F4F]">Booking Details</h3>
                <p className="text-[#273F4F]/70">Tell us more about your session requirements</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Purpose of Booking *</Label>
                <Select value={bookingPurpose} onValueChange={setBookingPurpose}>
                  <SelectTrigger className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] transition-colors">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photoshoot">Photography Session</SelectItem>
                    <SelectItem value="video">Video Production</SelectItem>
                    <SelectItem value="podcast">Podcast Recording</SelectItem>
                    <SelectItem value="meeting">Business Meeting</SelectItem>
                    <SelectItem value="workshop">Workshop/Training</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#273F4F] font-semibold">Number of People *</Label>
                <Select value={numberOfPeople} onValueChange={setNumberOfPeople}>
                  <SelectTrigger className="h-16 border-2 border-[#03809C]/20 hover:border-[#03809C] transition-colors">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 people</SelectItem>
                    <SelectItem value="3-4">3-4 people</SelectItem>
                    <SelectItem value="5-6">5-6 people</SelectItem>
                    <SelectItem value="7-8">7-8 people</SelectItem>
                    <SelectItem value="9-10">9-10 people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#273F4F] font-semibold">Special Requests & Additional Information</Label>
              <Textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Please describe any special setup requirements, equipment needs, or other requests that would help us prepare for your session..."
                rows={6}
                className="border-2 border-[#03809C]/20 hover:border-[#03809C] focus:border-[#03809C] transition-colors resize-none"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F37521] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#273F4F]">Review & Confirm</h3>
                <p className="text-[#273F4F]/70">Please review your booking details before confirming</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FCEBDC]/30 to-[#03809C]/10 rounded-xl p-6 border border-[#03809C]/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#273F4F] mb-3">Booking Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Studio:</span>
                      <span className="font-medium text-[#273F4F]">{studio.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Date:</span>
                      <span className="font-medium text-[#273F4F]">
                        {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Time:</span>
                      <span className="font-medium text-[#273F4F]">{selectedTime || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Duration:</span>
                      <span className="font-medium text-[#273F4F]">
                        {bookingType === "hourly"
                          ? `${duration} hours`
                          : bookingType === "half-day"
                            ? "Half Day (4hrs)"
                            : "Full Day (8hrs)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Purpose:</span>
                      <span className="font-medium text-[#273F4F]">{bookingPurpose || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">People:</span>
                      <span className="font-medium text-[#273F4F]">{numberOfPeople || "Not specified"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#273F4F] mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Name:</span>
                      <span className="font-medium text-[#273F4F]">{clientName || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Email:</span>
                      <span className="font-medium text-[#273F4F]">{clientEmail || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Phone:</span>
                      <span className="font-medium text-[#273F4F]">{clientPhone || "Not provided"}</span>
                    </div>
                    {clientCompany && (
                      <div className="flex justify-between">
                        <span className="text-[#273F4F]/70">Company:</span>
                        <span className="font-medium text-[#273F4F]">{clientCompany}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-[#03809C]/20 my-4" />

                  <h4 className="font-semibold text-[#273F4F] mb-3">Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#273F4F]/70">Base Rate:</span>
                      <span className="font-medium text-[#273F4F]">
                        $
                        {bookingType === "hourly"
                          ? `${studio.hourlyRate}/hr`
                          : bookingType === "half-day"
                            ? studio.halfDayRate
                            : studio.fullDayRate}
                      </span>
                    </div>
                    {bookingType === "hourly" && (
                      <div className="flex justify-between">
                        <span className="text-[#273F4F]/70">Hours:</span>
                        <span className="font-medium text-[#273F4F]">{duration}</span>
                      </div>
                    )}
                    <Separator className="bg-[#03809C]/20 my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-[#273F4F]">Total:</span>
                      <span className="text-[#F37521]">${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!studio) {
    return <div>Studio not found</div>
  }

  return (
    <div className="min-h-screen bg-background my-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 bg-white py-0">
        <div className="w-full px-[7vw] py-4 pt-0 my-0">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pt-20"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Studios
          </Link>
        </div>
      </section>

      <div className="w-full px-[7vw] py-0 mb-16">
        <div className="space-y-12">
          {/* 1. Studio Details (Top Section) */}
          <section className="space-y-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground">{studio.name}</h1>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                        <span className="font-medium">{studio.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">({studio.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        Up to {studio.capacity} people
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos/Virtual Tour */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Studio Showcase</h2>
              <div className="relative">
                <img
                  src={studio.images[selectedImage] || "/placeholder.svg"}
                  alt={`${studio.name} - Image ${selectedImage + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {studio.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${studio.name} - Thumbnail ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                      selectedImage === index ? "opacity-100 ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Description moved below carousel image */}
            <div>
              <p className="text-muted-foreground leading-relaxed text-base">{studio.description}</p>
            </div>

            {/* Location & Directions */}
            <div className="space-y-8">
              <Card className="border-2 border-[#03809C]/20 hover:border-[#03809C] transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-[#03809C]/5 bg-white shadow-none border border-[rgba(3,128,156,0.44565217391304346)]">
                <CardHeader className="bg-gradient-to-r from-[#03809C] to-[#273F4F] text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white">
                    Studio Location & Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 py-0">
                  <div className="flex flex-col md:flex-row gap-0 mt-[-10px]">
                    {/* Left side: Location & Operating Hours */}
                    <div className="w-full md:w-[35%] space-y-6 mt-0">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-[#273F4F] text-lg flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-[#03809C]" />
                          Location & Directions
                        </h4>
                        <div className="space-y-2 text-[#273F4F]/80">
                          <p className="font-medium">{studio.address}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-[#273F4F] text-lg flex items-center gap-2">
                          <Clock className="h-5 w-5 text-[#03809C]" />
                          Operating Hours
                        </h4>
                        <div className="space-y-1 text-[#273F4F]/80">
                          <div className="flex gap-2">
                            <span className="text-[#273F4F]">Monday - Friday:</span>
                            <span>9:00 AM - 10:00 PM</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-[#273F4F]">Saturday:</span>
                            <span>8:00 AM - 11:00 PM</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-[#273F4F]">Sunday:</span>
                            <span>10:00 AM - 8:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Map */}
                    <div className="w-full md:w-[65%]">
                      <div className="w-full bg-gradient-to-br from-[#03809C]/10 to-[#273F4F]/10 rounded-lg shadow-sm flex items-center justify-center border-2 border-dashed border-[#03809C]/30 h-60">
                        <div className="text-center text-[#273F4F]/60">
                          <div className="text-4xl mb-2">📍</div>
                          <div className="font-medium">Map Placeholder</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 2. Availability & Calendar + 3. Pricing Information */}
            <section className="space-y-6">{/* Pricing Information */}</section>

            {/* 4. Equipment & Facilities */}
            <section className="space-y-8">
              <Card className="border-2 border-[#03809C]/20 hover:border-[#03809C] transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-[#03809C]/5 bg-white shadow-none border border-[rgba(252,235,220,1)]">
                <CardHeader className="bg-gradient-to-r from-[#03809C] to-[#273F4F] text-white rounded-t-lg">
                  <CardTitle className="flex gap-3 justify-start text-white text-left text-2xl font-bold">
                    Studio Equipment & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 pb-0">
                  <div className="grid grid-cols-4 gap-6">
                    {studio.amenities.slice(0, 8).map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || CheckCircle
                      return (
                        <div
                          key={amenity}
                          className="flex flex-col items-center gap-3 p-4 rounded-xl hover:shadow-lg transition-all duration-300 border-[#273F4F]/10 hover:border-[#03809C]/30 shadow-none border-0 bg-[rgba(252,235,220,0.31521739130434784)]"
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(252,235,220,1)] text-[rgba(39,63,79,1)] border-white border-2 ${
                              index % 2 === 0 ? "bg-[#03809C]" : "bg-[#F37521]"
                            }`}
                          >
                            <IconComponent className="h-6 w-6 text-[rgba(39,63,79,1)]" />
                          </div>
                          <span className="font-medium text-[#273F4F] text-sm text-center">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#F37521]/20 hover:border-[#F37521] transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-[#F37521]/5 bg-white shadow-none border border-[rgba(242,117,34,0.4673913043478261)]">
                <CardHeader className="bg-gradient-to-r from-[#F37521] to-[#F2A16D] text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 justify-start text-white text-2xl font-bold">
                    Optional Add-ons
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 py-0">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Additional Lighting Kit", price: 25, icon: Lightbulb },
                      { name: "Professional Camera", price: 50, icon: Camera },
                      { name: "Technical Support", price: 40, icon: Wrench },
                      { name: "Props & Furniture", price: 15, icon: Armchair },
                    ].map((addon) => (
                      <div
                        key={addon.name}
                        className="flex justify-between items-center p-3 bg-[#F37521]/5 rounded-lg hover:bg-[#F37521]/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#F37521]/20 rounded-full flex items-center justify-center border-2 border-white bg-[rgba(242,117,34,0.5)]">
                            <addon.icon className="w-4 text-[#F37521] h-4 text-white" />
                          </div>
                          <span className="font-medium text-[#273F4F]">{addon.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#F37521]">+${addon.price}</span>
                          <span className="text-sm text-[#273F4F]/60">/hour</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 5. Booking Form - Multi-Step with Progress Bar */}
            <section className="space-y-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#273F4F] mb-4">Complete Your Booking</h2>
                <p className="text-[#273F4F]/70 text-lg max-w-2xl mx-auto">
                  Fill out the form below to reserve your studio session. We'll confirm your booking within 24 hours.
                </p>
              </div>

              <div className="w-full">
                <Card className="border-2 border-[#03809C]/20 shadow-xl bg-white">
                  <CardHeader className="bg-[#273F4F] text-white rounded-t-lg py-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-3">
                          <CalendarIcon className="h-6 w-6" />
                          Booking Information
                        </CardTitle>
                        <p className="text-white/90 mt-1">
                          Step {currentStep} of {totalSteps}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{Math.round(getProgressPercentage())}%</div>
                        <div className="text-sm text-white/80">Complete</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="w-full bg-white/20 rounded-full h-3">
                        <div
                          className="bg-[#F37521] h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-3 text-xs text-white/80">
                        <span>Date & Time</span>
                        <span>Contact Info</span>
                        <span>Details</span>
                        <span>Review</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 bg-white">
                    <div className="flex justify-center mb-8"></div>

                    <div className="min-h-[400px] h-auto">{renderStepContent()}</div>

                    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-[#03809C] text-[#03809C] hover:bg-[#03809C] hover:text-white transition-all duration-300 bg-transparent"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      {currentStep < totalSteps ? (
                        <Button
                          onClick={nextStep}
                          disabled={!isStepValid(currentStep)}
                          className="flex items-center gap-2 px-8 py-3 bg-[#F37521] hover:bg-[#F37521]/90 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-[#F37521] to-[#F2A16D] hover:from-[#F37521]/90 hover:to-[#F2A16D]/90 text-[#273F4F] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          Complete Booking - ${calculateTotal()}
                        </Button>
                      )}
                    </div>

                    {currentStep === totalSteps && (
                      <>
                        <p className="text-sm text-[#273F4F]/60 text-center max-w-md mx-auto mt-4">
                          You won't be charged until your booking is confirmed by the studio. We'll send you a
                          confirmation email within 24 hours.
                        </p>

                        <Separator className="bg-[#03809C]/20 my-6" />

                        {/* Contact Studio */}
                        <div className="text-center space-y-4 bg-[#273F4F]/5 rounded-xl p-6">
                          <h4 className="font-bold text-[#273F4F] text-lg">Need Help? Contact the Studio</h4>
                          <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <div className="flex items-center justify-center gap-2 text-sm">
                              <div className="w-8 h-8 bg-[#03809C] rounded-full flex items-center justify-center">
                                <Phone className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-medium text-[#273F4F]">{studio.phone}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm">
                              <div className="w-8 h-8 bg-[#F37521] rounded-full flex items-center justify-center">
                                <Mail className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-medium text-[#273F4F]">{studio.email}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          </section>
        </div>
      </div>

      <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
        <div className="w-full px-[7vw]">
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
            <p>&copy; 2024 KW Chief Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
