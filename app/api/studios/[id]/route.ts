export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { studioPayloadSchema } from "@/lib/validators/studio"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studio = await prisma.studio.findUnique({
      where: { id: params.id }
    })
    
    if (!studio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ data: studio })
  } catch (error) {
    console.error('Error fetching studio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch studio' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = studioPayloadSchema.parse(await request.json())

    const studio = await prisma.studio.update({
      where: { id: params.id },
      data: {
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

    return NextResponse.json({ data: studio })
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

    console.error("Error updating studio:", error)
    return NextResponse.json({ error: "Failed to update studio" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.studio.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Studio deleted successfully' })
  } catch (error) {
    console.error('Error deleting studio:', error)
    return NextResponse.json(
      { error: 'Failed to delete studio' },
      { status: 500 }
    )
  }
}

