"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Column = {
  id: string
  startDate: string
  endDate: string
  roomName: string
  roomCharge: number
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "roomName",
    // header: 'Room Name',
    header: "Tên phòng",
    cell: ({ row }) => <div className="font-bold">{row.original.roomName}</div>,
  },
  {
    accessorKey: "startDate",
    // header: 'Start Date',
    header: "Ngày bắt đầu",
  },
  {
    accessorKey: "endDate",
    // header: 'End Date',
    header: "Ngày kết thúc",
  },
  {
    accessorKey: "roomCharge",
    // header: 'Room Charge',
    header: "Tổng tiền",
    cell: ({ row }) => <div className="text-bold">${row.original.roomCharge}</div>,
  },
]
