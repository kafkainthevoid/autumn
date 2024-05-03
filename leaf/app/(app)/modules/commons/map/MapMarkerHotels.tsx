"use client"

import { FC } from "react"
import { Marker, Popup } from "react-leaflet"

import { MapLazy } from "./MapLazy"
import { Address, Hotel } from "@prisma/client"

interface MapMarkerProps {
  zoom: number
  hotels: (Hotel & { address: Address })[]
}

const MapMarkerHotels: FC<MapMarkerProps> = ({ zoom, hotels }) => {
  if (!hotels || hotels.length === 0) return

  return (
    <MapLazy
      // @ts-ignore
      center={hotels[0].address?.coordinate?.split(",").map((p) => +p)}
      zoom={zoom}
    >
      {hotels.map((hotel, i) => (
        <Marker
          key={i}
          // @ts-ignore
          position={hotel.address?.coordinate.split(",").map((p) => +p)}
        >
          <Popup>
            {/* TODO:5 add display on hover, change marker-icon to a price label, view details hotel onclick */}
            <div>
              <div className="text-sm font-bold">{hotel.name}</div>
              <div className="text-[10px]">{hotel.address?.addressLine}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapLazy>
  )
}

export default MapMarkerHotels
