"use client"

import { useState } from "react"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Search, Trash2, Check, Clock, AlertCircle, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  category: "all" | "alerts" | "updates" | "messages"
  isRead: boolean
  type: "project" | "message" | "system" | "payment"
}

export default function ClientNotifications() {
  const { isLoading } = useAuthGuard({ requireRole: "client" })
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Project Update: Website Redesign",
      message: "Your website redesign project has been completed and is ready for review.",
      timestamp: "2 hours ago",
      category: "updates",
      isRead: false,
      type: "project",
    },
    {
      id: "2",
      title: "New Message from Studio Alpha",
      message: "Studio Alpha has sent you a message regarding your upcoming video project.",
      timestamp: "4 hours ago",
      category: "messages",
      isRead: false,
      type: "message",
    },
    {
      id: "3",
      title: "Payment Confirmation",
      message: "Your payment of $2,500 for the branding package has been processed successfully.",
      timestamp: "1 day ago",
      category: "updates",
      isRead: true,
      type: "payment",
    },
    {
      id: "4",
      title: "System Maintenance Alert",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
      timestamp: "2 days ago",
      category: "alerts",
      isRead: true,
      type: "system",
    },
    {
      id: "5",
      title: "Project Deadline Reminder",
      message: "Your logo design project deadline is approaching in 3 days.",
      timestamp: "3 days ago",
      category: "alerts",
      isRead: false,
      type: "project",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FileText className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "system":
        return <AlertCircle className="h-4 w-4" />
      case "payment":
        return <Check className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || notif.category === activeTab
    return matchesSearch && matchesTab
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#273F4F]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#273F4F] text-white py-12">
        <div className="w-full px-[7vw]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-background">Stay updated with your projects and messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-[7vw] py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 shadow-none rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-[#F37521] text-white">
                {unreadCount} Unread
              </Badge>
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Mark All Read
                </Button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} className="mb-6">
            <TabsList className="flex border-b border-gray-200 mb-6">
              <TabsTrigger
                value="all"
                className="flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span>Primary</span>
              </TabsTrigger>

              <TabsTrigger
                value="alerts"
                className="flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Promotions</span>
                {notifications.filter((n) => n.category === "alerts" && !n.isRead).length > 0 && (
                  <Badge className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notifications.filter((n) => n.category === "alerts" && !n.isRead).length} new
                  </Badge>
                )}
              </TabsTrigger>

              <TabsTrigger
                value="messages"
                className="flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Social</span>
              </TabsTrigger>

              <TabsTrigger
                value="updates"
                className="flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Updates</span>
                {notifications.filter((n) => n.category === "updates" && !n.isRead).length > 0 && (
                  <Badge className="bg-[#F37521] text-white text-xs px-2 py-0.5 rounded-full">
                    {notifications.filter((n) => n.category === "updates" && !n.isRead).length} new
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                    <p className="text-gray-500 text-center">
                      {searchQuery
                        ? "Try adjusting your search terms"
                        : "You're all caught up! Check back later for new updates."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`transition-all duration-200 hover:shadow-md rounded-md shadow-none border border-gray-300 ${
                        !notification.isRead ? "border-l-4 border-l-[#F37521] bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <CardContent className="p-6 px-6 py-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div
                              className={`p-2 rounded-full ${!notification.isRead ? "bg-[#F37521]/10" : "bg-gray-100"}`}
                            >
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <h3
                                className={`font-medium mb-1 text-slate-950 ${
                                  !notification.isRead ? "text-gray-900" : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              <p className="text-sm mb-2 text-slate-950">{notification.message}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{notification.timestamp}</span>
                                {!notification.isRead && (
                                  <Badge variant="secondary" className="bg-[#F37521] text-white text-xs bg-secondary">
                                    New
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="text-[#F37521] hover:bg-[#F37521]/10"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
        <div className="w-full px-[7vw]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold">KW Chief Media</h3>
              <p className="text-white/70 text-sm">
                Connecting businesses with top-tier creative professionals for exceptional results.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/studios" className="hover:text-white transition-colors">
                    Find Studios
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors">
                    Post Projects
                  </Link>
                </li>
                <li>
                  <Link href="/talent" className="hover:text-white transition-colors">
                    Hire Talent
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Resources</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/70 text-sm">© 2024 KW Chief Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
