"use client"

import { FC, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import * as queryConvert from "@/lib/query"
import SelectRoom from "./SelectRoom"
import { HotelVm } from "../hotel/services/HotelService"
import { useFirstLoad } from "@/store/app/useFirstLoad"
import { useDateRange } from "../search-input/context/dateRange"
import { useReservation } from "../search-input/context/reservation"
import { useLocation } from "../search-input/context/location"
import SearchInfo from "../search-input/components/SearchInfo"
import SearchBar from "../search-input/components/searchBar/SearchBar"
import * as HotelService from "../hotel/services/HotelService"
import * as ReservationService from "../reservation/services/ReservationService"

interface ReservationProps {
  userId: string
}

const Reservation: FC<ReservationProps> = ({ userId }) => {
  const searchParams = useSearchParams()

  const [open, setOpen] = useState<boolean>(false)

  const [roomTypes, setRoomTypes] = useState<ReservationService.RoomTypeVm[]>([])
  const [hotel, setHotel] = useState<HotelVm>()

  const firstLoad = useFirstLoad()
  const dateRange = useDateRange()
  const reservation = useReservation()
  const location = useLocation()

  useEffect(() => {
    if (!firstLoad.isFirstLoad) return

    const newData = queryConvert.queryToObj(searchParams.toString())
    dateRange.setDate(newData.date)
    reservation.setRooms(newData.roomResInfos)
    firstLoad.setIsFirstLoad(false)
    location.setLocation(newData.location)

    HotelService.getHotel(newData.hotel!).then((data) => {
      setHotel(data)
    })

    ReservationService.getRoomTypes(newData.hotel!).then((data) => {
      setRoomTypes(data)
    })
  }, [dateRange, reservation, firstLoad, location, searchParams])

  return (
    <div className="flex flex-col h-full">
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar variant="SEARCHED" onClose={() => setOpen(false)} />}
      <div className="h-full">
        <SelectRoom userId={userId} roomTypes={roomTypes} hotel={hotel} />
      </div>
    </div>
  )
}

export default Reservation
