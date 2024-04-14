"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { CheckCheckIcon, ShieldIcon, UserCog2Icon, UserIcon } from "lucide-react"
import { UserRole } from "@prisma/client"

import { toast } from "@/components/ui/use-toast"
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
import { cn } from "@/lib/utils"

interface CellActionProps {
  id: string
  role: UserRole
}

const CellAction: FC<CellActionProps> = ({ id, role }) => {
  const router = useRouter()

  const [selectedRole, setSelectedRole] = useState<UserRole>(role)

  const onConfirm = async () => {
    try {
      await axios.patch(`/api/users/${id}`, {
        role: selectedRole,
      })
      toast({ description: "Updated user role" })
      router.refresh()
    } catch (err) {
      toast({ variant: "destructive", description: "Something went wrong" })
    }
  }

  if (role === "ADMIN") return

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="p-2 h-8 w-8 bg-emerald-600 hover:bg-emerald-600/90" size="sm">
            <ShieldIcon className="w-4 h-4 text-white" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change user role</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex gap-9">
                <div
                  className={cn(
                    "flex items-center font-bold gap-3 px-3 py-2 rounded-3xl border-yellow-500 border-2 text-yellow-500 cursor-pointer",
                    selectedRole === UserRole.STAFF && "bg-yellow-500 text-white"
                  )}
                  onClick={() => setSelectedRole(UserRole.STAFF)}
                >
                  <UserCog2Icon className="w-4 h-4" />
                  <p>Staff</p>
                  {selectedRole === UserRole.STAFF && <CheckCheckIcon className="w-4 h-4 ml-2" />}
                </div>
                <div
                  className={cn(
                    "flex items-center font-bold gap-3 px-3 py-2 rounded-3xl border-teal-500 border-2 text-teal-500 cursor-pointer",
                    selectedRole === UserRole.USER && "bg-teal-600 text-white"
                  )}
                  onClick={() => setSelectedRole(UserRole.USER)}
                >
                  <UserIcon className="w-4 h-4" />
                  <p>Customer</p>
                  {selectedRole === UserRole.USER && <CheckCheckIcon className="w-4 h-4 ml-2" />}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} disabled={selectedRole === role}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
