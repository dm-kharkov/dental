import Matter from 'matter-js'

interface PhysicsWorld {
  id: string
  engine: Matter.Engine
  render?: Matter.Render
  runner?: Matter.Runner
  active: boolean
}

// closure for storing the state of the service
const createPhysicsService = () => {
  const worlds = new Map<string, PhysicsWorld>()

  const createEngine = (id: string, options?: Matter.IEngineDefinition): Matter.Engine => {
    // if the world exists, return its engine
    if (worlds.has(id)) {
      return worlds.get(id)!.engine
    }

    const engine = Matter.Engine.create(options)

    worlds.set(id, {
      id,
      engine,
      active: false
    })

    return engine
  }

  // Add Render to the world
  const addRender = (id: string, render: Matter.Render): void => {
    const world = worlds.get(id)
    if (world) {
      world.render = render
    }
  }

  // Add Runner to the world
  const addRunner = (id: string, runner: Matter.Runner): void => {
    const world = worlds.get(id)
    if (world) {
      world.runner = runner
    }
  }

  // activate or deactivate the world
  const setActive = (id: string, active: boolean): void => {
    const world = worlds.get(id)
    if (!world) return

    // skip if the status is not changed
    if (world.active === active) return

    world.active = active
 
    if (active) {
      // activete Render and Runner
      if (world.render) {
        Matter.Render.run(world.render)
      }

      if (world.runner) {
        Matter.Runner.run(world.runner, world.engine)
      }
    } else {
       // stop Runner and Runner
      if (world.runner) {
        Matter.Runner.stop(world.runner)
      }

      if (world.render) {
        Matter.Render.stop(world.render)
      }

      // freeze all bodies
      const bodies = Matter.Composite.allBodies(world.engine.world)
      bodies.forEach(body => {
        if (!body.isStatic) {
          Matter.Body.setVelocity(body, { x: 0, y: 0 })
          Matter.Body.setAngularVelocity(body, 0)
        }
      })
    }
  }

  // cleanup: deactivate, clear and remove world
  const removeWorld = (id: string): void => {
    const world = worlds.get(id)
    if (!world) return

    setActive(id, false)

    Matter.World.clear(world.engine.world, false)
    Matter.Engine.clear(world.engine)

    worlds.delete(id)
  }

  // public API
  return {
    createEngine,
    addRender,
    addRunner,
    setActive,
    removeWorld
  }
}

/* Singleton pattern instance */
const physicsService = createPhysicsService()

export default physicsService