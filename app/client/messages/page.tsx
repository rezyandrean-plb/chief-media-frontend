"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, Search, Phone, Video, MoreVertical, Smile, Plus } from "lucide-react"
import { useState } from "react"

export default function ClientMessagesPage() {
  const { user, isLoading } = useAuthGuard({ requireRole: "client" })
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    )
  }

  const conversations = [
    {
      id: 1,
      name: "Maya Kasuma",
      lastMessage: "Yes! OK",
      timestamp: "14:54",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: 0,
      online: false,
    },
    {
      id: 2,
      name: "Jason Ballmer",
      lastMessage: "👍 Video",
      timestamp: "15:26",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: 1,
      online: true,
    },
    {
      id: 3,
      name: "Alice Whitman",
      lastMessage: "🔧 Wow! Have great time. Enjoy.",
      timestamp: "15:12",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: "Baking Club",
      lastMessage: "Rebecca: @Chris R?",
      timestamp: "14:43",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: 1,
      online: false,
    },
    {
      id: 5,
      name: "Stasa Benko",
      lastMessage: "Aww no problem.",
      timestamp: "13:56",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: 2,
      online: false,
    },
  ]

  // Mock messages for selected conversation
  const messages = [
    {
      id: 1,
      sender: "vendor",
      content: "Here are all the files. Let me know once you've had a look.",
      timestamp: "14:03",
      avatar: "/placeholder.svg?height=32&width=32",
      attachments: [{ name: "All-files.zip", size: "23.5 MB", type: "Compressed (zipped) Folder" }],
    },
    {
      id: 2,
      sender: "client",
      content: "OK! 👍",
      timestamp: "14:04",
    },
    {
      id: 3,
      sender: "vendor",
      content: "So beautiful here!",
      timestamp: "15:06",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      sender: "client",
      content: "Wow! Have great time. Enjoy.",
      timestamp: "15:12",
    },
  ]

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar - Conversations */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#273F4F] border-gray-200 shadow-none py-4 mt-0 bg-foreground border-b-0 pb-[23px] pt-[23px]">
          <div className="flex items-center justify-between text-background">
            <h1 className="text-xl font-medium text-background">Chats</h1>
            <Button variant="ghost" size="sm" className="text-slate-950 hover:bg-gray-100">
              <Plus className="h-5 w-5 text-background" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 shadow-none"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedConversation === conversation.id ? "bg-gray-50" : ""
              }`}
            >
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="truncate text-slate-950 text-sm font-semibold">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="bg-[#F37521] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#273F4F] border-gray-200 p-4 flex items-center justify-between shadow-none mb-2 pb-[22px] bg-foreground border-b-0">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConv?.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedConv?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-background">{selectedConv?.name}</h2>
              <p className="text-xs text-gray-300">online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Video className="w-6 h-6 text-background" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Phone className="h-5 w-5 text-background" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <MoreVertical className="h-5 w-5 text-background" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="1" fill="%23f0f0f0" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grain)"/%3E%3C/svg%3E")',
          }}
        >
          {/* Today Label */}
          <div className="text-center">
            <span className="bg-white px-3 py-1 rounded-full text-xs shadow-none text-slate-950">Today</span>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md ${message.sender === "client" ? "bg-[#F37521] text-white" : "bg-white text-gray-900"} p-3 rounded-sm shadow-none`}
              >
                {message.attachments && (
                  <div className="mb-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="p-3 mb-2 rounded-xs shadow-none bg-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-yellow-400 rounded p-1 rounded-sm">
                            <Paperclip className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                            <p className="text-xs text-gray-600">
                              {attachment.size} • {attachment.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent shadow-none rounded-sm border border-slate-300">
                            Open
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent border border-slate-300 rounded-sm">
                            Save as...
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {message.image && (
                  <div className="mb-2">
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Shared image"
                      className="max-w-full h-auto rounded-sm"
                    />
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <div className="flex justify-end items-center mt-1 space-x-1">
                  <span className={`text-xs ${message.sender === "client" ? "text-orange-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </span>
                  {message.sender === "client" && (
                    <div className="text-orange-100">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  // Handle send message
                  setNewMessage("")
                }
              }}
            />
            <Button size="sm" className="bg-[#F37521] hover:bg-[#E06A1E]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
