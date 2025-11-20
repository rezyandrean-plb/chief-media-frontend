import { z } from "zod"

const optionalInt = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined
  }
  return value
}, z.coerce.number().int().nonnegative())

export const equipmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Equipment name is required"),
  quantity: z.coerce.number().int().positive().default(1),
  category: z.enum(["camera", "lighting", "audio", "grip", "other"]).default("other"),
})

export const availabilitySchema = z.object({
  dayOfWeek: z.coerce.number().int().min(0).max(6),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
})

export const studioPayloadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Studio name is required"),
  description: z.string().optional().nullable(),
  location: z.string().min(1, "Location is required"),
  capacity: optionalInt.optional(),
  hourlyRate: z.coerce.number().nonnegative(),
  photos: z.array(z.string()).optional().default([]),
  equipment: z.array(equipmentSchema).optional().default([]),
  availability: z.array(availabilitySchema).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  size: z.string().optional().nullable(),
  status: z.enum(["active", "maintenance", "inactive"]).optional().default("active"),
})

export type StudioPayload = z.infer<typeof studioPayloadSchema>



