import { db } from "@/lib/db"
import EditForm from "../components/edit-form"

const HotelPage = async ({ params }: { params: { hotelId: string } }) => {
  const hotel = await db.hotel.findUnique({
    where: { id: params.hotelId },
    include: { amenity_Hotels: { include: { amenity: true } }, address: true },
  })

  const amenities = await db.amenity.findMany()

  console.log("\n\n[HotelPage]", hotel)

  return (
    <div className="p-10">
      <EditForm initialData={hotel} amenities={amenities} />
    </div>
  )
}

export default HotelPage
