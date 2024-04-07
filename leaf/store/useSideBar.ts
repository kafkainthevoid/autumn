import { create } from 'zustand'

interface SideBarData {
  open: boolean
  setOpen: () => void
}

export const useSideBar = create<SideBarData>((set) => ({
  open: true,
  setOpen: () => set((state) => ({ open: !state.open })),
}))
