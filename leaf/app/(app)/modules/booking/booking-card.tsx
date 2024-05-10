"use client"

import { formatInTimeZone } from "date-fns-tz"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import RatingInput from "@/components/ui/rating-input"
import { BookingRoom } from "./Booking"
import { useState } from "react"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Booking_Room } from "@prisma/client"
import { toast } from "sonner"
import axios from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"

interface BookingCardProps {
  bookingRoom: BookingRoom
  roomCharge: number
}

const formSchema = z.object({
  comment: z.string().min(1),
  star: z.number().min(1).max(5),
})

type FormValues = z.infer<typeof formSchema>

const BookingCard = ({ bookingRoom, roomCharge }: BookingCardProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const userAuth = useCurrentUser()

  const defaultValues = bookingRoom.review
    ? {
        comment: bookingRoom.review.comment,
        star: bookingRoom.review.star,
      }
    : {
        comment: "",
        star: 5,
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      const reqBody = {
        bookingRoomId: bookingRoom.id,
        roomId: bookingRoom.room.id,
        roomTypeId: bookingRoom.room.roomType.id,
        userId: userAuth?.id,
        ...data,
      }

      await axios.post("/api/reviews", reqBody)

      toast.success("Review submitted")
      router.refresh()
    } catch (err: any) {
      toast.error(err?.response?.data)
    } finally {
      setLoading(false)
    }
  }

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

      {bookingRoom.review ? (
        <div>
          <div className="flex justify-center">
            <RatingInput value={bookingRoom.review.star} width={150} disabled={true} />
          </div>
          <div>{bookingRoom.review.comment}</div>
          <div className="text-right">{formatInTimeZone(bookingRoom.review.createdAt, "Asia/Ho_Chi_Minh", "PPP")}</div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="text-zinc-700">Write your review:</div>
              <div className="flex justify-center">
                <FormField
                  control={form.control}
                  name="star"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RatingInput value={field.value} onChange={field.onChange} width={150} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button variant="outline" disabled={loading}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default BookingCard
