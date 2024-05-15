"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import CellAction from "./cell-action"
import ImageCarousel from "@/components/ui/image-carousel"

export type Column = {
  id: string
  name: string
  description: string
  images: string[]
  occupancy: number
  price: number
  createdAt: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {/* Name */}
        Tên
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="font-bold">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    // header: "Description",
    header: "Mô tả",
    cell: ({ row }) => <div className="line-clamp-4 w-[300px]">{row.original.description}</div>,
  },
  {
    accessorKey: "images",
    // header: "Images",
    header: "Hình ảnh",
    cell: ({ row }) => (
      <div className="w-[150px]">
        <ImageCarousel images={row.original.images} />
      </div>
    ),
  },
  // {
  //   accessorKey: "occupancy",
  //   header: "Số người tối đa",
  // },
  {
    accessorKey: "numBeg",
    header: "Số giường",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {/* Price */}
        Giá
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {/* Create date */}
        Ngày tạo
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
]
