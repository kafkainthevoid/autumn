"use client"

import { Amenity } from "@prisma/client"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useCart } from "./context/cart"

interface OrderItemProps {
  item: Amenity & {
    count: number
  }
}

const OrderItem = ({ item }: OrderItemProps) => {
  const { items, setItems } = useCart()

  const onAdd = () => {
    item.count++
    const idx = items.findIndex((i) => i.id === item.id)
    items.splice(idx, 1, item)
    setItems([...items])
  }

  const onReduce = () => {
    if (item.count === 1) return
    item.count--
    const idx = items.findIndex((i) => i.id === item.id)
    items.splice(idx, 1, item)
    setItems([...items])
  }

  return (
    <div className="border rounded-sm p-3 flex justify-between mt-3">
      <div>{item.name}</div>
      <div className="flex gap-10 w-[200px]">
        <div className="flex gap-3 items-center mr-auto">
          <MinusIcon onClick={onReduce} className="border border-rose-600 w-5 h-5 cursor-pointer text-rose-600" />
          <div className="border px-1 rounded-sm">{item.count}</div>
          <PlusIcon onClick={onAdd} className="border border-teal-600 cursor-pointer w-5 h-5 text-teal-600" />
        </div>
        <div>{item.count * item.price} VND</div>
      </div>
    </div>
  )
}

export default OrderItem
