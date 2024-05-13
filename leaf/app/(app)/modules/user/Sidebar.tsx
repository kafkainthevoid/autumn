"use client"

import { FC } from "react"
import { User as UserAuth } from "next-auth"
import {
  CalendarRangeIcon,
  ConciergeBellIcon,
  HandPlatterIcon,
  KeyRoundIcon,
  LucideIcon,
  MailPlusIcon,
  UserIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import UserAvatar from "./UserAvatar"
import { cn } from "@/lib/utils"

interface SidebarProps {
  user: UserAuth
}

type IRoute = {
  href: string
  label: string
  Icon: LucideIcon
  active: Object | boolean | null
  subRoute?: IRoute[]
}

const Sidebar: FC<SidebarProps> = ({ user }) => {
  const pathname = usePathname()

  const routers: IRoute[] = [
    {
      href: "/user/profile",
      label: "Profile Info",
      active: pathname === "/user/profile",
      Icon: UserIcon,
    },
    {
      href: "/user/change-password",
      label: "Change Password",
      active: pathname === "/user/change-password",
      Icon: KeyRoundIcon,
    },
    {
      href: "/user/booking",
      label: "Booking Room",
      active: pathname === "/user/booking",
      Icon: CalendarRangeIcon,
    },
    {
      href: "/user/amenities",
      label: "Amenities",
      active: pathname.includes("/user/amenities"),
      Icon: HandPlatterIcon,
    },
    {
      href: "/user/orders",
      label: "Orders",
      active: pathname.includes("/user/orders"),
      Icon: ConciergeBellIcon,
    },
    {
      href: "/user/feedback",
      label: "Feedback",
      active: pathname === "/user/feedback",
      Icon: MailPlusIcon,
    },
  ]

  return (
    <div className="w-72 m">
      <div className="flex gap-3 items-center border-zinc-200 border-[1px] px-4 py-2 rounded-2xl">
        <UserAvatar className="w-10 h-10" user={user} />
        <div>
          <div className="text-zinc-700 text-sm">Profile of</div>
          <div className="font-bold text-xl">{user?.name}</div>
          <div className="text-sm text-zinc-500">{user?.email}</div>
        </div>
      </div>

      <div>
        {routers.map((route) => (
          <div key={route.href} className="w-full">
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "border-[1px] flex items-center text-sm font-medium hover:bg-teal-600 hover:text-white w-full rounded-sm transition duration-200 my-2 active:scale-95",
                route.active ? "bg-teal-600 text-white hover:bg-teal-600/80" : "text-zinc-600"
              )}
            >
              <div className="flex items-center justify-center w-12 h-12">
                <route.Icon className={cn("w-4 h-4", route.active && "text-white")} />
              </div>
              <div className="block ml-2 mr-2">{route.label}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
