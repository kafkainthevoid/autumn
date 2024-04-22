import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export async function GET(_: Request, { params }: { params: { userId: string } }) {
  try {
    if (!params.userId) return new NextResponse("User ID is missing", { status: 400 })

    const user = await db.user.findUnique({
      where: { id: params.userId },
      include: { address: true },
    })

    if (!user) return NextResponse.json({ message: "No user found" })

    return NextResponse.json(user)
  } catch (err) {
    console.log("[USER_ID_GET]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    if (!params.userId) return new NextResponse("User ID is missing", { status: 400 })
    const user = await db.user.findUnique({
      where: { id: params.userId },
      include: { address: true },
    })
    if (!user) return NextResponse.json({ message: "No user found" })

    const body = await req.json()

    const { email, firstName, lastName, gender, phoneNumber, dateOfBirth, addressLine } = body

    if (!email) return new NextResponse("Email is required", { status: 400 })

    await db.user.update({
      where: { id: params.userId },
      data: {
        email,
        firstName,
        lastName,
        sex: gender,
        birthday: dateOfBirth,
        address: {
          update: {
            data: { phone: phoneNumber, addressLine },
          },
        },
      },
    })

    return NextResponse.json({ message: "Updated successfully" })
  } catch (err) {
    console.log("[USER_ID_PUT]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
  try {
    const userAuth = await currentUser()
    if (userAuth?.role !== UserRole.ADMIN)
      return NextResponse.json({
        message: "User do not have permission to perform this action",
      })

    const body = await req.json()

    const user = await db.user.findUnique({ where: { id: params.userId } })

    if (!user || user.id === userAuth.id) return NextResponse.json({ message: "Invalid user" })

    await db.user.update({
      where: { id: params.userId },
      data: { role: body.role },
    })

    return NextResponse.json({ message: "Updated successfully" })
  } catch (err) {
    console.log("[USER_ID_PATCH]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { userId: string } }) {
  try {
    const userAuth = await currentUser()
    if (userAuth?.role === UserRole.USER)
      return NextResponse.json({
        message: "User do not have permission to perform this action",
      })

    await db.user.delete({ where: { id: params.userId } })

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (err) {
    console.log("[USER_ID_DELETE]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
