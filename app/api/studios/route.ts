export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { studioPayloadSchema } from "@/lib/validators/studio"

export async function GET() {
  try {
    const studios = await prisma.studio.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ data: studios })
  } catch (error) {
    console.error("[studios API] Error fetching studios:", error)
    return NextResponse.json({ error: "Failed to fetch studios" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = studioPayloadSchema.parse(await request.json())

    const studio = await prisma.studio.create({
      data: {
        id: payload.id || `studio-${Date.now()}`,
        name: payload.name,
        location: payload.location,
        hourlyRate: payload.hourlyRate,
        description: payload.description ?? null,
        capacity: payload.capacity ?? null,
        photos: payload.photos ?? [],
        equipment:
          payload.equipment?.map((item, index) => ({
            id: item.id || `eq-${Date.now()}-${index}`,
            name: item.name,
            quantity: item.quantity,
            category: item.category,
          })) ?? [],
        availability: payload.availability ?? [],
        amenities: payload.amenities ?? [],
        size: payload.size ?? null,
        status: payload.status ?? "active",
      },
    })

    return NextResponse.json({ data: studio }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.flatten(),
        },
        { status: 400 },
      )
    }

    console.error("[studios API] Error creating studio:", error)
    return NextResponse.json({ error: "Failed to create studio" }, { status: 500 })
  }
}

