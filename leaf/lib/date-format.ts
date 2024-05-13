import { format } from "date-fns"

interface WeekdayMap {
  Mon: string
  Tue: string
  Wed: string
  Thu: string
  Fri: string
  Sat: string
  Sun: string
}

const weekdayMap: WeekdayMap = {
  Mon: "Thứ Hai",
  Tue: "Thứ Ba",
  Wed: "Thứ Tư",
  Thu: "Thứ Năm",
  Fri: "Thứ Sáu",
  Sat: "Thứ Bảy",
  Sun: "Chủ Nhật",
}

export const displayWeekday = (date: Date): string => {
  const weekdayEn = format(date, "E")
  return weekdayMap[weekdayEn as keyof WeekdayMap]
}
