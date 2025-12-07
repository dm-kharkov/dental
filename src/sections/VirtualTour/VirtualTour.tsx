'use client'

import type { ReactElement } from 'react'

import Image from 'next/image'

import clsx from 'clsx'

import AnimatedEntrance from '@/components/AnimatedEntrance'
import AnimatedEntranceText from '@/components/AnimatedEntranceText'

import Dialog from './Dialog'

import { VIRTUAL_TOUR_TITLE } from './data'

const VirtualTour = ({ className }: { className?: string }): ReactElement => {
  return (
    <section
      className={clsx(
        'w-screen h-screen flex justify-between items-center flex-col py-[10vh] landscape:px-[10vw] mesh-gradient',
        className
      )}
    >
      <AnimatedEntranceText
        className='max-w-[80vw] mx-auto justify-center'
        text={VIRTUAL_TOUR_TITLE}
        textClassName='font-comfortaa font-bold text-[8vw] landscape:text-[4vw]'
        delayIncrement={300}
        textSeparator=' '
        specificTextClassName={{
          index: 3,
          class: 'text-[color:var(--green-light)]'
        }}
      />

      <AnimatedEntrance
        hideOnLeave
        transform={false}
        delay={500}
        className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'
      >
        <Image
          src='/images/cheshire-cat-smiley.png'
          alt='посмішка Чеширського кота'
          width={100}
          height={100}
          loading='eager'
          className='w-[80vw] h-[80vw] landscape:w-[40vw] landscape:h-[40vw]'
          unoptimized
        />
      </AnimatedEntrance>

      <Dialog />
    </section>
  )
}

export default VirtualTour
