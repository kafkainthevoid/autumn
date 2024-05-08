import { db } from "@/lib/db"
import Image from "next/image"

const Post = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  })

  if (!post) return <div className="text-7xl font-bold mt-20">No post found</div>

  return (
    <div className="relative">
      <div className="relative">
        <Image
          src={post.banner}
          alt="banner"
          className="w-5/6 absolute left-1/2 top-2/3 -translate-x-1/2 bg-center -z-10 rounded-b-[32px]"
          width={1000}
          height={1000}
          // sizes="100vw"
        />
      </div>
      <div className="pt-60">
        <h1 className="text-4xl font-bold tracking-wider text-center">{post?.title}</h1>
      </div>
    </div>
  )
}

export default Post
