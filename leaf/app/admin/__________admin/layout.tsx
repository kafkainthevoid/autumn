"use client"

// import { Navbar } from "@/app/(admin)/admin/_components/navbar"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full">{children}</div>
    // <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-teal-800">
    //   <Navbar />
    //   {children}
    // </div>
  )
}

export default AdminLayout
