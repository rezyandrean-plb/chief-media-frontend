"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Bell, Search, Check, X, MessageSquare } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  category: "all" | "mentions" | "requests"
  isRead: boolean
  type: "project" | "message" | "system" | "payment"
  user?: {
    name: string
    avatar: string
  }
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Design team weekly #37",
      message: "John D. posted",
      timestamp: "2h ago",
      category: "all",
      isRead: false,
      type: "project",
      user: {
        name: "John D.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      title: "sent you kudos",
      message: "Sebastian G.",
      timestamp: "3h ago",
      category: "all",
      isRead: false,
      type: "message",
      user: {
        name: "Sebastian G.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      title: "asks to join team Growth",
      message: "Amy L.",
      timestamp: "4h ago",
      category: "requests",
      isRead: false,
      type: "system",
      user: {
        name: "Amy L.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "4",
      title: "mentioned you in thread What are we gonna do a...",
      message: "Hans Z.",
      timestamp: "5d ago",
      category: "mentions",
      isRead: true,
      type: "message",
      user: {
        name: "Hans Z.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "5",
      title: "updated goal Build incredible products",
      message: "Sam C.",
      timestamp: "2h ago",
      category: "all",
      isRead: true,
      type: "project",
      user: {
        name: "Sam C.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: false } : notif)))
  }

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || notif.category === activeTab
    return matchesSearch && matchesTab
  })

  const tabs = [
    { id: "all", label: "All", icon: Bell },
    { id: "mentions", label: "Mentions", icon: MessageSquare },
    { id: "requests", label: "Requests", icon: Check },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 bg-white text-gray-900 border-r border-gray-300 w-full">
        <SheetHeader className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900 font-semibold">Notifications</span>
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 py-4 pb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-sm shadow-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-[#273F4F] text-[#273F4F] bg-gray-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center text-sm">
                {searchQuery ? "No notifications found" : "You're all caught up!"}
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50 border-l-2 border-l-[#F37521]" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={notification.user?.avatar || "/placeholder.svg"}
                      alt={notification.user?.name}
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium text-gray-800">{notification.user?.name}</span>{" "}
                            <span className="text-gray-700">{notification.title}</span>
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{notification.message}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {notification.category === "requests" && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-green-600 hover:bg-green-100"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-600 hover:bg-red-100">
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          {!notification.isRead && <div className="w-2 h-2 bg-[#F37521] rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
