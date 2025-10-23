"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  Camera,
  Users,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Shield,
  Play,
  Target,
  Zap,
  Globe,
  Search,
  Package,
  Star,
} from "lucide-react"

const vendorBenefits = [
  {
    icon: Target,
    title: "Take Control of Your Career",
    description:
      "Choose your clients, set your rates, and work on projects that align with your expertise and passion in real estate media",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    title: "Premium Earnings (85% Retention)",
    description: "Industry-leading fee structure - keep more of what you earn with transparent, low platform fees",
    color: "text-cta-accent",
  },
  {
    icon: Users,
    title: "Build Lasting Relationships",
    description:
      "Create a predictable pipeline of repeat clients and referrals through our relationship-focused platform",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Work Your Way",
    description: "Apply for jobs or have clients come to you. Complete flexibility with hourly or project-based work",
    color: "text-cta-accent",
  },
  {
    icon: Shield,
    title: "Secure & Protected",
    description: "Guaranteed payments, built-in dispute resolution, and comprehensive vendor protection policies",
    color: "text-primary",
  },
  {
    icon: Globe,
    title: "Connect & Engage",
    description: "Learn, share information, and build your community with like-minded real estate media professionals",
    color: "text-cta-accent",
  },
]

const earningPaths = [
  {
    title: "Browse & Apply for Jobs",
    description: "Search and apply for specific projects posted by real estate professionals",
    features: [
      "Hourly & fixed-price projects",
      "Detailed project requirements",
      "Direct client communication",
      "Competitive proposals",
    ],
    icon: Search,
    steps: [
      { title: "Create Profile", desc: "Showcase your skills and portfolio" },
      { title: "Search Jobs", desc: "Find projects that match your expertise" },
      { title: "Submit Proposal", desc: "Set your rate and pitch your services" },
      { title: "Get Contract", desc: "Start working when client accepts" },
      { title: "Complete Work", desc: "Deliver quality results on time" },
      { title: "Get Paid", desc: "Receive secure payment upon approval" },
    ],
  },
  {
    title: "Create Service Packages",
    description: "Create pre-defined service packages that clients can purchase directly",
    features: [
      "Set your own pricing tiers",
      "Pre-defined deliverables",
      "Faster booking process",
      "Recurring client relationships",
    ],
    icon: Package,
    steps: [
      { title: "Create Package", desc: "Define your service offering" },
      { title: "Package Review", desc: "We review for quality standards" },
      { title: "Get Orders", desc: "Clients purchase your packages" },
      { title: "Complete Work", desc: "Deliver according to package terms" },
      { title: "Get Paid", desc: "Automatic payment upon completion" },
    ],
  },
]

const applicationSteps = [
  {
    step: 1,
    title: "Create Your Profile",
    description: "Showcase your skills, experience, and portfolio to stand out to potential clients",
    icon: Camera,
  },
  {
    step: 2,
    title: "Get Verified",
    description: "Quick portfolio review and background verification to maintain platform quality",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Start Earning",
    description: "Browse opportunities or let clients find you - multiple ways to connect and earn",
    icon: TrendingUp,
  },
  {
    step: 4,
    title: "Get Paid Securely",
    description: "Receive payments weekly with full protection and transparent fee structure",
    icon: Shield,
  },
]

const serviceCategories = [
  { name: "Real Estate Photography", jobs: "500+ projects weekly", icon: Camera },
  { name: "Drone & Aerial Services", jobs: "300+ projects weekly", icon: Play },
  { name: "3D Virtual Tours", jobs: "200+ projects weekly", icon: Globe },
  { name: "Video Walkthroughs", jobs: "250+ projects weekly", icon: Play },
  { name: "Floor Plans & Staging", jobs: "150+ projects weekly", icon: Target },
  { name: "Commercial Photography", jobs: "100+ projects weekly", icon: Camera },
]

