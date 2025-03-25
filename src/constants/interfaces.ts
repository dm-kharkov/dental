import type { ElementType, ReactNode, SVGProps, ReactElement } from 'react'

import { gsap } from 'gsap'
import Matter from 'matter-js'

export interface ChildrenProps {
  children: ReactNode
}

const ANIMATED = 'animated' as const
const APPEARANCE = 'appearance' as const

export const AnimatedEntranceVariantType = {
  ANIMATED,
  APPEARANCE
}

export interface AnimatedEntranceProps extends ChildrenProps {
  className?: string
  delay?: number
  direction?: 'right' | 'up' | 'down' | 'left'
  hideOnLeave?: boolean
  showClassName?: string
  showOnMount?: boolean
  transform?: boolean
  variant?: typeof ANIMATED | typeof APPEARANCE
  wrap?: boolean
}

export interface BaseTextProps {
  component?: ElementType
  text: string
  textClassName?: string
}

export interface GlassButtonProps {
  className?: string
  label: string
  onClick?: () => void
}

type MatchMedia = ReturnType<typeof gsap.matchMedia>

export interface GsapMatchMediaProps {
  matchMedia: MatchMedia
}

export interface MatterSceneProps {
  icon: React.ElementType<SVGProps<SVGSVGElement>>
  reverseGravity?: boolean
}

export interface MatterCircleProps extends Matter.Body {
  position: Matter.Vector
  angle: number
}

export interface MatterCircleElementProps {
  id: number
  position: { x: number; y: number }
  angle: number
}

export interface ServiceProps extends ChildrenProps {
  className?: string
  direction?: 'left' | 'right'
  group: string[]
  isLastSection?: boolean 
}

export interface HighlightWordsProps {
  className?: string
  text: string
  options?: {
    indexes?: number[]
    odd?: boolean
  }
}

export interface OpenDialogProps extends ChildrenProps {
  component: ReactElement
}
