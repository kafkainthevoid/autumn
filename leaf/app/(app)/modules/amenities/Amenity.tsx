"use client"

import { FC } from "react"

import { Amenity as AmenityVm } from "@prisma/client"
import AmenityCard from "./AmenityCard"
import { useCart } from "./context/cart"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import OrderItem from "./OrderItem"
import Payment from "./Payment"

interface AmenityProps {
  amenities: (AmenityVm & { isSelected?: boolean })[]
  // TODO: add current booking hotel
  // hotel: H
}

const Amenity: FC<AmenityProps> = ({ amenities }) => {
  const { items, setItems } = useCart()
  const router = useRouter()

  amenities.forEach((amenity) => {
    if (items.find((item) => item.id === amenity.id)) amenity.isSelected = true
  })

  const toggleSelect = (item: AmenityVm) => {
    const idx = items.findIndex((amenity) => amenity.id === item.id)

    if (idx === -1) {
      setItems([...items, { count: 1, ...item }])
    } else {
      const newItems = items.filter((i) => i.id !== item.id)
      setItems([...newItems])
    }

    console.log(items)

    router.refresh()
  }

  const totalPrice = items.reduce((acc, cur) => cur.price * cur.count + acc, 0)

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="tracking-tight text-3xl font-semibold">Choose your amenity</h1>
      </div>

      <div className="grid grid-cols-3 mt-10 gap-6">
        {amenities.map((amenity) => (
          <AmenityCard key={amenity.id} amenity={amenity} toggleSelect={toggleSelect} />
        ))}
      </div>

      <hr className="mt-10" />
      <h1 className="tracking-tight text-xl font-semibold mt-3">Selected Amenities</h1>

      {items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}

      <div className="text-right mt-3 font-semibold">Total: {totalPrice} VND</div>

      <hr className="mt-10 mb-3" />
      <div className="flex gap-3 items-center ">
        <div className="font-semibold text-lg">Order with</div>
        <Payment items={items} />
      </div>
    </div>
  )
}

export default Amenity
