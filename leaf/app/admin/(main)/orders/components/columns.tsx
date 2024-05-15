"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Order } from "@prisma/client"

export type Column = {
  id: string
  orderInfo: string
  createdAt: string
  totalMoney: string
  isViewed: boolean
  order: Order
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "orderInfo",
    // header: "Order Info",
    header: "Thông tin đơn",
    cell: ({ row }) => <div className="font-bold">{row.original.orderInfo}</div>,
  },
  {
    accessorKey: "totalMoney",
    // header: "Total Money",
    header: "Tổng tiền",
  },
  {
    accessorKey: "isViewed",
    // header: "Is Viewed",
    header: "Trạng thái",
    cell: ({ row }) => (
      <p className={row.original.isViewed ? "text-teal-600" : "text-rose-600"}>
        {/* {row.original.isViewed ? "Viewed" : "Not viewed"}{" "} */}
        {row.original.isViewed ? "Đã xem" : "Chưa xem"}{" "}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    // header: "Created At",
    header: "Thời gian tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} order={row.original.order} />,
  },
]
