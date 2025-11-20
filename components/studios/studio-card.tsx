"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, DollarSign, Edit, Trash2 } from "lucide-react"
import type { Studio } from "@/types/studio"
import Image from "next/image"

interface StudioCardProps {
  studio: Studio
  onEdit: (studio: Studio) => void
  onDelete: (studioId: string) => void
}

export function StudioCard({ studio, onEdit, onDelete }: StudioCardProps) {
  const getStatusBadge = (status: Studio["status"]) => {
    const variants: Record<Studio["status"], { variant: any; label: string }> = {
      active: { variant: "default", label: "Active" },
      maintenance: { variant: "secondary", label: "Maintenance" },
      inactive: { variant: "destructive", label: "Inactive" },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{studio.name}</CardTitle>
          </div>
          {getStatusBadge(studio.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Studio Image */}
        {studio.photos.length > 0 && (
          <div className="relative h-48 w-full rounded-lg overflow-hidden bg-muted">
            <Image src={studio.photos[0] || "/placeholder.svg"} alt={studio.name} fill className="object-cover" />
          </div>
        )}

        {/* Studio Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{studio.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Capacity: {studio.capacity}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>${studio.hourlyRate}/hour</span>
          </div>
          <div className="text-muted-foreground">Size: {studio.size}</div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(studio)} className="flex-1 gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(studio.id)} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
