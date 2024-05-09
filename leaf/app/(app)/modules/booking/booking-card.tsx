"use client"

import { formatInTimeZone } from "date-fns-tz"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import RatingInput from "@/components/ui/rating-input"
import { BookingRoom } from "./Booking"
import { useState } from "react"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Booking_Room } from "@prisma/client"

interface BookingCardProps {
  bookingRoom: BookingRoom
  roomCharge: number
}

const formSchema = z.object({
  review: z.string().min(1),
  star: z.number().min(1).max(5),
})

type FormValues = z.infer<typeof formSchema>

const BookingCard = ({ bookingRoom, roomCharge }: BookingCardProps) => {
  const [rating, setRating] = useState(5)

  // const defaultValues = initialData
  //   ? initialData
  //   : {
  //       name: "",
  //       description: "",
  //       price: 0,
  //       type: AmenityType.DISPLAY,
  //       image: "",
  //     }

  // const defaultValues =

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <div className="border p-3 " key={bookingRoom.id}>
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-black mb-2">{bookingRoom.room.roomType.name}</div>
          <div className="font-semibold text-black">{bookingRoom.room.name}</div>
          <div className="text-sm">Adult: {bookingRoom.numAdults}</div>
          <div className="text-sm">Kid: {bookingRoom.numKids}</div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="font-semibold text-black">{roomCharge} VND</div>
          <div className="text-sm">
            Booking time: {formatInTimeZone(bookingRoom.room.createdAt, "Asia/Ho_Chi_Minh", "HH:mm MMM do")}
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <div className="space-y-3">
        <div className="text-zinc-700">Write your review:</div>
        <div className="flex justify-center">
          <RatingInput value={rating} onChange={setRating} width={150} />
        </div>
        <Textarea />
        <div className="text-right">
          <Button variant="outline">Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
