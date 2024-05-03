import React from 'react'
import { CopyIcon } from 'lucide-react'

import { Button } from './ui/button'

interface CustomLinkProps {
  text: string
  link: string
}

const CustomLink: React.FC<CustomLinkProps> = ({ text, link }) => {
  return (
    <Button
      variant='link'
      size='sm'
      className='text-xs underline text-teal-600'
    >
      {text}
      <CopyIcon className='w-3 h-3 text-teal-600 inline-block ml-1' />
    </Button>
  )
}

const Footer = () => {
  return (
    <div className='border-t-[1px] p-6 mt-6'>
      <div className='container'>
        <div className='flex justify-between'>
          <div>
            <div className='text-sm mb-6'>How can we help?</div>

            <div className='flex gap-6'>
              <div className='border-r-[1px] pr-6'>
                <div className='font-bold text-teal-600'>+84 123-321-567d</div>
                <div className='text-xs text-zinc-500 text-center'>
                  Call us, it&#39;s toll free
                </div>
              </div>
              <div>
                <div className='text-teal-600 font-bold'>
                  Customer Support{' '}
                  <CopyIcon className='w-3 h-3 text-teal-600 inline-block' />
                </div>
                <div className='text-xs text-zinc-500 text-center'>
                  Online service assistance
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 justify-items-start'>
            <CustomLink link='#' text='Terms & Conditions' />
            <CustomLink link='#' text='AdChoices' />
            <CustomLink link='#' text='Winterfall Hotlines' />
            <CustomLink link='#' text='Web Accessibility' />
            <CustomLink link='#' text='Personal Data Request' />
            <CustomLink link='#' text='Site Usage Aggreement' />
            <CustomLink link='#' text='Global Privacy Statement' />
          </div>
        </div>

        <div className='text-zinc-500 text-xs'>
          ©{new Date().getFullYear()} Winterfall
        </div>
      </div>
    </div>
  )
}

export default Footer
