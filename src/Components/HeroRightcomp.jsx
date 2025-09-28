import { useEffect,useRef } from 'react';
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
    <div className='relative w-full h-full flex items-center justify-center'>
        <img 
            ref={(el) => (boxesRef.current[0] = el)} 
            src={Heroright1} 
            className='w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] object-contain' 
        />
        <img  
            ref={(el) => (boxesRef.current[1] = el)} 
            src={Heroright2} 
            className='z-40 absolute w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] object-contain top-[15%] sm:top-[20%] md:top-[25%] lg:top-[30%] xl:top-[35%] 2xl:top-[40%]' 
        />
    </div>
  )
}

export default HeroRightcomp