import { create } from 'zustand'

interface StoreFirstLoad {
  isFirstLoad: boolean
  setIsFirstLoad: (val: boolean) => void
}

export const useFirstLoad = create<StoreFirstLoad>((set) => ({
  isFirstLoad: true,
  setIsFirstLoad: () => set(() => ({ isFirstLoad: false })),
}))
