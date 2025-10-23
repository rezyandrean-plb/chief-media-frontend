export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const enquiry = await prisma.vendorEnquiry.findUnique({ where: { id: parseInt(params.id) } });
    if (!enquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: enquiry });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiry' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const enquiry = await prisma.vendorEnquiry.update({
      where: { id: parseInt(params.id) },
      data: {
        status: body.status,
        updatedAt: new Date()
      }
    });
    return NextResponse.json({ data: enquiry });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    if (action !== 'approve') {
      return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
    }

    const enquiry = await prisma.vendorEnquiry.findUnique({ where: { id: parseInt(params.id) } });
    if (!enquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Create Vendor from enquiry
    const vendor = await prisma.vendor.create({
      data: {
        name: `${enquiry.firstName} ${enquiry.lastName}`.trim(),
        phone: enquiry.phone,
        email: enquiry.email,
        specialty: enquiry.serviceType,
        location: enquiry.location,
        description: enquiry.description,
        company: enquiry.businessName || undefined,
        address: enquiry.address || undefined,
        website: enquiry.portfolio || undefined,
        status: 'active'
      }
    });

    // Update enquiry status and link
    const updated = await prisma.vendorEnquiry.update({
      where: { id: enquiry.id },
      data: { status: 'approved', convertedToVendor: vendor.id }
    });

    return NextResponse.json({ data: { enquiry: updated, vendor } });
  } catch (error) {
    console.error('Error approving enquiry:', error);
    return NextResponse.json({ error: 'Failed to approve enquiry' }, { status: 500 });
  }
}

