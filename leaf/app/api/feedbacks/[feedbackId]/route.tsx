import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { feedbackId: string } }) {
  try {
    await db.feedback.update({ where: { id: params.feedbackId }, data: { isViewed: true } })

    return NextResponse.json("Updated")
  } catch (err) {
    console.log("[FEEDBACK_ID_PATCH]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
