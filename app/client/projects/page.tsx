"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Camera, Clock, Plus, Eye, Grid3X3, List } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { allProjects, getStatusColor, getStatusIcon } from "@/data/projects"

export default function ClientProjectsPage() {
  const { user, isLoading } = useAuthGuard({ requireRole: "client" })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  const filteredProjects = allProjects.filter((project) => {
    if (statusFilter !== "all" && project.status !== statusFilter) {
      return false
    }
    if (searchTerm && !project.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    return true
  })

  const ProjectCard = ({ project }: { project: (typeof allProjects)[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
              {project.propertyAddress}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 font-medium">{project.type}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(project.status)} ml-3 flex-shrink-0`}>
            <div className="flex items-center gap-1.5">
              {getStatusIcon(project.status)}
              <span className="text-xs font-medium">{project.status}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">{project.startDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">{project.duration} days</span>
          </div>
          <div className="flex items-center gap-3">
            <Camera className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">
              {project.mediaCount} of {project.totalMedia} media
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-900">
              {Math.round((project.mediaCount / project.totalMedia) * 100)}%
            </span>
          </div>
          <Progress value={(project.mediaCount / project.totalMedia) * 100} className="h-2 bg-gray-100" />
        </div>

        <Button
          size="sm"
          className="w-full bg-[#273F4F] hover:bg-[#1e2f3a] text-white font-medium mt-4"
          onClick={() => router.push(`/client/projects/${project.id}`)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Project Details
        </Button>
      </CardContent>
    </Card>
  )

  const ProjectListItem = ({ project }: { project: (typeof allProjects)[0] }) => (
    <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            <div className="space-y-1 min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 truncate">{project.propertyAddress}</CardTitle>
              <CardDescription className="text-sm text-gray-600 font-medium">{project.type}</CardDescription>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{project.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{project.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-gray-500" />
                <span className="font-medium">
                  {project.mediaCount}/{project.totalMedia}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32">
                <Progress value={(project.mediaCount / project.totalMedia) * 100} className="h-2" />
              </div>
              <Badge className={getStatusColor(project.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(project.status)}
                  <span className="text-xs">{project.status}</span>
                </div>
              </Badge>
            </div>
          </div>

          <Button
            size="sm"
            className="bg-[#273F4F] hover:bg-[#1e2f3a] text-white ml-6"
            onClick={() => router.push(`/client/projects/${project.id}`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#273F4F] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="font-bold text-white text-3xl">My Projects</h1>
              <p className="text-gray-200 max-w-2xl text-base">
                Track and manage all your property media projects with real-time progress updates
              </p>
            </div>
            <Button className="bg-[#F37521] hover:bg-[#E5661A] text-white font-semibold px-6 py-3">
              <Plus className="h-5 w-5 mr-2" />
              New Project Request
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border-0 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <Input
                type="text"
                placeholder="Search projects by address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 border-gray-200 focus:border-[#273F4F] focus:ring-[#273F4F]"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-gray-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="border-gray-200 hover:bg-gray-50"
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first project request"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button className="bg-[#F37521] hover:bg-[#E5661A] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
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
