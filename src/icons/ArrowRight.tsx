import type { ReactElement, SVGProps } from 'react'

const ArrowRightIcon = ({ color = '#0C0B0B', ...restProps }: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg
      viewBox='0 0 199 190'
      width='30'
      height='29'
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M179.832 83.9968L128.752 134.924L135.81 142L199 79L135.81 16L128.752 23.0764L179.832 74.0032H13V83.9968H179.832Z' fill={color}
      />
    </svg>
  )
}

export default ArrowRightIcon
