'use client'

import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import * as queryConvert from '@/lib/query'
import SearchInfo from '@/modules/search-input/components/SearchInfo'
import SearchBar from '@/modules/search-input/components/searchBar/SearchBar'
import { useLocation } from '@/modules/search-input/context/location'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import * as ReservationService from '@/modules/reservation/services/ReservationService'
import * as HotelService from '@/modules/hotel/services/HotelService'
import { useFirstLoad } from '@/shared/store/useFirstLoad'
import { HotelVm } from '@/modules/hotel/models/HotelModel'
import { RoomTypeVm } from '@/modules/reservation/models/RoomTypeVm'
import SelectRoom from './SelectRoom'

interface ReservationProps {
  userId: string
}

const Reservation: FC<ReservationProps> = ({ userId }) => {
  const searchParams = useSearchParams()

  const [open, setOpen] = useState<boolean>(false)

  const [roomTypes, setRoomTypes] = useState<RoomTypeVm[]>([])
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
    <div className='flex flex-col h-full'>
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar variant='SEARCHED' onClose={() => setOpen(false)} />}
      <div className='h-full'>
        <SelectRoom userId={userId} roomTypes={roomTypes} hotel={hotel} />
      </div>
    </div>
  )
}

export default Reservation
