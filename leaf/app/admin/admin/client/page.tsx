"use client"

import UserInfo from "@/components/user-info"
import { useCurrentUser } from "@/hooks/use-current-user"

interface ClientPageProps {}

const ClientPage = ({}: ClientPageProps) => {
  const user = useCurrentUser()
  return <UserInfo label="Client compoonent" user={user} />
}

export default ClientPage
