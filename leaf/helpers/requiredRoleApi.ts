import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"

import { currentUser } from "@/lib/auth"

export const requiredRoleApi = async (role: UserRole[]): Promise<NextResponse<unknown> | undefined> => {
  const session = await currentUser()
  if (!session) return new NextResponse("Unauthenticated", { status: 401 })
  if (!role.includes(session.role))
    return new NextResponse("You don't have permission to perform this action", { status: 403 })
}
