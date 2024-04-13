import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { requiredRoleApi } from '@/helpers/requiredRoleApi'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const p = searchParams.get('p')

  try {
    if (!p) return NextResponse.json([])

    const hotels = await db.hotel.findMany({
      where: {
        address: { province: +p },
      },
      include: {
        address: true,
        amenity_Hotels: { include: { amenity: true } },
        roomTypes: true,
      },
    })

    return NextResponse.json(hotels)
  } catch (err) {
    console.log('[HOTEL_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    const body = await req.json()
    const {
      name,
      description,
      phoneNumber,
      ward,
      district,
      province,
      coordinate,
      addressLine,
      images,
      amenities,
    } = body

    if (
      !name ||
      !description ||
      !phoneNumber ||
      !ward ||
      !district ||
      !province ||
      !coordinate ||
      !addressLine ||
      !images ||
      !images.length ||
      !amenities.length
    ) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const hotel = await db.hotel.create({
      data: {
        name,
        description,
        images,
        address: {
          create: {
            contactName: name,
            addressLine,
            coordinate,
            phone: phoneNumber,
            ward,
            district,
            province,
          },
        },
        amenity_Hotels: {
          createMany: {
            data: amenities.map((amenityId: string) => ({ amenityId })),
          },
        },
      },
    })

    return NextResponse.json(hotel)
  } catch (err) {
    console.log('[HOTEL_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
