import { format } from 'date-fns'

import { db } from '@/lib/db'
import { Column, columns } from './components/columns'
import { DataTable } from '@/components/ui/data-table'

const DiscountsPage = async ({ params }: { params: { hotelId: string } }) => {
  const discounts = await db.discount.findMany({
    where: { roomTypes: { some: { hotelId: params.hotelId } } },
    orderBy: { createdAt: 'desc' },
    include: { roomTypes: true },
  })

  const formattedData: Column[] = discounts.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    discountPercent: item.discountPercent,
    startDate: format(item.startDate, 'MMM do, yyyy'),
    endDate: format(item.endDate, 'MMM do, yyyy'),
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
    roomTypes: item.roomTypes.map((rt) => rt.name),
  }))

  return (
    <div className='p-10'>
      <h1 className='tracking-tight text-3xl font-semibold'>
        Discount ({formattedData.length})
      </h1>
      <p>Manage Discount</p>

      <hr className='my-6' />

      <DataTable data={formattedData} columns={columns} searchKey='name' />
    </div>
  )
}

export default DiscountsPage
