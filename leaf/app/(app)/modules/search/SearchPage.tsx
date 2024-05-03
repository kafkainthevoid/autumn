"use client"

import { FC, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import * as queryConvert from "@/lib/query"
import { useOrigin } from "@/hooks/use-origin"
import { Address, Hotel } from "@prisma/client"
import { useFirstLoad } from "@/store/app/useFirstLoad"
import SearchResult from "./SearchResult"
import Map from "./Map"
import { useDateRange } from "../search-input/context/dateRange"
import { useReservation } from "../search-input/context/reservation"
import { useLocation } from "../search-input/context/location"
import SearchInfo from "../search-input/components/SearchInfo"
import SearchBar from "../search-input/components/searchBar/SearchBar"
import * as HotelService from "@/app/(app)/modules/hotel/services/HotelService"

interface SearchPageProps {}

const Search: FC<SearchPageProps> = () => {
  useOrigin()
  const [open, setOpen] = useState<boolean>(false)

  const [hotels, setHotels] = useState<(Hotel & { address: Address })[]>([])

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
      console.log("result hotel", res)
      setHotels(res)
    })
  }, [location])

  return (
    <div className="flex flex-col h-full">
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar variant="SEARCHED" onClose={() => setOpen(false)} />}

      <hr className="h-1 bg-teal-600 border-teal-600 my-4 mx-6" />

      <div className="flex mx-6 gap-4">
        <SearchResult hotels={hotels} />
        <Map hotels={hotels} />
      </div>
    </div>
  )
}

export default Search
