"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, Settings, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAdminAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = login(email, password)
    if (success) {
      router.push("/admin")
    } else {
      setError("Invalid admin credentials")
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

              {/* Central graphic elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Admin shield icon */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-[#F37521] rounded-lg flex items-center justify-center">
                    <Shield className="h-12 w-12 text-white" />
                  </div>

                  {/* Admin tools around the shield */}
                  <div className="absolute top-4 left-8 w-8 h-8 bg-[#03809C] rounded-lg flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute top-12 right-6 w-6 h-6 bg-[#F2A16D] rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute bottom-16 left-4 w-10 h-6 bg-white/80 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-[#273F4F]" />
                  </div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 bg-[#F37521]/80 rounded-lg flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>

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
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-[#F37521] rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#273F4F] text-slate-950">Admin Access</h1>
            <p className="text-base text-slate-950">Enter your admin credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950"
              >
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@chiefmedia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] text-base px-4 rounded-md shadow-none"
                required
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950"
              >
                Admin Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] text-base px-4 rounded-md shadow-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#F37521] hover:bg-[#E06A1E] text-white font-semibold text-base hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-md shadow-none"
            >
              {isLoading ? "Signing in..." : "Access Admin Dashboard"}
            </Button>
          </form>

          <div className="text-center space-y-4 pt-4">
            <div className="text-xs text-gray-500 leading-relaxed">
              This is a secure admin area. Only authorized personnel should access this page.
            </div>

            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link href="/contact" className="text-[#F37521] hover:text-[#E06A1E] font-semibold">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
