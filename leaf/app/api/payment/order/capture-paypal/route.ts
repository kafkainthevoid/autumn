import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import * as paypal from "@/lib/paypal-api"
import { AmenityCount } from "@/app/(app)/modules/amenities/context/cart"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const userId: string = body.userId
    const orderId: string = body.orderId
    const items: AmenityCount[] = body.items
    const totalMoney: number = +body.totalMoney

    const captureData = await paypal.capturePayment(orderId)

    if (!captureData.id) return new NextResponse("Payment failed", { status: 500 })

    const order = await db.order.create({
      data: {
        userId,
        totalMoney,
      },
    })

    items.forEach(async (item) => {
      await db.order_Amenity.create({
        data: {
          count: item.count,
          price: item.price,
          amenityId: item.id,
          orderId: order.id,
        },
      })
    })

    return NextResponse.json("OK")
  } catch (err: any) {
    console.log("API_PAYMENT_CAPTURE-PAYPAL", err)
    return new NextResponse(err.message, { status: 500 })
  }
}
