"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StudioCard } from "@/components/studios/studio-card"
import { AddEditStudioModal } from "@/components/studios/add-edit-studio-modal"
import { Plus, Search, Building2, Users, DollarSign, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Studio } from "@/types/studio"
import { MetricCard } from "@/components/dashboard/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"

const mapApiStudio = (studio: any): Studio => ({
  id: studio.id,
  name: studio.name,
  description: studio.description || "",
  location: studio.location,
  capacity: studio.capacity ?? 0,
  hourlyRate: studio.hourlyRate,
  photos: (studio.photos as string[]) || [],
  equipment: (studio.equipment as any[]) || [],
  availability: (studio.availability as any[]) || [],
  amenities: (studio.amenities as string[]) || [],
  size: studio.size || "",
  status: (studio.status || "active") as "active" | "maintenance" | "inactive",
  createdAt: studio.createdAt ? new Date(studio.createdAt).toISOString() : new Date().toISOString(),
})

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  // Fetch studios from API
  useEffect(() => {
    const fetchStudios = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/studios')
        if (response.ok) {
          const result = await response.json()
          // Transform database data to match Studio type
          const transformedStudios: Studio[] = result.data.map(mapApiStudio)
          setStudios(transformedStudios)
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch studios",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Error fetching studios:', error)
        toast({
          title: "Error",
          description: "Failed to fetch studios",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStudios()
  }, [toast])

  const activeStudios = studios.filter((s: Studio) => s.status === "active").length
  const totalCapacity = studios.reduce((sum: number, s: Studio) => sum + (s.capacity || 0), 0)
  const averageRate = studios.length > 0 ? Math.round(studios.reduce((sum: number, s: Studio) => sum + s.hourlyRate, 0) / studios.length) : 0

  // Studios by status for pie chart
  const studiosByStatus = [
    { name: "Active", value: studios.filter((s: Studio) => s.status === "active").length, color: "#10b981" },
    { name: "Maintenance", value: studios.filter((s: Studio) => s.status === "maintenance").length, color: "#f59e0b" },
    { name: "Inactive", value: studios.filter((s: Studio) => s.status === "inactive").length, color: "#ef4444" },
  ].filter((item) => item.value > 0)

  // Capacity distribution by studio
  const capacityData = studios.map((studio: Studio) => ({
    name: studio.name,
    capacity: studio.capacity || 0,
  }))

  const filteredStudios = studios.filter((studio: Studio) => {
    const query = searchQuery.toLowerCase()
    return (
      studio.name.toLowerCase().includes(query) ||
      studio.location.toLowerCase().includes(query) ||
      studio.description.toLowerCase().includes(query)
    )
  })

  const handleAddNew = () => {
    console.log("[v0] Opening add studio modal")
    setSelectedStudio(null)
    setIsModalOpen(true)
  }

  const handleEdit = (studio: Studio) => {
    console.log("[v0] Opening edit studio modal for:", studio.id)
    setSelectedStudio(studio)
    setIsModalOpen(true)
  }

  const handleDelete = async (studioId: string) => {
    try {
      const response = await fetch(`/api/studios/${studioId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setStudios((prev: Studio[]) => prev.filter((s: Studio) => s.id !== studioId))
        toast({
          title: "Studio Deleted",
          description: "The studio has been deleted successfully.",
          variant: "destructive",
        })
      } else {
        throw new Error('Failed to delete studio')
      }
    } catch (error) {
      console.error('Error deleting studio:', error)
      toast({
        title: "Error",
        description: "Failed to delete studio",
        variant: "destructive",
      })
    }
  }

  const handleSave = async (studioData: Partial<Studio>) => {
    // Validate required fields
    const name = studioData.name
    const location = studioData.location
    const hourlyRate = studioData.hourlyRate
    
    if (!name || !location || hourlyRate === undefined || hourlyRate === null) {
      toast({
        title: "Validation Error",
        description: "Name, location, and hourly rate are required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      if (selectedStudio) {
        // Update existing studio
        const response = await fetch(`/api/studios/${selectedStudio.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studioData)
        })

        if (response.ok) {
          const result = await response.json()
          // Transform and update local state
          const updatedStudio: Studio = mapApiStudio(result.data)
          setStudios((prev: Studio[]) => prev.map((s: Studio) => (s.id === selectedStudio.id ? updatedStudio : s)))
          toast({
            title: "Studio Updated",
            description: "The studio has been updated successfully.",
          })
        } else {
          throw new Error('Failed to update studio')
        }
      } else {
        // Create new studio
        const response = await fetch('/api/studios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studioData)
        })

        if (response.ok) {
          const result = await response.json()
          // Transform and add to local state
          const newStudio: Studio = mapApiStudio(result.data)
          setStudios((prev: Studio[]) => [...prev, newStudio])
          toast({
            title: "Studio Created",
            description: "The new studio has been created successfully.",
          })
        } else {
          throw new Error('Failed to create studio')
        }
      }
      setSelectedStudio(null)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving studio:', error)
      toast({
        title: "Error",
        description: selectedStudio ? "Failed to update studio" : "Failed to create studio",
        variant: "destructive",
      })
    }
  }

  return (
    <AdminLayout 
      title="Studio Management"
      description="Monitor and manage all studio spaces"
      showBackButton={true}
      backHref="/admin"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link href="/admin/studio-bookings">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                View Bookings
              </Button>
            </Link>
            <Button onClick={handleAddNew} className="gap-2 bg-[#B40101] hover:bg-[#e0651a] text-white">
              <Plus className="h-4 w-4" />
              Add Studio
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Studios"
            value={studios.length.toString()}
            change={`${activeStudios} active`}
            changeType="positive"
            icon={Building2}
            delay={0}
          />
          <MetricCard
            title="Active Studios"
            value={activeStudios.toString()}
            change={`${studios.length - activeStudios} inactive`}
            changeType="positive"
            icon={Building2}
            delay={0.1}
          />
          <MetricCard
            title="Total Capacity"
            value={totalCapacity.toString()}
            change="Combined capacity"
            changeType="positive"
            icon={Users}
            delay={0.2}
          />
          <MetricCard
            title="Avg. Hourly Rate"
            value={`$${averageRate}`}
            change="Across all studios"
            changeType="positive"
            icon={DollarSign}
            delay={0.3}
          />
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search studios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Studios Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Studios</h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B40101]"></div>
              <span className="ml-2 text-gray-600">Loading studios...</span>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudios.map((studio: Studio) => (
                  <StudioCard key={studio.id} studio={studio} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
              {filteredStudios.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No studios found</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Studios by Status */}
          <Card>
            <CardHeader>
              <CardTitle>Studios by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studiosByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studiosByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Capacity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Capacity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="capacity" fill="#f37521" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Modal */}
        <AddEditStudioModal
          studio={selectedStudio}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  )
}
