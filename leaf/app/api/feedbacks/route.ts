import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.json([])

    const feedbacks = await db.feedback.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(feedbacks)
  } catch (err) {
    console.log('[FEEDBACK_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { content, userId } = body

    if (!content || !userId)
      return new NextResponse('All fields are required', { status: 400 })

    const fed = await db.feedback.create({
      data: { content, userId },
    })

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (err) {
    console.log('[FEEDBACK_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
