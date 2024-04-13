import { create } from "zustand"

import { ErrorLocation } from "@/constants/error"

interface IError {
  error: string
  location: ErrorLocation
  setError: ({ message, location }: { message: string; location: ErrorLocation }) => void
}

export const useError = create<IError>((set) => ({
  error: "",
  location: ErrorLocation.HOME_PAGE,
  setError: ({ message, location }) => set(() => ({ error: message, location })),
}))
