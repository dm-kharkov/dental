import type { ReactElement } from 'react'

import clsx from 'clsx'
import { Canvas } from '@react-three/fiber'

import Contacts from './Contacts'
import Scene from './Scene'
import Text from './Text'

import './styles.scss'

const Hero = ({ className }: { className?: string }): ReactElement => {
  return (
    <section className={clsx(
      'w-screen h-[105vh] relative hero mesh-gradient',
      className
    )}>
      <Contacts />

      <Canvas
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'url("/icons/hand-tap-light.svg"), auto'
        }}
      >
        <Scene />
      </Canvas>

      <Text />
    </section>
  )
}

export default Hero
