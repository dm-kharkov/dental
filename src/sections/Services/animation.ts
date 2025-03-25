import { gsap } from 'gsap'

import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const servicesAnimation = (
  element: HTMLElement | null,
  isRightDirection: boolean,
  isLastSection: boolean = false
): (() => void) => {
  if (!element) return () => {}

  const serviceArrows = element.querySelectorAll('.service-arrow')
  const serviceSides = element.querySelectorAll('.serivce-side')

  const serviceMatchMedia = gsap.matchMedia()

  // Find all previous service sections
  const allServices = document.querySelectorAll('.service-section')
  const currentIndex = Array.from(allServices).indexOf(element)
  const previousServices = Array.from(allServices).slice(0, currentIndex)

  const scrollTriggerConfig = {
    trigger: element,
    start: 'top top',
    pin: isLastSection,
    scrub: 1,
    invalidateOnRefresh: true
  }

  serviceMatchMedia.add('(orientation: portrait)', () => {
    gsap.to(serviceArrows, {
      xPercent: isRightDirection ? -80 : 80,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: {
        ...scrollTriggerConfig,
        end: '+=100%'
      }
    })

    // Animate previous sections with special handling for last section
    if (previousServices.length > 0 && !isLastSection) {
      gsap.to(previousServices, {
        y: '-100%',
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          ...scrollTriggerConfig,
          end: '+=10%'
        }
      })
    } else if (previousServices.length > 0 && isLastSection) {
      // Special handling for last section
      gsap.to(previousServices, {
        y: '-100%',
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: '+=10%',
          scrub: 1,
          // Avoid pinning in this animation
          pin: false,
          invalidateOnRefresh: true
        }
      })
    }
  })

  serviceMatchMedia.add('(orientation: landscape)', () => {
    if (serviceSides.length === 0) return

    const serviceTl = gsap.timeline({
      scrollTrigger: {
        ...scrollTriggerConfig,
        pin: isLastSection,
        end: '+=200%'
      }
    })

    serviceTl.to(serviceArrows, {
      xPercent: isRightDirection ? -80 : 80,
      ease: 'none',
      stagger: 0.1,
      duration: 1
    })

    serviceTl.to(serviceSides, {
      x: isRightDirection ? '100vw' : '-100vw',
      ease: 'power1.inOut',
      duration: 1,
      stagger: 0.1
    }, '>')

    // Animate previous sections with special handling for last section
    if (previousServices.length > 0 && !isLastSection) {
      serviceTl.to(previousServices, {
        y: '-100vh',
        ease: 'none',
        stagger: 0.1,
        duration: 1
      }, '>')
    } else if (previousServices.length > 0 && isLastSection) {
      // Create a separate timeline for last section to avoid conflicts
      const prevSectionsTl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: false,
          invalidateOnRefresh: true
        }
      })
      
      prevSectionsTl.to(previousServices, {
        y: '-100vh',
        ease: 'none',
        stagger: 0.1,
        duration: 1
      })
    }

    return () => {
      serviceTl.kill()
    }
  })
 
  return () => {
    serviceMatchMedia.revert()

    ScrollTrigger.getAll()
    .forEach(trigger => trigger.kill())
  }
}