import { format } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

import { Booking } from '../components/Dashboard'
import { ChartData } from '../components/Chart'

export const get7DayChartData = (bookings: Booking[]): ChartData[] => {
  const chartData: ChartData[] = []

  Array(7)
    .fill(null)
    .forEach((_, i) => {
      const today = new Date()
      today.setDate(today.getDate() - (i + 1))
      const date = today.toDateString()
      today.setDate(today.getDate() - 7)
      const dateMinus7 = today.toDateString()

      const totalOfCurDate = bookings
        .filter((b) => b.createdAt.toDateString() === date)
        .reduce((p, c) => c.roomCharge + p, 0)

      const totalOfCurDateMinus7 = bookings
        .filter((b) => b.createdAt.toDateString() === dateMinus7)
        .reduce((p, c) => p + c.roomCharge, 0)

      chartData.push({ date, curr: totalOfCurDate, prev: totalOfCurDateMinus7 })
    })

  chartData.forEach((data) => {
    data.date = format(new Date(data.date), 'EEE', { locale: enUS })
  })

  return chartData
}
