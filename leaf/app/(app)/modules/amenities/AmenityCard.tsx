"use client"

import Image from "next/image"
import { FC } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Amenity } from "@prisma/client"

interface AmenityProps {
  amenity: Amenity & { isSelected?: boolean }
  toggleSelect: (item: Amenity) => void
}

const AmenityCard: FC<AmenityProps> = ({ amenity, toggleSelect }) => {
  return (
    <>
      <div
        className={cn(
          "relative border border-zinc-300 rounded-md overflow-hidden h-[350px] flex flex-col justify-between",
          amenity.isSelected ? "border-4 border-teal-600" : ""
        )}
      >
        <div
          className={cn(
            "",
            amenity.isSelected ? "absolute top-0 left-0 bg-teal-600 text-white rounded-br-md" : "hidden"
          )}
        >
          <Check className="w-6 h-6" />
        </div>
        <Image src={amenity.image} alt="sf" width={0} height={0} sizes="100vw" className="w-full h-56" />
        <div className="p-2 flex flex-col flex-1 justify-between">
          <h2 className="font-semibold text-xl text-center">{amenity.name}</h2>
          <div
            onClick={() => toggleSelect(amenity)}
            className={cn(
              buttonVariants(),
              "flex justify-between py-5 text-center bg-teal-600 hover:bg-teal-600/90 cursor-pointer"
            )}
          >
            <h2 className="font-bold block text-xs text-center xl:text-xl">
              {amenity.isSelected ? "Selected" : "Select"}
            </h2>
            <div>
              <h2 className="font-bold block  text-sm xl:text-xl mr-2">$ {amenity.price}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AmenityCard
