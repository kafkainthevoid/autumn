import { getAuthSession } from '@/lib/auth'
import Booking from '@/modules/booking/components/Booking'

const BookingPage = async () => {
  const session = await getAuthSession()

  if (!session) return <div>Please login to access this site</div>

  return <Booking userId={session?.user.id} />
}

export default BookingPage
