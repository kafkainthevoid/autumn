import moment from "moment"
import { NextResponse } from "next/server"

import qs from "qs"
import { createSecureHash, sortObject } from "@/utils/vnpay"
import { IRoom } from "@/app/(app)/modules/search-input/context/reservation"
import { DateRange } from "react-day-picker"
import { db } from "@/lib/db"

import { v4 as uuidv4 } from "uuid"

const VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("\n\n\n\n\n", body)

    const userId: string = body.userId
    const reservation: IRoom[] = body.reservation as IRoom[]
    const dateRange: DateRange = body.dateRange as DateRange
    const roomCharge: number = +body.roomCharge as number

    // TODO: fix later
    reservation.forEach(async (res) => {
      const availableRoom = await db.room.findFirst({
        where: { status: "empty", roomType: { id: res.id } },
      })
      if (availableRoom) return new NextResponse("Sold out", { status: 500 })
    })

    const booking = await db.booking.create({
      data: {
        userId,
        roomCharge: roomCharge,
        paymentId: uuidv4(),
        startDate: dateRange.from!,
        endDate: dateRange.to!,
      },
    })

    reservation.forEach(async (res) => {
      console.log("\n\nCREATING BOOKING_ROOM", res)
      const availableRoom = await db.room.findFirst({
        where: { status: "empty", roomType: { id: res.roomTypeId } },
      })

      if (availableRoom) {
        await db.booking_Room.create({
          data: {
            bookingId: booking.id,
            roomId: availableRoom.id,
            numAdults: res.adults,
            numKids: res.kids,
          },
        })

        await db.room.update({
          where: { id: availableRoom.id },
          data: { status: "booking" },
        })
      }
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
      vnp_Amount: roomCharge * 10000,
      vnp_ReturnUrl: "http://localhost:3000/api/vnpay/return",
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
