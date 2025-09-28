import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CardAct = ({ path, title, text }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(icon, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.2")
    .to(content, {
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.2");

    card.addEventListener("mouseenter", () => tl.play());
    card.addEventListener("mouseleave", () => tl.reverse());

    return () => {
      card.removeEventListener("mouseenter", () => tl.play());
      card.removeEventListener("mouseleave", () => tl.reverse());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-sm bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl hover:border-white/40 transition-all duration-300"
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(16px)'
      }}
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-lg" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#742F8A]/20 to-[#B08DB9]/20 rounded-full" />
        <img
          ref={iconRef}
          src={path}
          alt={title}
          className="relative w-full h-full object-contain p-4 transition-transform duration-300 filter brightness-110 contrast-110"
          style={{
            filter: 'invert(0.2) sepia(0.3) saturate(1.5) hue-rotate(290deg) brightness(0.9) contrast(1.1)'
          }}
        />
      </div>
      
      <div ref={contentRef} className="text-center">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CardAct;
