"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const values = [
    {
      number: "01",
      title: "Quality First",
      description: "We maintain the highest standards in every project, ensuring exceptional results.",
      color: "#F37521",
    },
    {
      number: "02",
      title: "Collaboration",
      description: "We foster meaningful partnerships between professionals and creative talent.",
      color: "#03809C",
    },
    {
      number: "03",
      title: "Innovation",
      description: "We continuously evolve our platform, staying ahead of industry trends.",
      color: "#F2A16D",
    },
    {
      number: "04",
      title: "Integrity",
      description: "We build trust through transparency and ethical business practices.",
      color: "#273F4F",
    },
    {
      number: "05",
      title: "Transparency",
      description: "We maintain open communication and honest relationships with all stakeholders.",
      color: "#F37521",
    },
    {
      number: "06",
      title: "Excellence",
      description: "We strive for perfection in every detail, delivering outstanding results consistently.",
      color: "#03809C",
    },
    {
      number: "07",
      title: "Growth",
      description: "We support the continuous development of our community and platform.",
      color: "#F2A16D",
    },
    {
      number: "08",
      title: "Reliability",
      description: "We deliver consistent, dependable service that our clients can count on.",
      color: "#273F4F",
    },
    {
      number: "09",
      title: "Creativity",
      description: "We encourage innovative thinking and creative solutions in everything we do.",
      color: "#F37521",
    },
    {
      number: "10",
      title: "Community",
      description: "We build strong relationships and foster a supportive network of professionals.",
      color: "#03809C",
    },
    {
      number: "11",
      title: "Sustainability",
      description: "We commit to environmentally responsible practices and long-term thinking.",
      color: "#F2A16D",
    },
    {
      number: "12",
      title: "Empowerment",
      description: "We enable our community members to achieve their full potential and success.",
      color: "#273F4F",
    },
    {
      number: "13",
      title: "Accessibility",
      description: "We ensure our platform is inclusive and accessible to all users regardless of ability.",
      color: "#F37521",
    },
    {
      number: "14",
      title: "Authenticity",
      description: "We stay true to our mission and values while building genuine relationships.",
      color: "#03809C",
    },
    {
      number: "15",
      title: "Adaptability",
      description: "We embrace change and continuously adapt to meet evolving market needs.",
      color: "#F2A16D",
    },
    {
      number: "16",
      title: "Respect",
      description: "We treat all community members with dignity and value diverse perspectives.",
      color: "#273F4F",
    },
    {
      number: "17",
      title: "Efficiency",
      description: "We streamline processes to deliver maximum value with minimal waste.",
      color: "#F37521",
    },
    {
      number: "18",
      title: "Security",
      description: "We protect our users' data and maintain the highest security standards.",
      color: "#03809C",
    },
  ]

  const cardsPerView = 3
  const maxSlides = Math.ceil(values.length / cardsPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [values.length])

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="relative py-8 lg:py-12 bg-[rgba(39,63,79,1)] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg-bnLtYL7XVBBTfw6KdA4xlqgpv3YsZN.jpeg"
            alt="Creative professionals working"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-[7vw]">
          <div>
            <h1 className="mb-4 text-4xl tracking-tight text-white sm:text-5xl font-normal">
              Creative Excellence<span className="block font-normal">Meets Real Estate</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-0 w-8/12">
              We're the bridge between real estate professionals and exceptional creative talent, building a marketplace
              where quality meets opportunity and innovation drives results.
            </p>

            <div className="mb-6"></div>

            {/* Trusted by section */}
            <div>
              <div className="flex space-x-8 opacity-80 mx-0 border-t items-center text-left pt-4 mt-4 w-3/5">
                <div className="text-white/80 font-semibold">500+ Vendors</div>
                <div className="text-white/80 font-semibold">15K+ Projects</div>
                <div className="text-white/80 font-semibold">98% Satisfaction</div>
                <div className="text-white/80 font-semibold">24/7 Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cta-accent/20 to-transparent my-4"></div>
      {/* OUR STORY Section */}
      <section className="bg-white py-0 pb-12 pt-3">
        <div className="w-full px-[7vw]">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[500px]">
            {/* Left Column - Straight Images */}
            <div className="p-12 flex flex-col justify-center relative overflow-hidden bg-transparent px-0">
              <div className="relative h-full w-full columns-2 gap-4 space-y-4">
                {/* First column */}
                <div className="break-inside-avoid mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brooke-cagle-JBwcenOuRCg-unsplash.jpg-gUMDH8nABPqOd9Zdnv9hcIVPHtm1vL.jpeg"
                    alt="Professional working individually"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="break-inside-avoid mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jason-goodman-vbxyFxlgpjM-unsplash.jpg-d0EUMM183Ynspr0LTlOMCfDca8TMMO.jpeg"
                    alt="Modern office meeting"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Second column */}
                <div className="break-inside-avoid mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brooke-cagle--uHVRvDr7pg-unsplash.jpg-lzs3N5QIvBtFyUUrSAwrzxAnLF9dpf.jpeg"
                    alt="Team collaboration meeting"
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>

                <div className="break-inside-avoid mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/krakenimages-376KN_ISplE-unsplash.jpg-tOLPGDugPKOrey8IrZIellrTyJEtNt.jpeg"
                    alt="Business success collaboration"
                    className="w-full h-56 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Content */}
            <div className="bg-white p-12 flex flex-col justify-center pr-0">
              <div className="text-[#03809C] text-sm font-semibold tracking-wider uppercase mb-4">OUR STORY</div>

              <h2 className="font-bold text-[#273F4F] mb-8 leading-tight text-4xl text-slate-950">
                Building Bridges Between Creativity and Real Estate
              </h2>

              <h3 className="text-[#273F4F] mb-6 leading-tight font-normal text-2xl text-slate-950">
                From vision to reality, one connection at a time.
              </h3>

              <p className="text-[#273F4F]/80 leading-relaxed mb-6 text-base text-slate-950">
                Founded with a simple yet powerful vision: to transform how real estate professionals connect with
                exceptional creative talent. We recognized that the industry needed a trusted platform where quality
                meets opportunity, and innovation drives results.
              </p>

              <p className="text-[#273F4F]/80 leading-relaxed mb-6 text-base text-slate-950">
                What started as a solution to bridge the gap between real estate professionals and creative services has
                evolved into a thriving marketplace. Today, we're proud to serve over 500 vendors and facilitate
                thousands of successful projects annually.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Services - Redesigned to match reference image */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-[7vw]">
          <div className="flex gap-16 items-center">
            {/* Left Column - Content (40%) */}
            <div className="w-2/5 max-w-xl">
              <div className="text-[#03809C] text-sm font-semibold tracking-wider uppercase mb-4">OUR VALUES</div>

              <h2 className="text-4xl font-bold text-[#03809C] mb-8 leading-tight text-slate-950 lg:text-4xl">
                Core Principles That Drive Us
              </h2>

              <p className="text-[#273F4F]/70 leading-relaxed mb-8 text-base text-slate-950">
                The fundamental beliefs and standards that guide our mission and shape every interaction with our
                community.
              </p>

              <div className="flex items-center space-x-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border-2 border-[#273F4F]/20 flex items-center justify-center hover:border-[#03809C] hover:text-[#03809C] transition-colors"
                >
                  <span className="text-lg">←</span>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-[#03809C] text-white flex items-center justify-center hover:bg-[#03809C]/90 transition-colors"
                >
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>

            {/* Right Column - Values Carousel (60%) */}
            <div className="w-3/5 relative">
              {/* Background gradient element */}

              <div className="overflow-hidden pb-4 shadow-none">
                <div
                  className="flex space-x-6 transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing"
                  style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
                  onMouseDown={(e) => {
                    const startX = e.pageX
                    const scrollLeft = currentSlide

                    const handleMouseMove = (e: MouseEvent) => {
                      const x = e.pageX - startX
                      if (Math.abs(x) > 50) {
                        if (x > 0) {
                          prevSlide()
                        } else {
                          nextSlide()
                        }
                        document.removeEventListener("mousemove", handleMouseMove)
                        document.removeEventListener("mouseup", handleMouseUp)
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener("mousemove", handleMouseMove)
                      document.removeEventListener("mouseup", handleMouseUp)
                    }

                    document.addEventListener("mousemove", handleMouseMove)
                    document.addEventListener("mouseup", handleMouseUp)
                  }}
                >
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="min-w-[280px] h-80 bg-white p-8 hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1 mt-9 shadow-md flex flex-col justify-between rounded-lg"
                    >
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-[#03809C]/10 rounded-full flex items-center justify-center bg-transparent">
                          <span className="text-3xl font-bold text-secondary" style={{ color: value.color }}>
                            {value.number}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#273F4F] mb-4 text-center">{value.title.toUpperCase()}</h3>

                      <p className="text-[#273F4F]/70 text-sm text-center mb-6 leading-relaxed text-slate-950">
                        {value.description}
                      </p>

                      {/* Navigation dot */}
                      <div className="flex justify-center">
                        <div
                          className="w-3 h-3 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              Math.floor(index / cardsPerView) === currentSlide ? value.color : `${value.color}30`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: maxSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-[#03809C] w-6" : "bg-[#03809C]/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values - Redesigned with grid layout */}
      <section className="py-20 bg-white pb-5">
        <div className="w-full px-[7vw]">
          {/* Mission - Quote style layout */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="text-sm font-semibold tracking-wider uppercase mb-4 text-secondary">MISSION & VISION</div>
              <h2 className="text-4xl font-bold leading-tight text-slate-950 mb-0.5">Our Purpose & Direction</h2>
              <p className="max-w-2xl mx-auto text-slate-950 text-base">
                The driving forces behind everything we do and where we're headed as a company.
              </p>
            </div>

            <div className="flex gap-5 mb-5">
              {/* Mission Image - 40% */}
              <div className="w-2/5 rounded-2xl overflow-hidden h-56 shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/david-iskander-GTnFf_44e7o-unsplash.jpg-eGwYiFSSePkH8olX2tuQa297iyf1Mr.jpeg"
                  alt="Mission - Professional branding materials"
                  className="w-full h-full object-cover rounded-md shadow-none"
                />
              </div>

              {/* Mission Content - 60% */}
              <div className="w-3/5 p-10 flex flex-col justify-center bg-gray-50 shadow-sm border-0 rounded-md py-10 h-56 border-secondary border-l-4">
                <div className="mb-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  To empower real estate professionals with access to exceptional creative talent, enabling them to
                  showcase properties in ways that captivate buyers and drive results.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              {/* Vision Content - 60% */}
              <div className="w-3/5 p-10 flex flex-col justify-center h-56 bg-gray-50 shadow-sm border-0 rounded-md border-primary border-l-4">
                <div className="mb-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  To be the leading platform where creativity meets real estate, transforming property marketing
                  worldwide.
                </p>
              </div>

              {/* Vision Image - 40% */}
              <div className="w-2/5 rounded-2xl overflow-hidden h-56 shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/razvan-chisu-Ua-agENjmI4-unsplash.jpg-LNhgKeSkZ8wCZS6V2MXfq8QwSbAZND.jpeg"
                  alt="Vision - Business success and achievement"
                  className="w-full h-full object-cover rounded-lg shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Realtor CTA Section */}
      <section className="py-12 overflow-visible">
        <div className="w-full">
          <div className="relative bg-[#273F4F] overflow-visible min-h-[350px]">
            <div className="grid lg:grid-cols-2 h-full">
              {/* Left Side - Content */}
              <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-auto lg:py-7 lg:pr-12 lg:pl-[135px]">
                {/* Date/Location style header */}
                <div className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-6">
                  2024 // CHIEF MEDIA NETWORK
                </div>

                <h2 className="text-3xl font-bold text-white mb-6 leading-tight lg:text-3xl">
                  THE PLATFORM FOR THE
                  <br />
                  FUTURE OF REAL ESTATE
                </h2>

                <p className="text-white/90 leading-relaxed mb-4 max-w-lg text-base">
                  Join us at the leading marketplace for creative transformation, innovation and disrupvation and
                  disruptive technologies.
                </p>
                <p className="text-white/90 leading-relaxed mb-8 max-w-lg text-base">
                  We bring the relevant media and tech professionals from all over the world together to #rld together
                  to #listen, #learn! #experience! and do #business!
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-[#F37521] hover:bg-[#F37521]/90 text-white px-8 font-semibold text-lg py-6 border-2 border-[#F37521] uppercase tracking-wider rounded-md"
                    asChild
                  >
                    <Link href="/vendors">Get started</Link>
                  </Button>
                </div>
              </div>

              {/* Right Side - Image with geometric overlay */}
              <div className="relative flex overflow-visible items-center justify-center">
                {/* Background Image */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scott-graham-OQMZwNd3ThU-unsplash.jpg-G6WlOPZFA0DUnHa7Mg8H9tsheKQGNr.jpeg"
                  alt="Professional business meeting and contract signing"
                  className="absolute object-cover object-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 h-[500px] w-3/5 rounded-lg"
                />

                {/* Geometric Triangle Overlay */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Vendor CTA Section */}
      <section className="overflow-visible py-20 pb-36">
        <div className="w-full">
          <div className="relative bg-[#F37521] overflow-visible min-h-[350px]">
            <div className="grid lg:grid-cols-2 h-full">
              {/* Left Side - Image with geometric overlay */}
              <div className="relative flex items-center justify-center overflow-visible pr-0 mr-0">
                {/* Background Image */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brooke-cagle-JBwcenOuRCg-unsplash.jpg-gUMDH8nABPqOd9Zdnv9hcIVPHtm1vL.jpeg"
                  alt="Creative professional working on projects"
                  className="absolute object-cover object-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 h-[500px] w-3/5 rounded-lg"
                />
              </div>

              {/* Right Side - Content */}
              <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-auto lg:py-7 lg:px-12">
                {/* Date/Location style header */}
                <div className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-6">
                  2024 // VENDOR NETWORK
                </div>

                {/* Updated title styling */}
                <h2 className="text-3xl font-bold text-white mb-6 leading-tight lg:text-3xl">
                  READY TO GROW YOUR
                  <br />
                  CREATIVE BUSINESS?
                </h2>

                <p className="text-white/90 leading-relaxed mb-4 max-w-lg text-base">
                  Join us at the premier marketplace for creative professionals, innovation and transformative business
                  opportunities.
                </p>
                <p className="text-white/90 leading-relaxed mb-8 max-w-lg text-base">
                  We bring the most talented media and creative professionals from all over the world together to
                  #connect, #create! #collaborate! and do #business!
                </p>

                {/* Updated button styling */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="hover:bg-white/90 text-[#F37521] px-8 font-semibold text-lg py-6 border-2 uppercase tracking-wider rounded-md bg-foreground border-foreground text-background"
                    asChild
                  >
                    <Link href="/become-vendor">Apply now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
