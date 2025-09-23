"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import {
  Bell,
  Settings,
  MessageSquare,
  DollarSign,
  Briefcase,
  LayoutDashboard,
  LogOut,
  User,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import NotificationsPanel from "./notifications-panel"

export default function Header() {
  const { user, isAuthenticated, isVendor, isOrganization, isRealtor: isClient, logout } = useAuth()
  const router = useRouter()
  const [avatarError, setAvatarError] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleAvatarError = () => {
    setAvatarError(true)
  }

  const getFallbackAvatar = () => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "default"}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="w-full flex h-16 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CM%20Full%20Logo%20%281%29-tlcCHjwVfe1jvTlLcurpjIAtBZ3xey.png"
              alt="Chief Media Logo"
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-20" : "h-28"}`}
            />
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/studios"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Studio Booking
            </Link>
            <Link
              href="/vendors"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Vendors
            </Link>
            <Link
              href="/become-vendor"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Become Vendor
            </Link>
            {(isVendor || isOrganization) && (
              <Link
                href="/vendor/gigs"
                className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                My Gigs
              </Link>
            )}
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100 rounded-full"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </Button>
          )}

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-2 border" asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                      {!avatarError && user?.avatar ? (
                        <img
                          className="rounded-full object-cover border-gray-200 h-full w-full border-0"
                          src={user.avatar || "/placeholder.svg"}
                          alt={user?.name || "User"}
                          onError={handleAvatarError}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#03809C] to-[#F37521] flex items-center justify-center">
                          {user?.name ? (
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <User className="h-5 w-5 text-white" />
                          )}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {user?.role} {user?.organizationName && ` ${user.organizationName}`}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {(isClient || user?.role === "client") && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/client/dashboard" className="flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>My Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/client/projects" className="flex items-center">
                            <FolderOpen className="mr-2 h-4 w-4" />
                            <span>My Projects</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/client/messages" className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Messages</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {(isVendor || isOrganization) && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/dashboard" className="flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>My Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/gigs" className="flex items-center">
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>My Gigs</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/projects" className="flex items-center">
                            <FolderOpen className="mr-2 h-4 w-4" />
                            <span>My Projects</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/messages" className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Messages</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/earnings" className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4" />
                            <span>Earnings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    <DropdownMenuItem asChild>
                      <Link href="/profile/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="default"
                  className="transition-all duration-300 font-medium px-6 py-2 hover:shadow-xl text-white hover:text-white bg-transparent rounded-sm shadow-none"
                  style={{
                    backgroundColor: "#f37521",
                    borderColor: "#f37521",
                  }}
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>

                <Button
                  size="default"
                  className="font-semibold px-8 py-2 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-white hover:text-white rounded-sm shadow-none"
                  style={{
                    backgroundColor: "#03809c",
                    borderColor: "#03809c",
                  }}
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </header>
  )
}
