import { Amenity } from "@prisma/client"
import { create } from "zustand"

export type AmenityCount = Amenity & { count: number }

interface StoreCart {
  items: AmenityCount[]
  setItems: (item: AmenityCount[]) => void
}

export const useCart = create<StoreCart>((set) => ({
  items: [],
  setItems: (items: AmenityCount[]) => set(() => ({ items })),
}))
