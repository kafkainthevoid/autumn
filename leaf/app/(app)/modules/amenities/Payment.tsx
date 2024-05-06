"use client"

import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { PayPalButtons } from "@paypal/react-paypal-js"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC } from "react"

import { AmenityCount } from "./context/cart"
import { toast } from "sonner"
import { useCurrentUser } from "@/hooks/use-current-user"

interface PaymentProps {
  items: AmenityCount[]
}

// TODO: later
const Payment: FC<PaymentProps> = ({ items }) => {
  const userAuth = useCurrentUser()
  const router = useRouter()

  const calTotalMoney = () => {
    let total = 0
    items.forEach((item) => {
      total += item.count * item.price
    })
    return total
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
    try {
      const res = await axios.post("/api/payment/create-paypal", {
        cost: calTotalMoney(),
      })
      return res.data.id
    } catch (err) {
      toast.error("Something went wrong")
      console.log("[PAYMENT_CREATE_ORDER]", err)
    }
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    try {
      console.log("onApprove", data)

      const res = await axios.post("/api/payment/order/capture-paypal", {
        orderId: data.orderID,
        roomCharge: calTotalMoney(),
        userId: userAuth?.id,
        items,
        totalMoney: calTotalMoney(),
      })

      console.log("onApprove_res", res)

      router.push(`/user/orders`)
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong")
      console.log("[PAYMENT_ON_APPROVE]", err)
    }
  }

  return (
    <div className="w-52">
      <PayPalButtons
        displayOnly={["vaultable"]}
        style={{ color: "blue", layout: "horizontal", tagline: false }}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  )
}

export default Payment
