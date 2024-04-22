'use client'

import { FC, useEffect, useState } from 'react'
import { format } from 'date-fns'

import { BookingVm } from '@/modules/booking/models/BookingModel'
import * as BookingService from '@/modules/booking/services/BookingService'
import Client from './client'
import { Column } from './columns'

interface BookingProps {
  userId: string
}

// TODO: add reviews, vote, complain, feedback,....
const Booking: FC<BookingProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<BookingVm[]>([])

  useEffect(() => {
    BookingService.getCurrentUserBooking(userId).then((data) => {
      setBookings(data)
    })
  }, [userId])

  const formattedBookings: Column[] = bookings.map((item) => {
    return {
      id: item.id,
      startDate: format(new Date(item.startDate), 'MMMM do, yyyy'),
      endDate: format(new Date(item.endDate), 'MMMM do, yyyy'),
      roomName: item.booking_rooms.map((b) => b.room.name).join(', '),
      roomCharge: item.roomCharge,
    }
  })

  if (!userId) return

  return (
    <div>
      <Client data={formattedBookings} />
    </div>
  )
}

export default Booking
