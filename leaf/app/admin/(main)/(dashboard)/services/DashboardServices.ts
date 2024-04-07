import { db } from '@/lib/db'

type ChartData = {
  name: string
  prev: number
  curr: number
}[]

const getData = async () => {
  const bookingData = await db.booking.findMany({
    select: { roomCharge: true, createdAt: true },
  })
}
