'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CellAction from './cell-action'
import ImageCarousel from '@/components/ui/image-carousel'

export type Column = {
  id: string
  name: string
  description: string
  images: string[]
  occupancy: number
  price: number
  maxBookingDay: number
  createdAt: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        {column.getIsSorted() === 'asc' ? (
          <ArrowDown className='ml-2 h-4 w-4' />
        ) : (
          <ArrowUp className='ml-2 h-4 w-4' />
        )}
      </Button>
    ),
    cell: ({ row }) => <div className='font-bold'>{row.original.name}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className='line-clamp-4 w-[300px]'>{row.original.description}</div>
    ),
  },
  {
    accessorKey: 'images',
    header: 'Images',
    cell: ({ row }) => (
      <div className='w-[150px]'>
        <ImageCarousel images={row.original.images} />
      </div>
    ),
  },
  {
    accessorKey: 'occupancy',
    header: 'Occupancy',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
        {column.getIsSorted() === 'asc' ? (
          <ArrowDown className='ml-2 h-4 w-4' />
        ) : (
          <ArrowUp className='ml-2 h-4 w-4' />
        )}
      </Button>
    ),
  },
  {
    accessorKey: 'maxBookingDay',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Max Booking Day
        {column.getIsSorted() === 'asc' ? (
          <ArrowDown className='ml-2 h-4 w-4' />
        ) : (
          <ArrowUp className='ml-2 h-4 w-4' />
        )}
      </Button>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Create date
        {column.getIsSorted() === 'asc' ? (
          <ArrowDown className='ml-2 h-4 w-4' />
        ) : (
          <ArrowUp className='ml-2 h-4 w-4' />
        )}
      </Button>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
]
