"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Calendar,
  DollarSign,
  Clock,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  client: {
    name: string
    avatar: string
    email: string
  }
  status: "new" | "in_progress" | "review" | "completed" | "overdue"
  priority: "low" | "medium" | "high"
  progress: number
  budget: number
  deadline: string
  startDate: string
  description: string
  deliverables: string[]
  messages: number
  category: string
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Luxury Home Photography Package",
    client: {
      name: "Sarah Johnson - Coldwell Banker",
      avatar: "/placeholder.svg",
      email: "sarah.johnson@coldwellbanker.com",
    },
    status: "in_progress",
    priority: "high",
    progress: 75,
    budget: 2500,
    deadline: "2024-01-15",
    startDate: "2024-01-01",
    description:
      "Realtor Sarah Johnson accepted your proposal for luxury home photography services. Complete package includes exterior, interior, and twilight shots for her $2.5M listing.",
    deliverables: ["30 high-res photos", "Virtual tour", "Drone footage", "Edited gallery"],
    messages: 3,
    category: "Photography",
  },
  {
    id: "2",
    title: "Commercial Property Video Production",
    client: {
      name: "Michael Chen - RE/MAX Elite",
      avatar: "/placeholder.svg",
      email: "m.chen@remax.com",
    },
    status: "review",
    priority: "medium",
    progress: 90,
    budget: 4200,
    deadline: "2024-01-20",
    startDate: "2023-12-15",
    description:
      "Realtor Michael Chen hired you for multi-camera video production of his commercial property listing. Project includes walkthrough and promotional content.",
    deliverables: ["Property walkthrough video", "Promotional highlights", "Social media clips", "Raw footage"],
    messages: 1,
    category: "Videography",
  },
  {
    id: "3",
    title: "Residential Property Photography",
    client: {
      name: "Isabella Rodriguez - Keller Williams",
      avatar: "/placeholder.svg",
      email: "bella.rodriguez@kw.com",
    },
    status: "completed",
    priority: "low",
    progress: 100,
    budget: 800,
    deadline: "2023-12-30",
    startDate: "2023-12-20",
    description:
      "Realtor Isabella Rodriguez accepted your proposal for residential property photography. Standard package for her new listing in downtown area.",
    deliverables: ["25 high-res photos", "Interior and exterior shots", "Edited images", "Web-ready files"],
    messages: 0,
    category: "Photography",
  },
  {
    id: "4",
    title: "Luxury Estate Photography & Video",
    client: {
      name: "David Wilson - Sotheby's International",
      avatar: "/placeholder.svg",
      email: "david.wilson@sothebys.com",
    },
    status: "new",
    priority: "high",
    progress: 0,
    budget: 3500,
    deadline: "2024-02-14",
    startDate: "2024-02-14",
    description:
      "Realtor David Wilson from Sotheby's accepted your premium package proposal for luxury estate documentation. High-end property requires comprehensive coverage.",
    deliverables: ["Professional photo album", "Cinematic property video", "Drone footage", "Virtual tour"],
    messages: 5,
    category: "Photography",
  },
  {
    id: "5",
    title: "New Development Marketing Package",
    client: {
      name: "Jennifer Martinez - Century 21",
      avatar: "/placeholder.svg",
      email: "j.martinez@century21.com",
    },
    status: "overdue",
    priority: "high",
    progress: 60,
    budget: 5000,
    deadline: "2024-01-05",
    startDate: "2023-12-01",
    description:
      "Realtor Jennifer Martinez hired you for comprehensive marketing package for new residential development. Multi-property campaign with various content types.",
    deliverables: [
      "Development overview video",
      "Individual unit photos",
      "Marketing materials",
      "Social media content",
    ],
    messages: 8,
    category: "Videography",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  useEffect(() => {
    console.log("[v0] MY PROJECTS PAGE LOADED - Client Work Management")
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    const matchesPriority = filterPriority === "all" || project.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const projectStats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "in_progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    overdue: projects.filter((p) => p.status === "overdue").length,
    totalRevenue: projects.reduce((sum, p) => sum + p.budget, 0),
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <div className="bg-[#273F4F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Projects</h1>
              <p className="text-gray-300 text-base">Manage your client projects and deliverables</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-[#273F4F]/20 shadow-none border-0 bg-[rgba(252,235,220,0.5054347826086957)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-[#273F4F]">{projectStats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-[#273F4F]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#273F4F]/20 border-0 shadow-none bg-[rgba(252,235,220,0.5)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-[#F37521]">{projectStats.active}</p>
                </div>
                <Clock className="h-8 w-8 text-[#F37521]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#273F4F]/20 border-0 shadow-none bg-[rgba(252,235,220,0.5)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{projectStats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#273F4F]/20 shadow-none border-0 bg-[rgba(252,235,220,0.5)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{projectStats.overdue}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#273F4F]/20 shadow-none border-0 bg-[rgba(252,235,220,0.5)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#03809C]">${projectStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#03809C]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects, clients, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#273F4F]/20 shadow-none"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 border-[#273F4F]/20 shadow-xs">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({projects.length})</SelectItem>
                <SelectItem value="new">New ({projects.filter((p) => p.status === "new").length})</SelectItem>
                <SelectItem value="in_progress">
                  In Progress ({projects.filter((p) => p.status === "in_progress").length})
                </SelectItem>
                <SelectItem value="review">Review ({projects.filter((p) => p.status === "review").length})</SelectItem>
                <SelectItem value="completed">
                  Completed ({projects.filter((p) => p.status === "completed").length})
                </SelectItem>
                <SelectItem value="overdue">
                  Overdue ({projects.filter((p) => p.status === "overdue").length})
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-48 border-[#273F4F]/20 shadow-none">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="border-[#273F4F]/20 hover:shadow-lg transition-shadow shadow-none border">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-[#273F4F] line-clamp-1">{project.title}</h3>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(project.priority)}`} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
                    {getStatusIcon(project.status)}
                    {project.status.replace("_", " ").charAt(0).toUpperCase() +
                      project.status.replace("_", " ").slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-[#273F4F]">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{project.deliverables.length} deliverables</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>{project.messages} messages</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="w-full bg-[#273F4F] hover:bg-[#273F4F]/90 text-white" asChild>
                    <Link href={`/vendor/projects/${project.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
