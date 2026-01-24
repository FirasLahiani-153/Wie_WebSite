import React, { useRef } from 'react'
import Button from './Button'
import HeroLeftcomp from './HeroLeftcomp'
import HeroRightcomp from './HeroRightcomp'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const hero = useRef(null)
  const leftComp = useRef(null)
  const rightComp = useRef(null)

  useGSAP(() => {
    // Initial loading animation
    const tl = gsap.timeline()

    tl.from(leftComp.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
      .from(rightComp.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")

    // Scroll animation
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: hero.current,
        start: '54% 50%',
        scrub: true
      }
    })
    t1.to(hero.current, {
      y: 500,
      duration: 0.1,
      ease: "linear"
    })
  }, [])

  return (
    <div
      id="home"
      ref={hero}
      className="relative flex flex-col md:flex-row justify-start md:justify-around items-start min-h-screen w-full overflow-hidden bg-cover m-0 pt-16 md:pt-20 px-4 md:px-0"
      style={{ backgroundImage: "url('/assets/Hero-bg.png')" }}
    >
      <div ref={leftComp} className="w-full md:w-auto mb-8 md:mb-0 mt-8 md:mt-12">
        <HeroLeftcomp />
      </div>
      <div ref={rightComp} className="w-full md:w-auto flex-shrink-0 mt-8 md:mt-0">
        <HeroRightcomp />
      </div>
    </div>
  )
}

export default Hero