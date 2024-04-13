import { redirect } from "next/navigation"

import { currentUser } from "@/lib/auth"
import Dashboard from "./components/Dashboard"
import { db } from "@/lib/db"

const MainPage = async () => {
  const session = await currentUser()

  if (!session) return redirect("/sign-in")

  const bookings = await db.booking.findMany({
    select: { roomCharge: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  })

  const users = await db.user.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  })

  const feedbacks = await db.feedback.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })

  return (
    <div className="h-full">
      <Dashboard bookings={bookings} users={users} feedbacks={feedbacks} />
    </div>
  )
}

export default MainPage
