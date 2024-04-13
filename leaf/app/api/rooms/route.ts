import { NextResponse } from 'next/server'

import { requiredRoleApi } from '@/helpers/requiredRoleApi'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    const body = await req.json()

    const { name, status, roomTypeId } = body

    if (!name || !status || !roomTypeId) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const dbRoomType = await db.roomType.findUnique({
      where: { id: roomTypeId },
    })
    if (!dbRoomType)
      return new NextResponse('Room Type is not found', { status: 404 })

    if (status === 'booking')
      return new NextResponse(
        "You can't set room status as `booking` at creation",
        { status: 400 }
      )

    await db.room.create({
      data: {
        name,
        status,
        roomTypeId,
      },
    })

    return NextResponse.json('OK')
  } catch (err) {
    console.log('[ROOM_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
