import { NextResponse } from "next/server"

import { createSecureHash, sortObject } from "@/utils/vnpay"

export async function GET(req: Request) {
  try {
    let vnp_Params = Object.fromEntries(new URL(req.url).searchParams)

    const secureHash = vnp_Params.vnp_SecureHash

    delete vnp_Params.vnp_SecureHash
    delete vnp_Params.vnp_SecureHashType
    vnp_Params = sortObject(vnp_Params)

    const signed = createSecureHash(vnp_Params)

    console.log(vnp_Params)
    console.log({ secureHash, signed })

    if (secureHash === signed) {
      return NextResponse.redirect("http://localhost:3000/user/orders")
    }
    return NextResponse.json({ code: "97" })
  } catch (err) {
    console.log("[RETURN_PAYMENT_URL]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
