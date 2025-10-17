"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(email, password)
    if (success) {
      router.push("/client/dashboard")
    } else {
      // toast is shown from context; optionally add inline message here
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
                  {/* Person silhouette */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-[#F37521] rounded-t-full"></div>
                  <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-[#F37521] rounded-lg"></div>

                  {/* Digital elements around the person */}
                  <div className="absolute top-4 left-8 w-8 h-8 bg-[#03809C] rounded-lg rotate-12 opacity-80"></div>
                  <div className="absolute top-12 right-6 w-6 h-6 bg-[#F2A16D] rounded-full opacity-90"></div>
                  <div className="absolute bottom-16 left-4 w-10 h-6 bg-white/80 rounded-md"></div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 bg-[#F37521]/80 rounded-lg -rotate-12"></div>

                  {/* Camera/media icons */}
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
            <h1 className="text-3xl font-bold text-[#273F4F] text-slate-950">Log in to continue your journey</h1>
            <p className="text-base text-slate-950">Access your professional media network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
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
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
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
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#FCEBDC]/30 text-gray-500 font-medium">Other sign up options</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="w-14 h-14 border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-700 transition-all duration-200 rounded-md border shadow-none"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-14 h-14 border-gray-200 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] bg-white text-[#1877F2] transition-all duration-200 rounded-md shadow-none border"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-14 h-14 border-gray-200 hover:bg-black hover:text-white hover:border-black bg-white text-black transition-all duration-200 rounded-md border shadow-none"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.81.87.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="text-center space-y-4 pt-4">
            <div className="text-xs text-gray-500 leading-relaxed">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-[#F37521] hover:text-[#E06A1E] font-medium">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#F37521] hover:text-[#E06A1E] font-medium">
                Privacy Policy
              </Link>
            </div>

            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#F37521] hover:text-[#E06A1E] font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
