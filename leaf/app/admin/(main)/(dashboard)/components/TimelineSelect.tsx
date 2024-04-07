'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FC } from 'react'

const data = {
  ALL: 'All time',
  '7DAY': 'Last 7 days',
  MONTH: 'Last month',
  YEAR: 'Last year',
}

export type Timeline = keyof typeof data

interface TimelineSelectProps {
  timeline: Timeline
  setTimeline: (v: Timeline) => void
}

const TimelineSelect: FC<TimelineSelectProps> = ({ timeline, setTimeline }) => {
  return (
    <Select
      defaultValue={timeline}
      onValueChange={(v) => {
        // TODO: fix later
        // @ts-ignore
        setTimeline(v)
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Theme' />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(data).map((k) => (
          <SelectItem key={k} value={k}>
            {/* @ts-ignore wtf */}
            {data[k]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TimelineSelect
