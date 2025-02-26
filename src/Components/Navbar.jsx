import React, { useRef } from 'react';
import Wielogo from '../assets/wie_white.png';
import Button from './Button';
import gsap from 'gsap';

const Navbar = () => {
  // Refs for the underline elements
  const underlineRefs = useRef([]);

  // Function to handle hover animation
  const handleHover = (index) => {
    gsap.to(underlineRefs.current[index], {
      width: '100%',
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  // Function to handle hover out animation
  const handleHoverOut = (index) => {
    gsap.to(underlineRefs.current[index], {
      width: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-0 z-50 p-4 min-w-72">
      <div className="container mx-auto flex justify-between items-center">
        <img src={Wielogo} className="h-20 w-20" alt="Logo" />
        <ul className="flex space-x-4 items-center gap-6">
          {['Home', 'About', 'Activities', 'Events'].map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHoverOut(index)}
              className="relative"
            >
              <a href="#" className="text-white text-xl font-bold">
                {item}
              </a>
              <div
                ref={(el) => (underlineRefs.current[index] = el)} // Store ref for each underline
                className="border-t-4 border-white rounded-xl absolute bottom-[-4px] left-0 w-0"
              />
            </li>
          ))}
          <li>
            <Button />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;