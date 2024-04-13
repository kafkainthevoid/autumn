import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { requiredRoleApi } from '@/helpers/requiredRoleApi'

export async function POST(req: Request) {
  try {
    await requiredRoleApi(['ADMIN', 'STAFF'])

    const { name, description, image } = await req.json()
    if (!name || !description || !image)
      return new NextResponse('All fields are required', { status: 400 })

    const amenity = await db.amenity.create({
      data: { name, description, image },
    })

    return NextResponse.json(amenity)
  } catch (err) {
    console.log('[AMENITY_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
