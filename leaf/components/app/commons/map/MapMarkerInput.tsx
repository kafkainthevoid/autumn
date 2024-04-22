'use client'

import { FC } from 'react'
import { LatLngExpression } from 'leaflet'
import { Marker, useMapEvents } from 'react-leaflet'

import { MapLazy } from './MapLazy'

interface MapMarkerInputProps {
  center: LatLngExpression
  zoom: number
  pos: LatLngExpression
  setPos: (pos: LatLngExpression) => void
}

const MapMarkerInput: FC<MapMarkerInputProps> = ({ zoom, pos, setPos }) => {
  const handleClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    setPos([lat, lng])
  }

  return (
    <MapLazy center={pos} zoom={zoom}>
      <Marker position={pos} />
      <MarkerFunction onClick={handleClick} />
    </MapLazy>
  )
}

const MarkerFunction: FC<{ onClick: (e: L.LeafletMouseEvent) => void }> = ({
  onClick,
}) => {
  useMapEvents({
    click: onClick,
  })
  return null
}

export default MapMarkerInput
