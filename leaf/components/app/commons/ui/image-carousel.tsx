'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { AspectRatio } from './aspect-ratio'

interface ImageCarouselProps {
  images: string[]
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(0)

  const goToNextImage = () => {
    if (currentImage === images.length - 1) return
    setCurrentImage(currentImage + 1)
  }

  const goToPrevImage = (): void => {
    if (currentImage === 0) return
    setCurrentImage(currentImage - 1)
  }

  return (
    <div>
      <AspectRatio ratio={16 / 9} className='relative'>
        <Image
          src={images[currentImage]}
          alt='Carousel Image'
          width={400}
          height={400}
          style={{ width: '100%', height: '100%' }}
        />
        <button
          className='absolute bg-neutral-950 text-white flex justify-center items-center top-1/2 left-0 -translate-y-1/2 p-1'
          onClick={goToPrevImage}
        >
          <ChevronLeftIcon className='w-4 h-4 leading-[0px] ' />
        </button>
        <button
          className='absolute bg-neutral-950 flex text-white justify-center items-center top-1/2 right-0 -translate-y-1/2 p-1'
          onClick={goToNextImage}
        >
          <ChevronRightIcon className='w-4 h-4 leading-[0px] ' />
        </button>
        <div className='absolute bottom-0 right-0 px-[4px] py-[1px] text-sm text-white bg-neutral-950'>
          {currentImage + 1} / {images.length}
        </div>
      </AspectRatio>
    </div>
  )
}

export default ImageCarousel
