export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    
    return NextResponse.json({ data: vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
        const vendor = await prisma.vendor.create({
          data: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            specialty: body.specialty || null,
            rating: body.rating ? parseFloat(body.rating.toString()) : null,
            reviews: body.reviews || null,
            location: body.location || null,
            image: body.image || null,
            profileImage: body.profileImage || null,
            services: body.services || [],
            priceRange: body.priceRange || null,
            description: body.description || null,
            status: body.status || 'pending',
            company: body.company || null,
            address: body.address || null,
            website: body.website || null,
            business_hours: body.business_hours || null,
            pricing: body.pricing || null,
            social_media: body.social_media || null,
            document_id: body.document_id || null
          }
        });
    
    return NextResponse.json({ data: vendor });
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to create vendor' },
      { status: 500 }
    );
  }
}
