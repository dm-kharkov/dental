import type { ReactElement } from 'react'

import clsx from 'clsx'
import React from 'react'

import AnimatedEntrance from '@/components/AnimatedEntrance'
import {
  AnimatedEntranceProps,
  AnimatedEntranceVariantType,
  BaseTextProps
} from '@/constants/interfaces'

import { splitByChart } from '@/lib/string'

const DEFAULT_DELAY = 100
const DEFAULT_DELAY_INCREMENT = 200

const AnimatedEntranceText = (
  props: AnimatedEntranceTextProps
): ReactElement => {
  const {
    className,
    delay = DEFAULT_DELAY,
    delayIncrement = DEFAULT_DELAY_INCREMENT,
    hideOnLeave = true,
    text,
    textSeparator = '',
    textClassName,
    variant = AnimatedEntranceVariantType.APPEARANCE,
    specificTextClassName,
    ...restProps
  } = props

  const words = splitByChart(text, textSeparator)

  return (
    <div className={clsx('flex flex-wrap items-baseline', className)}>
      {words.map((word, index) => {
        const isLast = words.length - 1 === index
        const currentDelay = delay + (index * delayIncrement)
        const isSpecificText = index === specificTextClassName?.index

        const componentClassName = clsx(textClassName, isSpecificText && specificTextClassName?.class)

        return (
          <AnimatedEntrance
            key={index}
            delay={currentDelay}
            variant={variant}
            hideOnLeave={hideOnLeave}
            {...restProps}
          >
            <span className={componentClassName}>
              {word}
              {!isLast && <>&nbsp;</>}
            </span>
          </AnimatedEntrance>
        )
      })}
    </div>
  )
}

interface AnimatedEntranceTextProps
  extends Omit<AnimatedEntranceProps, 'children'>,
  BaseTextProps {
  textSeparator?: string
  delayIncrement?: number
  specificTextClassName?: {
    index: number
    class: string
  }
}

export default AnimatedEntranceText
