'use client'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: 'USD',
  intent: 'capture',
}

export default function PaypalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  )
}
