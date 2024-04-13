import { auth } from "@/auth"
import { ExtendedUser } from "@/auth/next-auth"

export const currentUser = async (): Promise<ExtendedUser | undefined> => {
  const session = await auth()

  return session?.user
}

export const currentRole = async () => {
  const session = await auth()

  return session?.user?.role
}
