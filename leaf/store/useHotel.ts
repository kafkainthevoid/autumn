import { Hotel } from '@prisma/client'
import { create } from 'zustand'

interface HotelData {
  hotel: Hotel | undefined | null
  setHotel: (hotel: Hotel | undefined | null) => void
}

export const useHotel = create<HotelData>((set) => ({
  hotel: null,
  setHotel: (hotel) => set(() => ({ hotel })),
}))
