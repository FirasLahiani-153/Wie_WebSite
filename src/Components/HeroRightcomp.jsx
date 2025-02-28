import { useEffect,useRef } from 'react';
import gsap from 'gsap'
import Heroright1 from "../assets/Hero-right1.png";
import Heroright2 from "../assets/Hero-right2.png";

const HeroRightcomp = () => {
    const boxesRef = useRef([]);

  useEffect(() => {
    boxesRef.current.forEach((box) => {
      gsap.to(box, {
        y: () => gsap.utils.random(-20, 20), // Random float movement
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
    <div className=''>
        <img ref={(el) => (boxesRef.current[0] = el)} src={Heroright1} className='' />
        <img  ref={(el) => (boxesRef.current[1] = el)} src={Heroright2} className='z-40 absolute top-20 right-12' />
    </div>
  )
}

export default HeroRightcomp