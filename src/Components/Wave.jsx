import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import waveImage from '/assets/wave.png'
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Wave = () => {
  const waveRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);
  const wave3Ref = useRef(null);
  const wave4Ref = useRef(null);

  useGSAP(() => {
    // Wave Animation Setup
    const waves = [
      { ref: wave1Ref, direction: -1, duration: 5 },
      { ref: wave2Ref, direction: 1, duration: 5 },
      { ref: wave3Ref, direction: -1, duration: 3 },
      { ref: wave4Ref, direction: 1, duration: 2 }
    ];

    // Infinite Wave Movement
    waves.forEach(({ ref, direction, duration }) => {
      gsap.to(ref.current, {
        backgroundPositionX: `${direction * 1000}px`,
        duration,
        repeat: -1,
        ease: 'linear'
      });
      const t1 = gsap.timeline({
            scrollTrigger:{
              trigger: waveRef.current,
              start:'5',
              end:'100',
             
              scrub:true
            }
          })
          t1.to(waveRef.current,{
            opacity:1,
            
            ease: 'power2.out'
          })
    });
  }, []);

  const waveStyles = [
    { opacity: 1, zIndex: 1000 },
    { opacity: 0.5, zIndex: 999 },
    { opacity: 0.2, zIndex: 998 },
    { opacity: 0.7, zIndex: 997 }
  ];

  return (
    <div 
      ref={waveRef}
      className="relative bottom-0 left-0 w-full h-full z-[51] pointer-events-none opacity-0"
    >
      {[wave1Ref, wave2Ref, wave3Ref, wave4Ref].map((ref, index) => (
        <div 
          key={index}
          ref={ref}
          className="absolute left-0 w-full h-[100px]"
          style={{ 
            backgroundImage: `url(${waveImage})`, 
            backgroundSize: '1000px 100px',
            backgroundRepeat: 'repeat-x',
            bottom: `${[0, 15, 10, 20][index]}px`,
            opacity: waveStyles[index].opacity,
            zIndex: waveStyles[index].zIndex
          }}
        />
      ))}
    </div>
  );
};

export default Wave;