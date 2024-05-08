import { Poppins } from "next/font/google"
import SearchBar from "./modules/search-input/components/searchBar/SearchBar"
import { db } from "@/lib/db"
import PostCard from "./modules/posts/components/post-card"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export default async function Home() {
  const posts = await db.post.findMany({})

  return (
    <div className="mt-14">
      <SearchBar variant="MAIN" />

      <div className="text-center mt-10 mb-6 font-semibold text-3xl text-zinc-800">News</div>
      <div className="grid grid-cols-3 gap-6 container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <PostCard key={posts[0].id} post={posts[0]} />
        <PostCard key={posts[0].id} post={posts[0]} />
        <PostCard key={posts[0].id} post={posts[0]} />
        <PostCard key={posts[0].id} post={posts[0]} />
        <PostCard key={posts[0].id} post={posts[0]} />
      </div>
    </div>
  )
}
