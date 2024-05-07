import { NextResponse } from "next/server"

import { requiredRoleApi } from "@/helpers/requiredRoleApi"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: { postId: string } }) {
  try {
    await requiredRoleApi(["ADMIN", "STAFF"])

    const { title, author, content } = await req.json()

    if (!params.postId) return new NextResponse("Post ID missing", { status: 400 })

    const dbAmenity = await db.post.findUnique({
      where: { id: params.postId },
    })

    if (!dbAmenity) return new NextResponse("Amenity not found", { status: 404 })

    const post = await db.post.update({
      where: { id: params.postId },
      data: { title, author, content },
    })

    return NextResponse.json(post)
  } catch (err) {
    console.log("[AMENITY_ID_PATCH]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
