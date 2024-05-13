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

// export type BookingRoom = Booking_Room & {
//   room: Room & { roomType: RoomType & { hotel: Hotel } }
//   booking: BookingVm
//   review: Review | null
// }

interface OrderProps {
  orders: OrderCol[]
}

// TODO: add reviews, vote, complain, feedback,....
const Booking: FC<BookingProps> = ({ bookings }) => {
  const formattedBookings: Column[] = bookings.map((item) => {
    return {
      id: item.id,
      startDate: format(new Date(item.startDate), "MMMM do, yyyy"),
      endDate: format(new Date(item.endDate), "MMMM do, yyyy"),
      roomName: item.booking_rooms.map((b) => b.room.name).join(", "),
      roomCharge: item.roomCharge,
      booking: item,
    }
  })

  return (
    <div>
      <Client data={formattedBookings} />
    </div>
  )
}

export default Booking
