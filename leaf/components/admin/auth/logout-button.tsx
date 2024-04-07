"use client"

import { logout } from "@/data/logout"

interface LogoutButtonProps {
  children?: React.ReactNode
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}

export default LogoutButton
