'use client'

import 'leaflet/dist/leaflet.css'

import type { LatLngExpression, MapOptions } from 'leaflet'
import { FC, ReactNode } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

// Leaflet doesn't work properly with Next,
// this is the trick to display maker icon (all inside /public folder)
import L from 'leaflet'
import MapSearchField from './MapSearchField'

export let DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconAnchor: [16, 40],
  shadowUrl: '/leaflet/marker-shadow.png',
})
L.Marker.prototype.options.icon = DefaultIcon

const Map: FC<
  {
    center: LatLngExpression
    children: ReactNode
    zoom: number
  } & MapOptions
> = ({ children, center, zoom, ...options }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {children}
      <div className='text-black'>
        {/* @ts-ignore */}
        <MapSearchField apiKey='AAPKccf963c58cb0443e87cc9740b2585ee6I2So0bTe3K6HyrJz1k5OBzne6mETyE5Ka_9Tj9AWUVxyO1xxvXa40DW3VITaMDP4' />
      </div>
    </MapContainer>
  )
}

export default Map
