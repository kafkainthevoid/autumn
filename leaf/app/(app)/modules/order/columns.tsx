"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Column = {
  id: string
  orderInfo: string
  createdAt: string
  totalMoney: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "orderInfo",
    // header: "Order Info",
    header: "Thông tin đơn hàng",
    cell: ({ row }) => <div className="font-bold">{row.original.orderInfo}</div>,
  },
  {
    accessorKey: "createdAt",
    // header: "Created At",
    header: "Ngày tạo",
  },
  {
    accessorKey: "totalMoney",
    // header: "Total Money",
    header: "Tổng tiền",
  },
]
