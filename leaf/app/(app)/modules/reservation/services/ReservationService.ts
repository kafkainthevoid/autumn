import { Amenity, Amenity_RoomType, Discount, Hotel, Room, RoomType } from "@prisma/client"

export type RoomTypeVm = RoomType & {
  rooms: Room[]
  hotel: Hotel
  discount: Discount
  amenity_RoomTypes: (Amenity_RoomType & { amenity: Amenity })[]
}

export async function getRoomTypes(hotelId: string): Promise<RoomTypeVm[]> {
  const res = await fetch("/api/roomtypes?hotelId=" + hotelId)

  if (!res.ok) return []
  const data = await res.json()

  return data
}
