"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "client" | "vendor" | "organization" | "realtor"
  avatar?: string
  organizationId?: string
  organizationName?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role?: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isVendor: boolean
  isClient: boolean
  isOrganization: boolean
  isRealtor: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const initializeAuth = () => {
      try {
        if (typeof window !== "undefined") {
          const savedUser = localStorage.getItem("kw-chief-media-user")
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser)
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Error loading saved user:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("kw-chief-media-user")
        }
      } finally {
        setIsLoading(false)
      }
    }

    requestAnimationFrame(initializeAuth)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    try {
      if (user) {
        localStorage.setItem("kw-chief-media-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("kw-chief-media-user")
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }, [user, isMounted])

  const login = async (email: string, password: string, role = "client"): Promise<boolean> => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock user data based on email and role
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        role: role as "client" | "vendor" | "organization" | "realtor",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      // Add organization data for organization accounts
      if (role === "organization") {
        mockUser.organizationId = "org_" + Math.random().toString(36).substr(2, 9)
        mockUser.organizationName = mockUser.name + " Organization"
      }

      setUser(mockUser)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (isMounted && typeof window !== "undefined") {
      try {
        localStorage.removeItem("kw-chief-media-user")
      } catch (error) {
        console.error("Error removing from localStorage:", error)
      }
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isVendor: user?.role === "vendor",
    isClient: user?.role === "client",
    isOrganization: user?.role === "organization",
    isRealtor: user?.role === "realtor",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
