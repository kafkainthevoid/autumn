import { db } from "@/lib/db"
import { Column, columns } from "./components/columns"
import { DataTable } from "@/components/ui/data-table"

const HotelPage = async () => {
  const hotels = await db.hotel.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      address: true,
      roomTypes: {
        select: {
          rooms: {
            select: {
              _count: true,
            },
          },
        },
      },
    },
  })

  // hotels[0].roomTypes[0].rooms[0]._count.booking_rooms
  const formattedData: Column[] = hotels.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    address: item.address.addressLine,
    images: item.images,
    createdAt: item.createdAt,
    deletable: !(
      item.roomTypes.filter((rt) => rt.rooms.filter((r) => r._count.booking_rooms > 0).length > 0).length > 0
    ),
  }))

  return (
    <div className="p-10">
      <h1 className="tracking-tight text-3xl font-semibold">
        {/* Hotels ({formattedData.length}) */}
        Khách sạn ({formattedData.length})
      </h1>
      {/* <p>Manage Hotel</p> */}
      <p>Quản lý khách sạn</p>

      <hr className="my-6" />

      <DataTable data={formattedData} columns={columns} searchKey="name" />
    </div>
  )
}

export default HotelPage
