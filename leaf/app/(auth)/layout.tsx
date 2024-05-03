import Navbar from "@/app/(app)/modules/commons/Navbar"

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div className="w-[600px] h-full mx-auto mt-28">{children}</div>
    </>
  )
}
