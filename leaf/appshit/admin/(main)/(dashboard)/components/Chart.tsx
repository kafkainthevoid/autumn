"use client"

import React, { FC } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export type ChartData = {
  curr: number
  prev: number
  date: string
}

interface MainChartProps {
  data: ChartData[]
}

const Chart: FC<MainChartProps> = ({ data }) => {
  return (
    <div className="rounded-md bg-slate-100 p-3">
      <div className="font-semibold text-xl text-center tracking-wide text-slate-700">
        Net Profit
      </div>
      <div className="h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            title="Profit Net"
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name="Last 7 day"
              dataKey="prev"
              stroke="#0d9488"
              activeDot={{ r: 8 }}
            />
            <Line
              className=""
              type="monotone"
              name="Current"
              dataKey="curr"
              textAnchor="curre"
              stroke="#ef4444"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Chart
