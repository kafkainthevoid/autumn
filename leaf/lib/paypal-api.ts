import axios from "axios"

const PAYPAL_URL = "https://api-m.sandbox.paypal.com"

export async function createOrder({ cost }: { cost: string }) {
  try {
    const accessToken = await generateAccessToken()
    const url = `${PAYPAL_URL}/v2/checkout/orders`

    const res = await axios.post(
      url,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: cost } }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return res.data
  } catch (err) {
    console.log("CREATE_ORDER_API_ERROR", err)
    throw new Error("Error createORder")
  }
}

export async function capturePayment(orderId: string) {
  try {
    const accessToken = await generateAccessToken()
    const url = `${PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`
    const res = await axios.post(url, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return res.data
  } catch (err) {
    console.log("CAPTURE_PAYMENT_API_ERROR", err)
    throw new Error("Error capturePayment")
  }
}

export async function generateAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET).toString("base64")

    const res = await axios.post(
      `${PAYPAL_URL}/v1/oauth2/token`,
      { grant_type: "client_credentials" },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
      }
    )

    return res.data.access_token
  } catch (err: any) {
    throw new Error("Error generateAccessToken")
  }
}
