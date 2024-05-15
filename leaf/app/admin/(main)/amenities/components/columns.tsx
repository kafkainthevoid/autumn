"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"
import { AmenityType } from "@prisma/client"

export type Column = {
  id: string
  name: string
  description: string
  price: number
  type: string
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
  },
  {
    accessorKey: "type",
    // header: "Type",
    header: "Loại",
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => <div>{row.original.type === AmenityType.PURCHASABLE && row.original.price}</div>,
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
