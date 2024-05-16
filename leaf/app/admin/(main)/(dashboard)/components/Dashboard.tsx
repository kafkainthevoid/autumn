"use client"

import { FC, useEffect, useState } from "react"
import { AlbumIcon, DollarSignIcon, LandmarkIcon, Users2Icon } from "lucide-react"
import { differenceInDays, format } from "date-fns"
import { User as UserDb } from "@prisma/client"
import { Feedback } from "@prisma/client"

import GrowthCard from "./GrowthCard"
import Chart, { ChartData } from "./Chart"
import TimelineSelect, { Timeline } from "./TimelineSelect"
import { get7DayChartData } from "../utils/get7DayChartData"

export type Booking = { roomCharge: number; createdAt: Date }
export type User = { createdAt: Date }

interface DashboardProps {
  bookings: Booking[]
  users: User[]
  feedbacks: (Feedback & { user: UserDb })[]
}

const Dashboard: FC<DashboardProps> = ({ bookings, users, feedbacks }) => {
  const [timeline, setTimeline] = useState<Timeline>("ALL")

  const [income, setIncome] = useState<number>(0)
  const [userNum, setUserNum] = useState<number>(0)
  const [bookingNum, setBookingNum] = useState<number>(0)
  const [chartData, setChartData] = useState<ChartData[]>(get7DayChartData(bookings))

  const onTotal = () => {
    const income = bookings.reduce((p, c) => c.roomCharge + p, 0)
    setIncome(income)
    setBookingNum(bookings.length)
    setUserNum(users.length)
    setChartData(get7DayChartData(bookings))
  }

  const onSevenDay = () => {
    const filteredUsers = users.filter((user) => differenceInDays(user.createdAt, new Date()) <= 7)
    const filteredBookings = bookings.filter((booking) => differenceInDays(booking.createdAt, new Date()) <= 7)
    setIncome(filteredBookings.reduce((p, c) => p + c.roomCharge, 0))
    setBookingNum(filteredBookings.length)
    setUserNum(filteredUsers.length)
    setChartData(get7DayChartData(bookings))
  }

  const onOneMonth = () => {}

  const onOneYear = () => {}

  useEffect(() => {
    switch (timeline) {
      case "ALL":
        onTotal()
        break
      case "7DAY":
        onSevenDay()
        break
      case "MONTH":
        onOneMonth()
        break
      case "YEAR":
        onOneYear()
        break
    }
  }, [timeline])

  return (
    <div className="p-6 h-full">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <LandmarkIcon className="w-8 h-8 stroke-[1px]" />
            {/* <div className='text-3xl font-bold'>Dashboard</div> */}
            <div className="text-3xl font-bold">Báo cáo thống kê</div>
          </div>
          <div>
            <TimelineSelect timeline={timeline} setTimeline={setTimeline} />
          </div>
        </div>

        <main className="gap-6 mt-10 flex h-full">
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 w-full">
              <GrowthCard
                type="DECREASE"
                // label='Income'
                label="Doanh thu"
                // subLabel='$'
                subLabel="VND"
                value={income}
                changeInValue={10}
                icon={DollarSignIcon}
              />
              <GrowthCard
                type="INCREASE"
                // label="Customer"
                label="Khách hàng"
                // subLabel="users"
                subLabel="người dùng"
                value={userNum}
                changeInValue={10}
                icon={Users2Icon}
              />
              <GrowthCard
                type="INCREASE"
                // label="Booking rooms"
                // subLabel="rooms"
                label="Phòng đang đặt"
                subLabel="phòng"
                value={bookingNum}
                changeInValue={21}
                icon={AlbumIcon}
              />
            </div>

            <div className="mt-9">
              <Chart data={chartData} />
            </div>
          </div>

          <div className="border w-1/4  rounded-xl p-4 h-full">
            {/* <h2 className="font-semibold text-xl border-b pb-2">User Feedbacks</h2> */}
            <h2 className="font-semibold text-xl border-b pb-2">Phản hồi người dùng</h2>

            <div className="flex flex-col overflow-y-scroll h-full">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="mt-3 border-b">
                  <div className="flex justify-between text-sm italic">
                    <div>{feedback.user.name}</div>
                    <div>{format(new Date(feedback.createdAt).toDateString(), "dd-MM-yyyy")}</div>
                  </div>
                  <div>{feedback.content}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
