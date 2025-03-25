'use client'

import type { ReactElement } from 'react'
import type {
  MatterSceneProps,
  MatterCircleProps,
  MatterCircleElementProps
} from '@/constants/interfaces'

import React from 'react'
import Matter from 'matter-js'

import useIntersection from '@/hooks/useIntersection'

import PhysicsService from '@/services/PhysicsService'

const RADIUS = 0.035
const SPACING = 0.07

const MatterScene = ({ icon: Icon, reverseGravity = false }: MatterSceneProps): ReactElement => {
  const uniqueId = React.useId()

  const worldId = React.useMemo(
    () => `matter-world-${uniqueId}`
    , [uniqueId]
  )

  const [size, setSize] = React.useState(360)

  const sceneRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const engineRef = React.useRef<Matter.Engine | null>(null)
  const renderRef = React.useRef<Matter.Render | null>(null)
  const runnerRef = React.useRef<Matter.Runner | null>(null)

  const circleBodiesRef = React.useRef<MatterCircleProps[]>([])
  const [circleElements, setCircleElements] = React.useState<MatterCircleElementProps[]>([])

  // get physicsService instance
  const physicsService = React.useMemo(() => PhysicsService, [])

  // dynamic canvas size
  React.useEffect(() => {
    if (!sceneRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      setSize(width)

      if (renderRef.current) {
        renderRef.current.canvas.width = width
        renderRef.current.canvas.height = width
        renderRef.current.options.width = width
        renderRef.current.options.height = width

        // update render area
        Matter.Render.lookAt(renderRef.current, {
          min: { x: 0, y: 0 },
          max: { x: width, y: width }
        })
      }
    })

    resizeObserver.observe(sceneRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  // Track section intersection in viewport: 50% of the section is visible
  const { isIntersecting } = useIntersection(
    sceneRef as React.RefObject<HTMLElement>,
    { threshold: 0.5 }
  ) || {}

  // enable/disable engine world when section is visible
  React.useEffect(() => {
    if (engineRef.current) {
      // activate/deactivate needed world
      physicsService.setActive(worldId, !!isIntersecting)

      // invert gravity according to props and visibility
      const gravityValue = isIntersecting
        ? (reverseGravity ? -1 : 1)
        : (reverseGravity ? 1 : -1)

      // Set gravity
      engineRef.current.gravity.y = gravityValue

      // Debug info
      console.log(`World ${worldId}: isIntersecting=${isIntersecting}, reverseGravity=${reverseGravity}, gravity=${gravityValue}`)
    }
  }, [isIntersecting, reverseGravity, worldId, physicsService])

  React.useEffect(() => {
    const Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies

    // create metter engine
    const engine = physicsService.createEngine(worldId, {
      gravity: { y: reverseGravity ? -1 : 1 }
    })

    engineRef.current = engine
    const world = engine.world

    // settings
    const canvasSize = size
    const radius = size / 2
    const centerX = canvasSize / 2
    const centerY = canvasSize / 2
    const wallThickness = 1

    // render
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      canvas: canvasRef.current!,
      options: {
        width: canvasSize,
        height: canvasSize,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        showAngleIndicator: false
      }
    })

    renderRef.current = render
    // add world renderer
    physicsService.addRender(worldId, render)

    // runner
    const runner = Runner.create()
    runnerRef.current = runner
    // add runner
    physicsService.addRunner(worldId, runner)

    // create circular wall
    const createCircleWall = (x: number, y: number, radius: number, segments = 64) => {
      const segmentAngle = (2 * Math.PI) / segments
      const parts = Array.from({ length: segments }, (_, i) => i * segmentAngle)

      return parts.map(part => {
        const x1 = x + radius * Math.cos(part)
        const y1 = y + radius * Math.sin(part)
        const x2 = x + radius * Math.cos(part + segmentAngle)
        const y2 = y + radius * Math.sin(part + segmentAngle)

        return Bodies.rectangle(
          (x1 + x2) / 2,
          (y1 + y2) / 2,
          Math.hypot(x2 - x1, y2 - y1),
          wallThickness,
          {
            isStatic: true,
            angle: part + Math.PI / 2,
            render: {
              fillStyle: 'transparent',
              strokeStyle: 'transparent',
              lineWidth: wallThickness
            }
          }
        )
      })
    }

    // add circle wall to the world
    const circularWall = createCircleWall(centerX, centerY, radius - wallThickness, 64)
    Composite.add(world, circularWall)

    // initial gravity - set according to reverseGravity
    engine.gravity.y = reverseGravity ? -1 : 1

    // correct position for all elements
    const gridWidth = 10
    const gridHeight = 7
    const circleRadius = size * RADIUS
    const spacingX = size * SPACING
    const spacingY = size * SPACING

    // cgrid width and height
    const totalWidth = (gridWidth - 1) * spacingX
    const totalHeight = (gridHeight - 1) * spacingY

    // centering  grid
    const startX = centerX - totalWidth / 2
    const startY = centerY - totalHeight / 2

    // create circle objects and add them to the world
    const circleBodies: MatterCircleProps[] = []
    const gridX = Array.from({ length: gridWidth }, (_, i) => startX + i * spacingX)
    const gridY = Array.from({ length: gridHeight }, (_, j) => startY + j * spacingY)

    const circles = gridX.flatMap(x =>
      gridY.map(y =>
        Bodies.circle(x, y, circleRadius, {
          restitution: 0.8,
          friction: 0.005,
          render: { fillStyle: 'transparent' }
        }) as MatterCircleProps
      )
    )

    circleBodies.push(...circles)
    Composite.add(world, circleBodies)

    circleBodiesRef.current = circleBodies

    // synchronize icons with circles
    const initialCircleBodies = circleBodies.map((body, index) => ({
      id: index,
      position: { ...body.position },
      angle: body.angle
    }))

    setCircleElements(initialCircleBodies)

    // add mouse controls
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })

    Composite.add(world, mouseConstraint)
    render.mouse = mouse

    // adapt scene scale to canvas size
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: canvasSize, y: canvasSize }
    })

    // make circle canvas
    if (render.canvas) {
      render.canvas.style.borderRadius = '50%'
      render.canvas.style.overflow = 'hidden'
    }

    /* 
       start after initialization of all objects
       icons will be drawn before the start of movement
    */
    setTimeout(() => {
      // activate needed world only if it visible
      physicsService.setActive(worldId, !!isIntersecting)
    }, 500)

    // update bodies state for drawing SVG
    Matter.Events.on(engine, 'afterUpdate', () => {
      if (circleBodiesRef.current.length > 0) {
        const updatedBodies = circleBodiesRef.current.map((body, index) => ({
          id: index,
          position: { ...body.position },
          angle: body.angle
        }))

        setCircleElements(updatedBodies)
      }
    })

    // cleanup
    return () => {
      Matter.Events.off(engine, 'afterUpdate')

      physicsService.removeWorld(worldId)

      engineRef.current = null
      renderRef.current = null
      runnerRef.current = null
    }
  }, [size, worldId, physicsService, reverseGravity, isIntersecting])

  return (
    <div
      ref={sceneRef}
      className='relative w-[40vw] min-w-[300px] max-w-[900px] aspect-square border-2 border-solid border-[color:var(--green-light)] rounded-full overflow-hidden mx-auto shrink-0'
    >
      <canvas
        ref={canvasRef}
        className='w-full h-full absolute top-0 left-0 rounded-full cursor-grab'
      />

      {circleElements.map((element) => (
        <Icon
          key={element.id}
          style={{
            width: size * SPACING,
            height: size * SPACING,
            position: 'absolute',
            left: element.position.x - size * RADIUS,
            top: element.position.y - size * RADIUS,
            transform: `rotate(${element.angle}rad)`,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  )
}

export default MatterScene