"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[500px] bg-[#273F4F] overflow-visible">
        <div className="w-full px-[7vw]">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[500px]">
            {/* Left Side - Contact Copy */}
            <div className="relative z-10 py-12 flex flex-col justify-center">
              {/* Date/Location style header */}
              <div className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-6">
                2024 // CHIEF MEDIA NETWORK
              </div>

              {/* Main heading */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                LET'S START YOUR NEXT PROJECT TOGETHER
              </h1>

              {/* Description paragraphs */}
              <div className="space-y-4 mb-8">
                <p className="text-white/90 leading-relaxed text-base">
                  Ready to elevate your real estate marketing with professional media services? Our team of creative
                  experts is here to bring your vision to life.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl text-white mb-4 font-bold">Other Ways to Reach Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 mb-6 gap-3.5">
                  {/* Call Center */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F37521] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Call Center</p>
                      <p className="flex items-center space-x-3 pr-0 mr-0 text-background text-sm">800 (36) 95-30 34</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3 pr-0 mr-0">
                    <div className="w-10 h-10 bg-[#F37521] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Email</p>
                      <p className="text-white/70 text-sm">hello@chiefmedia.co</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-3 pl-5">
                    <div className="w-10 h-10 bg-[#F37521] rounded-full flex items-center justify-center flex-shrink-0 pl-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Location: New York - 10001</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="text-white/90 mb-3 font-semibold text-base">Follow Us</p>
                  <div className="flex space-x-3">
                    <div className="bg-white/20 rounded-full flex items-center justify-center hover:bg-[#F37521] transition-all duration-300 cursor-pointer h-12 w-12">
                      <Facebook className="text-white h-6 w-6" />
                    </div>
                    <div className="bg-white/20 rounded-full flex items-center justify-center hover:bg-[#F37521] transition-all duration-300 cursor-pointer h-12 w-12">
                      <Twitter className="text-white h-6 w-6" />
                    </div>
                    <div className="bg-white/20 rounded-full flex items-center justify-center hover:bg-[#F37521] transition-all duration-300 cursor-pointer h-12 w-12">
                      <Linkedin className="text-white h-6 w-6" />
                    </div>
                    <div className="bg-white/20 rounded-full flex items-center justify-center hover:bg-[#F37521] transition-all duration-300 cursor-pointer h-12 w-12">
                      <Instagram className="text-white h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div></div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative z-10 py-12">
              <Card className="bg-white/95 backdrop-blur-sm mt-0 relative -mb-24 rounded-md border-0 shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#273F4F] mb-6 text-slate-950" id="contact-form">
                    Get in Touch
                  </h3>
                  <p className="mb-8 text-base text-slate-950">
                    Tell us about your project and let's create something amazing together.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="font-medium text-[#273F4F] text-slate-950">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-2 border-gray-300 focus:border-[#F37521] placeholder:text-sm placeholder:text-gray-400 shadow-none rounded-sm"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="font-medium text-[#273F4F] text-slate-950">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-2 border-gray-300 focus:border-[#F37521] placeholder:text-sm placeholder:text-gray-400 shadow-none rounded-sm"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-medium text-[#273F4F] text-slate-950">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-2 border-gray-300 focus:border-[#F37521] placeholder:text-sm placeholder:text-gray-400 shadow-none rounded-sm"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber" className="font-medium text-[#273F4F] text-slate-950">
                        Phone Number
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="mt-2 border-gray-300 focus:border-[#F37521] placeholder:text-sm placeholder:text-gray-400 shadow-none rounded-sm"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-medium text-[#273F4F] text-slate-950">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={4}
                        className="mt-2 border-gray-300 focus:border-[#F37521] resize-none placeholder:text-sm placeholder:text-gray-400 shadow-none rounded-sm"
                        placeholder="Tell us about your project and how we can help you..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#F37521] hover:bg-[#F37521]/90 text-white py-3 font-medium transition-all duration-300 hover:shadow-lg rounded-sm"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="w-full">
          <div className="overflow-hidden flex-row bg-background" style={{ height: "400px" }}>
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center my-20">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-gray-500 text-sm">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#273F4F] mt-0">
        <div className="w-full px-6 lg:px-8">
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
            <p>Chief Media ® is a part of KW Singapore Real Estate Pte. Ltd.</p>
            <p>Copyright © 2025 KW Singapore Official Gig Economy Vendor</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
