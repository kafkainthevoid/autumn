import { redirect } from 'next/navigation'

import { getAuthSession } from '@/lib/auth'
import Reservation from '@/modules/reservation/components/Reservation'

const ReservationPage = async ({}) => {
  const session = await getAuthSession()

  if (!session?.user.id) redirect('/sign-in')

  return (
    <>
      <Reservation userId={session?.user.id} />
    </>
  )
}

export default ReservationPage
