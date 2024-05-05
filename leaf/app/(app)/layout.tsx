import Navbar from "@/app/(app)/modules/commons/Navbar"
import PaypalProvider from "@/components/providers/PaypalProvider"

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <PaypalProvider>
      <Navbar />
      {children}
    </PaypalProvider>
  )
}
