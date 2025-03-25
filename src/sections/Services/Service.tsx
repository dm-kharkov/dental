'use client'

import type { ReactElement } from 'react'
import type { ServiceProps } from '@/constants/interfaces'

import React from 'react'
import clsx from 'clsx'

import { useGSAP } from '@gsap/react'

import HighlightWords from '@/components/HighlightWords'
import ArrowRightIcon from '@/icons/ArrowRight'

import { servicesAnimation } from './animation'
import { SERVICES_LINE_TEXT } from './data'

const Service = (
  {
    children,
    className,
    direction = 'left',
    group,
    isLastSection
  }: ServiceProps): ReactElement => {
  const isRightDirection = direction === 'right'
  const sectionRef = React.useRef<HTMLElement>(null)

  useGSAP(() => {
    servicesAnimation(sectionRef.current, isRightDirection, isLastSection)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'w-screen h-screen flex flex-col justify-evenly bg-[color:var(--green-dark))] font-comfortaa overflow-x-clip',
        isRightDirection && 'landscape:flex-row-reverse',
        !isRightDirection && 'landscape:flex-row',
        className
      )}
    >
      <ul className='w-full flex flex-col overflow-x-hidden landscape:h-full landscape:justify-evenly align-center landscape:shrink-0 serivce-side'>
        {group.map((item, index) => {
          const isFirstItem = index === 0

          return (
            <li
              key={item}
              className='relative'
            >
              <h2
                className={clsx(
                  'text-[7.5vw] font-bold pl-4 sm:pl-[4rem]',
                  isFirstItem && 'text-[color:var(--green-light)]',
                  isRightDirection && 'text-right pr-4 sm:pr-[4rem]',
                  !isRightDirection && 'pl-4 sm:pl-[4rem]'
                )}
              >
                {item}
              </h2>

              <div
                className={clsx(
                  'absolute top-0 left-0 w-full h-full z-10  bg-[color:var(--green-dark))] service-arrow',
                  isRightDirection && 'flex justify-end pr-4 sm:pr-[4rem]',
                  !isRightDirection && 'pl-4 sm:pl-[4rem]'
                )}
              >
                <ArrowRightIcon
                  className={clsx(
                    'h-[inherit] w-[12vw]',
                    isRightDirection && 'rotate-180'
                  )}
                  color={isFirstItem ? 'var(--green-light)' : 'white'}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <div
        className={clsx(
          'w-screen flex flex-col items-center landscape:justify-between shrink-0 serivce-side',
          isRightDirection && 'landscape:flex-row-reverse landscape:-ml-[100vw]',
          !isRightDirection && 'landscape:flex-row'
        )}
      >
        <p
          className='hidden landscape:block w-0 relative h-full px-[2.5vw] border-l-[2px] border-r-[2px] border-solid border-[color:var(--green-light)]'
        >

          <HighlightWords
            text={SERVICES_LINE_TEXT}
            className={clsx(
              'w-[100vh] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[2.5vw] text-bold text-center text-white',
              isRightDirection && '-rotate-90',
              !isRightDirection && 'rotate-90'
            )}
          />
        </p>

        {children}
      </div>
    </section>
  )
}

export default Service