'use client'

import { FC } from 'react'
import { Plus } from 'lucide-react'
import { Room, RoomType } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'

import Floor from './Floor'
import { Button } from '@/components/ui/button'
import { roomStatus } from '../data'

interface Props {
  data: (Room & { roomType: RoomType })[]
}

export type FloorInfo = { [key: string]: Room[] }

const Client: FC<Props> = ({ data }) => {
  const router = useRouter()
  const pathname = usePathname()

  // Room name format: P102: 1 is floor 02 is room number
  const formattedData: FloorInfo = {}

  for (let room of data) {
    const name = room.name.charAt(1)
    if (!formattedData[name]) formattedData[name] = []
    formattedData[name].push(room)
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <h1 className='tracking-tight text-3xl font-semibold'>
            Rooms ({data.length})
          </h1>
          <p>Manage rooms</p>
        </div>
        <Button
          onClick={() => router.push(pathname + '/new')}
          size='sm'
          variant='blue'
        >
          <Plus className='w-4 h-4 mr-2' />
          Add new
        </Button>
      </div>

      <div className='flex items-center gap-3 border w-min px-2 py-1 rounded-md mt-3'>
        {roomStatus.map((status) => (
          <div key={status.color} className='flex items-center gap-2'>
            <div
              className='w-4 h-4 rounded-full'
              style={{ backgroundColor: status.color }}
            />
            <p className='inline text-xs leading-[0px] whitespace-nowrap'>
              {status.label}
            </p>
          </div>
        ))}
      </div>

      <hr className='my-6' />

      {Object.keys(formattedData).map((key, i) => (
        <div key={i} className='space-y-3'>
          <Floor rooms={formattedData[key]} name={key} />
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Client
