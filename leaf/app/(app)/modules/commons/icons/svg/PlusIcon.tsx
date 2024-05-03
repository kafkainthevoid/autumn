import { LucideProps } from 'lucide-react'

export const PlusIcon = (props: LucideProps) => {
  return (
    <svg
      {...props}
      viewBox='0 0 100 100'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        id='1.-Plus'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <g
          transform='translate(2.000000, 2.000000)'
          stroke={props.fill}
          strokeWidth='4'
        >
          <circle id='Layer-1' cx='48' cy='48' r='48'></circle>
          <path d='M48,19.1920006 L48,76.7920006' id='Layer-2'></path>
          <path
            d='M76.8159956,47.9840044 L19.2159956,47.9840044'
            id='Layer-2'
          ></path>
        </g>
      </g>
    </svg>
  )
}
