import { db } from "@/lib/db"
import SearchBar from "./modules/search-input/components/searchBar/SearchBar"
import PostCard from "./modules/posts/components/post-card"

export default async function Home() {
  const posts = await db.post.findMany({})

  return (
    <div className="mt-14">
      <SearchBar variant="MAIN" />

      <div className="text-center mt-10 mb-6 font-semibold text-3xl text-zinc-800">Tin tức</div>
      <div className="grid grid-cols-3 gap-20 container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
