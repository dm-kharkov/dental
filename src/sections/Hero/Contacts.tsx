'use client'
import type { ReactElement } from 'react'

import AnimatedEntrance from '@/components/AnimatedEntrance'

import useMedia from '@/hooks/useMedia'

import { HERO_CONTACTS } from './data'

const HeroContacts = (): ReactElement => {
  const isUpMd = useMedia('(min-width: 768px)')

  return (
    <div className='w-full md:w-fit absolute z-10 top-0 right-0 p-[1rem] landscape:md:p-[2rem] landscape:xl:p-[2vw] pointer-events-none'>
      <ul className='flex md:flex-col justify-between items-start gap-2 md:gap-4 landscape:xl:gap-[1vw]'>
        {HERO_CONTACTS.map(({ icon, label, path }, i) => (
          <li key={i}>
            <AnimatedEntrance
              delay={isUpMd ? i * 50 : 0}
              variant='appearance'
              hideOnLeave
            >
              <a
                className='flex gap-2 md:gap-3 items-center font-semibold text-[12px] md:text-[16px] landscape:xl:text-[1vw] landscape:xl:gap-[1vw] hover-contacts pointer-events-auto'
                href={path}
                target='_blank'
                rel='nofollow noopener noreferrer'
              >
                {icon}
                <span className='hover-animation-line'>
                  {label}
                </span>
              </a>
            </AnimatedEntrance>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HeroContacts