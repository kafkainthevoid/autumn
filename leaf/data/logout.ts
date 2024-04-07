"use server"

import { signOut } from "@/auth"

export const logout = async () => {
  // NOTE: some server stuff
  await signOut()
}
