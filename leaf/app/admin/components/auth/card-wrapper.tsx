"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Header from "@/app/admin/components/auth/header"
import BackButton from "@/app/admin/components/auth/back-button"
import Social from "@/components/auth/social"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel?: string
  backButtonHref?: string
  showSocial?: boolean
}

const CardWrapper = ({ children, backButtonHref, backButtonLabel, headerLabel, showSocial }: CardWrapperProps) => {
  return (
    <Card className="w-[500px] mx-auto border-none">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonHref && backButtonLabel && (
        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
      )}
    </Card>
  )
}

export default CardWrapper
