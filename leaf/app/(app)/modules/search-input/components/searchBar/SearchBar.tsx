"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { XCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { objToQuery } from "@/lib/query"
import LocationBox from "./LocationBox"
import DateBox from "./DateBox"
import RoomGuestBox from "./RoomGuestBox"
import { useReservation } from "../../context/reservation"
import { useDateRange } from "../../context/dateRange"
import { useLocation } from "../../context/location"

interface SearchBarProps {
  onClose?: () => void
  variant: "MAIN" | "SEARCHED"
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, variant }) => {
  const router = useRouter()

  const reservationInfo = useReservation()
  const dateRange = useDateRange()
  const location = useLocation()

  // TODO: yeah
  // yeah what? damn it, forgot again, u stupid
  const [isTyped, setIsTyped] = useState<boolean>(true)
  const [isCorrectDate, setIsCorrectDate] = useState<boolean>(true)

  const onSearch = () => {
    // handle field message
    if (location.location.name === "" || location.location.code === -1) {
      setIsTyped(false)
      return
    }

    if (!isCorrectDate) return

    const url = objToQuery({
      baseUrl: "/search",
      date: dateRange.date,
      roomResInfo: reservationInfo.rooms,
      location: location.location,
    })

    router.push(url)
  }

  return (
    <div
      className="flex items-center justify-center gap-3 bg-neutral-100
    py-1 border-b-[1px]"
    >
      <div className="font-bold text-xl">
        {variant === "MAIN" ? (
          <div>
            <div>Địa điểm</div>
            <div className="text-zinc-800 text-xs font-light">(Bắt buộc)</div>
          </div>
        ) : (
          "Sửa thông tin"
        )}
      </div>

      <LocationBox setIsTyped={setIsTyped} />
      <DateBox setIsCorrectDate={setIsCorrectDate} />
      <RoomGuestBox />

      <Button variant="teal" onClick={() => onSearch()}>
        Tìm kiếm
      </Button>

      {/* TODO: improve the UX later */}
      <div>
        {location.location.code === -1 && !isTyped && (
          <div className="text-red-500 text-xs">Please enter a Location</div>
        )}
        {!isCorrectDate && <div className="text-red-500 text-xs">Please choose a correct date</div>}
      </div>

      {variant === "SEARCHED" && onClose && (
        <button onClick={() => onClose()}>
          <XCircleIcon className="w-8 h-8 text-teal-600" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
