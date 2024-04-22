import Image from "next/image"
import { SunriseIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import SearchBar from "@/components/app/search-input/searchBar/SearchBar"

export default function Home() {
  return (
    <div className="mt-14">
      <SearchBar variant="MAIN" />
      <div className="mt-10 space-y-10">
        <div className="text-3xl font-bold flex justify-around text-white bg-teal-600 py-6 items-center">
          <SunriseIcon className="w-12 h-12" />
          <h1>
            Where will you stay next? Choose from top destinations. <span className="underline">Plan Your Trip</span>
          </h1>
          <div></div>
        </div>
        <div className="w-full mt-10">
          <Image
            className="mx-auto rounded-md overflow-hidden object-contain"
            alt="hmm"
            width="1200"
            height="1000"
            style={{ height: "500px", width: "1200px" }}
            src={
              "https://www.hilton.com/im/en/NoHotel/19008338/23-2372-august-hilton.com-r5-mr-default.jpg?impolicy=crop&cw=4088&ch=3000&gravity=NorthWest&xposition=205&yposition=0&rw=1280&rh=940"
            }
          />
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          <h1 className="text-primary font-bold text-4xl">Stay a little longer, summer</h1>
          <p>Discover hidden gems or familiar favorites. Let your travels take you on the journey of a lifetime.</p>
          <Button variant="teal">Plan Your Summer Stay</Button>
        </div>

        <div className="container space-y-3">
          <h1 className="text-primary font-bold text-4xl">Make the most of summertime</h1>
          <p>Summer is here - celebrate with one of our exclusive offers</p>
        </div>
      </div>
    </div>
  )
}
