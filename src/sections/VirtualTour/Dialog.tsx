'use client'

import type { ReactElement } from 'react'

import React from 'react'
import clsx from 'clsx'

import AnimatedEntrance from '@/components/AnimatedEntrance'

import CloseIcon from '@/icons/Close'

const VirtualTourDialog = (): ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <AnimatedEntrance
        hideOnLeave
        transform={false}
        delay={600}
        wrap
      >
        <button
          onClick={() => setIsOpen(true)}
          className='w-fit px-[5vw] landscape:px-[2.5vw] py-[2.5vw] landscape:py-[1.5vw] text-[6vw] landscape:text-[1.5vw] text-[color:var(--green-light)] bg-transparent border border-[color:var(--green-light)] rounded-full cursor-pointer hover:bg-[color:var(--green-light)] hover:text-[color:var(--green-dark)] transition-colors duration-500'
        >
          Дивитися
        </button>
      </AnimatedEntrance>

      <div
        className={clsx(
          'absolute top-0 left-0 w-full h-full bg-black/80 flex flex-col items-end justify-center px-[5vw] py-[5vh] transition duration-500 ease-out',
          !isOpen && 'opacity-0 pointer-events-none',
          isOpen && 'opacity-[100%] pointer-events-auto'
        )}
      >
        <button
          className='mb-4 cursor-pointer group'
          onClick={() => setIsOpen(false)}
          aria-label='Закрити модальне вікно'
        >
          <CloseIcon className='w-[max(24px,_2vw)] h-[max(24px,_2vw)] group-hover:fill-[color:var(--green-light)] will-change-[fill] transition-fill duration-500' />
        </button>

        <iframe
          className='rounded-lg border-none w-full h-full'
          src='https://www.google.com/maps/embed?pb=!4v1550865149568!6m8!1m7!1sCAoSLEFGMVFpcE41TS1qRHdCLVgxcG1hY016OXc2X2tWY1VxZGlDZUpVeWsySjQx!2m2!1d49.980038036644!2d36.266312087732!3f355.44073053813645!4f-0.2565152128019861!5f0.7820865974627469'
          allow='gyroscope; accelerometer; autoplay; encrypted-media'
          allowFullScreen
        />
      </div>
    </>
  )
}

export default VirtualTourDialog
