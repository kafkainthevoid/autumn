"use client"

import { Post } from "@prisma/client"
import Image from "next/image"

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="relative border border-red-600 rounded-md overflow-hidden h-[350px] flex flex-col justify-between">
      <Image
        src={post.banner}
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-56 absolute -top-20"
      />
    </div>
  )
}

export default PostCard
