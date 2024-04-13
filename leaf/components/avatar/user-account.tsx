"use client"

import { FC } from "react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/avatar/user-avatar"
import { ExtendedUser } from "@/auth/next-auth"

interface UserAccountNavProps {
  user: ExtendedUser
  children: React.ReactNode
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user, children }) => {
  if (!user) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar className="h-8 w-8" user={{ name: user.name || null, image: user.image || null }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
