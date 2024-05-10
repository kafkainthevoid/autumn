import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { userId, star, comment, bookingRoomId, roomTypeId } = await req.json()
    if (!star || !comment || !bookingRoomId || !roomTypeId)
      return new NextResponse("All fields are required", { status: 400 })

    const review = await db.review.create({
      data: {
        star,
        comment,
        bookingRoomId,
        userId,
        roomTypeId,
      },
    })

    return NextResponse.json(review)
  } catch (err) {
    console.log("[REVIEW_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