const vendorTestimonials = [
  {
    name: "Jane Doe",
    role: "Real Estate Photographer",
    rating: 5,
    content:
      "Chief Media has been a game-changer for my business. The platform connects me with high-quality clients and the payment process is seamless.",
    badge: "Top Vendor",
    earnings: "$50,000+",
    projects: "100+ projects completed",
    avatar: "https://example.com/jane-doe.jpg",
  },
  {
    name: "Mike Smith",
    role: "Drone Operator",
    rating: 4,
    content:
      "I love the flexibility Chief Media offers. I can work on projects that interest me and earn a steady income.",
    badge: "Active Vendor",
    earnings: "$30,000+",
    projects: "80+ projects completed",
    avatar: "https://example.com/mike-smith.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "3D Tour Creator",
    rating: 5,
    content:
      "Chief Media's community is fantastic. I've learned so much from other vendors and it's helped me grow my business.",
    badge: "New Vendor",
    earnings: "$20,000+",
    projects: "50+ projects completed",
    avatar: "https://example.com/sarah-johnson.jpg",
  },
  {
    name: "David Chen",
    role: "Video Production Specialist",
    rating: 5,
    content:
      "The quality of clients on Chief Media is exceptional. I've built long-term relationships that have transformed my business.",
    badge: "Elite Vendor",
    earnings: "$75,000+",
    projects: "150+ projects completed",
    avatar: "https://example.com/david-chen.jpg",
  },
  {
    name: "Lisa Rodriguez",
    role: "Virtual Staging Expert",
    rating: 5,
    content:
      "Chief Media's platform makes it easy to showcase my work and connect with agents who value professional staging.",
    badge: "Featured Vendor",
    earnings: "$40,000+",
    projects: "90+ projects completed",
    avatar: "https://example.com/lisa-rodriguez.jpg",
  },
  {
    name: "Tom Wilson",
    role: "Commercial Photographer",
    rating: 4,
    content:
      "The variety of projects available keeps my work interesting. From luxury homes to commercial properties, there's always something new.",
    badge: "Verified Vendor",
    earnings: "$35,000+",
    projects: "70+ projects completed",
    avatar: "https://example.com/tom-wilson.jpg",
  },
  {
    name: "Emily Parker",
    role: "Social Media Manager",
    rating: 5,
    content:
      "Chief Media opened up a whole new market for my social media services. Real estate agents love my content strategies.",
    badge: "Rising Star",
    earnings: "$25,000+",
    projects: "60+ projects completed",
    avatar: "https://example.com/emily-parker.jpg",
  },
  {
    name: "Alex Thompson",
    role: "Floor Plan Designer",
    rating: 5,
    content:
      "The steady stream of floor plan projects has allowed me to specialize and really perfect my craft. Highly recommend!",
    badge: "Specialist Vendor",
    earnings: "$45,000+",
    projects: "120+ projects completed",
    avatar: "https://example.com/alex-thompson.jpg",
  },
]

const faqData = [
  {
    question: "How do I get started as a vendor on Chief Media?",
    answer:
      "Getting started is simple! Create your profile, showcase your portfolio, complete our quick verification process, and start browsing opportunities or let clients find you. The entire process typically takes 24-48 hours.",
  },
  {
    question: "What are the platform fees?",
    answer:
      "We offer industry-leading rates with transparent pricing. For service packages, we charge 15% platform fee, and for custom projects, it's just 10%. You keep 85-90% of what you earn - no hidden fees or surprise charges.",
  },
  {
    question: "What types of work are available?",
    answer:
      "Our platform offers diverse opportunities including real estate photography, drone services, 3D virtual tours, video walkthroughs, floor plans, virtual staging, social media management, and commercial photography. New projects are posted daily.",
  },
  {
    question: "Do I need professional equipment and experience?",
    answer:
      "Yes, we maintain high quality standards. You'll need professional-grade equipment and demonstrable experience in your field. During verification, we review your portfolio and credentials to ensure you meet our quality requirements.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Payments are processed weekly and sent directly to your bank account or preferred payment method. All payments are secured through our platform with built-in dispute resolution and vendor protection policies.",
  },
  {
    question: "Can I work with clients outside the platform?",
    answer:
      "While you're free to maintain your existing client relationships, all work initiated through Chief Media must be completed through our platform to ensure quality standards and payment protection for both parties.",
  },
  {
    question: "Is there ongoing support for vendors?",
    answer:
      "We provide dedicated vendor support, regular training resources, community forums, and business development tools to help you grow your success on the platform.",
  },
  {
    question: "What makes Chief Media different from other platforms?",
    answer:
      "We focus specifically on real estate media with industry-leading fee structures, relationship-building tools, guaranteed payments, and a community of professionals. Plus, we offer both project-based work and service packages for maximum flexibility.",
  },
]

