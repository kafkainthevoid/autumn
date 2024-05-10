import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export async function POST(req: NextApiRequest) {
  console.log(req.headers["x-forward-for"])
  console.log(req.connection)
  console.log(req.socket)
  // @ts-ignore
  // console.log(req.connection.socket)
  console.log("shitshit")
  return NextResponse.json({ message: "done" })
}
