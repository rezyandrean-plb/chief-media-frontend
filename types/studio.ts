export type Studio = {

  id: string

  name: string

  description: string

  location: string

  capacity: number

  hourlyRate: number

  photos: string[]

  equipment: Equipment[]

  availability: Availability[]

  amenities: string[]

  size: string

  status: "active" | "maintenance" | "inactive"

  createdAt: string

}

export type Equipment = {

  id: string

  name: string

  quantity: number

  category: "camera" | "lighting" | "audio" | "grip" | "other"

}

export type Availability = {

  dayOfWeek: number // 0-6 (Sunday-Saturday)

  startTime: string // HH:mm format

  endTime: string // HH:mm format

}

export type Booking = {

  id: string

  studioId: string

  studioName: string

  userId: string

  userName: string

  userEmail: string

  userAvatar?: string

  startTime: string

  endTime: string

  date: string

  status: "pending" | "confirmed" | "cancelled" | "completed"

  paymentStatus: "pending" | "paid" | "refunded"

  totalAmount: number

  guests: Guest[]

  equipment: string[]

  notes?: string

  createdAt: string

}

export type Guest = {

  id: string

  name: string

  email: string

  status: "invited" | "confirmed" | "declined"

}



