'use client'

import type { ReactElement } from 'react'

import Hero from '@/sections/Hero'
import Smile from '@/sections/Smile'
import Services from '@/sections/Services'
import VirtualTour from '@/sections/VirtualTour'

import { useGsapSmoothScroll } from '@/hooks/useGsapSmoothScroll'

const HomePage = (): ReactElement => {
  useGsapSmoothScroll()

  return (
    <>
      <Hero className='sticky top-0' />

      <Smile className='relative z-10 overflow-x-clip' />

      <Services className='relative z-10 overflow-x-clip' />

      <VirtualTour className='relative z-10 -my-[1px]' />
    </>
  )
}

export default HomePage
