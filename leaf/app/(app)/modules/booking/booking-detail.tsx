"use client"

import { formatInTimeZone } from "date-fns-tz"
import { BookingCol } from "./Booking"

interface BookingDetailProps {
  booking: BookingCol
}

const BookingDetail = ({ booking }: BookingDetailProps) => {
  return (
    <>
      {booking.booking_rooms.map((br) => (
        <div key={br.id} className="border p-3 flex justify-between">
          <div>
            <div className="font-bold text-black mb-2">{br.room.roomType.name}</div>
            <div className="font-semibold text-black">{br.room.name}</div>
            <div className="text-sm">Adult: {br.numAdults}</div>
            <div className="text-sm">Kid: {br.numKids}</div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="font-semibold text-black">{booking.roomCharge} VND</div>
            <div className="text-sm">
              Booking time: {formatInTimeZone(br.room.createdAt, "Asia/Ho_Chi_Minh", "HH:mm MMM do")}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default BookingDetail
