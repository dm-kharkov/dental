import type { ReactElement } from 'react'

import clsx from 'clsx'

import HighlightWords from '@/components/HighlightWords'

import MatterScene from './MatterScene'
import Service from './Service'

import { SERVICES } from './data'

const Services = ({ className }: { className?: string }): ReactElement => {
  return (
    <section className={className}>
      {SERVICES.map((service, index) => {
        const isOdd = index % 2 === 0
        const isFirst = index === 0
        const isLast = index === SERVICES.length - 1

        return (
          <Service
            key={index}
            className={clsx(
              '-mt-[1px] service-section',
              !isLast && 'sticky top-0',
              !isFirst && 'mt-[100vh] landscape:mt-[200vh]'
            )}
            group={service.title}
            direction={!isOdd ? 'right' : 'left'}
            isLastSection={isLast}
          >
            <div
              className={clsx(
                'flex flex-col landscape:flex-row items-center gap-[10vh] landscape:gap-[8vw]',
                !isOdd && 'landscape:flex-row-reverse'
              )}
            >
              <MatterScene
                icon={service.icon}
                reverseGravity={isOdd}
              />

              <HighlightWords
                className={clsx(
                  'flex justify-center gap-[2vw] landscape:gap-0 landscape:flex-col text-[14px] landscape:text-[3vw]',
                  isOdd ? 'landscape:mr-[10vw]' : 'landscape:ml-[10vw]'
                )}
                text={service.description}
                options={service.descriptionOptions}
              />
            </div>
          </Service>
        )
      })}
    </section>
  )
}

export default Services