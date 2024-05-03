'use client'

import { FC } from 'react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

interface TestProps {}

const Test: FC<TestProps> = () => {
  const onClick = () => {
    toast({
      title: 'nothing',
      description: 'hmm lorem2 sdfjafdkf s superman',
      variant: 'default',
    })
  }
  return (
    <div className='mt-20'>
      <Button onClick={() => onClick()}>Toast</Button>
    </div>
  )
}

export default Test
