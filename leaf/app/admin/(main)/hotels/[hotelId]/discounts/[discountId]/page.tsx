import { db } from '@/lib/db'
import EditForm from '../components/edit-form'

const DiscountPage = async ({ params }: { params: { discountId: string } }) => {
  const discount = await db.discount.findUnique({
    where: { id: params.discountId },
    include: { roomTypes: true },
  })

  const roomTypes = await db.roomType.findMany()

  return (
    <div className='p-10'>
      <EditForm initialData={discount} roomTypes={roomTypes} />
    </div>
  )
}

export default DiscountPage
