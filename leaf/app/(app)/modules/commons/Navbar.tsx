import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { currentUser } from "@/lib/auth"
import UserAccountNav from "../user/UserAccountNav"

const Navbar = async () => {
  const session = await currentUser()

  return (
    <div className="fixed top-0 h-14 bg-white inset-x-0 w-full border-b border-zind-300 z-50">
      <div className="container h-full z-10 py-2 max-w-7xl flex items-center justify-between">
        <Link href="/">
          <h1 className="font-extrabold text-xl border border-black p-2">Autumn</h1>
        </Link>

        {session ? (
          <UserAccountNav user={session} />
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/register" className={buttonVariants({ size: "sm", variant: "teal" })}>
              Join In
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                size: "sm",
                className: "bg-white text-teal-600 hover:bg-zinc-300",
              })}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
