import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleStudios = [
  {
    id: "studio-1",
    name: "Studio A - Main Production",
    location: "Building 1, Floor 2",
    hourlyRate: 150,
    description: "Our flagship studio with professional lighting and green screen capabilities",
    capacity: 15,
    photos: ["/studio-a-main.jpg", "/studio-a-greenscreen.jpg", "/studio-a-equipment.jpg"],
    equipment: [
      { id: "eq-1", name: "Sony A7S III", quantity: 2, category: "camera" },
      { id: "eq-2", name: "Aputure 600D", quantity: 4, category: "lighting" },
      { id: "eq-3", name: "Rode NTG5", quantity: 2, category: "audio" },
      { id: "eq-4", name: "C-Stand", quantity: 8, category: "grip" },
    ],
    availability: [
      { dayOfWeek: 1, startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: 2, startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: 3, startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: 4, startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: 5, startTime: "09:00", endTime: "18:00" },
    ],
    amenities: ["Green Screen", "Cyclorama Wall", "Client Lounge", "WiFi", "Parking"],
    size: "1,200 sq ft",
    status: "active",
    createdAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: "studio-2",
    name: "Studio B - Photography",
    location: "Building 1, Floor 3",
    hourlyRate: 100,
    description: "Intimate photography studio with natural light options",
    capacity: 8,
    photos: ["/studio-b-main.jpg", "/studio-b-natural-light.jpg"],
    equipment: [
      { id: "eq-5", name: "Canon R5", quantity: 1, category: "camera" },
      { id: "eq-6", name: "Profoto B10", quantity: 3, category: "lighting" },
      { id: "eq-7", name: "Backdrop Stand", quantity: 2, category: "grip" },
    ],
    availability: [
      { dayOfWeek: 1, startTime: "08:00", endTime: "20:00" },
      { dayOfWeek: 2, startTime: "08:00", endTime: "20:00" },
      { dayOfWeek: 3, startTime: "08:00", endTime: "20:00" },
      { dayOfWeek: 4, startTime: "08:00", endTime: "20:00" },
      { dayOfWeek: 5, startTime: "08:00", endTime: "20:00" },
      { dayOfWeek: 6, startTime: "10:00", endTime: "18:00" },
    ],
    amenities: ["Natural Light", "Backdrops", "WiFi", "Parking"],
    size: "800 sq ft",
    status: "active",
    createdAt: new Date("2024-01-20T10:00:00Z"),
  },
  {
    id: "studio-3",
    name: "Studio C - Podcast Room",
    location: "Building 2, Floor 1",
    hourlyRate: 75,
    description: "Soundproof podcast recording studio with professional audio setup",
    capacity: 6,
    photos: ["/studio-c-podcast.jpg"],
    equipment: [
      { id: "eq-8", name: "Shure SM7B", quantity: 4, category: "audio" },
      { id: "eq-9", name: "Scarlett 18i20", quantity: 1, category: "audio" },
      { id: "eq-10", name: "Sony A6400", quantity: 2, category: "camera" },
    ],
    availability: [
      { dayOfWeek: 1, startTime: "09:00", endTime: "21:00" },
      { dayOfWeek: 2, startTime: "09:00", endTime: "21:00" },
      { dayOfWeek: 3, startTime: "09:00", endTime: "21:00" },
      { dayOfWeek: 4, startTime: "09:00", endTime: "21:00" },
      { dayOfWeek: 5, startTime: "09:00", endTime: "21:00" },
    ],
    amenities: ["Soundproof", "Audio Interface", "Headphones", "WiFi"],
    size: "400 sq ft",
    status: "active",
    createdAt: new Date("2024-02-01T10:00:00Z"),
  },
]

async function main() {
  console.log('Seeding studios...')

  for (const studio of sampleStudios) {
    await prisma.studio.upsert({
      where: { id: studio.id },
      update: studio,
      create: studio,
    })
    console.log(`✓ Seeded studio: ${studio.name}`)
  }

  console.log('✓ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding studios:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

