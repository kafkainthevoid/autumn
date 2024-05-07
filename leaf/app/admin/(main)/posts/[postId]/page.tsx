import { db } from "@/lib/db"

import EditPost from "../components/edit-post"

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  })

  return (
    <div className="p-10">
      <EditPost post={post} />
    </div>
  )
}

export default PostPage
