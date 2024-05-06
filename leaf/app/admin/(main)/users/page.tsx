import { format } from "date-fns"

import { db } from "@/lib/db"
import { Column, columns } from "./components/columns"
import { DataTable } from "@/components/ui/data-table"
import { UserRole } from "@prisma/client"

const UsersPage = async () => {
  const users = await db.user.findMany({
    include: { address: true },
    where: { role: UserRole.USER, isArchived: false },
    orderBy: { createdAt: "desc" },
  })

  const formattedData: Column[] = users.map((item) => {
    let name = item.name ?? ""
    if (item.firstName && item.lastName) {
      name = item.firstName + " " + item.lastName
    }

    return {
      id: item.id,
      name,
      email: item.email ?? "",
      sex: item.sex.toLowerCase(),
      birthday: item.birthday ? format(new Date(item.birthday), "MMMM do, yyyy") : "",
      phoneNo: item.address?.phone ?? "",
      address: item.address?.addressLine ?? "",
      role: item.role,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }
  })

  return (
    <div className="p-10">
      <h1 className="tracking-tight text-3xl font-semibold">Users ({formattedData.length})</h1>
      <p>Manage User</p>

      <hr className="my-6" />

      <DataTable data={formattedData} columns={columns} searchKey="name" newButton={false} />
    </div>
  )
}

export default UsersPage
