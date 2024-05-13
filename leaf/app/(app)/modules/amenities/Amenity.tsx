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
import axios from "@/lib/axios"
import { useCurrentUser } from "@/hooks/use-current-user"

interface AmenityProps {
  amenities: (AmenityVm & { isSelected?: boolean })[]
  // TODO: add current booking hotel
  // hotel: H
}

const Amenity: FC<AmenityProps> = ({ amenities }) => {
  const { items, setItems } = useCart()
  const router = useRouter()
  const user = useCurrentUser()

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

    router.refresh()
  }

  const totalPrice = items.reduce((acc, cur) => cur.price * cur.count + acc, 0)

  const createOrder = async () => {
    try {
      const payload = {
        items,
        userId: user?.id,
      }

      const data = (await axios.post("/api/vnpay/create_order_url", payload)).data

      router.push(data.redirectUrl)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }
  }

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
        <Button onClick={() => createOrder()}>Thanh toán bằng VNPAY</Button>
      </div>
    </div>
  )
}

export default Amenity
