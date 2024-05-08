import { db } from "@/lib/db"

const Post = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  })

  if (!post) return <div className="text-7xl font-bold mt-20">No post found</div>

  return (
    <div>
      <h1 className="text-7xl mt-20 font-bold tracking-wider">{post?.title}</h1>
    </div>
  )
}

export default Post
