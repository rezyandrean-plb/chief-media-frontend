"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

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
        // 1) Immediately hydrate from localStorage for instant UI responsiveness
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('kw-chief-media-user')
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser)
              setUser(parsedUser)
            } catch {}
          }
        }
        setIsLoading(false)

        // 2) Reconcile in background with server session (JWT cookie)
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 2000)
        fetch('/api/auth/me', { method: 'GET', signal: controller.signal })
          .then(async (res) => {
            if (!res.ok) return
            const { data } = await res.json()
            const apiUser: User = {
              id: String(data.id),
              email: data.email,
              name: data.name,
              role: data.role,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
            }
            setUser(apiUser)
            if (typeof window !== 'undefined') {
              localStorage.setItem('kw-chief-media-user', JSON.stringify(apiUser))
            }
          })
          .catch(() => {
            // ignore background errors
          })
          .finally(() => clearTimeout(timeout))
        return
      } catch (error) {
        console.error("Error loading saved user:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("kw-chief-media-user")
        }
      } finally {
        // no-op
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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        let message = 'Invalid credentials'
        try {
          const data = await res.json()
          if (data?.error) message = data.error
        } catch {}
        toast.error(message)
        return false
      }
      const { data } = await res.json()
      const apiUser: User = {
        id: String(data.id),
        email: data.email,
        name: data.name,
        role: data.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      }
      setUser(apiUser)
      return true
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Unable to login. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      // ignore network errors on logout
    } finally {
      setUser(null)
      if (isMounted && typeof window !== "undefined") {
        try {
          localStorage.removeItem("kw-chief-media-user")
        } catch (error) {
          console.error("Error removing from localStorage:", error)
        }
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
