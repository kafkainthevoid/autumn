import { redirect } from 'next/navigation'

import { getAuthSession } from '@/lib/auth'
import Profile from '@/modules/profile/components/Profile'

const ProfilePage = async () => {
  const session = await getAuthSession()

  if (!session) redirect('/sign-in')

  if (!session.user) return <div></div>

  return <Profile userAuth={session.user} />
}

export default ProfilePage
