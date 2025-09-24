"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DollarSign,
  Briefcase,
  FolderOpen,
  Star,
  TrendingUp,
  Calendar,
  MessageSquare,
  Plus,
  Eye,
  ArrowRight,
} from "lucide-react"

export default function VendorDashboard() {
  console.log("[v0] VENDOR DASHBOARD LOADED - Business Overview Page")

  // Mock data for dashboard
  const dashboardStats = {
    totalEarnings: 12450,
    monthlyEarnings: 3200,
    activeGigs: 8,
    completedProjects: 24,
    averageRating: 4.8,
    responseTime: "2 hours",
  }

  const recentActivity = [
    {
      id: 1,
      type: "project_completed",
      title: "Luxury Home Photography completed",
      client: "Sarah Johnson - Coldwell Banker",
      time: "2 hours ago",
      amount: "$450",
    },
    {
      id: 2,
      type: "new_message",
      title: "New message from client",
      client: "Michael Chen - RE/MAX",
      time: "4 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "gig_inquiry",
      title: "New inquiry for Virtual Staging",
      client: "Emma Davis - Keller Williams",
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "payment_received",
      title: "Payment received",
      client: "David Wilson - Century 21",
      time: "1 day ago",
      amount: "$320",
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      project: "Commercial Property Shoot",
      client: "Isabella Rodriguez",
      deadline: "Tomorrow",
      status: "in_progress",
    },
    {
      id: 2,
      project: "3D Virtual Tour",
      client: "James Thompson",
      deadline: "Dec 15",
      status: "review",
    },
    {
      id: 3,
      project: "Drone Photography",
      client: "Lisa Anderson",
      deadline: "Dec 18",
      status: "in_progress",
    },
  ]

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#273F4F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-300 text-base">Here's your business overview</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#273F4F]/20 shadow-none border-0 bg-[rgba(252,235,220,0.5)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-[#273F4F]">${dashboardStats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-900">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#273F4F]/20 bg-[rgba(252,235,220,0.5)] border-0 shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-[#273F4F]">
                    ${dashboardStats.monthlyEarnings.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-gray-600">{dashboardStats.completedProjects} projects completed</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#273F4F]/20 shadow-none border-0 bg-[rgba(252,235,220,0.5)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Gigs</p>
                  <p className="text-3xl font-bold text-[#273F4F]">{dashboardStats.activeGigs}</p>
                </div>
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-gray-600">{dashboardStats.averageRating} average rating</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="border-[#273F4F]/20 shadow-none border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#273F4F]">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/vendor/notifications">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors border-b rounded-none"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {activity.type === "new_message" && <MessageSquare className="h-4 w-4 text-primary" />}
                    {activity.type === "project_completed" && <FolderOpen className="h-4 w-4 text-green-600" />}
                    {activity.type === "gig_inquiry" && <Eye className="h-4 w-4 text-secondary" />}
                    {activity.type === "payment_received" && <DollarSign className="h-4 w-4 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#273F4F] truncate">{activity.title}</p>
                      {activity.amount && <span className="text-green-600 font-semibold">{activity.amount}</span>}
                      {activity.unread && <Badge className="bg-primary text-white">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{activity.client}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="border-[#273F4F]/20 shadow-none border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#273F4F]">Upcoming Deadlines</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/vendor/projects">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#273F4F] text-white text-xs">
                        {item.client.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-[#273F4F]">{item.project}</p>
                      <p className="text-sm text-gray-600">{item.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#273F4F]">{item.deadline}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        item.status === "in_progress"
                          ? "border-primary text-primary"
                          : item.status === "review"
                            ? "border-secondary text-secondary"
                            : "border-gray-400 text-gray-600"
                      }`}
                    >
                      {item.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-[#273F4F]/20 mt-8 shadow-none border">
          <CardHeader>
            <CardTitle className="text-lg text-[#273F4F]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2 bg-primary hover:bg-[#E06A1E] text-white" asChild>
                <Link href="/vendor/gigs">
                  <Plus className="h-6 w-6" />
                  Create New Gig
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-[#273F4F] text-[#273F4F] hover:bg-[#273F4F] hover:text-white bg-transparent"
                asChild
              >
                <Link href="/vendor/projects">
                  <FolderOpen className="h-6 w-6" />
                  Manage Projects
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent"
                asChild
              >
                <Link href="/vendor/messages">
                  <MessageSquare className="h-6 w-6" />
                  Messages
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                asChild
              >
                <Link href="/vendor/earnings">
                  <DollarSign className="h-6 w-6" />
                  View Earnings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
        <div className="w-full px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/chiefmedia.png"
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

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>Chief Media ® is a part of KW Singapore Real Estate Pte. Ltd.</p>
            <p>Copyright © 2025 KW Singapore Official Gig Economy Vendor</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
