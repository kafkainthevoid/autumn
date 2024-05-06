import { format } from "date-fns"

import { Column, columns } from "./components/columns"
import { db } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"

const FeedbacksPage = async () => {
  const feedbacks = await db.feedback.findMany({
    orderBy: { createdAt: "asc" },
    include: { user: true },
  })

  const formattedData: Column[] = feedbacks.map((item) => {
    let username = item.user.name ?? ""
    if (item.user.firstName && item.user.lastName) {
      username = item.user.firstName + " " + item.user.lastName
    }

    return {
      id: item.id,
      content: item.content,
      username,
      createdAt: format(item.createdAt, "MMM do, yyyy"),
      isViewed: item.isViewed,
      feedback: item,
    }
  })

  return (
    <div className="p-10">
      <h1 className="tracking-tight text-3xl font-semibold">Feedbacks ({formattedData.length})</h1>
      <hr className="my-6" />
      <DataTable searchKey="username" columns={columns} data={formattedData} newButton={false} />
    </div>
  )
}

export default FeedbacksPage
