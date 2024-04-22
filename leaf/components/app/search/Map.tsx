'use client'

import { FC } from 'react'

import MapMarkerHotel from '@/components/map/MapMarkerHotels'
import { HotelVm } from '@/modules/hotel/models/HotelModel'

interface MapProps {
  hotels: HotelVm[]
}

const Map: FC<MapProps> = ({ hotels }) => {
  return (
    <div className='flex-1 h-[90vh] sticky top-14'>
      <MapMarkerHotel zoom={13} hotels={hotels} />
    </div>
  )
}

export default Map
