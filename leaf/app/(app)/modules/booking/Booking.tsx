"use client"

import { FC, useEffect, useState } from "react"
import { format } from "date-fns"

import Client from "./client"
import { Column } from "./columns"
import { Booking as BookingVm, Booking_Room, Room, RoomType } from "@prisma/client"

interface BookingProps {
  bookings: (BookingVm & {
    booking_rooms: (Booking_Room & {
      room: Room & { roomType: RoomType }
      booking: BookingVm
    })[]
  })[]
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
    }
  })

  return (
    <div>
      <Client data={formattedBookings} />
    </div>
  )
}

export default Booking
