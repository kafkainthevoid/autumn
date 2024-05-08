"use client"

import { Hotel, UserRole } from "@prisma/client"
import {
  AlbumIcon,
  ArrowRightIcon,
  DoorClosedIcon,
  DoorOpenIcon,
  HomeIcon,
  HotelIcon,
  KeyIcon,
  LucideIcon,
  MessageSquareDotIcon,
  MonitorIcon,
  PercentIcon,
  ReceiptIcon,
  SettingsIcon,
  StickyNoteIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react"
import { FaUsersGear } from "react-icons/fa6"
import type { IconType } from "react-icons"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect } from "react"

import { cn } from "@/lib/utils"
import { useHotel } from "@/store/useHotel"
import { useSideBar } from "@/store/useSideBar"
import { useCurrentUser } from "@/hooks/use-current-user"

interface IRoute {
  href: string
  label: string
  Icon: LucideIcon | IconType
  active: Object | boolean | null
  subRoutes?: IRoute[]
}

const Sidebar = () => {
  const { open, setOpen } = useSideBar()
  const { hotel, setHotel } = useHotel()

  const params = useParams()
  const pathname = usePathname()

  const userAuth = useCurrentUser()

  useEffect(() => {
    const getHotel = async (): Promise<Hotel | null> => {
      const hotelId = params.hotelId
      if (!hotelId || hotelId === "new") return null

      const data = await fetch(`/api/hotels/${hotelId}`)

      return await data.json()
    }

    getHotel()
      .then((data) => setHotel(data))
      .catch((err) => {})
  }, [params.hotelId, setHotel])

  const routers: IRoute[] = [
    {
      href: "/admin",
      label: "Home",
      active: pathname === "/admin",
      Icon: HomeIcon,
    },
    {
      href: "/admin/users",
      label: "User",
      active: pathname === "/admin/users",
      Icon: Users2Icon,
    },
    {
      href: "/admin/hotels",
      label: "Hotel",
      active: pathname.match("/admin/hotels"),
      Icon: HotelIcon,
    },
    {
      href: "/admin/amenities",
      label: "Amenities",
      active: pathname.match("/admin/amenities*"),
      Icon: MonitorIcon,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      active: pathname.match("/admin/orders*"),
      Icon: ReceiptIcon,
    },
    {
      href: "/admin/posts",
      label: "Posts",
      active: pathname.match("/admin/posts*"),
      Icon: StickyNoteIcon,
    },
    {
      href: "/admin/feedbacks",
      label: "Feedbacks",
      active: pathname.match("/admin/feedbacks*"),
      Icon: MessageSquareDotIcon,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      active: pathname.match("/admin/settings"),
      Icon: SettingsIcon,
    },
  ]

  if (userAuth?.role === UserRole.ADMIN) {
    routers.splice(2, 0, {
      href: "/admin/staffs",
      label: "Staff",
      active: pathname === "/admin/staffs",
      Icon: FaUsersGear,
    })
  }

  if (hotel) {
    routers.find((route) => route.label === "Hotel")!.subRoutes = [
      {
        href: "/bookings",
        label: "Booking",
        active: /^\/admin\/hotels\/[^/]+\/bookings(?:\/.*)?$/.test(pathname),
        Icon: AlbumIcon,
      },
      {
        href: "/rooms",
        label: "Room",
        active: /^\/admin\/hotels\/[^/]+\/rooms(?:\/.*)?$/.test(pathname),
        Icon: DoorOpenIcon,
      },
      {
        href: "/roomTypes",
        label: "Room Type",
        active: /^\/admin\/hotels\/[^/]+\/roomTypes(?:\/.*)?$/.test(pathname),
        Icon: DoorClosedIcon,
      },
      {
        href: "/discounts",
        label: "Discounts",
        active: /^\/admin\/hotels\/[^/]+\/discounts(?:\/.*)?$/.test(pathname),
        Icon: PercentIcon,
      },
    ]
  }

  if (pathname.startsWith("/admin/settings"))
    routers.find((route) => route.label === "Settings")!.subRoutes = [
      {
        href: "/profile",
        label: "Profile",
        active: /^\/admin\/settings\/profile(?:\/.*)?$/.test(pathname),
        Icon: UserIcon,
      },
      {
        href: "/change-password",
        label: "Change Password",
        active: /^\/admin\/settings\/change-password(?:\/.*)?$/.test(pathname),
        Icon: KeyIcon,
      },
    ]

  return (
    <>
      <div className={cn("border-r h-full fixed flex flex-col items-center", open ? "w-60" : "w-16")}>
        <nav className={cn("flex flex-col items-center w-full h-full py-4", open ? "px-4" : "px-2")}>
          <div className="flex items-center justify-center h-10 w-10 mb-5">
            <HotelIcon className="w-6 h-6 dark:text-zinc-400 transition-transform" />
          </div>
          {routers.map((route) => (
            <div key={route.href} className="w-full">
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-zinc-600 dark:text-zinc-300 text-sm font-medium w-full rounded-sm transition duration-200 my-2 active:scale-95",
                  route.active ? "bg-sky-200 dark:bg-blue-600/50" : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
                )}
              >
                <div className="flex items-center justify-center w-12 h-12">
                  <route.Icon className={cn("w-4 h-4", route.active && "text-blue-600")} />
                </div>
                {open && (
                  <div className="block ml-2 mr-2">
                    {route.label === "Hotel" && hotel ? (
                      <div className="text-lg font-semibold">{hotel.name}</div>
                    ) : (
                      route.label
                    )}
                  </div>
                )}
              </Link>
              {route.subRoutes &&
                route.subRoutes.map((subRoute) => (
                  <Link
                    key={subRoute.href}
                    href={`${route.href}/${hotel?.id ?? ""}${subRoute.href}`}
                    className={cn(
                      "flex items-center text-sm text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-200 w-full rounded-sm transition duration-200 my-2 ml-2 active:scale-95",
                      subRoute.active ? "bg-sky-100 dark:bg-blue-600/30" : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    )}
                  >
                    <div className="flex items-center justify-center w-12 h-12">
                      <subRoute.Icon className={cn("w-4 h-4", subRoute.active && "text-blue-600")} />
                    </div>
                    {open && <div className="block ml-2 mr-2">{subRoute.label}</div>}
                  </Link>
                ))}
            </div>
          ))}
          <div
            className="mt-auto my-2 flex items-center justify-center h-12 w-12 rounded-sm cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300"
            onClick={setOpen}
          >
            <ArrowRightIcon className={cn("w-4 h-4 dark:text-zinc-400 transition-transform", open && "rotate-180")} />
          </div>
          <div className="text-xs font-semibold text-zinc-500 h-5">
            {open ? `©${new Date().getFullYear()} Autumn` : ""}
          </div>
        </nav>
      </div>
      <div className={cn(open ? "mr-60" : "mr-16")}></div>
    </>
  )
}

export default Sidebar
