'use client'

import { FC } from 'react'
import { LatLngExpression } from 'leaflet'
import { Marker } from 'react-leaflet'

import { MapLazy } from './MapLazy'

interface MapMarkerInputProps {
  zoom: number
  pos: LatLngExpression[]
}

const MapMarker: FC<MapMarkerInputProps> = ({ zoom, pos }) => {
  return (
    <MapLazy center={pos[0]} zoom={zoom}>
      {pos.map((p, i) => (
        <Marker key={i} position={p} />
      ))}
    </MapLazy>
  )
}

export default MapMarker
