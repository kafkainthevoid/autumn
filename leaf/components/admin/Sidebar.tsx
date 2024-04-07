"use client"

import {
  AlbumIcon,
  ArrowRightIcon,
  DoorClosedIcon,
  DoorOpenIcon,
  HomeIcon,
  HotelIcon,
  LucideIcon,
  MonitorIcon,
  PercentIcon,
  User2Icon,
  Users2Icon,
} from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect } from "react"
import axios from "axios"
import { Hotel } from "@prisma/client"

import { cn } from "@/lib/utils"
import { useSideBar } from "@/store/useSideBar"
import { useHotel } from "@/store/useHotel"

type IRoute = {
  href: string
  label: string
  Icon: LucideIcon
  active: Object | boolean | null
  subRoute?: IRoute[]
}

// TODO: it doesn't have to be this complicated.
// Stupid and complicated.
const Sidebar = () => {
  const { open, setOpen } = useSideBar()
  const { hotel, setHotel } = useHotel()

  const params = useParams()
  const pathname = usePathname()

  useEffect(() => {
    const getHotels = async (): Promise<Hotel | null> => {
      const hotelId = params.hotelId

      if (hotelId && hotelId.length !== 0 && hotelId !== "new") {
        const hotel = (await axios.get("/api/hotels/" + hotelId)).data as Hotel

        return hotel
      }

      return null
    }

    getHotels()
      .then((data) => setHotel(data))
      .catch(() => {})
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
  ]

  if (hotel) {
    routers.find((route) => route.label === "Hotel")!.subRoute = [
      {
        href: "/bookings",
        label: "Booking",
        active: /^\/hotels\/[^/]+\/bookings(?:\/.*)?$/.test(pathname),
        Icon: AlbumIcon,
      },
      {
        href: "/rooms",
        label: "Room",
        active: /^\/hotels\/[^/]+\/rooms(?:\/.*)?$/.test(pathname),
        Icon: DoorOpenIcon,
      },
      {
        href: "/roomTypes",
        label: "Room Type",
        active: /^\/hotels\/[^/]+\/roomTypes(?:\/.*)?$/.test(pathname),
        Icon: DoorClosedIcon,
      },
      {
        href: "/discounts",
        label: "Discounts",
        active: /^\/hotels\/[^/]+\/discounts(?:\/.*)?$/.test(pathname),
        Icon: PercentIcon,
      },
    ]
  }

  return (
    <>
      <div
        className={cn(
          "border-r h-full fixed flex flex-col items-center transition",
          open ? "w-60" : "w-16"
        )}
      >
        <nav className={cn("flex flex-col items-center w-full h-full", open ? "px-4" : "px-2")}>
          <div className="flex items-center justify-center h-10 w-10 mb-5">
            <HotelIcon className="w-6 h-6 text-zinc-400 transition-transform" />
          </div>
          {routers.map((route) => (
            <div key={route.href} className="w-full">
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium hover:bg-zinc-800 w-full rounded-sm transition duration-200 my-2 active:scale-95",
                  route.active ? "bg-blue-600/50 text-white hover:bg-blue-600/30" : "text-zinc-400"
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
              {route.subRoute &&
                route.subRoute.map((sr) => {
                  return (
                    <div key={sr.href} className="ml-4">
                      <Link
                        key={sr.href}
                        href={route.href + "/" + hotel?.id + sr.href}
                        className={cn(
                          "flex items-center text-sm font-medium hover:bg-zinc-800 w-full rounded-sm transition duration-200 my-2 active:scale-95",
                          sr.active ? "text-blue-600 hover:bg-blue-600/30" : "text-zinc-400"
                        )}
                      >
                        <div className="flex items-center justify-center w-12 h-12">
                          <sr.Icon className={cn("w-4 h-4", sr.active && "text-blue-600")} />
                        </div>
                        {open && <div className="block ml-2 mr-2">{sr.label}</div>}
                      </Link>
                    </div>
                  )
                })}
            </div>
          ))}
          <div
            className="mt-auto my-2 flex items-center justify-center h-12 w-12 rounded-sm cursor-pointer hover:bg-zinc-800 transition-colors duration-300"
            onClick={setOpen}
          >
            <ArrowRightIcon
              className={cn("w-4 h-4 text-zinc-400 transition-transform", open && "rotate-180")}
            />
          </div>
          <div className="text-xs font-semibold text-zinc-500 h-5">
            {open && `©${new Date().getFullYear()} Winterfall`}
          </div>
        </nav>
      </div>
      <div className={cn("transition-all", open ? "mr-60" : "mr-16")}></div>
    </>
  )
}

export default Sidebar
