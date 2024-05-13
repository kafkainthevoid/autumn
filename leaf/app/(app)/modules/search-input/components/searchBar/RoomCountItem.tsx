"use client"

import { useState } from "react"

import Counter from "./Counter"
import { CloseIcon } from "../../../commons/icons/svg/CloseIcon"

type Data = {
  adults: number
  kids: number
  id: string
}

interface RoomCountItemProps {
  room: Data
  index: number
  onChange: (room: Data) => void
  onRemoveRoom: (room: Data) => void
}

const RoomCountItem: React.FC<RoomCountItemProps> = ({ onChange, onRemoveRoom, room, index }) => {
  const [adults, setAdults] = useState<number>(room.adults)
  const [kids, setKids] = useState<number>(room.kids)

  const handleAdd = (label: string) => {
    const changeInAdult = label === "adults" ? 1 : 0
    const changeInKids = label === "kids" ? 1 : 0
    setAdults((value) => value + changeInAdult)
    setKids((value) => value + changeInKids)

    const newRoomCount: Data = {
      adults: adults + changeInAdult,
      kids: kids + changeInKids,
      id: room.id,
    }
    onChange(newRoomCount)
  }

  const handleReduce = (label: string) => {
    const changeInAdult = label === "adults" ? 1 : 0
    const changeInKids = label === "kids" ? 1 : 0

    setAdults((value) => value - changeInAdult)
    setKids((value) => value - changeInKids)

    const newRoomCount: Data = {
      adults: adults - changeInAdult,
      kids: kids - changeInKids,
      id: room.id,
    }
    onChange(newRoomCount)
  }

  const handleCounter = (label: string, action: "add" | "reduce") => {
    if (action === "add") handleAdd(label)
    else if (action === "reduce") handleReduce(label)
  }

  return (
    <div
      className="grid grid-cols-3 gap-5 justify-items-center items-center
    py-2 text-xs"
    >
      <div className="flex gap-2 items-center justify-center">
        <div className="cursor-pointer" onClick={() => onRemoveRoom(room)}>
          <CloseIcon width={20} height={20} fill="#94a3b8" />
        </div>
        <div className="whitespace-nowrap">Phòng {index + 1}</div>
      </div>
      <Counter
        label="adults"
        min={1}
        // TODO:
        max={10}
        onChange={(label, action) => handleCounter(label, action)}
        value={adults}
      />
      <Counter label="kids" min={0} max={10} onChange={(label, action) => handleCounter(label, action)} value={kids} />
    </div>
  )
}

export default RoomCountItem
