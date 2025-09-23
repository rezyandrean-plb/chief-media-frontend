"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, FileText, CheckCircle, Upload, Send, Download, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Project {
  id: string
  title: string
  client: {
    name: string
    avatar: string
    email: string
    phone: string
  }
  status: "new" | "in_progress" | "review" | "completed" | "overdue"
  priority: "low" | "medium" | "high"
  progress: number
  budget: number
  deadline: string
  startDate: string
  description: string
  deliverables: string[]
  messages: Array<{
    id: string
    sender: string
    message: string
    timestamp: string
    isClient: boolean
  }>
  category: string
  files: Array<{
    id: string
    name: string
    type: string
    size: string
    uploadedAt: string
  }>
}

const mockProject: Project = {
  id: "1",
  title: "Luxury Home Photography Package",
  client: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    email: "sarah@realestate.com",
    phone: "+1 (555) 123-4567",
  },
  status: "in_progress",
  priority: "high",
  progress: 75,
  budget: 2500,
  deadline: "2024-01-15",
  startDate: "2024-01-01",
  description:
    "Complete photography package for luxury home listing including exterior, interior, and twilight shots. The property is a 4,500 sq ft modern home with premium finishes and requires high-end photography to showcase its features effectively.",
  deliverables: ["30 high-res photos", "Virtual tour", "Drone footage", "Edited gallery"],
  messages: [
    {
      id: "1",
      sender: "Sarah Johnson",
      message: "Hi! Looking forward to the shoot tomorrow. The property will be staged and ready by 9 AM.",
      timestamp: "2024-01-10 14:30",
      isClient: true,
    },
    {
      id: "2",
      sender: "You",
      message: "Perfect! I'll arrive at 9 AM sharp with all equipment. Weather looks great for exterior shots.",
      timestamp: "2024-01-10 15:15",
      isClient: false,
    },
    {
      id: "3",
      sender: "Sarah Johnson",
      message: "Great! Also, could we get some twilight shots of the pool area? It has beautiful lighting.",
      timestamp: "2024-01-10 16:00",
      isClient: true,
    },
  ],
  category: "Photography",
  files: [
    {
      id: "1",
      name: "Property_Floor_Plans.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-01-08",
    },
    {
      id: "2",
      name: "Staging_Guidelines.docx",
      type: "DOCX",
      size: "1.2 MB",
      uploadedAt: "2024-01-08",
    },
  ],
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const [project] = useState<Project>(mockProject)
  const [newMessage, setNewMessage] = useState("")
  const [newDeliverable, setNewDeliverable] = useState("")

  useEffect(() => {
    console.log("[v0] PROJECT DETAILS PAGE LOADED - Project ID:", params.id)
  }, [params.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  const handleSubmitDeliverable = () => {
    if (newDeliverable.trim()) {
      // Add deliverable submission logic here
      setNewDeliverable("")
    }
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Header */}
      <div className="bg-[#273F4F] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
              <Link href="/vendor/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center gap-4 text-white/80">
                
                <Badge variant="outline" className="text-white border-white/40">
                  {project.category}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(project.priority)}`} />
              <Badge className={`${getStatusColor(project.status)}`}>
                {project.status.replace("_", " ").charAt(0).toUpperCase() + project.status.replace("_", " ").slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium text-[#273F4F]">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Calendar className="h-6 w-6 text-[#273F4F] mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="h-6 w-6 text-[#F37521] mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Deadline</p>
                        <p className="font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Communication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="max-h-96 overflow-y-auto space-y-4">
                      {project.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isClient ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isClient ? "bg-gray-100 text-gray-900" : "bg-[#273F4F] text-white"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${message.isClient ? "text-gray-500" : "text-white/70"}`}>
                              {message.sender} • {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="bg-[#273F4F] hover:bg-[#273F4F]/90">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deliverables" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {project.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium">{deliverable}</span>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Completed
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add new deliverable..."
                          value={newDeliverable}
                          onChange={(e) => setNewDeliverable(e.target.value)}
                        />
                        <Button onClick={handleSubmitDeliverable} className="bg-[#F37521] hover:bg-[#F37521]/90">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Files</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {project.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-[#273F4F]" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-600">
                                {file.size} • {file.type}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.client.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#273F4F]">{project.client.name}</p>
                    <p className="text-sm text-gray-600">Real Estate Agent</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{project.client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{project.client.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="font-medium text-[#03809C]">${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(project.priority)}`} />
                    <span className="font-medium capitalize">{project.priority}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Messages</span>
                  <span className="font-medium">{project.messages.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Files</span>
                  <span className="font-medium">{project.files.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
