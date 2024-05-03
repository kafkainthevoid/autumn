import Navbar from "@/app/(app)/modules/commons/Navbar"

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
