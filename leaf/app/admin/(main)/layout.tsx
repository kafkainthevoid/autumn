import { redirect } from "next/navigation"
import { UserRole } from "@prisma/client"

import { currentUser } from "@/lib/auth"
import Sidebar from "@/app/admin/components/sidebar"
import TopBar from "@/app/admin/components/top-bar"
import PermissionError from "@/app/admin/components/permission-error"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()

  if (!user) redirect("/admin/login")

  if (user.role === UserRole.USER) return <PermissionError />

  return (
    <div className="h-full flex">
      <Sidebar />
      <main className="flex-1">
        <TopBar user={user} />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
