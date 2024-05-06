"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"
import { Feedback, User } from "@prisma/client"
import { cn } from "@/lib/utils"

export type Column = {
  id: string
  username: string
  content: string
  createdAt: string
  isViewed: boolean
  feedback: Feedback & { user: User }
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Username
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) => <div className="font-bold">{row.original.username}</div>,
  },
  {
    accessorKey: "content",
    header: "Content",
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
    accessorKey: "isViewed",
    cell: ({ row }) => (
      <p className={row.original.isViewed ? "text-teal-600" : "text-rose-600"}>
        {row.original.isViewed ? "Viewed" : "Not viewed"}{" "}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} feedback={row.original.feedback} />,
  },
]
