'use client'

import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet-geosearch/assets/css/leaflet.css'

import './map.css'
import { DefaultIcon } from './Map'

const MapSearchField = () => {
  const provider = new EsriProvider({
    params: {
      access_token:
        'AAPKccf963c58cb0443e87cc9740b2585ee6I2So0bTe3K6HyrJz1k5OBzne6mETyE5Ka_9Tj9AWUVxyO1xxvXa40DW3VITaMDP4',
    },
  })

  const searchControl = GeoSearchControl({
    provider: provider,
    style: 'bar',
    marker: {
      icon: DefaultIcon,
      draggable: false,
    },
  })

  const map = useMap()

  useEffect(() => {
    map.addControl(searchControl)
    return () => {
      map.removeControl(searchControl)
    }
  }, [])

  return null
}

export default MapSearchField
