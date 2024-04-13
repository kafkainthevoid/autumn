import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { requiredRoleApi } from '@/helpers/requiredRoleApi'

export async function GET(
  _: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const hotel = await db.hotel.findUnique({
      where: { id: params.hotelId },
      include: {
        address: true,
        roomTypes: true,
        amenity_Hotels: { include: { amenity: true } },
      },
    })

    return NextResponse.json(hotel)
  } catch (err) {
    console.log('[HOTEL_ID_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
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

    const hotel = await db.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: {
        name,
        description,
        images,
        address: {
          update: {
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
            skipDuplicates: true,
          },
        },
      },
    })

    return NextResponse.json(hotel)
  } catch (err) {
    console.log('[HOTEL_ID_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    const rooms = await db.room.findMany({
      where: { roomTypeId: params.hotelId },
    })

    if (rooms.length !== 0) {
      return new NextResponse(
        "You can't delete, please remove all rooms that have this hotel first",
        { status: 400 }
      )
    }

    await db.hotel.update({
      where: { id: params.hotelId },
      data: { isArchived: true },
    })

    return NextResponse.json('DELETED')
  } catch (err) {
    console.log('[HOTEL_ID_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
