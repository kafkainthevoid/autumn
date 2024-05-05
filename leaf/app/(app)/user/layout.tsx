import { currentUser } from "@/lib/auth"
import Sidebar from "../modules/user/Sidebar"

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()

  if (!user) return

  return (
    <div className="container max-w-6xl flex mt-20 gap-16 h-[75vh]">
      <Sidebar user={user} />
      <div className="w-full">{children}</div>
    </div>
  )
}
