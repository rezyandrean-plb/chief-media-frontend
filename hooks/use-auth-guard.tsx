"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface UseAuthGuardOptions {
  requireAuth?: boolean
  requireRole?: "client" | "vendor" | "organization"
  redirectTo?: string
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { requireAuth = true, requireRole, redirectTo = "/login" } = options

  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    // Check if authentication is required
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    // Check if specific role is required
    if (requireRole && user?.role !== requireRole) {
      // Redirect based on user role or to login if not authenticated
      if (!isAuthenticated) {
        router.push(redirectTo)
      } else {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case "vendor":
          case "organization":
            router.push("/vendor/dashboard")
            break
          case "client":
            router.push("/client/dashboard")
            break
          default:
            router.push("/")
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requireAuth, requireRole, redirectTo, router])

  return {
    user,
    isLoading,
    isAuthenticated,
    isAuthorized: !requireRole || user?.role === requireRole,
  }
}
