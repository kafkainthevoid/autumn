import { NextResponse } from "next/server"

import { PROVINCE_URL } from "@/constants/url"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")

  console.log("\n\n\nGETTING PROVINCE", { q })

  const data = await fetch(`${PROVINCE_URL}/api/p/search/?q=${q}`)

  let res = []
  if (data.ok) res = await data.json()

  return new NextResponse(JSON.stringify(res), { status: 200 })
}
