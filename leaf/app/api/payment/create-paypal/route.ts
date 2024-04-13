import * as paypal from '@/lib/paypal-api'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { cost } = await req.json()

    const order = await paypal.createOrder({ cost })

    return NextResponse.json(order)
  } catch (err: any) {
    console.log('API_PAYMENT_CREATE_PAYPAL_ERROR', err)
    return new NextResponse(err.message, { status: 400 })
  }
}
