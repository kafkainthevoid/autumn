"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebounce } from "@/hooks/useDebounce"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { useLocation } from "../../context/location"
import * as AddressService from "@/app/(app)/modules/address/services/AddressService"

interface LocationBoxProps {
  setIsTyped: (val: boolean) => void
}

type Province = {
  name: string
  code: number
}

const LocationBox: React.FC<LocationBoxProps> = ({ setIsTyped }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const { location, setLocation } = useLocation()

  const [comLocation, setComLocation] = useState<string>(location.name)
  const [open, setOpen] = useState<boolean>(false)
  const [provinces, setProvinces] = useState<Province[]>([])

  const debouncedInput = useDebounce<string>(comLocation, 250)

  // TODO: Input lost focus when Popover popup, still not efficient, fix later
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const onSelect = (province: Province) => {
    setLocation(province)
    setComLocation(province.name)
    setOpen(false)
  }

  useOnClickOutside(popoverRef, () => {
    setOpen(false)
  })

  useEffect(() => {
    if (isFocused && debouncedInput.length !== 0) {
      AddressService.searchProvinces(debouncedInput).then((data) => {
        setProvinces(data)
        setOpen(true)
        setTimeout(() => {
          inputRef.current?.focus()
        }, 10)
      })
    }
  }, [isFocused, debouncedInput, inputRef])

  return (
    <Popover open={open}>
      <PopoverTrigger>
        <Input
          placeholder="Tìm kiếm địa điểm"
          ref={inputRef}
          value={comLocation}
          onChange={(e) => {
            setIsTyped(true)
            setComLocation(e.target.value)
            setLocation({ name: "", code: -1 })
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div ref={popoverRef}>
          {provinces.length !== 0 ? (
            provinces.map((province) => (
              <Button
                key={province.code}
                className="w-full justify-start"
                variant="ghost"
                onClick={() => onSelect(province)}
              >
                {province.name}
              </Button>
            ))
          ) : (
            <div className="text-xs mx-auto">Không tìm thấy kết quả</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default LocationBox
