import { NextResponse } from 'next/server'

import { requiredRoleApi } from '@/helpers/requiredRoleApi'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { discountId: string } }
) {
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

    if (!params.discountId)
      return new NextResponse('Discount ID not found', { status: 404 })
    const dbDiscount = await db.discount.findUnique({
      where: { id: params.discountId },
    })
    if (!dbDiscount)
      return new NextResponse('Discount not found', { status: 404 })

    const discount = await db.discount.update({
      where: { id: params.discountId },
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
    console.log('[DISCOUNT_ID_PATCH]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { discountId: string } }
) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    if (!params.discountId)
      return new NextResponse('Discount ID not found', { status: 404 })

    await db.roomType.updateMany({
      where: { discountId: params.discountId },
      data: { discountId: null },
    })

    await db.discount.delete({
      where: { id: params.discountId },
    })

    return NextResponse.json({ status: 'OK' })
  } catch (err) {
    console.log('[DISCOUNT_PATCH]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
