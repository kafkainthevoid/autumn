import { redirect } from "next/navigation"

import { currentUser } from "@/lib/auth"
import Reservation from "../modules/reservation/Reservation"

const ReservationPage = async ({}) => {
  const user = await currentUser()

  if (!user?.id) redirect("/sign-in")

  return (
    <>
      <Reservation userId={user.id} />
    </>
  )
}

export default ReservationPage
