import axios from "@/lib/axios"
import { Address, Amenity, Amenity_Hotel, Hotel, RoomType } from "@prisma/client"

export type HotelVm = Hotel & {
  address: Address
  roomTypes: RoomType[]
  amenity_Hotels: (Amenity_Hotel & { amenity: Amenity })[]
}

export const getHotels = async (provinceCode: number): Promise<HotelVm[]> => {
  const res = await fetch("/api/hotels?&p=" + provinceCode)

  if (!res.ok) return []

  const data = await res.json()

  return data
}

export const getHotel = async (hotelId: string): Promise<HotelVm | undefined> => {
  const res = await fetch("/api/hotels/" + hotelId)

  if (!res.ok) return undefined

  const data = await res.json()

  return data
}
