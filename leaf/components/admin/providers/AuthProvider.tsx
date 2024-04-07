'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider basePath={`/api/auth`}>{children}</SessionProvider>
}

export default AuthProvider
