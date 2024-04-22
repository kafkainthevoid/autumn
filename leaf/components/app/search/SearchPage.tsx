'use client'

import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import * as queryConvert from '@/lib/query'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useLocation } from '@/modules/search-input/context/location'
import { useReservation } from '@/modules/search-input/context/reservation'
import SearchInfo from '@/modules/search-input/components/SearchInfo'
import SearchBar from '@/modules/search-input/components/searchBar/SearchBar'
import SearchResult from '@/modules/search/components/SearchResult'
import Map from '@/modules/search/components/Map'
import { useFirstLoad } from '@/shared/store/useFirstLoad'
import { HotelVm } from '@/modules/hotel/models/HotelModel'
import * as HotelService from '@/modules/hotel/services/HotelService'
import { useOrigin } from '@/hooks/useOrigin'

interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = () => {
  useOrigin()
  const [open, setOpen] = useState<boolean>(false)

  const [hotels, setHotels] = useState<HotelVm[]>([])

  const firstLoad = useFirstLoad()
  const dateRange = useDateRange()
  const reservation = useReservation()
  const location = useLocation()

  const searchParams = useSearchParams().toString()

  useEffect(() => {
    if (!firstLoad.isFirstLoad) return

    const newData = queryConvert.queryToObj(searchParams)
    firstLoad.setIsFirstLoad(false)
    dateRange.setDate(newData.date)
    reservation.setRooms(newData.roomResInfos)
    location.setLocation(newData.location)
  }, [firstLoad, dateRange, reservation, location, searchParams])

  useEffect(() => {
    if (location.location.code === -1) return

    HotelService.getHotels(location.location.code).then((res) => {
      setHotels(res)
    })
  }, [location])

  return (
    <div className='flex flex-col h-full'>
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar variant='SEARCHED' onClose={() => setOpen(false)} />}

      <hr className='h-1 bg-teal-600 border-teal-600 my-4 mx-6' />

      <div className='flex mx-6 gap-4'>
        <SearchResult hotels={hotels} />
        <Map hotels={hotels} />
      </div>
    </div>
  )
}

export default SearchPage
