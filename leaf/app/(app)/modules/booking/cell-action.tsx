"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ClipboardPasteIcon, EyeIcon } from "lucide-react"
import { generate } from "@pdfme/generator"
import { text, image, rectangle, line, readOnlyText } from "@pdfme/schemas"

import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { BookingCol, BookingRoom } from "./Booking"
import BookingDetail from "./booking-detail"
import { useCurrentUser } from "@/hooks/use-current-user"
import { ExtendedUser } from "@/auth/next-auth"
import { format } from "date-fns"

interface CellActionProps {
  id: string
  booking: BookingCol
}

const CellAction: FC<CellActionProps> = ({ id, booking }) => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const today = new Date()

  const groupedByRoomType = booking.booking_rooms.reduce<{ [key: string]: BookingRoom[] }>((groups, bookingRoom) => {
    const roomTypeName = bookingRoom.room.roomType.name
    groups[roomTypeName] = groups[roomTypeName] || []
    groups[roomTypeName].push(bookingRoom)
    return groups
  }, {})

  // console.log("booking.booking_rooms", booking.booking_rooms)
  // console.log("groupedByRoomType", groupedByRoomType)

  let bookingInput = {}

  Object.keys(groupedByRoomType).forEach((key) => {
    const data = groupedByRoomType[key]
    data.map((br, i) => {
      bookingInput = {
        ...bookingInput,
        ...{
          [`booking${i + 1}`]: br.room.roomType.name,
          [`price${i + 1}`]: br.room.roomType.price,
        },
      }
    })
  })

  // const data = groupedByRoomType.map((br, i) => {
  //   return {
  //     [`booking${i + 1}`]: br.room.roomType.name,
  //     [`price${i + 1}`]: br.room.roomType.price,
  //   }
  // })

  const shit = { ...bookingInput }
  // console.log("boookkkkkiiiinnnngggIIIInnnnpppuuuutttt", shit)

  const inputs = [
    {
      dateCreateReceipt: format(today, "MM-dd-yyyy"),
      orderNo: booking.paymentId,
      dateArrive: format(booking.startDate, "MM-dd-yyyy"),
      dateLeave: format(booking.endDate, "MM-dd-yyyy"),
      hotelName: "Toronto Tower",
      hotelAddress: "03 Ly Tu Trong, Da Nang",
      hotelAdditionInfo: "do not have any",
      // ...shit,
      booking1: "x1 King Bed",
      price1: "300,000 VND",
      booking2: "x3 Queen Bed",
      price2: "450,000 VND",
      booking3: "x1 King Bed",
      price3: "300,000 VND",
      // priceTotal: `${booking.roomCharge} VND`,
      priceTotal: `1,050,000 VND`,
      paymentMethod: "TECHCOMBANK via VNPAY",
    },
  ]

  const downloadReceipt = async () => {
    const res = await axios.get("/api/template/receipt")
    console.log(res.data.data)
    const template = JSON.parse(res.data.data)

    generate({
      template,
      inputs,
      plugins: { text, image, rectangle, line, readOnlyText },
    }).then((pdf) => {
      console.log(pdf)

      const blob = new Blob([pdf.buffer], { type: "application/pdf" })
      window.open(URL.createObjectURL(blob))
    })
  }

  return (
    <>
      <div className="flex gap-3">
        <Button className="p-2 h-8 w-8 bg-purple-600 hover:bg-purple-600/90" size="sm" onClick={() => setOpen(true)}>
          <EyeIcon className="w-4 h-4 text-white" />
        </Button>

        <Button className="p-2 h-8 w-8 bg-blue-600 hover:bg-blue-600/90" size="sm" onClick={() => downloadReceipt()}>
          <ClipboardPasteIcon className="w-4 h-4 text-white" />
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <AlertDialogTitle className="mb-4">Booking Info</AlertDialogTitle> */}
            <AlertDialogTitle className="mb-4">Thông tin đặt phòng</AlertDialogTitle>
            <AlertDialogDescription>
              <BookingDetail booking={booking} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-rose-500 text-white">Đóng</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
