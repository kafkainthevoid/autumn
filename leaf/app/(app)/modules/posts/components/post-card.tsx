"use client"

import { Post } from "@prisma/client"
import { LeafIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter()

  return (
    <div
      className="relative border border-zinc-300 cursor-pointer rounded-md overflow-hidden h-[350px]"
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <Image src={post.banner} alt="banner" width={0} height={0} sizes="100vw" className="w-full h-56 absolute -z-10" />
      <LeafIcon className="z-10 text-white w-10 h-10 mt-28 ml-4" />
      <div className="mt-2 ml-8 text-white text-3xl z-10 font-extrabold tracking-widest">{post.title}</div>
      <div className="mt-8 p-3">
        <div className="font-semibold">{post.description}</div>
      </div>
    </div>
  )
}

export default PostCard
