"use client"

import { FC, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import axios from "axios"
import { Edit, EditIcon, EyeIcon } from "lucide-react"

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
import { Order } from "@prisma/client"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface CellActionProps {
  id: string
  order: Order
}

const CellAction: FC<CellActionProps> = ({ id, order }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      await axios.patch(`/api/orders/${id}/confirm`)
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setOpen(false)
    }
  }

  console.log(order)

  return (
    <>
      <div className="flex gap-3">
        {!order.isViewed && (
          <Button
            className={cn(
              order.isViewed
                ? "p-2 h-8 w-8 bg-teal-600 hover:bg-teal-600/90"
                : "p-2 h-8 w-8 bg-rose-600 hover:bg-rose-600/90"
            )}
            size="sm"
            onClick={() => setOpen(true)}
          >
            <EyeIcon className="w-4 h-4 text-white" />
          </Button>
        )}
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận đơn hàng</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onConfirm} className="bg-rose-500 hover:bg-rose-500/90 text-white">
              Xác nhận
            </AlertDialogAction>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
