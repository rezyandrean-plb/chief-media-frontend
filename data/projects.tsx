import { Calendar, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"

// Mock project data
export const allProjects = [
  {
    id: 1,
    propertyAddress: "123 Oak Street, Beverly Hills, CA",
    type: "Photography + Video",
    status: "In Progress",
    progress: 75,
    startDate: "2024-01-10",
    duration: 3,
    vendor: "Sarah Johnson Photography",
    thumbnail: "/luxury-home-exterior.png",
    deliverables: 45,
    messages: 3,
    budget: 2500,
    listingPrice: 1250000,
    mediaCount: 32,
    totalMedia: 45,
  },
  {
    id: 2,
    propertyAddress: "456 Maple Ave, Santa Monica, CA",
    type: "Photography",
    status: "Completed",
    progress: 100,
    startDate: "2024-01-08",
    duration: 2,
    vendor: "Mike Chen Studios",
    thumbnail: "/modern-kitchen.png",
    deliverables: 32,
    messages: 0,
    budget: 1200,
    listingPrice: 850000,
    mediaCount: 32,
    totalMedia: 32,
  },
  {
    id: 3,
    propertyAddress: "789 Pine Road, Malibu, CA",
    type: "3D Virtual Tour",
    status: "Scheduled",
    progress: 25,
    startDate: "2024-01-20",
    duration: 4,
    vendor: "VR Property Tours",
    thumbnail: "/3d-virtual-tour-real-estate.png",
    deliverables: 0,
    messages: 1,
    budget: 3500,
    listingPrice: 2100000,
    mediaCount: 0,
    totalMedia: 15,
  },
  {
    id: 4,
    propertyAddress: "321 Sunset Blvd, Hollywood, CA",
    type: "Photography + Drone",
    status: "In Progress",
    progress: 40,
    startDate: "2024-01-15",
    duration: 3,
    vendor: "Aerial Media Pro",
    thumbnail: "/drone-aerial-real-estate-video.png",
    deliverables: 15,
    messages: 2,
    budget: 1800,
    listingPrice: 975000,
    mediaCount: 15,
    totalMedia: 28,
  },
  {
    id: 5,
    propertyAddress: "654 Beach Ave, Venice, CA",
    type: "Video Walkthrough",
    status: "Review",
    progress: 90,
    startDate: "2024-01-12",
    duration: 2,
    vendor: "Coastal Video Productions",
    thumbnail: "/real-estate-video-walkthrough.png",
    deliverables: 8,
    messages: 1,
    budget: 2200,
    listingPrice: 1450000,
    mediaCount: 8,
    totalMedia: 10,
  },
  {
    id: 6,
    propertyAddress: "987 Hill Street, West Hollywood, CA",
    type: "Photography",
    status: "Completed",
    progress: 100,
    startDate: "2024-01-05",
    duration: 1,
    vendor: "Urban Lens Photography",
    thumbnail: "/interior-real-estate-photography.png",
    deliverables: 28,
    messages: 0,
    budget: 950,
    listingPrice: 725000,
    mediaCount: 28,
    totalMedia: 28,
  },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Scheduled":
      return "bg-yellow-100 text-yellow-800"
    case "Review":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "Scheduled":
      return <Calendar className="h-4 w-4 text-yellow-600" />
    case "Review":
      return <Eye className="h-4 w-4 text-purple-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />
  }
}
