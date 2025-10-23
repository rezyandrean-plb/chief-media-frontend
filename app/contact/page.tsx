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
    </div>
  )
}