export default function BecomeVendorPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    serviceType: "",
    experience: "",
    location: "",
    portfolio: "",
    description: "",
    agreedToTerms: false,
    address: "",
    linkedin: "",
  })

  useEffect(() => {
    const handleTimelineScroll = () => {
      if (timelineRef.current) {
        const container = timelineRef.current.querySelector(".flex.overflow-x-auto") as HTMLElement
        if (container) {
          const scrollLeft = container.scrollLeft
          const maxScroll = container.scrollWidth - container.clientWidth
          const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
          setScrollProgress(Math.min(100, Math.max(0, progress)))
        }
      }
    }

    // Add scroll listener to timeline container
    const timelineContainer = timelineRef.current?.querySelector(".flex.overflow-x-auto")
    if (timelineContainer) {
      timelineContainer.addEventListener("scroll", handleTimelineScroll)
    }

    return () => {
      if (timelineContainer) {
        timelineContainer.removeEventListener("scroll", handleTimelineScroll)
      }
    }
  }, [])

  // Auto-fill form with user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user && !submitted) {
      const nameParts = user.name.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      
      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        email: user.email
      }))
    }
  }, [isAuthenticated, user, submitted])

  const scrollTimeline = (direction: "left" | "right") => {
    if (timelineRef.current) {
      const container = timelineRef.current.querySelector(".flex.overflow-x-auto") as HTMLElement
      if (container) {
        const scrollAmount = 320 // Width of one card
        const currentScroll = container.scrollLeft
        const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

        container.scrollTo({
          left: newScroll,
          behavior: "smooth",
        })
      }
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.serviceType && formData.experience && formData.location
      case 3:
        return formData.description && formData.agreedToTerms
      default:
        return false
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(3)) return;

    try {
      const res = await fetch('/api/vendor-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', businessName: '', serviceType: '', experience: '', location: '', portfolio: '', description: '', agreedToTerms: false, address: '', linkedin: ''
      });
      // Auto-redirect to homepage after 10 seconds
      setTimeout(() => {
        router.push('/');
      }, 10000);
    } catch (err) {
      alert('There was an error submitting your application. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-12 lg:py-16 bg-[rgba(39,63,79,1)] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg-pbpkY7lNXvyDdCQ2W6w75iWPdZAELI.jpeg"
            alt="Professional vendor workspace"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-[7vw]">
          <div className="max-w-2xl mt-0 pt-0">
            <h1 className="mb-6 text-4xl tracking-tight text-white sm:text-5xl font-normal">
              Join Chief Media's<span className="block font-normal">Vendor Network</span>
            </h1>

            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Connect with real estate professionals, showcase your expertise, and build a thriving media business on
              our trusted platform.
            </p>

            <div className="mb-12"></div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="w-full px-[7vw]">
          <div className="text-center mb-16">
            <h2 className="font-bold mb-4 text-slate-950 text-4xl">Our award-winning platform</h2>
            <p className="max-w-4xl mx-auto text-slate-950 text-base">
              Join thousands of successful vendors who've built thriving businesses with Chief Media
            </p>
          </div>

          <div className="w-full px-[7vw]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              {vendorBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                const isCenterColumn = index === 2 || index === 3

                // Define vertical offsets for staggered positioning
                const getVerticalOffset = (index: number) => {
                  switch (index) {
                    case 0:
                      return "lg:mt-8" // Left column, first box - down
                    case 1:
                      return "lg:mt-0" // Left column, second box - up
                    case 2:
                      return "lg:mt-12" // Center column, first box - down
                    case 3:
                      return "lg:mt-4" // Center column, second box - up
                    case 4:
                      return "lg:mt-0" // Right column, first box - up
                    case 5:
                      return "lg:mt-8" // Right column, second box - down
                    default:
                      return ""
                  }
                }

                const isOrangeThemed = index % 2 === 1
                const boxBg = isOrangeThemed
                  ? "bg-gradient-to-br from-[#F37521]/5 to-[#F2A16D]/10 border border-[#F37521]/20"
                  : "bg-gradient-to-br from-[#03809C]/5 to-[#273F4F]/10 border border-[#03809C]/20"

                const hoverBg = isOrangeThemed
                  ? "hover:from-[#F37521]/10 hover:to-[#F2A16D]/20 hover:border-[#F37521]/30"
                  : "hover:from-[#03809C]/10 hover:to-[#273F4F]/20 hover:border-[#03809C]/30"

                const iconBg = isOrangeThemed
                  ? "bg-gradient-to-br from-[#F37521] to-[#F2A16D] shadow-lg shadow-[#F37521]/25"
                  : "bg-gradient-to-br from-[#03809C] to-[#273F4F] shadow-lg shadow-[#03809C]/25"

                return (
                  <div
                    key={index}
                    className={`group ${boxBg} ${hoverBg} rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 ${
                      isCenterColumn ? "lg:row-span-1 min-h-[240px]" : "min-h-[280px]"
                    } ${getVerticalOffset(index)} backdrop-blur-sm relative`}
                  >
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center transform group-hover:scale-110 transition-all duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="mb-4 leading-tight group-hover:text-[#03809C] transition-colors duration-300 text-slate-950 text-lg font-semibold">
                        {benefit.title}
                      </h3>
                      <p className="leading-relaxed group-hover:text-primary/80 transition-colors duration-300 text-slate-950 text-base">
                        {benefit.description}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="w-full px-[7vw]">
          <div className="text-center mb-16">
            <h2 className="font-bold mb-4 text-slate-950 text-4xl">How it Works</h2>
            <p className="max-w-4xl mx-auto text-slate-950 text-base">
              Getting started as a vendor is simple. Follow these four easy steps to begin earning with Chief Media.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {applicationSteps.map((step, index) => {
                return (
                  <div key={index} className="text-center group relative">
                    {/* Large step number instead of icon */}
                    <div className="relative mb-0">
                      <div className="rounded-full bg-[#FCEBDC] h-20 w-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 border-4 border-white shadow-sm">
                        <span className="text-3xl font-bold text-[#273F4F]">{step.step}</span>
                      </div>

                      {/* Connecting dots for timeline */}
                      {index < applicationSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-12 left-full w-16 flex justify-center"></div>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-gray-100 group-hover:-translate-y-2 border-0 shadow-none">
                      <h3 className="text-xl mb-3 group-hover:text-[#03809C] transition-colors duration-300 text-slate-950 font-medium">
                        {step.title}
                      </h3>
                      <p className="leading-relaxed text-slate-950">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="w-full px-[7vw]">
          <div className="w-full px-0">
            {/* Header */}
            <div className="mb-12">
              <h2 className="font-bold text-[#273F4F] mb-4 text-slate-950 text-4xl mt-5">Vendor Success Stories</h2>
              <p className="text-[#273F4F]/70 max-w-lg text-slate-950 text-base">
                Real results from our community of talented vendors who've built successful businesses on our platform
              </p>
            </div>

            {/* Still have questions section */}
          </div>

          {/* Timeline Container */}
          <div className="relative overflow-hidden" ref={timelineRef}>
            <div
              className="flex overflow-x-auto scrollbar-hide space-x-8 pt-0 pb-0 mt-[-50px]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div
                className="absolute bottom-0 h-1 bg-gray-200 z-0 rounded-full"
                style={{
                  left: "120px",
                  right: "120px",
                  width: "auto",
                }}
              >
                <div
                  className="h-full bg-[#03809C] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(100, scrollProgress * 1.5)}%` }}
                ></div>
              </div>

              {vendorTestimonials.map((testimonial, index) => {
                const isAboveLine = index % 2 === 0

                return (
                  <div key={index} className="flex-shrink-0 w-80 relative z-10 h-auto">
                    <div className={`${isAboveLine ? "mb-8" : "mt-8"}`}>
                      <div className="bg-white p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm shadow-none border min-h-[320px] flex flex-col justify-between my-0 mt-9 border-0 rounded-xl">
                        <div>
                          <div className="flex items-center mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#F37521] to-[#F2A16D] flex items-center justify-center shadow-lg mr-4">
                              <img
                                src={
                                  testimonial.avatar ||
                                  "/placeholder.svg?height=64&width=64&query=professional profile photo" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg"
                                }
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-1 text-slate-950">{testimonial.name}</h3>
                              <p className="text-[#03809C] font-medium text-sm">{testimonial.role}</p>
                            </div>
                          </div>

                          {/* Testimonial Quote */}
                          <blockquote className="text-gray-700 italic mb-6 leading-relaxed text-center relative">
                            <span className="text-4xl text-[#03809C]/20 absolute -top-2 -left-2 text-slate-950">"</span>
                            {testimonial.content}
                            <span className="text-4xl text-[#03809C]/20 absolute -bottom-4 -right-2 text-slate-950">
                              "
                            </span>
                          </blockquote>
                        </div>

                        {/* Badge and Rating */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="px-4 py-2 rounded-full font-medium text-xs text-[rgba(39,63,79,1)] bg-[#FCEBDC] shadow-none">
                            {testimonial.badge}
                          </span>

                          <div className="flex space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-[#F37521] text-[#F37521]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center absolute top-28 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows Below Timeline Cards */}
        </div>
      </section>

      <section className="text-slate-950 mb-2 text-base">
        <div className="w-full px-[7vw] py-20 pb-20">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Side - Application Form or Success State */}
            <div className="lg:col-span-3">
              {!isAuthenticated && !isLoading ? (
                <div className="relative">
                  {/* Login Overlay */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                    <div className="text-center p-8 max-w-md">
                      <h3 className="text-2xl font-bold text-slate-950 mb-4">
                        Please login to enquiry
                      </h3>
                      <p className="text-slate-950/80 mb-8 text-lg">
                        We need to verify you already registered into our website
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                          onClick={() => router.push('/login')}
                          className="bg-[#03809C] hover:bg-[#03809C]/90 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                          Login
                        </Button>
                        <Button 
                          onClick={() => router.push('/signup')}
                          variant="outline"
                          className="border-[#03809C] text-[#03809C] hover:bg-[#03809C] hover:text-white px-6 py-3 rounded-lg font-semibold"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  </div>
                  
              {/* Blurred form content behind overlay */}
              <div className="opacity-30 pointer-events-none">
                {submitted ? (
                <div className="p-10 shadow-none rounded-md border-0 bg-popover-foreground flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-background mb-2">Application Submitted</h3>
                  <p className="text-background/80 mb-6 max-w-xl">
                    Thank you for applying to join Chief Media's vendor network. We'll review your application and contact you within 24 hours.
                    You'll be redirected to the homepage in 10 seconds.
                  </p>
                  <Button onClick={() => router.push('/')} className="bg-[#03809C] hover:bg-[#03809C]/90 text-white">Go to Homepage now</Button>
                </div>
              ) : (
              <>
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-950">Step {currentStep} of 3</span>
                  <span className="text-sm text-slate-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#F37521] h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="p-8 shadow-none rounded-md border-slate-950 border-0 px-7 py-9 bg-popover-foreground">
                    <div className="flex items-center mb-6">
                      <h3 className="text-xl font-bold text-background">Personal Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <div className="group">
                        <label className="block text-sm mb-2 flex items-center font-medium text-background">
                          First name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                          placeholder="John"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm mb-2 flex items-center font-medium text-background">
                          Last name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <div className="group">
                        <label className="block text-sm mb-2 flex items-center font-medium text-background">
                          Email address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 rounded-md py-2 border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm mb-2 flex items-center font-medium text-background">
                          Phone number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="group">
                        <label className="block text-sm mb-2 flex items-center font-medium text-background">
                          Address *
                        </label>
                        <input
                          type="text"
                          value={formData.address || ""}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 rounded-md py-2 border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                          placeholder="123 Main St, City, State 12345"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm mb-2 flex items-center font-medium text-background">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange("linkedin", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 rounded-md border py-2 text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="p-8 shadow-none rounded-md border-slate-950 border-0 px-7 py-9 bg-popover-foreground">
                    <h3 className="text-xl font-bold text-background mb-6">Business Information</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-background">Business/Company name</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                          placeholder="Your Photography LLC"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-background">Years of experience *</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background"
                        >
                          <option value="">Select experience level</option>
                          <option value="1-2">1-2 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="6-10">6-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-background">Primary service type *</label>
                        <select
                          value={formData.serviceType}
                          onChange={(e) => handleInputChange("serviceType", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background"
                        >
                          <option value="">Select service type</option>
                          <option value="photography">Real Estate Photography</option>
                          <option value="videography">Real Estate Videography</option>
                          <option value="drone">Drone & Aerial Services</option>
                          <option value="virtual-tours">3D Virtual Tours</option>
                          <option value="floor-plans">Floor Plans & Staging</option>
                          <option value="social-media">Social Media Management</option>
                          <option value="copywriting">Copywriting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-background">Service location *</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="p-8 shadow-none rounded-md border-slate-950 border-0 px-7 py-9 bg-popover-foreground">
                    <h3 className="text-xl font-bold text-background mb-4">Portfolio & Additional Information</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-background mb-2">
                        Portfolio website or samples
                      </label>
                      <input
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-background mb-2">Tell us about yourself *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium resize-none"
                        placeholder="Describe your experience, equipment, specialties, and what makes you unique as a vendor..."
                      />
                    </div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleInputChange("agreedToTerms", e.target.checked)}
                        className="mt-1 h-4 w-4 text-[#03809C] focus:ring-[#03809C] border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="text-sm text-background">
                        I agree to the Terms of Service and Privacy Policy, and I'm interested in receiving updates
                        about vendor opportunities.
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 font-semibold transition-all duration-300 bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg rounded-md"
                    >
                      Previous
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid(currentStep)}
                      className={`px-6 py-3 font-semibold transition-all duration-300 rounded-md ${currentStep === 1 ? "ml-auto" : ""} ${
                        !isStepValid(currentStep)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#03809C] hover:bg-[#03809C]/90 text-white hover:shadow-lg"
                      }`}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid(currentStep)}
                      className={`px-6 py-3 font-semibold transition-all duration-300 rounded-md ${
                        !isStepValid(currentStep)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#F37521] hover:bg-[#F37521]/90 text-white hover:shadow-lg"
                      }`}
                    >
                      Submit Application
                    </Button>
                  )}
                </div>

                {currentStep === 3 && (
                  <p className="text-sm text-gray-600 text-center">
                    After submission, we'll review your application and contact you within 24 hours with next steps.
                  </p>
                )}
              </form>
              </>
              )}
                  </div>
                </div>
              ) : (
                <>
                  {submitted ? (
                    <div className="p-10 shadow-none rounded-md border-0 bg-popover-foreground flex flex-col items-center text-center">
                      <div className="mb-4 rounded-full bg-green-100 p-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-background mb-2">Application Submitted</h3>
                      <p className="text-background/80 mb-6 max-w-xl">
                        Thank you for applying to join Chief Media's vendor network. We'll review your application and contact you within 24 hours.
                        You'll be redirected to the homepage in 10 seconds.
                      </p>
                      <Button onClick={() => router.push('/')} className="bg-[#03809C] hover:bg-[#03809C]/90 text-white">Go to Homepage now</Button>
                    </div>
                  ) : (
                    <>
                      {/* Progress Indicator */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-slate-950">Step {currentStep} of 3</span>
                          <span className="text-sm text-slate-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#F37521] h-2 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <form className="space-y-8" onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                          <div className="p-8 shadow-none rounded-md border-slate-950 border-0 px-7 py-9 bg-popover-foreground">
                            <div className="flex items-center mb-6">
                              <h3 className="text-xl font-bold text-background">Personal Information</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                              <div className="group">
                                <label className="block text-sm mb-2 flex items-center font-medium text-background">
                                  First name *
                                </label>
                                <input
                                  type="text"
                                  value={formData.firstName}
                                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                                  placeholder="John"
                                />
                              </div>
                              <div className="group">
                                <label className="block text-sm mb-2 flex items-center font-medium text-background">
                                  Last name *
                                </label>
                                <input
                                  type="text"
                                  value={formData.lastName}
                                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                                  placeholder="Smith"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                              <div className="group">
                                <label className="block text-sm mb-2 flex items-center font-medium text-background">
                                  Email address *
                                </label>
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange("email", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 rounded-md py-2 border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                                  placeholder="john@example.com"
                                />
                              </div>
                              <div className="group">
                                <label className="block text-sm mb-2 flex items-center font-medium text-background">
                                  Phone number *
                                </label>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange("phone", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="group">
                                <label className="block text-sm mb-2 flex items-center font-medium text-background">
                                  Address *
                                </label>
                                <input
                                  type="text"
                                  value={formData.address || ""}
                                  onChange={(e) => handleInputChange("address", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 rounded-md py-2 border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                                  placeholder="123 Main St, City, State 12345"
                                />
                              </div>
                              <div className="group">
                                <label className="block text-sm mb-2 flex items-center font-medium text-background">
                                  LinkedIn Profile
                                </label>
                                <input
                                  type="url"
                                  value={formData.linkedin}
                                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 rounded-md py-2 border text-sm border-slate-400 placeholder:text-gray-400 placeholder:font-medium text-background"
                                  placeholder="https://linkedin.com/in/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="p-8 shadow-none rounded-md border-slate-950 border-0 px-7 py-9 bg-popover-foreground">
                            <h3 className="text-xl font-bold text-background mb-6">Business Information</h3>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium mb-2 text-background">Business/Company name</label>
                                <input
                                  type="text"
                                  value={formData.businessName}
                                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                                  placeholder="Your Photography LLC"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2 text-background">Years of experience *</label>
                                <select
                                  value={formData.experience}
                                  onChange={(e) => handleInputChange("experience", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background"
                                >
                                  <option value="">Select experience level</option>
                                  <option value="1-2">1-2 years</option>
                                  <option value="3-5">3-5 years</option>
                                  <option value="6-10">6-10 years</option>
                                  <option value="10+">10+ years</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2 text-background">Primary service type *</label>
                                <select
                                  value={formData.serviceType}
                                  onChange={(e) => handleInputChange("serviceType", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background"
                                >
                                  <option value="">Select service type</option>
                                  <option value="photography">Real Estate Photography</option>
                                  <option value="videography">Real Estate Videography</option>
                                  <option value="drone">Drone & Aerial Services</option>
                                  <option value="virtual-tours">3D Virtual Tours</option>
                                  <option value="floor-plans">Floor Plans & Staging</option>
                                  <option value="social-media">Social Media Management</option>
                                  <option value="copywriting">Copywriting</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2 text-background">Service location *</label>
                                <input
                                  type="text"
                                  value={formData.location}
                                  onChange={(e) => handleInputChange("location", e.target.value)}
                                  className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                                  placeholder="City, State"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="p-8 shadow-none rounded-md border-slate-950 border-0 px-7 py-9 bg-popover-foreground">
                            <h3 className="text-xl font-bold text-background mb-4">Portfolio & Additional Information</h3>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-background mb-2">
                                Portfolio website or samples
                              </label>
                              <input
                                type="url"
                                value={formData.portfolio}
                                onChange={(e) => handleInputChange("portfolio", e.target.value)}
                                className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium"
                                placeholder="https://yourportfolio.com"
                              />
                            </div>
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-background mb-2">Tell us about yourself *</label>
                              <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                rows={4}
                                className="w-full px-4 focus:border-[#03809C] focus:outline-none focus:ring-4 focus:ring-[#03809C]/10 transition-all duration-300 group-hover:border-gray-300 py-2 rounded-md border text-sm border-slate-400 text-background placeholder:text-gray-400 placeholder:font-medium resize-none"
                                placeholder="Describe your experience, equipment, specialties, and what makes you unique as a vendor..."
                              />
                            </div>
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id="terms"
                                checked={formData.agreedToTerms}
                                onChange={(e) => handleInputChange("agreedToTerms", e.target.checked)}
                                className="mt-1 h-4 w-4 text-[#03809C] focus:ring-[#03809C] border-gray-300 rounded"
                              />
                              <label htmlFor="terms" className="text-sm text-background">
                                I agree to the Terms of Service and Privacy Policy, and I'm interested in receiving updates
                                about vendor opportunities.
                              </label>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between">
                          {currentStep > 1 && (
                            <Button
                              type="button"
                              onClick={prevStep}
                              className="px-6 py-3 font-semibold transition-all duration-300 bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg rounded-md"
                            >
                              Previous
                            </Button>
                          )}

                          {currentStep < 3 ? (
                            <Button
                              type="button"
                              onClick={nextStep}
                              disabled={!isStepValid(currentStep)}
                              className={`px-6 py-3 font-semibold transition-all duration-300 rounded-md ${currentStep === 1 ? "ml-auto" : ""} ${
                                !isStepValid(currentStep)
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-[#03809C] hover:bg-[#03809C]/90 text-white hover:shadow-lg"
                              }`}
                            >
                              Next Step
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              disabled={!isStepValid(currentStep)}
                              className={`px-6 py-3 font-semibold transition-all duration-300 rounded-md ${
                                !isStepValid(currentStep)
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-[#F37521] hover:bg-[#F37521]/90 text-white hover:shadow-lg"
                              }`}
                            >
                              Submit Application
                            </Button>
                          )}
                        </div>

                        {currentStep === 3 && (
                          <p className="text-sm text-gray-600 text-center">
                            After submission, we'll review your application and contact you within 24 hours with next steps.
                          </p>
                        )}
                      </form>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Right Side - Enhanced Messaging */}
            <div className="lg:sticky lg:top-8 lg:col-span-2">
              <div className="mb-8">
                <h2 className="font-bold mb-4 text-slate-950 text-3xl">Join Our Vendor Network</h2>
                <p className="text-slate-950 text-xl mb-6 mt-1 font-medium">
                  Start your application below. We&#39;ll review and get back to you within 24 hours.
                </p>

                <p className="text-slate-950 text-base mb-4">
                  Join thousands of successful vendors who've built thriving businesses with Chief Media. Our platform
                  connects you with high-quality real estate professionals while you maintain full control over your
                  rates and schedule.
                </p>
                <p className="text-slate-950 text-base mb-8">
                  With industry-leading 85% retention rates, secure payments, and comprehensive vendor protection,
                  you'll have everything you need to grow your media business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="w-full px-[7vw]">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Messaging and Contact Info */}
            <div>
              <h2 className="font-bold mb-4 text-slate-950 text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-lg text-slate-950 text-base mb-12">
                Get answers to common questions about booking our studio spaces
              </p>

              <div className="space-y-6 rounded-md bg-background py-7 px-7">
                <h3 className="text-2xl text-[#F37521] mb-4 font-bold">Still have questions?</h3>
                <p className="text-slate-950 mb-6">Our support team is here to help you with your studio booking</p>
                <Button className="bg-[#F37521] hover:bg-[#F37521]/90 text-white px-6 py-3 rounded-lg font-semibold text-lg">
                  Contact Support
                </Button>
              </div>
            </div>

            {/* Right Side - FAQ Questions with Simple Lines */}
            <div className="space-y-0">
              {faqData.slice(0, 6).map((faq, index) => (
                <div key={index} className="border-b border-[#273F4F]/10 last:border-b-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left hover:bg-[#FCEBDC]/10 transition-colors duration-200 group py-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-8">
                        <h3 className="text-[#273F4F] mb-2 group-hover:text-[#03809C] transition-colors font-medium text-lg text-slate-950">
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
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#03809C] flex items-center justify-center text-white font-bold text-lg group-hover:bg-[#F37521] transition-colors duration-300">
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

    </div>
  )
}
