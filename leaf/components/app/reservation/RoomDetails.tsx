'use client'

import React, { FC } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ImageCarousel from '@/components/ui/image-carousel'
import { HotelVm } from '@/modules/hotel/models/HotelModel'
import { RoomTypeVm } from '@/modules/reservation/models/RoomTypeVm'

interface RoomDetailsProps {
  children: React.ReactNode
  roomType: RoomTypeVm
  hotel?: HotelVm
}

const RoomDetails: FC<RoomDetailsProps> = ({ children, roomType, hotel }) => {
  // TODO: make fetch hotel only when open dialog
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='min-w-[400px] md:min-w-[1000px] p-0 rounded-md overflow-hidden flex outline-none'>
        <div className='w-1/2'>
          <div>
            <ImageCarousel images={roomType.images} />
          </div>
          <div className='px-6 py-3 space-y-3 bg-neutral-50'>
            <div className='font-bold'>{roomType.name}</div>
            <hr />
            <div className='text-xs w-full text-zinc-700'>
              {roomType.description}
            </div>
            {/* TODO: add function */}
            <Button className='w-full' variant='teal'>
              Book from ${roomType.price}
            </Button>
          </div>
        </div>

        <div className='w-1/2 py-6 px-3 space-y-6'>
          <div>
            <div className='font-bold text-xs mb-1'>Hotel amenities</div>
            <hr />
            <div className='ml-4 text-xs grid grid-cols-4 mt-3'>
              {hotel &&
                hotel.amenity_Hotels.map((ah) => {
                  return (
                    <div
                      className='flex flex-col gap-2 justify-center items-center'
                      key={ah.amenity.id}
                    >
                      <Image
                        src={ah.amenity.image}
                        alt='icon'
                        width='30'
                        height='30'
                      />
                      <div className='text-xs2 text-zinc-700'>
                        {ah.amenity.name}I
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          <div>
            <div className='font-bold text-xs mb-1'>Room highlights</div>
            <hr className='h-[1px]' />
            <ul className='grid grid-cols-2 p-3 gap-y-2 list-disc px-8 text-zinc-700'>
              {roomType.amenity_RoomTypes.map((ar, i) => (
                <li key={i} className='text-xs'>
                  {ar.amenity.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RoomDetails
