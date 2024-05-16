"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { LockIcon, TrashIcon } from "lucide-react"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CellActionProps {
  id: string
  role: UserRole
}

const CellAction: FC<CellActionProps> = ({ id, role }) => {
  const router = useRouter()

  const onConfirm = async () => {
    try {
      await axios.delete(`/api/users/${id}`)
      toast.success("Deleted user")
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  if (role === "ADMIN") return

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="p-2 h-8 w-8 bg-rose-600 hover:bg-rose-600/90" size="sm">
            <LockIcon className="w-4 h-4 text-white" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn muốn khóa tài khoản này?</AlertDialogTitle>
            {/* <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} className="bg-rose-600 hover:bg-rose-600/90 text-white">
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
