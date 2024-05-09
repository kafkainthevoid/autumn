"use client"

import { FC } from "react"
import { Room } from "@prisma/client"
import { PlusCircleIcon } from "lucide-react"

import RoomButton from "./RoomButton"
import { Button } from "@/components/ui/button"

interface FloorProps {
  name: string
  rooms: Room[]
}

const Floor: FC<FloorProps> = ({ name, rooms }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Floor {name}</h2>

      <div className="flex gap-3 flex-wrap mt-3">
        {rooms.map((room) => (
          <RoomButton key={room.id} room={room} />
        ))}

        {/* TODO: Add this feature when have time */}
        {/* <Button
          variant='outline'
          size='sm'
          className='h-8 border-dashed flex flex-wrap justify-between'
        >
          <div className='flex items-center'>
            <PlusCircleIcon className='mr-2 h-4 w-4' />
            Add rooms
          </div>
        </Button> */}
      </div>
    </div>
  )
}

export default Floor
