import { NextResponse } from "next/server"

import { requiredRoleApi } from "@/helpers/requiredRoleApi"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: { amenityId: string } }) {
  try {
    // await requiredRoleApi(["ADMIN", "STAFF"])

    console.log("\n\n\n\n\n data", await req.json())

    const { name, description, price, type } = await req.json()

    if (!params.amenityId) return new NextResponse("Amenity ID missing", { status: 400 })

    const dbAmenity = await db.amenity.findUnique({
      where: { id: params.amenityId },
    })

    if (!dbAmenity) return new NextResponse("Amenity not found", { status: 404 })

    const amenity = await db.amenity.update({
      where: { id: params.amenityId },
      data: { name, description, price, type },
    })

    return NextResponse.json(amenity)
  } catch (err) {
    console.log("[AMENITY_ID_PATCH]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { amenityId: string } }) {
  try {
    await requiredRoleApi(["ADMIN", "STAFF"])

    if (!params.amenityId) return new NextResponse("Amenity ID missing", { status: 400 })

    const dbAmenity = await db.amenity.findUnique({
      where: { id: params.amenityId },
    })
    if (!dbAmenity) return new NextResponse("Amenity not found", { status: 404 })

    await db.amenity_RoomType.deleteMany({
      where: { amenityId: params.amenityId },
    })

    await db.amenity_Hotel.deleteMany({
      where: { amenityId: params.amenityId },
    })

    await db.amenity.delete({
      where: { id: params.amenityId },
    })

    return NextResponse.json("DELETED")
  } catch (err) {
    console.log("[AMENITY_ID_DELETE]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
