"use client"

import axios from "@/lib/axios"
import { generate } from "@pdfme/generator"
import { text, image, rectangle, line, readOnlyText } from "@pdfme/schemas"

interface GoProps {}

const Go = ({}: GoProps) => {
  const startDownload = async () => {
    const paymentResponse = await axios.post("/api/vnpay/create_payment_url", {
      amount: 12345,
      orderType: "shit",
    })
    console.log(paymentResponse.data)
  }

  return (
    <div>
      <div>go where</div>
      <button onClick={() => startDownload()}>Download</button>
    </div>
  )
}

export default Go
