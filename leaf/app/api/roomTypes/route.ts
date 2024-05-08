import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { requiredRoleApi } from "@/helpers/requiredRoleApi"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const hotelId = searchParams.get("hotelId")

    if (!hotelId) return NextResponse.json([])

    const roomTypes = await db.roomType.findMany({
      where: { hotelId: hotelId },
      include: {
        rooms: { include: { booking_rooms: true } },
        amenity_RoomTypes: { include: { amenity: true } },
        discount: true,
      },
    })

    return NextResponse.json(roomTypes)
  } catch (err) {
    console.log("[HOTEL_GET]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await requiredRoleApi(["ADMIN", "STAFF"])

    const body = await req.json()
    const { name, description, occupancy, numBeg, images, price, amenities, hotelId } = body

    console.log(body)

    if (
      !name ||
      !description ||
      !occupancy ||
      !numBeg ||
      !images ||
      !images.length ||
      !price ||
      !amenities.length ||
      !hotelId
    ) {
      return new NextResponse("All fields are required", { status: 400 })
    }

    const roomTypes = await db.roomType.create({
      data: {
        name,
        description,
        occupancy,
        numBeg,
        images,
        price,
        hotelId,
        amenity_RoomTypes: {
          createMany: {
            data: amenities.map((amenityId: string) => ({ amenityId })),
          },
        },
      },
    })

    return NextResponse.json(roomTypes)
  } catch (err) {
    console.log("[HOTEL_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
