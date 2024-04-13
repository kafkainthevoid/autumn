'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import CellAction from './cell-action'
import ImageCarousel from '@/components/ui/image-carousel'

export type Column = {
  id: string
  name: string
  description: string
  address: string
  images: string[]
  createdAt: Date
  deletable: boolean
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
    accessorKey: 'address',
    header: 'Address',
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
    cell: ({ row }) => format(row.original.createdAt, 'MMM do, yyyy'),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction id={row.original.id} deletable={row.original.deletable} />
    ),
  },
]
