import { FC } from "react"
import { cn } from "@/lib/utils"
import { Discount, RoomType } from "@prisma/client"
import { useReservation } from "../search-input/context/reservation"
import { PeopleIcon } from "../commons/icons/svg/PeopleIcon"
import { renderPluralNumber } from "../search-input/utils/renderPluralNumber"
// import { RoomType } from '@/shared/types/RoomType'
// import { Discount } from '@/shared/types/Discount'
// import { useReservation } from '@/modules/search-input/context/reservation'
// import { renderPluralNumber } from '@/modules/search-input/utils/renderPluralNumber'
// import { PeopleIcon } from '@/components/icons/svg/PeopleIcon'

interface ReservationSummaryProps {
  slide: number
  roomTypes: (RoomType & { discount: Discount | null })[]
}

const ReservationSummary: FC<ReservationSummaryProps> = ({ slide, roomTypes }) => {
  const reservation = useReservation()

  const renderPrice = (rtId?: string) => {
    if (!rtId) return "$ 0.00"
    const rt = roomTypes.find((rt) => rt.id === rtId)
    const price = rt?.price
    // return `$ ${price} ${rt?.discount ? `-> $ ${((100 - rt.discount.discountPercent) * rt.price) / 100}` : ""}`
    return `${price} VND ${rt?.discount ? `-> ${((100 - rt.discount.discountPercent) * rt.price) / 100} VND` : ""}`
  }

  const calcTotalMoney = () => {
    let total = 0
    reservation.rooms.forEach((r) => {
      roomTypes.forEach((rt) => {
        let price = rt.discount ? ((100 - rt.discount.discountPercent) * rt.price) / 100 : rt.price

        if (rt.id === r.roomTypeId) total += +price
      })
    })
    return total
  }

  return (
    <div className="border border-zinc-300 rounded-lg flex flex-col">
      {/* <h2 className="font-bold p-5 text-center">Reservation summary</h2> */}
      <h2 className="font-bold p-5 text-center">Thông tin đặt phòng</h2>
      <hr />
      {reservation.rooms.map((room, i) => (
        <div key={room.id}>
          <div
            className={cn(
              `flex justify-between ${i + 1 === slide ? "bg-teal-100" : i + 1 < slide ? "bg-zinc-100" : ""} p-4`
            )}
          >
            <div className="flex flex-col gap-2">
              {/* <h2 className="font-bold text-sm">Room {i + 1}</h2> */}
              <h2 className="font-bold text-sm">Phòng {i + 1}</h2>
              <div></div>
              <div className="flex gap-3 text-sm text-zinc-600">
                <PeopleIcon width="24" height="24" />
                <span>{room.adults} người lớn</span>
                <span>{room.kids} trẻ em</span>
                {/* <span>{renderPluralNumber(room.adults, "adult")}</span>
                <span>{renderPluralNumber(room.kids, "kid")}</span> */}
              </div>
            </div>

            <div className="font-semibold text-sm">{renderPrice(room.roomTypeId)}</div>
          </div>

          <hr />
        </div>
      ))}
      <div className="flex justify-between p-4">
        {/* <h2 className="font-bold text-sm">Total for stay:</h2>
        <h2 className="font-bold text-sm">$ {calcTotalMoney()}</h2> */}
        <h2 className="font-bold text-sm">Tổng tiền:</h2>
        <h2 className="font-bold text-sm">{calcTotalMoney()} VND</h2>
      </div>
    </div>
  )
}

export default ReservationSummary
