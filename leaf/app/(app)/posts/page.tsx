import { useParams } from "next/navigation"

const Post = () => {
  const { postId } = useParams()
  console.log("\n\n\n\n\n postId", { postId })

  return <div>shit</div>
}

export default Post
