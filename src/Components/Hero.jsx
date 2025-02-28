import React from 'react'
import Button from './Button'
import HeroLeftcomp from './HeroLeftcomp'
import HeroRightcomp from './HeroRightcomp'
const Hero = () => {
  return (
    <div className="relative flex  justify-around items-center  h-dvh w-screen overflow-x-hidden bg-cover m-0"style={{backgroundImage:"url('./src/assets/Hero-bg.png')"}}>
        <HeroLeftcomp />
        <HeroRightcomp />
    </div>
        
    
    
  )
}

export default Hero