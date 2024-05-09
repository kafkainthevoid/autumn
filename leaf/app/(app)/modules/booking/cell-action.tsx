"use client"

import { FC, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import axios from "axios"
import { ClipboardPasteIcon, EyeIcon } from "lucide-react"

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
import { BookingCol } from "./Booking"
import BookingDetail from "./booking-detail"
import { useCurrentUser } from "@/hooks/use-current-user"
import { ExtendedUser } from "@/auth/next-auth"

interface CellActionProps {
  id: string
  booking: BookingCol
}

const CellAction: FC<CellActionProps> = ({ id, booking }) => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [open, setOpen] = useState(false)

  const downloadReceipt = () => {}

  console.log(booking)

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
            <AlertDialogTitle className="mb-4">Booking Info</AlertDialogTitle>
            <AlertDialogDescription>
              <BookingDetail booking={booking} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
