"use client"

import { FC } from "react"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react"

import { ExtendedUser } from "@/auth/next-auth"
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import UserAccount from "@/components/avatar/user-account"
import { Badge } from "@/components/ui/badge"

interface TopBarProps {
  user: ExtendedUser
}

const TopBar: FC<TopBarProps> = ({ user }) => {
  return (
    <div className="h-[52px] border-b flex items-center justify-end">
      <div className="mr-4">
        <UserAccount user={user}>
          <DropdownMenuItem className="p-0">
            <div className="flex flex-col items-center gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <div className="flex justify-between items-center">
                  {user.name && <p className="font-medium">{user.name}</p>}
                  <Badge variant="success">{user.role}</Badge>
                </div>
                {user.email && <p className="w-[230px] truncate text-sm text-muted-foreground ">{user.email}</p>}
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/admin/settings/profile`}>Profiles</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer bg-rose-500 text-white focus:bg-rose-500/80 focus:text-white"
            onSelect={(e) => {
              e.preventDefault()
              signOut({ callbackUrl: `${window.location.origin}/sign-in` })
            }}
          >
            Sign out
            <LogOutIcon className="w-3 h-3 text-white ml-auto mr-2" />
          </DropdownMenuItem>
        </UserAccount>
      </div>
    </div>
  )
}

export default TopBar
