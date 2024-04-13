import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { requiredRoleApi } from '@/helpers/requiredRoleApi'
import { RoomStatus } from '@prisma/client'

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    if (!params.roomId)
      return new NextResponse('Room ID is missing', { status: 404 })
    const dbRoom = await db.room.findUnique({ where: { id: params.roomId } })
    if (!dbRoom) return new NextResponse('Room not found', { status: 404 })
    if (dbRoom.status === RoomStatus.booking)
      return new NextResponse(
        'Room is current booking, can not change status',
        { status: 400 }
      )

    const body = await req.json()
    const { name, status, roomTypeId } = body

    if (!name || !status || !roomTypeId)
      return new NextResponse('All fields are required', { status: 400 })

    const room = await db.room.update({
      where: { id: params.roomId },
      data: { name, status, roomTypeId },
    })

    return NextResponse.json(room)
  } catch (err) {
    console.log('[ROOM_ID_PATCH]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    if (!params.roomId)
      return new NextResponse('Room ID is missing', { status: 404 })
    const dbRoom = await db.room.findUnique({ where: { id: params.roomId } })
    if (!dbRoom) return new NextResponse('Room not found', { status: 404 })

    const room = await db.room.findUnique({
      where: { id: params.roomId },
      include: { booking_rooms: true },
    })

    if (room?.booking_rooms.length !== 0)
      return new NextResponse('Remove all bookings has this room first.', {
        status: 400,
      })

    await db.vote.deleteMany({ where: { roomId: params.roomId } })

    await db.room.delete({
      where: { id: params.roomId },
    })

    return NextResponse.json('DELETED')
  } catch (err) {
    console.log('[ROOM_ID_DELETE]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
