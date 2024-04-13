import { create } from "zustand"

interface IError {
  success: string
  location: string
  setSuccess: ({ message, location }: { message: string; location: string }) => void
}

export const useError = create<IError>((set) => ({
  success: "",
  location: "",
  setSuccess: ({ message, location }) => set(() => ({ success: message, location })),
}))
