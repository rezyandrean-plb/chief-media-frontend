import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data: vendor });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
        const vendor = await prisma.vendor.update({
          where: { id: parseInt(params.id) },
          data: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            specialty: body.specialty,
            rating: body.rating ? parseFloat(body.rating.toString()) : null,
            reviews: body.reviews,
            location: body.location,
            image: body.image,
            profileImage: body.profileImage,
            services: body.services,
            priceRange: body.priceRange,
            description: body.description,
            status: body.status,
            company: body.company,
            address: body.address,
            website: body.website,
            business_hours: body.business_hours,
            pricing: body.pricing,
            social_media: body.social_media,
            document_id: body.document_id,
            updatedAt: new Date()
          }
        });
    
    return NextResponse.json({ data: vendor });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to update vendor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vendor.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { error: 'Failed to delete vendor' },
      { status: 500 }
    );
  }
}
