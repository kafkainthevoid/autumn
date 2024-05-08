import "@/app/styles/react-quill.css"

interface PostContentProps {
  content: string
}

const PostContent = ({ content }: PostContentProps) => {
  return <div className="qlSnow qlEditor" dangerouslySetInnerHTML={{ __html: content }} />
}

export default PostContent
