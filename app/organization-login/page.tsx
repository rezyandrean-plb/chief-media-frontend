"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Building2, Users, Camera } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function OrganizationLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(email, password)
    if (success) {
      router.push("/vendor/dashboard")
    } else {
      // Handle error - in real app, show error message
      console.error("Login failed")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center text-sm rounded-lg px-3 py-2 text-[#273F4F] hover:bg-white/90 hover:text-[#273F4F] transition-all duration-200 group bg-white/80 border border-gray-300 shadow-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center bg-[#273F4F] p-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#F37521]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-[#03809C]/15 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-[#F2A16D]/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="relative">
            {/* Main illustration container */}
            <div className="w-80 h-80 relative">
              {/* Circular background */}
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>

              {/* Central graphic elements - Organization theme */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Building/Organization icon */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <Building2 className="h-16 w-16 text-[#F37521]" />
                  </div>

                  {/* Multiple people silhouettes representing team */}
                  <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-8 h-10 bg-[#03809C] rounded-t-full"></div>
                    <div className="w-8 h-10 bg-[#F37521] rounded-t-full"></div>
                    <div className="w-8 h-10 bg-[#F2A16D] rounded-t-full"></div>
                  </div>
                  <div className="absolute top-38 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-10 h-12 bg-[#03809C] rounded-lg"></div>
                    <div className="w-10 h-12 bg-[#F37521] rounded-lg"></div>
                    <div className="w-10 h-12 bg-[#F2A16D] rounded-lg"></div>
                  </div>

                  {/* Digital elements around the organization */}
                  <div className="absolute top-4 left-8 w-8 h-8 bg-[#03809C] rounded-lg rotate-12 opacity-80"></div>
                  <div className="absolute top-12 right-6 w-6 h-6 bg-[#F2A16D] rounded-full opacity-90"></div>
                  <div className="absolute bottom-16 left-4 w-10 h-6 bg-white/80 rounded-md"></div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 bg-[#F37521]/80 rounded-lg -rotate-12"></div>

                  {/* Organization/team icons */}
                  <Camera className="absolute top-6 right-12 h-6 w-6 text-white/70" />
                  <Users className="absolute bottom-12 left-8 h-5 w-5 text-[#03809C]" />

                  {/* Connecting lines */}
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Floating elements outside the circle */}
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-[#F37521] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-[#03809C] rounded-lg rotate-45 opacity-70"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#FCEBDC]/30">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-[#273F4F]">Organization Login</h1>
            <p className="text-base text-gray-600">Access your organization's vendor portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider">
                Organization Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your organization email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] rounded-xl text-base px-4"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] rounded-xl text-base px-4"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#F37521] hover:bg-[#E06A1E] text-white font-semibold rounded-xl text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Signing in..." : "🏢 Sign in to Organization"}
            </Button>
          </form>

          <div className="text-center space-y-3 pt-4">
            <p className="text-sm text-gray-600">
              Individual vendor account?{" "}
              <Link href="/login" className="text-[#F37521] hover:text-[#E06A1E] font-semibold">
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Don't have an organization account?{" "}
              <Link href="/become-vendor" className="text-[#03809C] hover:text-[#03809C]/80 font-medium">
                Apply to become a vendor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
