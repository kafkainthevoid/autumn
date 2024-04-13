import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    const role = await getAuthSession()
    if (role?.user.role === 'ADMIN' || role?.user.role === 'STAFF' || !userId) {
      const bookings = await db.booking.findMany({
        include: {
          booking_rooms: {
            include: { room: { include: { roomType: true } }, booking: true },
          },
        },
      })
      return NextResponse.json(bookings)
    }

    const bookings = await db.booking.findMany({
      where: { userId },
      include: {
        booking_rooms: {
          include: { room: { include: { roomType: true } }, booking: true },
        },
      },
    })

    return NextResponse.json(bookings)
  } catch (err) {
    console.log('[BOOKING_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
