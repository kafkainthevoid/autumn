import { getAuthSession } from '@/lib/auth'
import Feedback from '@/modules/feedback/components/Feedback'

const FeedbackPage = async () => {
  const session = await getAuthSession()

  if (!session || !session.user)
    return <div>Please login to access this site</div>

  return <Feedback userId={session.user.id} />
}

export default FeedbackPage
