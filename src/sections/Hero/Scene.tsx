'use client'

import type { ReactElement } from 'react'

import React from 'react'

import * as THREE from 'three'
import { easing } from 'maath'

import { useFrame } from '@react-three/fiber'
import { Environment, useGLTF, PerspectiveCamera } from '@react-three/drei'

import useMedia from '@/hooks/useMedia'
import useMount from '@/hooks/useMount'

interface ModelProps {
  modelRef: React.RefObject<THREE.Group | null>
}

const Model = ({ modelRef }: ModelProps) => {
  const { scene } = useGLTF('./models/molar_tooth/scene.gltf')
  return (
    <primitive
      object={scene}
      ref={modelRef}
    />
  )
}

const INITIAL_ROTATION_SPEED = 0.008
const SENSITIVITY = 0.009

const VELOCITY_SLOWDOWN = 0.95
const MIN_VELOCITY = INITIAL_ROTATION_SPEED

const DIRECTION_THRESHOLD = 5
const SCROLL_LOCK_THRESHOLD = 10

const HeroScene = (): ReactElement => {
  const cameraRef = React.useRef<THREE.PerspectiveCamera>(null)
  const modelRef = React.useRef<THREE.Group>(null)

  const startAnimationRef = React.useRef(false)
  const autoRotateRef = React.useRef(true)

  const isDraggingRef = React.useRef(false)
  const isHorizontalMoveRef = React.useRef<boolean | null>(null)

  const startPositionRef = React.useRef({ x: 0, y: 0 })
  const previousPositionRef = React.useRef({ x: 0, y: 0 })

  const currentVelocityRef = React.useRef(-INITIAL_ROTATION_SPEED)

  const isLandscape = useMedia('(orientation: landscape)')
  const isWidthMoreThanHeight60 = useMedia('(max-aspect-ratio: 1.67)')

  const modelPosition: [number, number, number] = (() => {
    if (isLandscape) {
      if (isWidthMoreThanHeight60) {
        return [2, -0.2, 4]
      } else {
        return [3, -0.2, 4]
      }
    } else {
      return [0, 2, 8]
    }
  })()

  useMount(() => {
    const timer = setTimeout(() => {
      startAnimationRef.current = true
    }, 800)

    // events for Hero section only
    const heroSection = document.querySelector('.hero')
    if (!heroSection) return

    const preventVerticalScroll = (e: Event) => {
      if (isDraggingRef.current && isHorizontalMoveRef.current === true) {
        (e as TouchEvent).preventDefault()
      }
    }

    heroSection.addEventListener('touchmove', preventVerticalScroll as EventListener, { passive: false })

    const handleStart = (x: number, y: number) => {
      isDraggingRef.current = true
      previousPositionRef.current = { x, y }
      startPositionRef.current = { x, y }
      isHorizontalMoveRef.current = null
      autoRotateRef.current = false
    }

    const handleMove = (x: number, y: number) => {
      if (!isDraggingRef.current || !modelRef.current) return

      const deltaX = x - previousPositionRef.current.x

      if (isHorizontalMoveRef.current === null) {
        const totalDeltaX = Math.abs(x - startPositionRef.current.x)
        const totalDeltaY = Math.abs(y - startPositionRef.current.y)

        if (totalDeltaX > SCROLL_LOCK_THRESHOLD || totalDeltaY > SCROLL_LOCK_THRESHOLD) {
          isHorizontalMoveRef.current = totalDeltaX > totalDeltaY
        }
      }

      // apply rotation for horizontal move only
      if (isHorizontalMoveRef.current === true) {
        const rotationDelta = deltaX * SENSITIVITY
        modelRef.current.rotation.y += rotationDelta

        // check move direction
        if (Math.abs(deltaX) > DIRECTION_THRESHOLD) {
          // save direction and speed
          currentVelocityRef.current = rotationDelta
        }
      }

      previousPositionRef.current = { x, y }
    }

    const handleEnd = () => {
      if (!isDraggingRef.current) return

      isDraggingRef.current = false
      autoRotateRef.current = true
      isHorizontalMoveRef.current = null

      // set speed and direction for horisontal move only
      if (currentVelocityRef.current !== 0) {
        const speed = Math.max(Math.abs(currentVelocityRef.current), MIN_VELOCITY)
        const direction = Math.sign(currentVelocityRef.current)

        currentVelocityRef.current = speed * direction
      }
    }

    const onMouseDown = (e: Event) => handleStart((e as MouseEvent).clientX, (e as MouseEvent).clientY)
    const onMouseMove = (e: Event) => handleMove((e as MouseEvent).clientX, (e as MouseEvent).clientY)
    const onMouseUp = () => handleEnd()

    const onTouchStart = (e: Event) => {
      const touch = (e as TouchEvent).touches[0]
      handleStart(touch.clientX, touch.clientY)
    }

    const onTouchMove = (e: Event) => {
      const touch = (e as TouchEvent).touches[0]

      handleMove(touch.clientX, touch.clientY)
    }

    const onTouchEnd = () => handleEnd()

    heroSection.addEventListener('mousedown', onMouseDown)
    heroSection.addEventListener('mousemove', onMouseMove)
    heroSection.addEventListener('mouseup', onMouseUp)
    heroSection.addEventListener('touchstart', onTouchStart)
    heroSection.addEventListener('touchmove', onTouchMove)
    heroSection.addEventListener('touchend', onTouchEnd)

    return () => {
      clearTimeout(timer)
      if (heroSection) {
        heroSection.removeEventListener('touchmove', preventVerticalScroll as EventListener)
        heroSection.removeEventListener('mousedown', onMouseDown)
        heroSection.removeEventListener('mousemove', onMouseMove)
        heroSection.removeEventListener('mouseup', onMouseUp)
        heroSection.removeEventListener('touchstart', onTouchStart)
        heroSection.removeEventListener('touchmove', onTouchMove)
        heroSection.removeEventListener('touchend', onTouchEnd)
      }
    }
  })

  useFrame((_, delta) => {
    if (startAnimationRef.current && cameraRef.current) {
      // set camera position smoothly
      easing.damp3(cameraRef.current.position, modelPosition, 0.8, delta)
    }

    if (modelRef.current && autoRotateRef.current) {
      // apply rotation speed
      modelRef.current.rotation.y += currentVelocityRef.current

      // slow down rotation speed
      if (Math.abs(currentVelocityRef.current) > MIN_VELOCITY) {
        const direction = Math.sign(currentVelocityRef.current)
        const newSpeed = Math.abs(currentVelocityRef.current) * VELOCITY_SLOWDOWN

        // set min if speed is less than min
        if (newSpeed < MIN_VELOCITY) {
          currentVelocityRef.current = MIN_VELOCITY * direction
        } else {
          currentVelocityRef.current = newSpeed * direction
        }
      }
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 0, 4]}
        fov={75}
        near={0.1}
        far={1000}
      />

      <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr' />

      <pointLight position={[0, 0, 5]} intensity={3} color='#ffffff' decay={2} />
      <ambientLight intensity={1} color='#888' />

      <Model modelRef={modelRef} />
    </>
  )
}

export default HeroScene