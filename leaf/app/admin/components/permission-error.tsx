import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"

const PermissionError = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-5">
      <h1 className="font-bold text-3xl">You do not have permission to access this site</h1>
      <div className="text-teal-600 flex items-center hover:underline">
        <ChevronLeftIcon className="w-5 h-5" />
        <Link href="/">Go to Homepage</Link>
      </div>
    </div>
  )
}

export default PermissionError
