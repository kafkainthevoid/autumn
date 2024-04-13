import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { requiredRoleApi } from '@/helpers/requiredRoleApi'

export async function POST(req: Request) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    const body = await req.json()

    const {
      name,
      description,
      discountPercent,
      startDate,
      endDate,
      roomTypeIds,
    } = body

    if (
      !name ||
      !description ||
      !discountPercent ||
      !startDate ||
      !endDate ||
      !roomTypeIds.length
    ) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const discount = await db.discount.create({
      data: {
        name,
        description,
        discountPercent,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        roomTypes: {
          connect: roomTypeIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(discount)
  } catch (err) {
    console.log('[DISCOUNT_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
