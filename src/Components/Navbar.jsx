import React, { useEffect, useRef } from 'react';
import Wielogo from "../assets/wie_white.png";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const underlineRefs = useRef([]);
  const navbarRef = useRef(null);

  const handleHover = (index) => {
    gsap.to(underlineRefs.current[index], {
      width: "100%",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleHoverOut = (index) => {
    gsap.to(underlineRefs.current[index], {
      width: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  
  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '+=100',
      scrub: true,
      onEnter: () => {
        navbarRef.current.classList.add('bg-primary/20', 'backdrop-blur-sm', 'shadow-lg');
      },
      onLeaveBack: () => {
        navbarRef.current.classList.remove('bg-primary/20', 'backdrop-blur-sm', 'shadow-lg');
      },
    });

    
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 p-4 min-w-72  transition-colors duration-300"
    >
      <div className="container mx-auto flex justify-between items-center">
        <img src={Wielogo} className="h-[65px] w-[65px]" alt="Logo" />
        <ul className="flex space-x-4 items-center gap-6">
          {["Home", "About", "Activities", "Events"].map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHoverOut(index)}
              className="relative"
            >
              <a
                href="#"
                className="text-white text-xl font-medium font-roboto"
              >
                {item}
              </a>
              <div
                ref={(el) => (underlineRefs.current[index] = el)}
                className="border-t-[3px] border-white rounded-xl absolute bottom-[-4px] left-0 w-0"
              />
            </li>
          ))}
          <li>
            <Button text="Contact" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;