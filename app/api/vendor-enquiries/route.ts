export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const enquiries = await prisma.vendorEnquiry.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json({ data: enquiries });
  } catch (error) {
    console.error('Error fetching vendor enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ['firstName','lastName','email','phone','serviceType','experience','location','description'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const enquiry = await prisma.vendorEnquiry.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        businessName: body.businessName || null,
        serviceType: body.serviceType,
        experience: body.experience,
        location: body.location,
        portfolio: body.portfolio || null,
        description: body.description,
        agreedToTerms: !!body.agreedToTerms,
        address: body.address || null,
        linkedin: body.linkedin || null,
      }
    });

    return NextResponse.json({ data: enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating vendor enquiry:', error);
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}

