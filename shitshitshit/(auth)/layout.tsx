import { redirect } from 'next/navigation'

import { getAuthSession } from '@/lib/auth'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession()

  if (session) redirect('/')

  return <>{children}</>
}

export default AuthLayout
