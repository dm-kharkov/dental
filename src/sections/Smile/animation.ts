import { gsap } from 'gsap'

import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const smileAnimation = (): void => {
  const smileWrapper = document.querySelector('.smile-wrapper')
  const smileList = document.querySelector('.smile-list')

  if (!smileWrapper || !smileList) return

  const totalScroll = smileList.scrollWidth - window.innerWidth

  gsap.to(smileList, {
    x: -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: smileWrapper,
      start: 'top bottom',
      end: () => `+=${totalScroll}`,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1
    }
  })
}

export const marqueeAnimation = (): void => {
  const marqueeWrapper = document.querySelector('.marquee-wrapper')
  const marquee = document.querySelector('.marquee')

  if (!marqueeWrapper || !marquee) return

  const totalScroll = marquee.scrollWidth - window.innerWidth

  gsap.to(marquee, {
    x: totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: marqueeWrapper,
      start: 'top bottom',
      end: () => `+=${totalScroll}`,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1
    }
  })
}
