import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SplitText = ({
  text = '',
  className = '',
  delay = 0.1,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef();
  const lettersRef = useRef([]);
  
  // Split text into words and letters
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();

  useGSAP(() => {
    // Initialize animations
    gsap.set(lettersRef.current, animationFrom);
  }, { scope: containerRef });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateLetters();
          observer.unobserve(containerRef.current);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const animateLetters = () => {
    let completedCount = 0;
    
    lettersRef.current.forEach((letter, i) => {
      gsap.to(letter, {
        ...animationTo,
        delay: i * delay,
        ease,
        duration: 0.8,
        onComplete: () => {
          completedCount++;
          if (completedCount === letters.length && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
      });
    });
  };

  return (
    <p
      ref={containerRef}
      className={`split-parent inline ${className}`}
      style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <span
                key={index}
                ref={el => lettersRef.current[index] = el}
                className="inline-block will-change-transform"
              >
                {letter}
              </span>
            );
          })}
          <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;