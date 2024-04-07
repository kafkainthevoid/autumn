import { db } from '@/lib/db'
import FormComponent from './components/edit-form'

const RoomTypePage = async ({
  params,
}: {
  params: { hotelId: string; roomId: string }
}) => {
  const room = await db.room.findUnique({
    where: { id: params.roomId },
  })

  const roomTypes = await db.roomType.findMany({
    where: { hotelId: params.hotelId },
  })

  return (
    <div className='p-10'>
      <FormComponent roomTypes={roomTypes} initialData={room} />
    </div>
  )
}

export default RoomTypePage
