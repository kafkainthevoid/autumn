import { db } from '@/lib/db'
import Client from './components/client'

const RoomsPage = async ({ params }: { params: { hotelId: string } }) => {
  const rooms = await db.room.findMany({
    where: { roomType: { hotel: { id: params.hotelId } } },
    include: { roomType: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className='p-10'>
      <Client data={rooms} />
    </div>
  )
}

export default RoomsPage
