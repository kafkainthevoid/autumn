'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider
      basePath={`${process.env.NEXT_PUBLIC_PORTAL_BASE_PATH}/api/auth`}
    >
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
