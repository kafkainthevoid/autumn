import { NextResponse } from "next/server"
import { UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const userSession = await currentUser()

    if (userSession?.role !== UserRole.ADMIN)
      return new NextResponse("You do not have permission to perform this action", { status: 400 })

    const body = await req.json()

    const {
      email,
      firstName,
      lastName,
      gender,
      phoneNumber,
      dateOfBirth,
      addressLine,
      role = UserRole.STAFF,
      password,
    } = body

    if (!email) return new NextResponse("Email is required", { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)

    const dbUser = await db.user.findUnique({
      where: { email },
      include: { address: true },
    })
    if (dbUser) return NextResponse.json({ message: "User already existed with that email" })

    await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        sex: gender,
        birthday: dateOfBirth,
        emailVerified: new Date(),
        password: hashedPassword,
        role,
        address: {
          create: { addressLine, phone: phoneNumber },
        },
      },
    })

    return NextResponse.json({ message: "Created new staff" })
  } catch (err) {
    console.log("[USER_ID_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
