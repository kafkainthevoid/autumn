import { currentUser } from "@/lib/auth"
import Profile from "../change-password/components/profile"
import { db } from "@/lib/db"

const ProfilePage = async () => {
  const userAuth = await currentUser()

  const user = await db.user.findUnique({
    where: { id: userAuth?.id },
    include: { address: true },
  })

  return (
    <div className="p-10">
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
