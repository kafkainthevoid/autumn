import { db } from "@/lib/db"
import Image from "next/image"
import PostContent from "../../modules/posts/components/post-content"
import { formatInTimeZone } from "date-fns-tz"

const Post = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  })

  if (!post) return <div className="text-7xl font-bold mt-20">No post found</div>

  console.log(post.content.slice(0, 1000))

  return (
    <div className="relative">
      <div className="relative">
        <Image
          src={post.banner}
          alt="banner"
          className="w-5/6 h-[600px] absolute left-1/2 top-2/3 -translate-x-1/2 bg-center object-cover -z-10 rounded-b-[32px]"
          width={1000}
          height={1000}
          // sizes="100vw"
        />
      </div>
      <div className="pt-[450px]">
        <h1 className="lg:ml-48 md:ml-40 ml-32 text-5xl text-white font-bold tracking-wider">{post?.title}</h1>
      </div>

      <div className="container mt-36 px-80">
        <div className="text-sm font-semibold mb-8">
          {/* <div>Author: {post.author}</div> */}
          <div>Tác giả: {post.author}</div>
          {/* <div className="mt-3">{formatInTimeZone(post.createdAt, "Asia/Ho_Chi_Minh", "PPP")}</div> */}
          <div className="mt-3">{formatInTimeZone(post.createdAt, "Asia/Ho_Chi_Minh", "dd-MM-yyyy")}</div>
        </div>
        <PostContent content={post.content} />
      </div>
    </div>
  )
}

export default Post
