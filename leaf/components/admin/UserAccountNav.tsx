'use client'

import { FC, useEffect, useState } from 'react'
import { User as UserAuth } from 'next-auth'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import { User } from '@prisma/client'

interface UserAccountNavProps {
  user: User
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  if (!user) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <UserAvatar
          className='h-8 w-8'
          user={{ name: user.name || null, image: user.image || null }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='' align='end'>
        <div className='flex flex-col items-center gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[200px] truncate text-sm text-muted-foreground '>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={`/user/profile`}>Profiles</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={`/user/booking`}>Booking</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          className='cursor-pointer bg-red-400 text-white focus:bg-red-500/60 focus:text-white'
          onSelect={(e) => {
            e.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}
        >
          Sign out
          <LogOutIcon className='w-3 h-3 text-white ml-auto mr-2' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
