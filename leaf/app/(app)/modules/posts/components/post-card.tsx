"use client"

import { Post } from "@prisma/client"
import { formatInTimeZone } from "date-fns-tz"
import { CircleChevronRightIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter()

  return (
    <div className="relative border border-zinc-300 rounded-sm overflow-hidden h-[450px] shadow-md">
      <Image src={post.banner} alt="banner" width={0} height={0} sizes="100vw" className="w-full h-56 absolute -z-10" />
      <div className="absolute top-40 ml-3 text-white text-2xl z-10 font-bold tracking-wide">{post.title}</div>
      <div className="mt-56 p-3">
        <div className="flex justify-between items-center">
          <div className="text-xs font-semibold">
            {/* {formatInTimeZone(new Date(post.createdAt), "Asia/Ho_Chi_Minh", "PPP")} */}
            {formatInTimeZone(new Date(post.createdAt), "Asia/Ho_Chi_Minh", "dd-MM-yyyy")}
          </div>
          <div className=" text-teal-600 rounded-sm border text-xs border-teal-500 px-2 py-1">NEWS</div>
        </div>
        <div className="text-sm mt-6">{post.description}</div>
      </div>
      <div
        className="flex w-full items-center justify-end gap-3 absolute bottom-3 right-3 cursor-pointer"
        onClick={() => router.push(`/posts/${post.id}`)}
      >
        {/* <p className="font-semibold text-zinc-700 text-sm hover:underline underline-offset-4">Read more</p> */}
        <p className="font-semibold text-zinc-700 text-sm hover:underline underline-offset-4">Đọc thêm</p>
        <CircleChevronRightIcon className="w-7 h-7 text-teal-600" />
      </div>
    </div>
  )
}

export default PostCard
