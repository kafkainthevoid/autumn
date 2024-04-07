'use client'

import { cn } from '@/lib/utils'

const MeCard = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cn(
        'rounded-md p-4 border-teal-400 border-[1px] bg-white shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}

export default MeCard
