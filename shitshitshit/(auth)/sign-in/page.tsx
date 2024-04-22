import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import SignIn from '@/modules/auth/components/SignIn'

const page = () => {
  return (
    <div className='mt-20'>
      <div className='h-full max-w-xl mx-auto flex flex-col items-center justify-center'>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'link' }),
            'self-start text-teal-600'
          )}
        >
          <ChevronLeft className='mr-2 h-4 w-4' />
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  )
}

export default page
