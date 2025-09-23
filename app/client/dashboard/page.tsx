"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, Eye, MessageSquare, Download, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ClientDashboard() {
  const { user, isLoading } = useAuthGuard({ requireRole: "client" })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Mock project data
  const projects = [
    {
      id: 1,
      propertyAddress: "123 Oak Street, Beverly Hills, CA",
      type: "Photography + Video",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-01-15",
      vendor: "Sarah Johnson Photography",
      thumbnail: "/luxury-home-exterior.png",
      deliverables: 45,
      messages: 3,
    },
    {
      id: 2,
      propertyAddress: "456 Maple Ave, Santa Monica, CA",
      type: "Photography",
      status: "Completed",
      progress: 100,
      dueDate: "2024-01-10",
      vendor: "Mike Chen Studios",
      thumbnail: "/modern-kitchen.png",
      deliverables: 32,
      messages: 0,
    },
    {
      id: 3,
      propertyAddress: "789 Pine Road, Malibu, CA",
      type: "3D Virtual Tour",
      status: "Scheduled",
      progress: 25,
      dueDate: "2024-01-20",
      vendor: "VR Property Tours",
      thumbnail: "/3d-virtual-tour-real-estate.png",
      deliverables: 0,
      messages: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#273F4F] text-white py-12">
        <div className="w-full px-[7vw]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold mb-2 text-3xl">Welcome back, {user?.name}</h1>
              <p className="text-base text-background">Manage your property media projects and track deliverables</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-[7vw] py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="py-0 h-[100px] rounded-md border-0 shadow-xs">
            <CardContent className="p-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-3xl font-bold text-slate-950">2</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 flex items-center justify-center rounded-sm">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-md shadow-xs h-[100px]">
            <CardContent className="p-6 py-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-slate-950">1</p>
                </div>
                <div className="h-12 w-12 bg-green-100 flex items-center justify-center rounded-sm">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 h-[100px] rounded-md shadow-xs">
            <CardContent className="p-6 py-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Deliverables</p>
                  <p className="text-3xl font-bold text-slate-950">77</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 flex items-center justify-center rounded-sm">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-md shadow-xs h-[100px]">
            <CardContent className="p-6 py-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                  <p className="text-3xl font-bold text-slate-950">4</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 flex items-center justify-center rounded-sm">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-950">Recent Projects</h2>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/client/projects">View All Projects</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 py-0 rounded-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.propertyAddress}
                    fill
                    className="object-cover rounded-t-lg shadow-none rounded-sm"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight text-slate-950">{project.propertyAddress}</h3>
                      <p className="text-gray-600 text-sm mt-1">{project.type}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center text-slate-950">
                        <Clock className="h-4 w-4 mr-1" />
                        Due {project.dueDate}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {project.deliverables} files
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm mb-3 text-slate-950">by {project.vendor}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {project.messages > 0 && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {project.messages}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <Card className="border-0 shadow-sm rounded-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">Project completed</p>
                    <p className="text-sm text-gray-600 mt-1">
                      456 Maple Ave photography project delivered by Mike Chen Studios
                    </p>
                    <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">New message received</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Sarah Johnson Photography sent an update on 123 Oak Street project
                    </p>
                    <p className="text-xs text-gray-500 mt-2">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">Shoot scheduled</p>
                    <p className="text-sm text-gray-600 mt-1">
                      VR Property Tours confirmed for 789 Pine Road on January 20th
                    </p>
                    <p className="text-xs text-gray-500 mt-2">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
        <div className="w-full px-[7vw]">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Social%20Media-AMMTZS4OnQoBwb9d4BRrcy7CcnpKQT.png"
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
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Photography
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Videography
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Drone Services
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Virtual Tours
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Copywriting
                  </a>
                </li>
                <li>
                  <a href="/vendors" className="hover:text-white transition-colors">
                    Social Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Resource</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/become-vendor" className="hover:text-white transition-colors">
                    Become a Chief Media Vendor
                  </a>
                </li>
                <li>
                  <a href="/studios" className="hover:text-white transition-colors">
                    Studio Booking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About Chief Media
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/press" className="hover:text-white transition-colors">
                    Press Releases
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">© 2024 Chief Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
