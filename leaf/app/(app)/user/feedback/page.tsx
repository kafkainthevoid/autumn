import { currentUser } from "@/lib/auth"
import Feedback from "../../modules/feedback/Feedback"
import { db } from "@/lib/db"

const FeedbackPage = async () => {
  const user = await currentUser()

  if (!user?.id) return <div>Please login to access this site</div>

  const feedbacks = await db.feedback.findMany({
    where: { userId: user.id },
  })

  return <Feedback userId={user.id} feedbacks={feedbacks} />
}

export default FeedbackPage
