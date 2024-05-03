import { LucideProps } from 'lucide-react'

export const CalendarIcon = (props: LucideProps) => {
  return (
    <svg
      {...props}
      className='shrink-0 fill-current'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m0 0v24h24v-24z' fill='none'></path>
      <path d='m8.5 5.5v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.5z'></path>
      <path d='m12.5 5.5v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.5z'></path>
      <path d='m16.5 5.5v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.5z'></path>
      <path d='m19 5.5h-2.5v1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-1.5h-3v1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-1.5h-3v1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-1.5h-2.5c-.83 0-1.5.67-1.5 1.5v12c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5zm0 14h-14c-.28 0-.5-.22-.5-.5v-8.5h15v8.5c0 .28-.22.5-.5.5z'></path>
      <rect height='2' rx='.5' width='3' x='6.5' y='12.5'></rect>
      <rect height='2' rx='.5' width='3' x='10.5' y='12.5'></rect>
      <rect height='2' rx='.5' width='3' x='14.5' y='12.5'></rect>
      <rect height='2' rx='.5' width='3' x='6.5' y='15.5'></rect>
      <rect height='2' rx='.5' width='3' x='10.5' y='15.5'></rect>
    </svg>
  )
}
