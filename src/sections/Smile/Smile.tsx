'use client'

import type { ReactElement } from 'react'

import Image from 'next/image'

import clsx from 'clsx'
import { useGSAP } from '@gsap/react'

import { marqueeAnimation, smileAnimation } from './animation'
import SMILE_COLLECTION from './data'

import './styles.scss'

const TEXT = (
  <>
    зроби свою посмішку <span className='text-[color:var(--green-light)]'> дивовижною </span>
    <>&nbsp;</>
  </>
)

const Creative = ({ className }: { className?: string }): ReactElement => {
  useGSAP(() => {
    smileAnimation()
    marqueeAnimation()
  }, [])

  return (
    <section className={clsx('smile-wrapper', className)}>
      <div className='flex relative smile-list'>
        {SMILE_COLLECTION.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`посмішка-${index}`}
            width={100}
            height={100}
            loading='eager'
            className='w-[max(20vw,_200px)] h-[max(20vw,_200px)] object-cover rounded-2xl'
            unoptimized
          />
        ))}
      </div>

      <div className='-mt-[10vh] pt-[16vh] landscape:pt-[20vh] pb-[12vh] landscape:pb-[18vh] bg-[color:var(--green-dark)] marquee-wrapper'>
        <div className='marquee relative'>
          <div className='flex absolute right-[100%]'>
            {Array.from({ length: 7 }).map((_, i) => {
              return <span key={i} className='shrink-0 font-comfortaa font-bold text-3xl md:text-[5vw]'>
                {TEXT}
              </span>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Creative
