import type { ReactElement } from 'react'

import AnimatedEntrance from '@/components/AnimatedEntrance'
import AnimatedEntranceText from '@/components/AnimatedEntranceText'

import { HERO_TEXT } from './data'

const HeroText = (): ReactElement => {
  return (
    <article className='w-fit flex flex-col mx-auto px-[10px] pt-[20vh] landscape:absolute landscape:top-[50%] landscape:left-[60%] landscape:-translate-x-[25%] landscape:xl:-translate-x-[45%] landscape:-translate-y-[50%] landscape:p-0 pb-[1rem] pointer-events-none'>
      <h1 className='mb-[2rem] landscape:xl:mb-[3vw] font-gothic leading-[1.2] text-[2.5rem] md:text-6xl landscape:text-[2rem] landscape:md:text-5xl landscape:xl:text-[4vw] drop-shadow-xs'>
        <AnimatedEntrance
          className='ml-[2rem] landscape:xl:ml-[4vw]'
          transform={false}
          hideOnLeave
          wrap
        >
          <span className='text-highlight'>
            {HERO_TEXT.firstTitle}
          </span>
        </AnimatedEntrance>

        <AnimatedEntrance
          transform={false}
          hideOnLeave
          wrap
        >
          <span>
            {HERO_TEXT.secondTitle}
          </span>
        </AnimatedEntrance>
      </h1>

      <AnimatedEntranceText
        className='justify-end self-end max-w-[250px] md:max-w-[320px] landscape:max-w-[250px] landscape:md:max-w-[320px] landscape:xl:max-w-[25vw]'
        text={HERO_TEXT.subtitle}
        textClassName='font-comfortaa font-bold text-[1.2rem] md:text-2xl landscape:text-[1rem] landscape:md:text-2xl landscape:xl:text-[2vw]'
        delayIncrement={300}
        textSeparator=' '
        specificTextClassName={{
          index: 3,
          class: 'text-[color:var(--green-light)]'
        }}
      />
    </article>
  )
}

export default HeroText