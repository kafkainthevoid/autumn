'use client'

import { FC, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import HotelItem from './HotelItem'
import { useLocation } from '@/modules/search-input/context/location'
import { Button } from '@/components/ui/button'
import { HotelVm } from '@/modules/hotel/models/HotelModel'

interface SearchResultProps {
  hotels: HotelVm[]
}

const ITEM_PER_PAGE = 20

const SearchResult: FC<SearchResultProps> = ({ hotels }) => {
  const { location } = useLocation()
  const [page, setPage] = useState<number>(0)

  const startIdx = page * ITEM_PER_PAGE
  const endIdx =
    hotels.length < (page + 1) * ITEM_PER_PAGE
      ? hotels.length
      : (page + 1) * ITEM_PER_PAGE

  const handleClickNextPage = () => {
    if ((page + 1) * ITEM_PER_PAGE > hotels.length) return
    setPage((p) => p + 1)
  }

  const handleClickPrevPage = () => {
    if (page === 0) return
    setPage((p) => p - 1)
  }

  const renderPage = () => {
    return Array.from({ length: endIdx - startIdx }).map((_, i) => {
      return <HotelItem key={i} hotel={hotels[i]} />
    })
  }

  return (
    <div className='flex flex-col w-2/5 py-3'>
      <div className='font-bold text-lg'>{location.name} Search Results</div>

      <div className='font-semibold text-sm my-5 text-teal-600'>
        Showing {startIdx + 1} - {endIdx} of {hotels.length} hotels
      </div>

      <div className='divide-y-2 p-2'>{renderPage()}</div>

      <hr />

      <div className='flex w-full justify-center items-center'>
        <Button variant='link' onClick={handleClickPrevPage}>
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <div className='text-xs'>
          Page {page + 1} of {Math.floor(hotels.length / ITEM_PER_PAGE) + 1}
        </div>
        <Button variant='link' onClick={handleClickNextPage}>
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export default SearchResult
