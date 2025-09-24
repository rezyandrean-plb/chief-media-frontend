"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Camera,
  Video,
  Building2,
  Users,
  ArrowRight,
  Zap,
  Palette,
  Megaphone,
  Edit3,
  Globe,
  Smartphone,
  Monitor,
  Headphones,
  Mic,
  Home,
  Moon,
  Building,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth
        const contentWidth = scrollContainerRef.current.scrollWidth
        const maxScroll = contentWidth - containerWidth
        setScrollPosition((prev) => Math.min(prev, maxScroll))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isAutoScrollActive || !scrollContainerRef.current) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const scrollAmount = 320 // Width of one card plus gap
        const containerWidth = container.offsetWidth
        const contentWidth = container.scrollWidth
        const maxScroll = contentWidth - containerWidth

        // Check if we're at or near the end
        if (container.scrollLeft >= maxScroll - 10) {
          // Reset to beginning
          container.scrollLeft = 0
        } else {
          // Scroll to next position
          container.scrollLeft += scrollAmount
        }
      }
    }, 3000) // Auto scroll every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoScrollActive])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.75
      setScrollPosition((prev) => Math.max(0, prev - scrollAmount))
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.75
      const containerWidth = scrollContainerRef.current.offsetWidth
      const contentWidth = scrollContainerRef.current.scrollWidth
      const maxScroll = contentWidth - containerWidth
      setScrollPosition((prev) => Math.min(maxScroll, prev + scrollAmount))
    }
  }

  const categories = [
    {
      icon: Camera,
      title: "Photography",
      description: "Professional property photography with attention to detail and composition.",
      tag1: "Residential & Commercial",
      tag2: "All Properties",
    },
    {
      icon: Video,
      title: "Videography",
      description: "Cinematic property videos that capture the essence of your listings.",
      tag1: "High-end Listings",
      tag2: "Luxury Properties",
    },
    {
      icon: Building2,
      title: "Virtual Tours",
      description: "Interactive virtual tours that bring properties to life online.",
      tag1: "Modern Marketing",
      tag2: "All Levels",
    },
    {
      icon: Zap,
      title: "Drone Services",
      description: "Stunning aerial perspectives that showcase properties from above.",
      tag1: "Unique Angles",
      tag2: "Premium Views",
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Eye-catching marketing materials that elevate your brand.",
      tag1: "Branding",
      tag2: "Print & Digital",
    },
    {
      icon: Megaphone,
      title: "Social Media",
      description: "Engaging content creation and management to boost your online presence.",
      tag1: "Content Creation",
      tag2: "Management",
    },
    {
      icon: Edit3,
      title: "Content Writing",
      description: "Compelling property descriptions and blog posts that attract buyers.",
      tag1: "SEO Optimized",
      tag2: "Engaging",
    },
    {
      icon: Globe,
      title: "Web Design",
      description: "Custom real estate websites that convert visitors into clients.",
      tag1: "Responsive Design",
      tag2: "Lead Generation",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Mobile property apps that put your listings in your clients' pockets.",
      tag1: "iOS & Android",
      tag2: "User-Friendly",
    },
    {
      icon: Monitor,
      title: "Virtual Staging",
      description: "Digitally furnished spaces that help buyers envision their dream home.",
      tag1: "Interior Design",
      tag2: "Visualization",
    },
    {
      icon: Headphones,
      title: "Audio Production",
      description: "Professional property tour narration that enhances the listening experience.",
      tag1: "Voiceovers",
      tag2: "Sound Design",
    },
    {
      icon: Mic,
      title: "Podcast Services",
      description: "Real estate podcasting solutions that establish you as an industry leader.",
      tag1: "Podcast Production",
      tag2: "Content Strategy",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative py-32 overflow-hidden lg:py-20 min-h-[600px] flex items-center"
        style={{ backgroundColor: "#273F4F" }}
      >
        <div className="absolute inset-0 bg-[#273F4F]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nate-johnston-gwzbMpzGPjc-unsplash.jpg-g9MmzNFHNjvibNolo3Qb9HL2KmHtoA.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="w-full px-[7vw] relative z-20">
          <div className="space-y-8">
            <h1 className="font-medium text-white tracking-tight leading-tight mb-0 text-6xl">
              KW Singapore
              <br />
              Official GIG Economy
            </h1>

            <div className="max-w-4xl">
              <div>
                <p className="text-xl lg:text-2xl leading-relaxed mb-4 text-white font-medium">
                  Chief Media's Exclusive Curated Media Network
                </p>

                <p className="text-lg leading-relaxed mb-8 text-white/95">
                  Partner with trusted media experts—so you can focus on what truly matters:{" "}
                  <span className="font-semibold text-white">real estate</span>.
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center bg-white border-2 border-white/20 transition-all duration-300 p-3 py-0 rounded-sm">
                  <div className="flex-1 flex items-center space-x-4 px-6 pl-0">
                    <input
                      type="text"
                      placeholder="Search photographers, videographers, studios..."
                      className="flex-1 placeholder:text-muted-foreground border-none outline-none bg-transparent py-4 text-sm"
                    />
                  </div>
                  <Button
                    size="lg"
                    style={{ backgroundColor: "#03809C", color: "white" }}
                    className="hover:bg-[#026B7A] px-8 font-semibold hover:scale-105 transition-all duration-300 border-2 border-[#03809C] text-base py-2.5 rounded-sm"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex items-center space-x-6 py-4 rounded-lg backdrop-blur-sm bg-transparent px-0">
                  <span className="text-sm text-white font-semibold">Featured by:</span>

                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.48 3.38-.84C18.68 26.48 22 21.55 22 17V7l-10-5z" />
                    </svg>
                    <span className="text-white font-medium text-sm">PropertyGuru</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-10-5z" />
                    </svg>
                    <span className="text-white font-medium text-sm">EdgeProp</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="text-white font-medium text-sm">99.co</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                    <span className="text-white font-medium text-sm">The Straits Times</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="w-full px-[7vw]">
          <div className="text-center mb-16">
            <h2 className="font-bold mb-6 text-slate-950 text-4xl">Popular Services</h2>
            <p className="max-w-2xl mx-auto leading-relaxed text-slate-950 text-base mt-[-10px]">
              Discover our most requested real estate media services, crafted by industry experts.
            </p>
          </div>

          <div className="relative">
            {/* Decorative shapes */}
            <div className="absolute top-16 right-20 w-12 h-12 bg-primary/15 rounded-full"></div>
            <div className="absolute top-32 left-1/3 w-8 h-8 bg-primary/20 rotate-45 rounded-sm"></div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {[
                {
                  name: "Photography",
                  count: "1,247 projects",
                  icon: Camera,
                  trend: "+23%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-dummer-aS4Duj2j7r4-unsplash%20%281%29.jpg-OyXrJcDVchT7Sg3CPX8DT3l8BZ9Zmj.jpeg",
                  description: "Professional real estate photography",
                  height: "h-80",
                },
                {
                  name: "Videography",
                  count: "892 projects",
                  icon: Video,
                  trend: "+31%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jonathon-kemp-rRUiBYByBdI-unsplash.jpg-PMH5XX055Je38P7CbqGnaPCCXaipmw.jpeg",
                  description: "Cinematic property video tours",
                  height: "h-96",
                },
                {
                  name: "Drone Services",
                  count: "634 projects",
                  icon: Zap,
                  trend: "+18%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daniel-olah-yBlv3fENWwk-unsplash.jpg-FiWOPAtcLSpmzdM7LdOnLPPGz4Iwl4.jpeg",
                  description: "Aerial photography and videography",
                  height: "h-72",
                },
                {
                  name: "Virtual Tours",
                  count: "445 projects",
                  icon: Globe,
                  trend: "+42%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ngo-son-OSyLCZSejh8-unsplash.jpg-EZWNmxvpnb4L69fQGO4m9Rga2Enizy.jpeg",
                  description: "Interactive 360° property tours",
                  height: "h-88",
                },
                {
                  name: "Floor Plans",
                  count: "445 projects",
                  icon: Home,
                  trend: "+12%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pedro-miranda-3QzMBrvCeyQ-unsplash.jpg-aFccgUo46T7oqhqmSXTenEEZipp5GM.jpeg",
                  description: "Detailed architectural floor plans",
                  height: "h-84",
                },
                {
                  name: "Staging Photography",
                  count: "389 projects",
                  icon: Palette,
                  trend: "+28%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arthur-a-3jId0_8If3M-unsplash.jpg-I6KOF5gg7UOmWhJbpgqecDa92BkqCw.jpeg",
                  description: "Beautifully staged property photos",
                  height: "h-68",
                },
                {
                  name: "Twilight Photography",
                  count: "312 projects",
                  icon: Moon,
                  trend: "+35%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daniel-olah-yBlv3fENWwk-unsplash.jpg-FiWOPAtcLSpmzdM7LdOnLPPGz4Iwl4.jpeg",
                  description: "Magical golden hour property shots",
                  height: "h-88",
                },
                {
                  name: "Commercial Photography",
                  count: "267 projects",
                  icon: Building,
                  trend: "+19%",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ngo-son-OSyLCZSejh8-unsplash.jpg-EZWNmxvpnb4L69fQGO4m9Rga2Enizy.jpeg",
                  description: "Professional commercial space photography",
                  height: "h-76",
                },
              ].map((service, index) => {
                const IconComponent = service.icon

                return (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-md overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer transform break-inside-avoid mb-6 ${service.height}`}
                  >
                    {/* Image with overlay */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/80 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white">
                          <h3 className="text-xl font-bold mb-3 text-shadow-lg">{service.name}</h3>
                          <p className="text-sm text-white/90 leading-relaxed text-shadow-md">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-[7vw]">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider mb-2 block text-secondary">
                ELEVATE YOUR BUSINESS
              </span>
              <h2 className="text-4xl font-bold mb-4 text-slate-950 lg:text-4xl">
                Vendor Categories
                <br />
                <span className="text-slate-950">for Everyone</span>
              </h2>
              <p className="max-w-2xl leading-relaxed text-slate-950 text-base">
                Discover our comprehensive range of premium real estate media services, crafted by industry experts.
              </p>
            </div>
          </div>

          {/* Category Carousel */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div
                ref={scrollContainerRef}
                className="flex space-x-6 pb-4 cursor-grab active:cursor-grabbing min-w-max"
                onMouseEnter={() => setIsAutoScrollActive(false)}
                onMouseLeave={() => setIsAutoScrollActive(true)}
                onWheel={(e) => {
                  e.preventDefault()
                  const scrollAmount = e.deltaY > 0 ? 200 : -200
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft += scrollAmount
                  }
                }}
                onMouseDown={(e) => {
                  setIsAutoScrollActive(false)

                  if (!scrollContainerRef.current) return

                  const startX = e.pageX - scrollContainerRef.current.offsetLeft
                  const scrollLeft = scrollContainerRef.current.scrollLeft

                  const handleMouseMove = (e: MouseEvent) => {
                    const x = e.pageX - scrollContainerRef.current!.offsetLeft
                    const walk = (x - startX) * 2
                    scrollContainerRef.current!.scrollLeft = scrollLeft - walk
                  }

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                    setTimeout(() => setIsAutoScrollActive(true), 1000)
                  }

                  document.addEventListener("mousemove", handleMouseMove)
                  document.addEventListener("mouseup", handleMouseUp)
                }}
              >
                {categories.map((category, index) => {
                  const IconComponent = category.icon
                  const backgroundImages = [
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2h-media-s4N6wsjBQm8-unsplash.jpg-R8dXhoowf5sZOwYzBbmyMzDkn2OxWQ.jpeg", // Photography - Professional camera setup
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander-dummer-aS4Duj2j7r4-unsplash.jpg-WKPZKpdlvSTNlmrp1shP5nQTQTKkcS.jpeg", // Videography - Professional studio setup
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dmitry-ganin-kl-l9lUL59o-unsplash.jpg-n2TYvVRjBOgKxkfPVBbborgUuIvZ9i.jpeg", // Virtual Tours - Person with VR headset
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edgar-infocus-mS-gR3cyFyY-unsplash.jpg-lWryxTAag0EBQwXUEn8hjiNcw0xC2n.jpeg", // Drone Services - White drone flying outdoors
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kelly-sikkema-IkHwu5xLXxs-unsplash.jpg-rNQ0DKB11PAoXUCj7Zm1JxIhXmNkul.jpeg", // Graphic Design - Design workspace with tablet and materials
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/berke-citak-0cpyFsSUiSc-unsplash.jpg-f6Z1VGAZ9usRcCE6bLpZomnMItHnj1.jpeg", // Social Media - Phone with social media apps
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg-KnZG2f2j7TYpDDOtcStYXmKxDBaO0A.jpeg", // Content Writing - Clean workspace with laptop, notebook, and coffee
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/faizur-rehman-dJpupM4LiS4-unsplash.jpg-yiUYkf6hQkSc1AanSiJU9Mw9uKCXkf.jpeg", // Web Design - Hands holding tablet with website wireframes
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/niclas-illg-FJ5e_2f96h4-unsplash.jpg-k4MRAEDF0tbSKwC1pjg0cpNHjOsMEO.jpeg", // App Development - Laptop with development environment and coding tools
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2h-media-J4LkmYXWTQk-unsplash.jpg-kEEyX9BENTvdLo4fmQ3GhiERyCF7kH.jpeg", // Virtual Staging - Professional audio production studio setup
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jakub-zerdzicki-kERJK6vLRMw-unsplash.jpg-WDhRXrg74GbRfCyTKMV20aoALcTyEj.jpeg", // Audio Production - Phone showing staged interior room
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jonathan-velasquez-c1ZN57GfDB0-unsplash.jpg-10PHXH5arr2hbPSEVf2D8OuGgEpomN.jpeg", // Podcast Services - Professional studio microphone
                  ]

                  const backgroundImage = backgroundImages[index % backgroundImages.length]

                  return (
                    <Link
                      href={`/services/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                      key={index}
                      className="group hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0 w-80 h-96 rounded-md p-6 flex flex-col justify-between transform relative overflow-hidden bg-slate-900"
                    >
                      {/* Background image as pseudo-element */}
                      <div
                        className="absolute inset-0 rounded-md opacity-60"
                        style={{
                          backgroundImage: `url('${backgroundImage}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />

                      {/* Content relative to appear above background */}
                      <div className="relative z-10 flex flex-col h-full justify-start">
                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium border border-white text-white backdrop-blur-sm bg-transparent">
                            {category.tag1}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium border border-white text-white backdrop-blur-sm bg-transparent">
                            {category.tag2}
                          </span>
                        </div>

                        <h3 className="font-bold leading-tight text-3xl text-white">{category.title}</h3>

                        <p className="text-sm leading-relaxed text-white/90">{category.description}</p>
                      </div>

                      {/* Icon Area */}

                      {/* Learn More Button */}
                      <div className="flex items-center justify-start">
                        <span className="font-medium py-2 rounded-md px-3 text-sm text-white backdrop-blur-sm bg-transparent">
                          Learn More
                        </span>
                        <div className="p-2 rounded-md">
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-white" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Solution Section */}
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="w-full px-[7vw]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-6"></div>

                <h2 className="text-4xl font-bold mb-6 leading-tight text-slate-950 lg:text-4xl">
                  The <span className="font-normal text-primary">premium</span>
                  <br />
                  real estate solution
                  <br />
                  for professionals
                </h2>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-950 font-semibold">Dedicated project managers</h3>
                    <p className="text-sm leading-relaxed text-slate-950">
                      Count on an account manager to find you the right talent and see to your project's every need.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-950">Satisfaction guarantee</h3>
                    <p className="text-sm leading-relaxed text-slate-950">
                      Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-950 font-semibold">Advanced management tools</h3>
                    <p className="text-sm leading-relaxed text-slate-950">
                      Seamlessly integrate media professionals into your team and projects
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-950 font-semibold">Flexible payment models</h3>
                    <p className="text-sm leading-relaxed text-slate-950">
                      Pay per project or opt for monthly rates to facilitate longer-term collaboration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4"></div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jakub-zerdzicki-EL16ACtwLxg-unsplash.jpg-cAdfyN0jLe1FhmmqXrHkH0y8Mej52i.jpeg"
                  alt="Analytics dashboard on tablet"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KW Realtors Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-[7vw]">
          <div className="text-left mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider mb-2 block text-secondary">
              FOR KW REALTORS
            </span>
            <h2 className="font-bold mb-4 text-slate-950 text-4xl">Why Choose Our Platform</h2>
            <p className="max-w-2xl text-slate-950 text-base">
              Exclusive benefits designed specifically for Keller Williams real estate professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M3 7l9 6 9-6",
                title: "Access a pool of top talent",
                description: "across 700 categories",
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Enjoy a simple, easy-to-use",
                description: "matching experience",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Get quality work done quickly",
                description: "and within budget",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Only pay when you're happy",
                description: "with the delivered results",
              },
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                title: "Real estate specialized",
                description: "services and expertise",
              },
            ].map((benefit, index) => (
              <div key={index} className="group text-left mt-[-50px]">
                <div className="w-16 h-16 flex group-hover:bg-primary/20 transition-colors rounded-md bg-transparent items-center justify-start mb-0">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-950">{benefit.title}</h3>
                <p className="text-slate-950">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 border-muted border-b-0 bg-background">
        <div className="w-full px-[7vw]">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4 text-slate-950 text-4xl">Trusted by Real Estate Professionals</h2>
            <p className="text-slate-950 text-base">
              See what our clients say about their experience with KW Chief Media
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center gap-6">
              {/* Left Arrow */}

              {/* Testimonials Carousel */}
              <div className="overflow-hidden flex-1">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "Real Estate Agent",
                      rating: 5,
                      text: "KW Chief Media transformed how I showcase properties. The quality is exceptional and the booking process is seamless.",
                    },
                    {
                      name: "Michael Chen",
                      role: "Property Manager",
                      rating: 5,
                      text: "The studio spaces are top-notch and the photographers are incredibly professional. My listings sell faster now.",
                    },
                    {
                      name: "David Rodriguez",
                      role: "Professional Photographer",
                      rating: 5,
                      text: "As a vendor on the platform, I've connected with more clients than ever. The quality of leads is outstanding.",
                    },
                    {
                      name: "Emily Watson",
                      role: "Luxury Real Estate Specialist",
                      rating: 5,
                      text: "The virtual tours and drone footage have completely elevated my high-end listings. Clients are amazed by the quality.",
                    },
                    {
                      name: "James Thompson",
                      role: "Real Estate Broker",
                      text: "Working with KW Chief Media has streamlined my entire marketing process. The results speak for themselves.",
                    },
                    {
                      name: "Lisa Park",
                      role: "Commercial Real Estate Agent",
                      text: "The professional network here is unmatched. Every project exceeds expectations and delivers on time.",
                    },
                    {
                      name: "Robert Kim",
                      role: "Property Developer",
                      text: "From concept to completion, the media services have helped us showcase our developments beautifully.",
                    },
                  ].map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-0">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[0, 1, 2].map((offset) => {
                          const testimonialIndex = (index * 3 + offset) % 7
                          const currentTestimonial = [
                            {
                              name: "Sarah Johnson",
                              role: "Real Estate Agent",
                              rating: 5,
                              text: "KW Chief Media transformed how I showcase properties. The quality is exceptional and the booking process is seamless.",
                            },
                            {
                              name: "Michael Chen",
                              role: "Property Manager",
                              rating: 5,
                              text: "The studio spaces are top-notch and the photographers are incredibly professional. My listings sell faster now.",
                            },
                            {
                              name: "David Rodriguez",
                              role: "Professional Photographer",
                              rating: 5,
                              text: "As a vendor on the platform, I've connected with more clients than ever. The quality of leads is outstanding.",
                            },
                            {
                              name: "Emily Watson",
                              role: "Luxury Real Estate Specialist",
                              rating: 5,
                              text: "The virtual tours and drone footage have completely elevated my high-end listings. Clients are amazed by the quality.",
                            },
                            {
                              name: "James Thompson",
                              role: "Real Estate Broker",
                              text: "Working with KW Chief Media has streamlined my entire marketing process. The results speak for themselves.",
                            },
                            {
                              name: "Lisa Park",
                              role: "Commercial Real Estate Agent",
                              text: "The professional network here is unmatched. Every project exceeds expectations and delivers on time.",
                            },
                            {
                              name: "Robert Kim",
                              role: "Property Developer",
                              text: "From concept to completion, the media services have helped us showcase our developments beautifully.",
                            },
                          ][testimonialIndex]

                          return (
                            <Card
                              key={offset}
                              className="rounded-md shadow-none border-slate-950 border bg-transparent"
                            >
                              <CardContent className="p-6 py-6">
                                <div className="flex items-center mb-4">
                                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                  ))}
                                </div>
                                <p className="text-muted-foreground mb-4">"{currentTestimonial.text}"</p>
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border-white border-2">
                                    <Users className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">{currentTestimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="w-full px-[7vw]">
          <div
            className="p-12 lg:p-16 relative overflow-hidden rounded-md lg:py-14"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jason-dent-w3eFhqXjkZE-unsplash.jpg-E5ckj5nTdJNJsMB4K24TRwX4oSKS7c.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-md"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Copy */}
              <div>
                <h2 className="font-bold text-white mb-6 leading-tight text-4xl">
                  Ready to Transform Your Real Estate Marketing?
                </h2>
                <p className="mb-8 leading-relaxed text-white/90 text-lg">
                  Join thousands of real estate professionals who trust our curated network of media experts to elevate
                  their property listings.
                </p>
              </div>

              {/* Right side - Buttons */}
              <div className="flex flex-col gap-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-10 py-6 text-xl font-bold transition-all duration-300 hover:scale-105 w-full text-white rounded-md bg-transparent border-background border-2"
                >
                  Explore All Vendors
                  <ArrowRight className="ml-4 h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 py-6 text-xl font-bold border-3 border-white/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full rounded-md bg-black/40 text-white backdrop-blur-sm"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
