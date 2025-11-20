"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, UploadCloud } from "lucide-react"
import type { Studio, Equipment } from "@/types/studio"
import Image from "next/image"

interface AddEditStudioModalProps {
  studio: Studio | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (studio: Partial<Studio>) => Promise<void> | void
}

export function AddEditStudioModal({ studio, open, onOpenChange, onSave }: AddEditStudioModalProps) {
  const [formData, setFormData] = useState<Partial<Studio>>({
    name: "",
    description: "",
    location: "",
    capacity: 0,
    hourlyRate: 0,
    size: "",
    status: "active",
    amenities: [],
    equipment: [],
    photos: [],
    availability: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [newAmenity, setNewAmenity] = useState("")
  const [newEquipment, setNewEquipment] = useState<Partial<Equipment>>({
    name: "",
    quantity: 1,
    category: "other",
  })

  useEffect(() => {
    if (studio) {
      setFormData(studio)
      setImagePreview(studio.photos?.[0] || "")
    } else {
      setFormData({
        name: "",
        description: "",
        location: "",
        capacity: 0,
        hourlyRate: 0,
        size: "",
        status: "active",
        amenities: [],
        equipment: [],
        photos: [],
        availability: [],
      })
      setImagePreview("")
    }
    setUploadError(null)
  }, [studio, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSave(formData)
    } catch (error) {
      console.error("Failed to save studio", error)
    } finally {
      setSubmitting(false)
    }
  }

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...(prev.amenities || []), newAmenity.trim()],
      }))
      setNewAmenity("")
    }
  }

  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities?.filter((_, i) => i !== index) || [],
    }))
  }

  const addEquipment = () => {
    if (newEquipment.name?.trim()) {
      const equipment: Equipment = {
        id: `eq-${Date.now()}`,
        name: newEquipment.name,
        quantity: newEquipment.quantity || 1,
        category: newEquipment.category || "other",
      }
      setFormData((prev) => ({
        ...prev,
        equipment: [...(prev.equipment || []), equipment],
      }))
      setNewEquipment({ name: "", quantity: 1, category: "other" })
    }
  }

  const removeEquipment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5MB.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    setUploadingImage(true)
    setUploadError(null)
    try {
      const response = await fetch("/api/uploads/studio-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || "Failed to upload image")
      }

      const result = await response.json()
      setFormData((prev) => ({
        ...prev,
        photos: result.url ? [result.url, ...(prev.photos?.slice(1) || [])] : prev.photos,
      }))
      setImagePreview(result.url)
    } catch (error) {
      console.error("Image upload failed", error)
      setUploadError(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      void handleImageUpload(file)
    }
  }

  const clearImage = () => {
    setImagePreview("")
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.slice(1) || [],
    }))
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{studio ? "Edit Studio" : "Add New Studio"}</DialogTitle>
          <DialogDescription>
            {studio ? "Update studio information and settings" : "Create a new studio with equipment and amenities"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Studio Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Studio["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div
                role="button"
                tabIndex={0}
                className={`rounded-lg border border-dashed p-4 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/40"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                  setIsDragActive(true)
                }}
                onDragLeave={(event) => {
                  event.preventDefault()
                  setIsDragActive(false)
                }}
                onDrop={(event) => {
                  event.preventDefault()
                  setIsDragActive(false)
                  const file = event.dataTransfer.files?.[0]
                  if (file) {
                    void handleImageUpload(file)
                  }
                }}
              >
                {imagePreview ? (
                  <div
                    className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-md cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image src={imagePreview} alt="Studio cover" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                    <UploadCloud className="h-8 w-8" />
                    <span>Drag & drop or click to upload a cover image</span>
                    <span className="text-xs text-muted-foreground/80">Recommended 1200x800px, max 5MB</span>
                  </div>
                )}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageInputChange}
                />
                <div className="mt-4 flex justify-center gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </Button>
                  {imagePreview && (
                    <Button type="button" variant="ghost" size="sm" onClick={clearImage} disabled={uploadingImage}>
                      Remove
                    </Button>
                  )}
                </div>
                {uploadError && <p className="mt-2 text-sm text-destructive">{uploadError}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 1,200 sq ft"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (people)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: Number.parseFloat(e.target.value) })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex gap-2">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add amenity..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
              />
              <Button type="button" onClick={addAmenity} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.amenities?.map((amenity, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {amenity}
                  <button type="button" onClick={() => removeAmenity(index)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <Label>Equipment</Label>
            <div className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-5"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                placeholder="Equipment name..."
              />
              <Input
                className="col-span-2"
                type="number"
                value={newEquipment.quantity}
                onChange={(e) => setNewEquipment({ ...newEquipment, quantity: Number.parseInt(e.target.value) })}
                placeholder="Qty"
                min="1"
              />
              <Select
                value={newEquipment.category}
                onValueChange={(value: Equipment["category"]) => setNewEquipment({ ...newEquipment, category: value })}
              >
                <SelectTrigger className="col-span-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camera">Camera</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="grip">Grip</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addEquipment} size="icon" className="col-span-1">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1 mt-2">
              {formData.equipment?.map((eq, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {eq.category}
                    </Badge>
                    <span className="text-sm">{eq.name}</span>
                    <span className="text-xs text-muted-foreground">x{eq.quantity}</span>
                  </div>
                  <button type="button" onClick={() => removeEquipment(index)} className="hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : studio ? "Update Studio" : "Create Studio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
