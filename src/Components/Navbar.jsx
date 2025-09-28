import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Wielogo from "/assets/wie_white.png";
import Button from "./Button";
import ContactForm from "./ContactForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const underlineRefs = useRef([]);
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHover = (index) => {
    gsap.to(underlineRefs.current[index], {
      width: "100%",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleHoverOut = (index) => {
    gsap.to(underlineRefs.current[index], {
      width: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleSmoothScroll = (e, href) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);

      // If we're on the admin page, navigate to home first
      if (location.pathname === "/admin") {
        navigate(`/${href}`);
        return;
      }

      // If we're on the home page, do smooth scrolling
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - 100; // 100px offset from top
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 2000; // 2 seconds for slower animation
        let start = null;

        const animation = (currentTime) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuad(
            timeElapsed,
            startPosition,
            distance,
            duration
          );
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const easeInOutQuad = (t, b, c, d) => {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
      }
    }
  };

  useGSAP(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: " 0 4 ",
      end: "+=100",
      scrub: true,
      onEnter: () => {
        navbarRef.current.classList.add(
          "bg-primary/20",
          "backdrop-blur-sm",
          "shadow-lg"
        );
      },
      onLeaveBack: () => {
        navbarRef.current.classList.remove(
          "bg-primary/20",
          "backdrop-blur-sm",
          "shadow-lg"
        );
      },
    });
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Activities", href: "#activities" },
    { name: "Events", href: "#events" },
    { name: "Growth", href: "#growth" },
    { name: "Social Media", href: "#social" },
    { name: "WIE ACT 4.O", href: "https://wieact4.vercel.app" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/admin") {
      navigate("/");
    } else {
      handleSmoothScroll(e, "#home");
    }
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-10 left-0 w-full z-[1001] p-2 min-w-72 transition-colors duration-300"
      >
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" onClick={handleHomeClick}>
            <img
              src={Wielogo}
              className="h-[50px] w-[50px] sm:h-[65px] sm:w-[65px]"
              alt="Logo"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 z-[1002]"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 items-center gap-6">
            {navItems.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHoverOut(index)}
                className="relative"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-white text-xl font-medium font-roboto cursor-pointer"
                >
                  {item.name}
                </a>
                <div
                  ref={(el) => (underlineRefs.current[index] = el)}
                  className="border-t-[3px] border-white rounded-xl absolute bottom-[-4px] left-0 w-0"
                />
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors duration-300"
          >
            Contact
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-[1000] transition-opacity duration-300"
              onClick={toggleMenu}
            />
          )}

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-[280px] bg-primary/80 backdrop-blur-xl transition-all duration-500 ease-in-out transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden z-[1001] shadow-2xl border-l border-white/10`}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-white/10">
                <a href="#home" onClick={handleHomeClick}>
                  <img src={Wielogo} className="h-[50px] w-[50px]" alt="Logo" />
                </a>
              </div>
              <ul className="flex flex-col py-6">
                {navItems.map((item, index) => (
                  <li key={index} className="w-full">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        handleSmoothScroll(e, item.href);
                        setIsMenuOpen(false);
                      }}
                      className="block text-white text-lg font-medium font-roboto py-4 px-6 hover:bg-white/10 transition-all duration-300 border-l-4 border-transparent hover:border-white cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li className="px-6 py-4">
                  <button
                    onClick={() => {
                      setIsContactOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors duration-300"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};

export default Navbar;
