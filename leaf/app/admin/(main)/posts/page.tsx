import { format } from "date-fns"

import { Column, columns } from "./components/columns"
import { db } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"

const PostsPage = async () => {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "asc" },
  })

  const formattedData: Column[] = posts.map((item) => ({
    id: item.id,
    title: item.title,
    author: item.author,
    // createdAt: format(item.createdAt, "MMM do, yyyy"),
    createdAt: format(item.createdAt, "MM-dd-yyyy"),
  }))

  return (
    <div className="p-10">
      <h1 className="tracking-tight text-3xl font-semibold">Post ({formattedData.length})</h1>
      <p>Manage Post</p>
      <hr className="my-6" />
      <DataTable searchKey="title" columns={columns} data={formattedData} />
    </div>
  )
}

export default PostsPage
