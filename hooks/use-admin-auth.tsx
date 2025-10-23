"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminUser {
  email: string
  authenticated: boolean
}

export function useAdminAuth() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("admin_authenticated") === "true"
      const email = localStorage.getItem("admin_email")
      
      if (isAuthenticated && email) {
        setAdminUser({ email, authenticated: true })
      } else {
        setAdminUser(null)
      }
      setIsLoading(false)
    }
  }, [])

  const login = (email: string, password: string): boolean => {
    if (email === "admin@chiefmedia.com" && password === "password") {
      localStorage.setItem("admin_authenticated", "true")
      localStorage.setItem("admin_email", email)
      setAdminUser({ email, authenticated: true })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_email")
    setAdminUser(null)
    router.push("/admin/login")
  }

  const requireAuth = () => {
    if (!isLoading && !adminUser?.authenticated) {
      router.push("/admin/login")
    }
  }

  return {
    adminUser,
    isLoading,
    isAuthenticated: adminUser?.authenticated || false,
    login,
    logout,
    requireAuth
  }
}
