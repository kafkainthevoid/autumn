"use client"

import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

interface SocialProps {}

const Social = ({}: SocialProps) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" variant="outline" size="lg" onClick={() => onClick("google")}>
        <FcGoogle className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default Social
