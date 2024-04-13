import { NextResponse } from "next/server"

import { PROVINCE_URL } from "@/constants/url"

export async function GET(req: Request, { params }: { params: { provinceCode: string } }) {
  try {
    const { searchParams } = new URL(req.url)

    const data = await fetch(`${PROVINCE_URL}/api/d/${params.provinceCode}?depth=${searchParams.get("depth")}`)

    if (!data.ok) throw new Error()

    const res = (await data.json()) ?? []

    return new NextResponse(JSON.stringify(res), { status: 200 })
  } catch (err) {
    console.log("[PROVINCE_CODE_GET]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
