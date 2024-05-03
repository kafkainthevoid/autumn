"use client"

import { v4 as uuid } from "uuid"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { renderPluralNumber } from "../../utils/renderPluralNumber"
import RoomCountItem from "./RoomCountItem"
import { PlusIcon } from "../../../commons/icons/svg/PlusIcon"
import { IRoom, useReservation } from "../../context/reservation"
import { RoomReservationInfo } from "../../models/RoomReservation"

interface RoomGuestBoxProps {}

const RoomGuestBox: React.FC<RoomGuestBoxProps> = () => {
  const storeReservation = useReservation()

  const [rooms, setRooms] = useState<IRoom[]>(storeReservation.rooms)

  const handleRoomChange = (room: RoomReservationInfo): void => {
    let newData = [...rooms]
    for (let i = 0; i < newData.length; i++) {
      if (room.id === newData[i].id) {
        newData[i] = room
      }
    }
    setRooms(newData)
  }

  const handleAddRoom = () => {
    let newData = [...rooms]
    newData.push({ adults: 1, kids: 0, id: uuid() })
    setRooms(newData)
  }

  const handleRemoveRoom = (room: RoomReservationInfo) => {
    if (rooms.length === 1) return
    const newData = rooms.filter((r) => r.id !== room.id)
    setRooms(newData)
  }

  const onPopoverChange = (open: boolean) => {
    if (open === false) storeReservation.setRooms(rooms)
  }

  return (
    <Popover onOpenChange={onPopoverChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-xs">
          {renderPluralNumber(rooms.length, "room")},{" "}
          {renderPluralNumber(
            rooms.reduce((a, c) => c.adults + c.kids + a, 0),
            "guest"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold text-center text-sm leading-none">Rooms and Guests</h4>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex justify-between justify-items-end gap-4">
              <p className="font-bold text-xs">Rooms</p>
              <p className="font-bold text-xs">Adults</p>
              <p className="font-bold text-xs">Kids</p>
            </div>
            {rooms.map((room, i) => (
              <RoomCountItem
                onChange={handleRoomChange}
                onRemoveRoom={handleRemoveRoom}
                room={room}
                index={i}
                key={room.id}
              />
            ))}
          </div>
          <Separator />
          <div className="flex gap-2 cursor-pointer" onClick={() => handleAddRoom()}>
            <PlusIcon width={20} height={20} fill="#94a3b8" />
            <p className="font-medium text-sm text-left">Add room</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default RoomGuestBox
