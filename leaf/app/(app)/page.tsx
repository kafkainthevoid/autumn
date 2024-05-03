import { Poppins } from "next/font/google"
import SearchBar from "./modules/search-input/components/searchBar/SearchBar"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export default function Home() {
  return (
    <div className="mt-14">
      <SearchBar variant="MAIN" />
    </div>
  )
}
