import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { requiredRoleApi } from "@/helpers/requiredRoleApi"

export async function POST(req: Request) {
  try {
    await requiredRoleApi(["ADMIN", "STAFF"])

    const { title, author, banner, content } = await req.json()
    if (!title || !author || !content) return new NextResponse("All fields are required", { status: 400 })

    const post = await db.post.create({
      data: {
        title,
        author,
        content,
        banner,
      },
    })

    return NextResponse.json(post)
  } catch (err) {
    console.log("[POST_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
