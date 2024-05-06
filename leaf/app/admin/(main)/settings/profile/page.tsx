import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import Profile from "@/app/admin/(main)/settings/components/profile"

const ProfilePage = async () => {
  const userAuth = await currentUser()

  const user = await db.user.findUnique({
    where: { id: userAuth?.id },
    include: { address: true },
  })

  if (!user) return

  return (
    <div className="p-10">
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
