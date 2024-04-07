'use client'

import { FC } from 'react'

import UserAccountNav from './UserAccountNav'
import { User } from '@prisma/client'

interface TopBarProps {
  user: User
}

const TopBar: FC<TopBarProps> = ({ user }) => {
  return (
    <div className='h-[52px] border-b flex items-center justify-end'>
      <div className='mr-4'>
        <UserAccountNav user={user} />
      </div>
    </div>
  )
}

export default TopBar
