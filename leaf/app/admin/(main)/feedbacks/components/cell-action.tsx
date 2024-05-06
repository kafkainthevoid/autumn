"use client"

import axios from "axios"
import { useState } from "react"
import { EyeIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Feedback, User } from "@prisma/client"
import { cn } from "@/lib/utils"

interface CellActionProps {
  id: string
  feedback: Feedback & { user: User }
}

export const CellAction: React.FC<CellActionProps> = ({ id, feedback }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      const res = await axios.patch(`/api/feedbacks/${id}`)
      router.refresh()
    } catch (error) {
    } finally {
      setOpen(false)
    }
  }

  let username = feedback.user.name ?? ""
  if (feedback.user.firstName && feedback.user.lastName) {
    username = feedback.user.firstName + " " + feedback.user.lastName
  }

  return (
    <>
      <div className="flex gap-3">
        <Button
          className={cn(
            feedback.isViewed
              ? "p-2 h-8 w-8 bg-teal-600 hover:bg-teal-600/90"
              : "p-2 h-8 w-8 bg-rose-600 hover:bg-rose-600/90"
          )}
          size="sm"
          onClick={() => setOpen(true)}
        >
          <EyeIcon className="w-4 h-4 text-white" />
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{username}</AlertDialogTitle>
            <AlertDialogDescription>{feedback.content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onConfirm} className="bg-rose-500 hover:bg-rose-500/90 text-white">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
