"use client"

import { FC, useState } from "react"

import { Progress } from "@/components/ui/progress"
import ReservationSummary from "./ReservationSummary"
import RoomCard from "./RoomCard"
import Payment from "./Payment"
// import { useReservation } from '@/modules/search-input/context/reservation'
// import { renderPluralNumber } from '@/modules/search-input/utils/renderPluralNumber'
// import { RoomTypeVm } from '@/modules/reservation/models/RoomTypeVm'
import HotelInfo from "./HotelInfo"
import SlideInfo from "./SlideInfo"
import { RoomTypeVm } from "./services/ReservationService"
import { HotelVm } from "../hotel/services/HotelService"
import { useReservation } from "../search-input/context/reservation"
import { renderPluralNumber } from "../search-input/utils/renderPluralNumber"
// import { HotelVm } from '@/modules/hotel/models/HotelModel'

interface SelectRoomProps {
  roomTypes: RoomTypeVm[]
  hotel?: HotelVm
  userId: string
}

const SelectRoom: FC<SelectRoomProps> = ({ roomTypes, hotel, userId }) => {
  const reservation = useReservation()
  const [slide, setSlide] = useState<number>(1)
  const [isPayable, setIsPayable] = useState(false)

  const totalSlide = reservation.rooms.length + 1 // +1 payment slide

  const onNext = () => {
    if (slide === totalSlide) return
    if (slide + 1 === totalSlide) setIsPayable(true)
    setSlide((p) => p + 1)
  }

  const handleSelectRoom = (resInfoId: string) => {
    return (roomTypeId: string) => {
      const newRoomInfos = [...reservation.rooms]
      for (let i = 0; i < newRoomInfos.length; i++) {
        if (newRoomInfos[i].id === resInfoId) {
          newRoomInfos[i].roomTypeId = roomTypeId
        }
      }
      reservation.setRooms(newRoomInfos)
      onNext()
    }
  }

  const renderRoom = () => {
    const selectedRoom = roomTypes.find((rt) => rt.id === reservation.rooms[slide - 1].roomTypeId)

    const sortedRoom = roomTypes.filter((rt) => rt.id !== reservation.rooms[slide - 1].roomTypeId)

    if (selectedRoom) sortedRoom.unshift(selectedRoom)

    return roomTypes.length > 0 ? (
      sortedRoom.map((roomType, i) => {
        return (
          <div key={i}>
            <RoomCard
              isSelected={reservation.rooms[slide - 1].roomTypeId === roomType.id ? true : false}
              handleSelectRoom={handleSelectRoom(reservation.rooms[slide - 1].id)}
              roomType={roomType}
              hotel={hotel}
            />
          </div>
        )
      })
    ) : (
      <h1 className="text-2xl">No room left, please choose another day.</h1>
    )
  }

  return (
    <div className="container p-10 h-full max-w-7x">
      <div className="flex gap-10">
        <div className="flex-1">
          <div className="mr-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-zinc-500">
                {totalSlide > 1 ? (
                  <span>
                    {/* Room {slide === totalSlide ? slide - 1 : slide} of {totalSlide - 1} */}
                    Phòng {slide === totalSlide ? slide - 1 : slide} / {totalSlide - 1}
                  </span>
                ) : null}
              </p>
              {/* <h1 className="font-extrabold text-4xl">Select a Room</h1> */}
              <h1 className="font-extrabold text-4xl">Chọn phòng</h1>
              <Progress className="h-1" value={(slide / totalSlide) * 100} />
              <SlideInfo slide={slide} totalSlide={totalSlide} setSlide={setSlide} />

              <div className="mt-2">
                {/* {hotel && <h2 className="font-bold">Your stay with {hotel.name} includes</h2>} */}
                <ul className="flex gap-x-4 flex-wrap overflow-hidden">
                  {hotel &&
                    hotel.amenity_Hotels.map((ah, i) => (
                      <li className="text-sm text-zinc-600" key={i}>
                        &#x2713; {ah.amenity.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {isPayable && slide === totalSlide ? (
              <Payment roomTypes={roomTypes} userId={userId} />
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  {/* TODO: */}
                  {/* {renderPluralNumber(roomTypes.length, "room")} found. We&apos;re showing the average price per night. */}
                  {roomTypes.length} phòng được tìm thấy.
                </p>
                <hr />

                <div className="grid grid-cols-2 gap-3">{renderRoom()}</div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[30%] block">
          <HotelInfo hotel={hotel} />
          <ReservationSummary slide={slide} roomTypes={roomTypes} />
        </div>
      </div>
    </div>
  )
}

export default SelectRoom
