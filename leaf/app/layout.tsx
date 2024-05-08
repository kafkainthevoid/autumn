import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"

import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/app/admin/components/providers/ThemeProvider"
import { ChatboxProvider } from "./admin/components/providers/ChatboxProvider"

import "react-quill/dist/quill.snow.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Autumn",
  description: "Autumn",
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ChatboxProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </ChatboxProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
