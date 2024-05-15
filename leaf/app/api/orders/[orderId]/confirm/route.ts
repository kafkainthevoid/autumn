import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
  try {
    console.log("\n\n\n\n\npatching...")

    await db.order.update({
      where: { id: params.orderId },
      data: { isViewed: true },
    })

    console.log("\n\n\nshit happened")

    return NextResponse.json("Updated")
  } catch (err) {
    console.log("[ORDER_CONFIRM]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
