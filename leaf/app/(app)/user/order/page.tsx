import { currentUser } from "@/lib/auth"
import Booking from "../../modules/booking/Booking"
import { db } from "@/lib/db"

const OrderPage = async () => {
  const user = await currentUser()

  if (!user?.id) return <div>Please login to access this site</div>

  const bookings = await db.booking.findMany({
    where: { userId: user.id },
    include: {
      booking_rooms: {
        include: {
          room: { include: { roomType: { include: { hotel: true } } } },
          booking: true,
          review: true,
        },
      },
    },
  })

  return <Order bookings={bookings} />
}

export default OrderPage
