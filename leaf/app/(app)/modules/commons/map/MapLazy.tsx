'use client'

import dynamic from 'next/dynamic'

// Leaflet map doesn't work on ssr

// @ts-ignore
export const MapLazy = dynamic(() => import('./Map'), {
  ssr: false,
})
