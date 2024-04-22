import { Inter } from "next/font/google"
import type { Metadata } from "next"

// import PaypalProvider from '@/components/providers/PaypalProvider'
import Navbar from "@/components/app/commons/Navbar"
import Footer from "@/components/app/commons/Footer"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Winterfall Hotel",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-full w-full", inter.className)}>
      {/* <PaypalProvider> */}
      <Navbar />
      {/* {children} */}
      <Footer />
      {/* </PaypalProvider> */}
      <Toaster />
    </div>
  )
}
