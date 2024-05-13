import moment from "moment"
import { NextResponse } from "next/server"

import qs from "qs"
import { createSecureHash, sortObject } from "@/utils/vnpay"
import { IRoom } from "@/app/(app)/modules/search-input/context/reservation"
import { DateRange } from "react-day-picker"
import { db } from "@/lib/db"

import { v4 as uuidv4 } from "uuid"
import { AmenityCount } from "@/app/(app)/modules/amenities/context/cart"

const VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("\n\n\n\n\n", body)

    const userId: string = body.userId
    const items: AmenityCount[] = body.items
    const amount = items.reduce((acc, curr) => curr.count * curr.price + acc, 0)

    const order = await db.order.create({
      data: {
        userId,
        paymentId: uuidv4(),
        totalMoney: amount,
        order_amenities: {
          createMany: {
            data: items.map((item) => ({ amenityId: item.id, count: item.count, price: item.price })),
          },
        },
      },
    })

    const createDate = moment(new Date()).format("YYYYMMDDHHmmss")
    const ipAddr = "localhost" // or: '::1'
    const orderId = moment(new Date()).format("DDHHmmss")

    let vnp_Params: any = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: process.env.VNPAY_TMN_CODE,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 10000,
      vnp_ReturnUrl: "http://localhost:3010/api/vnpay/return_order",
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      // vnp_BankCode: "", // TODO: add this later
    }

    vnp_Params = sortObject(vnp_Params)
    vnp_Params.vnp_SecureHash = createSecureHash(vnp_Params)

    const vnpUrl = VNPAY_URL + "?" + qs.stringify(vnp_Params, { encode: false })

    return NextResponse.json({ redirectUrl: vnpUrl })
  } catch (err) {
    console.log("[CREATE_PAYMENT_URL]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
