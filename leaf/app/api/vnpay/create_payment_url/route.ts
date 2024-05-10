import moment from "moment"
import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { NextApiRequest } from "next"

export async function POST(req: NextApiRequest) {
  try {
    const createDate = moment(new Date()).format("YYYYMMDDHHmmss")

    const ipAddr = req.headers["x-forwarded-for"] || req.connection?.remoteAddress || req.socket?.remoteAddress

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: config.vnp_TmnCode,
      vnp_Locale: language,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: config.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    }
  } catch (err) {
    console.log("[REVIEW_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
