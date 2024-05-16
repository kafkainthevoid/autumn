import Navbar from "@/app/(app)/modules/commons/Navbar"
import PaypalProvider from "@/components/providers/PaypalProvider"
import Footer from "./modules/commons/Footer"

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <PaypalProvider>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </PaypalProvider>
  )
}
