import { getAuthSession } from '@/lib/auth'
import Sidebar from '@/modules/user/components/Sidebar'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()

  if (!session) return

  return (
    <div className='container max-w-6xl flex mt-20 gap-16 h-[75vh]'>
      <Sidebar userAuth={session.user} />
      <div className='w-full'>{children}</div>
    </div>
  )
}
