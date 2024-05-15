"use client"

import { CopyIcon } from "lucide-react"
import Image from "next/image"
import { FC, useEffect, useState } from "react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import * as AddressService from "../address/services/AddressService"
import { HotelVm } from "../hotel/services/HotelService"
import HotelDetails from "../hotel/HotelDetails"

interface HotelInfoProps {
  hotel?: HotelVm
}

const HotelInfo: FC<HotelInfoProps> = ({ hotel }) => {
  const [ward, setWard] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [province, setProvince] = useState<string>("")

  useEffect(() => {
    if (hotel && hotel.address) {
      AddressService.getProvince(hotel.address.province!).then((data) => setProvince(data.name))
      AddressService.getDistrict(hotel.address.district!).then((data) => setDistrict(data.name))
      AddressService.getWard(hotel.address.ward!).then((data) => setWard(data.name))
    }
  }, [])

  if (!hotel) return

  return (
    <div className="w-full mb-6">
      <AspectRatio ratio={16 / 9} className="overflow-hidden w-full rounded-md">
        <Image
          src={hotel.images[0]}
          alt="hotel info"
          width={400}
          height={400}
          style={{ width: "100%", height: "auto" }}
        />
      </AspectRatio>
      <div className="text-lg mt-3 font-bold">{hotel.name}</div>
      <div className="text-xs font-light">
        {hotel.address?.addressLine && hotel.address.addressLine} {ward} {district} {province}
        <CopyIcon className="w-3 h-3 inline-block ml-2" />
      </div>
      <HotelDetails hotel={hotel}>
        <Button variant="link" className="text-sm text-teal-600" size="inline">
          {/* Hotel Details */}
          Chi tiết khách sạn
          <span aria-hidden="true">&nbsp;&gt;</span>
        </Button>
      </HotelDetails>
    </div>
  )
}

export default HotelInfo
