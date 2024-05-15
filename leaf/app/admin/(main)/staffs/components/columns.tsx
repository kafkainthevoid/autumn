"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserRole } from "@prisma/client"

import CellAction from "./cell-action"

export type Column = {
  id: string
  name: string
  email: string
  sex: string
  birthday: string
  phoneNo: string
  address: string
  createdAt: string
  role: UserRole
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "name",
    // header: "Username",
    header: "Tên",
    cell: ({ row }) => <div className="font-bold">{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "sex",
    // header: "Gender",
    header: "Giới tính",
  },
  {
    accessorKey: "phoneNo",
    // header: "Phone Number",
    header: "Số điện thoại",
  },
  {
    accessorKey: "address",
    // header: "Address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "role",
    // header: "Role",
    header: "Quyền",
  },
  {
    accessorKey: "createdAt",
    // header: "Created At",
    header: "Ngày tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} role={row.original.role} />,
  },
]
