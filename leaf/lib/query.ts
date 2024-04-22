import { v4 as uuid } from "uuid"
import queryString from "query-string"
import { DateRange } from "react-day-picker"

// import { RoomReservationInfo } from '@/modules/search-input/models/RoomReservation'
// import { Location } from '@/modules/search-input/context/location'
import { Location } from "@/store/app/location"

// this is so stupid

const roomReservationInfoToQueryStr = (roomsInfo: RoomReservationInfo[]): string => {
  let query = ""
  roomsInfo.forEach((r, i) => {
    if (r.adults > 0) query += `&room${i + 1}numAdults=${r.adults}`
    if (r.kids > 0) query += `&room${i + 1}numKids=${r.kids}`
  })
  return query
}

const queryStrToRoomReservationInfo = (query: string): RoomReservationInfo[] => {
  let roomCount: RoomReservationInfo[] = []

  const queryObj = queryString.parse(query.slice(query.search("room1")))

  const parsedRoom: number[] = []

  Object.keys(queryObj).forEach((key) => {
    const roomNum = +key.split("num")[0].slice(4)
    if (parsedRoom.find((i) => i === roomNum)) return
    else parsedRoom.push(roomNum)

    const adults = queryObj[`room${roomNum}numAdults`] ? Number(queryObj[`room${roomNum}numAdults`]) : 1
    const kids = queryObj[`room${roomNum}numKids`] ? Number(queryObj[`room${roomNum}numKids`]) : 0

    const roomGuestItem: RoomReservationInfo = {
      adults,
      kids,
      id: uuid(),
    }

    roomCount.push(roomGuestItem)
  })

  return roomCount
}

export const objToQuery = ({
  baseUrl,
  date,
  roomResInfo,
  location,
  hotel,
}: {
  baseUrl: string
  date: DateRange
  roomResInfo: RoomReservationInfo[]
  location?: Location
  // hotelId
  hotel?: string
}): string => {
  let query: any = {}

  query = {
    arrivalDate: date.from?.toLocaleDateString().split("/").join("-"),
    departureDate: date.to?.toLocaleDateString().split("/").join("-"),
    locationName: location?.name,
    locationCode: location?.code,
    hotel: hotel,
  }

  let url = queryString.stringifyUrl({ url: baseUrl, query })
  url += roomReservationInfoToQueryStr(roomResInfo)

  return url
}

export const queryToObj = (
  params: string
): {
  roomResInfos: RoomReservationInfo[]
  date: DateRange
  location?: Location
  hotel?: string
} => {
  let query: any = {}

  query = queryString.parse(params.toString())
  const arrivalDate: Date = query.arrivalDate ? new Date(query.arrivalDate) : new Date()
  const departureDate = query.departureDate ? new Date(query.departureDate) : new Date()
  const roomResInfos: RoomReservationInfo[] = queryStrToRoomReservationInfo(params.toString())

  const date: DateRange = {
    from: arrivalDate,
    to: departureDate,
  }

  const location: Location = {
    name: query.locationName,
    code: +query.locationCode,
  }

  const hotel = query.hotel

  return { roomResInfos, date, location, hotel }
}
