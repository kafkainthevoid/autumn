import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    console.log("[CHANGE_PASSWORD] 1111")
    if (!params.userId) return new NextResponse("User ID is missing", { status: 400 })

    console.log("[CHANGE_PASSWORD] 2222")
    const user = await db.user.findUnique({
      where: { id: params.userId },
    })

    if (!user) return NextResponse.json({ error: "No user found" })
    console.log("[CHANGE_PASSWORD] 3333")

    const body = await req.json()

    console.log("[CHANGE_PASSWORD] 4444")
    console.log("[CHANGE_PASSWORD] body", body)
    const { oldPassword, newPassword } = body
    const hashedpassword = await bcrypt.hash(oldPassword, 10)

    if (user.password !== hashedpassword) return NextResponse.json({ error: "Password is incorrect" })

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    await db.user.update({
      where: { id: params.userId },
      data: { password: hashedNewPassword },
    })

    return NextResponse.json({ success: "Password is updated" })
  } catch (err) {
    console.log("[USER_ID_CHANGE_PASSWORD]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
