import { FC } from "react"
import { differenceInCalendarDays, format } from "date-fns"
import { useReservation } from "../context/reservation"
import { useDateRange } from "../context/dateRange"
import { useLocation } from "../context/location"
import { CityIcon } from "../../commons/icons/svg/CityIcon"
import { CalendarIcon } from "../../commons/icons/svg/CalendarIcon"
import { renderPluralNumber } from "../utils/renderPluralNumber"
import { PeopleIcon } from "../../commons/icons/svg/PeopleIcon"
import { vi } from "date-fns/locale/vi"

interface SearchInfoProps {
  onOpen: () => void
}

const SearchInfo: FC<SearchInfoProps> = ({ onOpen }) => {
  const reservation = useReservation()
  const dateRange = useDateRange()
  const location = useLocation()

  const adults = reservation.rooms.reduce((a, c) => a + c.adults, 0)
  const kids = reservation.rooms.reduce((a, c) => a + c.kids, 0)

  return (
    <div className="flex items-center justify-center gap-3 h-14 py-1 border-b-[1px] mt-14">
      <div className="font-bold">Tìm kiếm</div>

      <div className="flex gap-2 items-center text-sm border-neutral-300 border-r-[1px] pr-3 h-full">
        <CityIcon width={24} height={24} />
        <div>{location.location.name}</div>
      </div>

      <div
        className="flex gap-2 items-center text-sm
    border-neutral-300 border-r-[1px] pr-3 h-full"
      >
        <CalendarIcon width={24} height={24} />
        <div>
          {format(dateRange.date?.from ? dateRange.date.from : new Date(), "LLL, dd E", { locale: vi })}
          <span className="px-2">-</span>
          {format(dateRange.date?.to ? dateRange.date.to : new Date(), "LLL, dd E, yyyy", { locale: vi })}
          <span className="text-neutral-500 text-xs pl-1">
            {/* {renderPluralNumber(
              // @ts-ignore
              differenceInCalendarDays(
                dateRange.date?.to ? dateRange.date.to : new Date(),
                dateRange.date?.from ? dateRange.date.from : new Date()
              ),
              "night"
            )} */}
            (
            {`${differenceInCalendarDays(
              dateRange.date?.to ? dateRange.date.to : new Date(),
              dateRange.date?.from ? dateRange.date.from : new Date()
            )} ngày`}
            )
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-neutral-300 border-r-[1px] pr-3 h-full text-sm">
        <PeopleIcon width={24} height={24} />
        {/* {renderPluralNumber(reservation.rooms.length, "room")} for {renderPluralNumber(adults, "adult")}
        {kids > 0 && ` and ${renderPluralNumber(kids, "kid")}`} */}

        {/* {`${reservation.rooms.length} phòng`} cho {`${adults} người lớn`}  */}
        {`${reservation.rooms.length} phòng cho ${adults} người lớn và ${kids} trẻ em`}
      </div>

      {/* TODO: currently have to disable this feature because change search-data state will break the web, fix later */}
      {/* <Button className='underline' variant='link' onClick={onOpen}>
        Edit search
      </Button> */}
    </div>
  )
}

export default SearchInfo
