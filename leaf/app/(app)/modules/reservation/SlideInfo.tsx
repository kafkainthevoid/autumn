"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SlideInfoProps {
  slide: number
  setSlide: Dispatch<SetStateAction<number>>
  totalSlide: number
}

const SlideInfo: FC<SlideInfoProps> = ({ slide, setSlide, totalSlide }) => {
  const [availableSlide, setAvailableSlide] = useState<number>(1)

  useEffect(() => {
    if (slide > availableSlide) setAvailableSlide(slide)
  }, [slide])

  const onSelectSlide = (num: number) => {
    if (slide === num) return
    setSlide(num)
  }

  return (
    <ul className="mt-3">
      {Array(totalSlide)
        .fill(null)
        .map((_, i) => {
          const currentSlide = i + 1

          if (currentSlide === totalSlide) {
            return (
              <li key={i} className="inline-block mr-3">
                <Button
                  className={
                    (cn("rounded-full bg-teal-600 hover:bg-teal-600/80"),
                    "rounded-full bg-teal-600 hover:bg-teal-600/80 focus-visible:ring-teal-600")
                  }
                  disabled={currentSlide > availableSlide}
                  onClick={() => onSelectSlide(currentSlide)}
                >
                  {/* Payment */}
                  Thanh toán
                </Button>
              </li>
            )
          }

          return (
            <li key={i} className="inline-block mr-3">
              <Button
                className={cn(
                  slide === currentSlide ? "ring-2 ring-offset-2 ring-teal-600" : "",
                  "rounded-full bg-teal-600  hover:bg-teal-600/80 focus-visible:ring-teal-600"
                )}
                disabled={currentSlide > availableSlide}
                onClick={() => onSelectSlide(currentSlide)}
              >
                {/* Room {currentSlide} */}
                Phòng {currentSlide}
              </Button>
            </li>
          )
        })}
    </ul>
  )
}

export default SlideInfo
