import { useEffect, useRef } from 'react';
import gsap from 'gsap'
import Heroright1 from "/assets/Hero-right1.png";
import Heroright2 from "/assets/Hero-right2.png";

const HeroRightcomp = () => {
  const boxesRef = useRef([]);

  useEffect(() => {
    boxesRef.current.forEach((box) => {
      gsap.to(box, {
        y: () => gsap.utils.random(-20, 20),
        x: () => gsap.utils.random(-20, 20),
        rotation: () => gsap.utils.random(-3, 3),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className='relative w-full h-full flex items-start justify-center max-w-full md:max-w-none pt-8 md:pt-0'>
      <img
        ref={(el) => (boxesRef.current[0] = el)}
        src={Heroright1}
        className='w-full max-w-[250px] xs:max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] object-contain'
      />
      <img
        ref={(el) => (boxesRef.current[1] = el)}
        src={Heroright2}
        className='z-40 absolute w-full max-w-[180px] xs:max-w-[220px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] object-contain top-[10%] sm:top-[15%] md:top-[20%] lg:top-[25%] xl:top-[30%] 2xl:top-[35%]'
      />
    </div>
  )
}

export default HeroRightcomp