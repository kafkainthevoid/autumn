import { NextResponse } from "next/server"

import { PROVINCE_URL } from "@/constants/url"

export async function GET() {
  const data = await fetch(`${PROVINCE_URL}/api/p/`)

  let res = []
  if (data.ok) res = await data.json()

  return new NextResponse(JSON.stringify(res), { status: 200 })
}
