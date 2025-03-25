import type { ReactElement, SVGProps } from 'react'

const CloseIcon = ({ color = '#fff', ...restProps }: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg
      viewBox='0 0 24 24'
      width='32'
      height='32'
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
      {...restProps}
    >
      <path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
    </svg>
  )
}

export default CloseIcon
