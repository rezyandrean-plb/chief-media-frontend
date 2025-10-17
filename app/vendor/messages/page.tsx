"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, MoreVertical } from "lucide-react"
import { useState } from "react"

export default function VendorMessagesPage() {
  useAuthGuard({ requireRole: "vendor" })

  const [selectedConversation, setSelectedConversation] = useState(0)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the quick turnaround on the photos!",
      timestamp: "2 min ago",
      unread: 2,
      project: "Luxury Home Photography",
      status: "active",
    },
    {
      id: 2,
      client: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we schedule the drone shoot for next week?",
      timestamp: "1 hour ago",
      unread: 0,
      project: "Commercial Property Video",
      status: "active",
    },
    {
      id: 3,
      client: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The virtual tour looks amazing!",
      timestamp: "3 hours ago",
      unread: 1,
      project: "3D Virtual Tour",
      status: "completed",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "client",
      content: "Hi! I saw your portfolio and I'm interested in booking a photography session for my new listing.",
      timestamp: "10:30 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      sender: "vendor",
      content:
        "Hello Sarah! Thank you for reaching out. I'd be happy to help with your listing photography. Could you tell me more about the property?",
      timestamp: "10:35 AM",
    },
    {
      id: 3,
      sender: "client",
      content:
        "It's a 4-bedroom luxury home in downtown. About 3,500 sq ft. I'm looking for both interior and exterior shots.",
      timestamp: "10:40 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      sender: "vendor",
      content:
        "Perfect! For a property that size, I recommend our Premium Package which includes 30-40 high-resolution photos, both interior and exterior shots, and basic editing. The session would take about 2-3 hours.",
      timestamp: "10:45 AM",
    },
    {
      id: 5,
      sender: "client",
      content: "That sounds great! What's your availability this week?",
      timestamp: "11:00 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#273F4F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Messages</h1>
              <p className="text-gray-300 text-base">Communicate with your clients and manage project discussions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pt-8 pb-36">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 shadow-none border rounded-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Badge variant="secondary">{conversations.filter((c) => c.unread > 0).length} unread</Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(index)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedConversation === index ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.client
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conversation.client}</p>
                          {conversation.unread > 0 && (
                            <Badge
                              variant="destructive"
                              className="h-5 w-5 p-0 text-xs flex items-center justify-center"
                            >
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conversation.project}</p>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col shadow-none border rounded-lg">
            <CardHeader className="pb-4 pt-4 border-b-0 mt-[-25px] bg-[rgba(39,63,79,1)] rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversations[selectedConversation]?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {conversations[selectedConversation]?.client
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{conversations[selectedConversation]?.client}</h3>
                    <p className="text-sm text-white">{conversations[selectedConversation]?.project}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "vendor" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === "vendor" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {message.sender === "client" && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {conversations[selectedConversation]?.client
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 text-[rgba(39,63,79,1)] bg-[rgba(252,235,220,1)] ${
                        message.sender === "vendor" ? "bg-[#F37521] text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm text-[rgba(39,63,79,1)]">{message.content}</p>
                      <p
                        className={`text-xs mt-1 text-slate-500 ${message.sender === "vendor" ? "text-orange-100" : "text-gray-500"}`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border border-gray-300"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      // Handle send message
                      setNewMessage("")
                    }
                  }}
                />
                <Button className="bg-[#F37521] hover:bg-[#E5661A]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
    </div>
  )
}
