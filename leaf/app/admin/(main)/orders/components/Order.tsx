"use client"

import { FC } from "react"
import { format } from "date-fns"

import Client from "./client"
import { Column } from "./columns"
import { Amenity, Order as OrderVm, Order_Amenity } from "@prisma/client"

export type OrderCol = OrderVm & {
  order_amenities: OrderAmenity[]
}

export type OrderAmenity = Order_Amenity & {
  amenity: Amenity
}

interface OrderProps {
  orders: OrderCol[]
}

const Order: FC<OrderProps> = ({ orders }) => {
  const orderInfo = (order: OrderCol) =>
    order.order_amenities.map((item) => `x${item.count} ${item.amenity.name}`).join(", ")

  const formattedOrders: Column[] = orders.map((item) => {
    return {
      id: item.id,
      orderInfo: orderInfo(item),
      createdAt: format(item.createdAt, "dd-MM-yyyy"),
      totalMoney: item.totalMoney + " VND",
      isViewed: item.isViewed,
      order: item,
    }
  })

  return (
    <div>
      <Client data={formattedOrders} />
    </div>
  )
}

export default Order
