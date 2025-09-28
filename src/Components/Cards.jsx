import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Cards = ({ path, name, post, social = {} }) => {
  const cardRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  const iconsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    // Initial hidden state for all elements
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95
    });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      delay: 0.3 
    });

    // Whole card animation
    tl.to(cardRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)"
    });

    // Inner elements animation (staggered)
    tl.fromTo([imageRef.current, contentRef.current, ...iconsRef.current], 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

  }, { scope: cardRef });

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(contentRef.current, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group max-w-xs rounded-2xl h-max overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        boxShadow: isHovered 
          ? '0 8px 32px rgba(236, 72, 153, 0.15)'
          : '0 4px 30px rgba(236, 72, 153, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
      }}
    >
      {/* Card Header with Image */}
      <div 
        ref={imageRef} 
        className="h-80 w-full overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        <img
          src={path}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#742F8A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
      </div>

      {/* Card Body */}
      <div 
        ref={contentRef} 
        className="px-6 py-6 text-center relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
          {name}
        </h2>
        <p className="text-white/90 font-medium tracking-wide">{post}</p>
      </div>

      {/* Card Footer with Social Icons */}
      <div className="flex justify-center gap-6 py-4 bg-white/8">
        {[
          { id: 'facebook', url: social.facebook, color: 'rgba(59, 89, 152, 0.9)', bg: 'rgba(59, 89, 152, 0.15)' },
          { id: 'instagram', url: social.instagram, color: 'rgba(225, 48, 108, 0.9)', bg: 'rgba(225, 48, 108, 0.15)' },
          { id: 'linkedin', url: social.linkedin, color: 'rgba(0, 119, 181, 0.9)', bg: 'rgba(0, 119, 181, 0.15)' }
        ].map((platform, index) => (
          <a 
            key={platform.id}
            ref={el => iconsRef.current[index] = el}
            href={platform.url || '#'} 
            target={platform.url ? "_blank" : "_self"}
            rel={platform.url ? "noopener noreferrer" : ""}
            className={`transform transition-all duration-300 hover:scale-110 ${!platform.url ? 'opacity-50 cursor-default' : 'hover:opacity-80'}`}
            onClick={!platform.url ? (e) => e.preventDefault() : undefined}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ background: platform.bg }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ color: platform.color }}
              >
                {platform.id === 'facebook' ? (
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                ) : platform.id === 'instagram' ? (
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Cards;