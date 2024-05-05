import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import Profile from "../../modules/profile/Profile"
import { db } from "@/lib/db"

const ProfilePage = async () => {
  const userAuth = await currentUser()

  if (!userAuth) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: userAuth.id },
    include: { address: true },
  })

  if (!user) return

  return <Profile userAuth={userAuth} user={user} />
}

export default ProfilePage
