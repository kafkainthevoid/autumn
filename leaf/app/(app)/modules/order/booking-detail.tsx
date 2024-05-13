"use client"

import { BookingCol } from "./Booking"
import BookingCard from "./booking-card"

interface BookingDetailProps {
  booking: BookingCol
}

const BookingDetail = ({ booking }: BookingDetailProps) => {
  return (
    <>
      {booking.booking_rooms.map((br) => (
        <BookingCard key={br.id} bookingRoom={br} roomCharge={booking.roomCharge} />
      ))}
    </>
  )
}

export default BookingDetail
