import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { requiredRoleApi } from '@/helpers/requiredRoleApi'

export async function PATCH(
  req: Request,
  { params }: { params: { roomTypeId: string } }
) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    if (!params.roomTypeId)
      return new NextResponse('Room Type ID is missing', { status: 400 })
    const dbRoomtype = await db.roomType.findUnique({
      where: { id: params.roomTypeId },
    })
    if (!dbRoomtype)
      return new NextResponse('Room Type not found', { status: 405 })

    const body = await req.json()
    const {
      name,
      description,
      occupancy,
      images,
      price,
      maxBookingDay,
      amenities,
    } = body

    if (
      !name ||
      !description ||
      !occupancy ||
      !images ||
      !images.length ||
      !price ||
      !maxBookingDay ||
      !amenities.length
    ) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const roomTypes = await db.roomType.update({
      where: { id: params.roomTypeId },
      data: {
        name,
        description,
        occupancy,
        images,
        price,
        maxBookingDay,
        amenity_RoomTypes: {
          createMany: {
            data: [{ amenityId: 'b4ae59ae-60f0-41de-ba1a-4afa39bf57d3' }],
            skipDuplicates: true,
          },
        },
      },
    })

    return NextResponse.json(roomTypes)
  } catch (err) {
    console.log([''])
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { roomTypeId: string } }
) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    if (!params.roomTypeId)
      return new NextResponse('Room Type ID is missing', { status: 400 })
    const dbRoomtype = await db.roomType.findUnique({
      where: { id: params.roomTypeId },
    })
    if (!dbRoomtype)
      return new NextResponse('Room Type not found', { status: 405 })

    const rooms = await db.room.findMany({
      where: { roomTypeId: params.roomTypeId },
    })

    if (rooms.length !== 0) {
      return new NextResponse(
        "You can't delete, please remove all rooms that have this room type first",
        { status: 400 }
      )
    }

    await db.roomType.update({
      where: { id: params.roomTypeId },
      data: { isArchived: true },
    })

    await db.roomType.delete({
      where: { id: params.roomTypeId },
    })

    return NextResponse.json('DELETED')
  } catch (err) {
    console.log('[ROOMTYPE_DELETE]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
