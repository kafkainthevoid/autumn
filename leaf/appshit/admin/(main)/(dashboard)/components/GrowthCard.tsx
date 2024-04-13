'use client'

import { FC } from 'react'
import {
  ArrowDownRightIcon,
  ArrowDownRightSquareIcon,
  ArrowUpRightIcon,
  ArrowUpRightSquareIcon,
  LucideIcon,
} from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

interface GrowthCardProps {
  value: number
  changeInValue: number
  type: 'INCREASE' | 'DECREASE'
  label: string
  subLabel?: string
  icon: LucideIcon
}

const GrowthCard: FC<GrowthCardProps> = ({
  type,
  label,
  subLabel,
  value,
  changeInValue,
  icon,
}) => {
  const Icon = icon

  return (
    <AspectRatio
      className='bg-zinc-700 w-full rounded-xl py-3 px-4 flex flex-col shadow-sm'
      ratio={16 / 7}
    >
      <div className='flex items-center'>
        <div className='flex items-center gap-3'>
          <Icon className='w-4 h-4 md:w-6 md:h-6' />
          <h1 className='font-bold text-xl'>{label}</h1>
        </div>
        <div className='ml-auto'>
          {type === 'INCREASE' ? (
            <ArrowUpRightSquareIcon className='w-8 h-8 text-emerald-600' />
          ) : (
            <ArrowDownRightSquareIcon className='w-8 h-8 text-rose-600' />
          )}
        </div>
      </div>
      <div className='mt-auto flex gap-3 items-end'>
        <div className='flex gap-1 items-end'>
          <div className='font-bold text-2xl xl:text-4xl'>{value}</div>
          <div className='font-medium text-lg'>{subLabel}</div>
        </div>
        {type === 'INCREASE' ? (
          <div className='text-emerald-600'>
            <ArrowUpRightIcon className='inline w-5 h-5' />
            {changeInValue}%
          </div>
        ) : (
          <div className='text-rose-600'>
            <ArrowDownRightIcon className='inline w-5 h-5' />
            {changeInValue}%
          </div>
        )}
      </div>
    </AspectRatio>
  )
}

export default GrowthCard
