"use client"

import { FC } from "react"

import { HotelVm } from "../hotel/services/HotelService"
import MapMarkerHotels from "../commons/map/MapMarkerHotels"

interface MapProps {
  hotels: HotelVm[]
}

const Map: FC<MapProps> = ({ hotels }) => {
  return (
    <div className="flex-1 h-[90vh] sticky top-14">
      <MapMarkerHotels zoom={13} hotels={hotels} />
    </div>
  )
}

export default Map
