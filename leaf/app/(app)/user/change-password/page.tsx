import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import ChangePassword from "../../modules/change-password/components/ChangePassword"

const ChangePasswordPage = async () => {
  const user = await currentUser()

  if (!user) redirect("/login")

  return <ChangePassword userAuth={user} />
}

export default ChangePasswordPage
