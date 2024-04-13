"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import CellAction from "./cell-action"

export type Column = {
  id: string
  name: string
  description: string
  discountPercent: number
  startDate: string
  endDate: string
  roomTypes: string[]
  createdAt: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="font-bold">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "discountPercent",
    header: "Discount percent",
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Start date
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        End date
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Create date
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
]
