import { create } from 'zustand'

export type Location = {
  name: string
  code: number
}

export type StoreLocation = {
  location: Location
  setLocation: (data?: Location) => void
}

export const useLocation = create<StoreLocation>((set) => ({
  location: { name: '', code: -1 },
  setLocation: (data?: Location) => set(() => ({ location: data })),
}))
