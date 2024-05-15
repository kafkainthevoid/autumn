import { NextResponse } from "next/server"

import { createSecureHash, sortObject } from "@/utils/vnpay"

// ### vnp_Params
// vnp_Amount: "1000000",
// vnp_BankCode: "NCB",
// vnp_BankTranNo: "VNP14411147",
// vnp_CardType: "ATM",
// vnp_OrderInfo: "Thanh toan cho ma GD:12025256",
// vnp_PayDate: "20240512095323",
// vnp_ResponseCode: "00",
// vnp_TmnCode: "FLU16JJ6",
// vnp_TransactionNo: "14411147",
// vnp_TransactionStatus: "00",
// vnp_TxnRef: "12025256",
// vnp_SecureHash: "3d28a95c7cbc83e669510d9478ce8723666e4d0bbd2c122878d4bd26240aab637ba8750df4fdb20c2348f11b9d0127c11876c2b0d30911877748023a8f72181e",

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
      return NextResponse.redirect("http://localhost:3000/user/booking")
    }
    return NextResponse.json({ code: "97" })
  } catch (err) {
    console.log("[RETURN_PAYMENT_URL]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
