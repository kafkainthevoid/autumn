"use client"

import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { useDateRange } from "../../context/dateRange"

interface DateBoxProps {
  setIsCorrectDate: (val: boolean) => void
}

const DateBox: React.FC<DateBoxProps> = ({ setIsCorrectDate }) => {
  const storeDateRange = useDateRange()

  const [date, setDate] = useState<DateRange>(storeDateRange.date)

  const onOpenChange = (open: boolean) => {
    if (open === false) {
      if (date.from && date.to) {
        storeDateRange.setDate(date)
        setIsCorrectDate(true)
      } else {
        setIsCorrectDate(false)
      }
    }
  }

  return (
    <div className={cn("grid gap-2")}>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <div className="flex gap-3 cursor-pointer">
            <div className="flex gap-3">
              <div className="border-r-[1px] pr-3">
                <DateBoxItem date={date?.from ?? new Date()} />
              </div>
              <DateBoxItem date={date?.to ?? new Date()} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={{ before: new Date() }}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            // @ts-ignore
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const DateBoxItem = ({ date }: { date: Date }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-primary font-bold text-4xl text-teal-600">{format(date, "dd")}</div>
      <div className="flex flex-col items-center justify-center gap-0">
        <div className="font-semibold">{format(date, "LLL")}</div>
        <div className="text-sm uppercase">{format(date, "E")}</div>
      </div>
    </div>
  )
}

export default DateBox
