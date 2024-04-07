import { db } from '@/lib/db'
import EditForm from '../components/edit-form'

const RoomTypePage = async ({ params }: { params: { roomTypeId: string } }) => {
  const roomType = await db.roomType.findUnique({
    where: { id: params.roomTypeId },
    include: { amenity_RoomTypes: { include: { amenity: true } } },
  })

  const amenities = await db.amenity.findMany()

  return (
    <div className='p-10'>
      <EditForm initialData={roomType} amenities={amenities} />
    </div>
  )
}

export default RoomTypePage
