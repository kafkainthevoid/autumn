import { NextResponse } from "next/server"

import fs from "fs"
import path from "path"

export async function GET(req: Request) {
  try {
    const dir = path.join(process.cwd(), "resources/template", "receipt2.json")
    const dataRaw = fs.readFileSync(dir)
    const template = dataRaw.toString("utf-8")

    console.log(template)

    return NextResponse.json({ data: template })
  } catch (err) {
    console.log("[RECEIPT_TEMPLATE_GET]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
