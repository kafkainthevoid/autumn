import { DateRange } from 'react-day-picker'

const checkDateRangeCollision = (
  date1: DateRange,
  date2: DateRange
): boolean => {
  if (!date1.from || !date1.to || !date2.from || !date2.to) return false
  return date1.from < date2.to && date1.to > date2.from
}

export { checkDateRangeCollision }
