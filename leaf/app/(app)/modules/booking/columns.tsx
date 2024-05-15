"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { BookingCol } from "./Booking"

export type Column = {
  id: string
  startDate: string
  endDate: string
  roomName: string
  roomCharge: number
  booking: BookingCol
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "roomName",
    // header: "Room Name",
    header: "Tên phòng",
    cell: ({ row }) => <div className="font-bold">{row.original.roomName}</div>,
  },
  {
    accessorKey: "startDate",
    // header: "Start Date",
    header: "Ngày bắt đầu",
  },
  {
    accessorKey: "endDate",
    // header: "End Date",
    header: "Ngày kết thúc",
  },
  {
    accessorKey: "roomCharge",
    // header: "Room Charge",
    header: "Tiền phòng",
    // cell: ({ row }) => <div className="text-bold">$ {row.original.roomCharge}</div>,
    cell: ({ row }) => <div className="text-bold">{row.original.roomCharge} VND</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} booking={row.original.booking} />,
  },
]
