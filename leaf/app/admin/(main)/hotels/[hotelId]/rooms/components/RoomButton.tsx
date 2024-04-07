'use client'

import { FC } from 'react'
import { Room } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { roomStatus } from '../data'

interface RoomButtonProps {
  room: Room
}

const RoomButton: FC<RoomButtonProps> = ({ room }) => {
  const color = roomStatus.find((rs) => rs.status === room.status)?.color
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    router.push(`${pathname}/${room.id}`)
  }

  return (
    <Button
      className='p-2 py-1 h-auto text-white'
      key={room.name}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {room.name}
    </Button>
  )
}

export default RoomButton
