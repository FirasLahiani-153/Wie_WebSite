import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 0.1,
  stiffness = 0.5,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }) {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(0);
    const directionRef = useRef(1);
    const velocityRef = useRef(0);

    useGSAP(() => {
      if (!scrollerRef.current || copyWidth === 0) return;

      // Set initial position
      gsap.set(scrollerRef.current, { x: 0 });

      // Scroll listener for velocity calculation
      const handleScroll = () => {
        const now = performance.now();
        const deltaTime = now - lastTimeRef.current;
        
        if (deltaTime > 0) {
          const scrollContainer = scrollContainerRef?.current || window;
          const scrollY = scrollContainer === window ? scrollContainer.scrollY : scrollContainer.scrollTop;
          velocityRef.current = scrollY - (lastScrollRef.current || 0);
          lastScrollRef.current = scrollY;
        }
        lastTimeRef.current = now;
      };

      const lastScrollRef = { current: 0 };
      const scrollTarget = scrollContainerRef?.current || window;
      scrollTarget.addEventListener('scroll', handleScroll);

      // Animation loop
      animationRef.current = gsap.ticker.add(() => {
        if (!scrollerRef.current) return;

        const velocityFactor = gsap.utils.mapRange(
          velocityMapping.input[0],
          velocityMapping.input[1],
          velocityMapping.output[0],
          velocityMapping.output[1],
          Math.abs(velocityRef.current)
        );

        if (velocityRef.current < 0) {
          directionRef.current = -1;
        } else if (velocityRef.current > 0) {
          directionRef.current = 1;
        }

        const moveBy = directionRef.current * baseVelocity * gsap.ticker.deltaRatio() * 
                      (1 + directionRef.current * velocityFactor * stiffness);
        
        const currentX = gsap.getProperty(scrollerRef.current, "x");
        const newX = (parseFloat(currentX) + moveBy) % copyWidth;
        
        gsap.set(scrollerRef.current, {
          x: newX > 0 ? newX - copyWidth : newX,
          overwrite: true
        });
      });

      return () => {
        scrollTarget.removeEventListener('scroll', handleScroll);
        if (animationRef.current) gsap.ticker.remove(animationRef.current);
      };
    }, { dependencies: [copyWidth], scope: containerRef });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 1); i++) {
      spans.push(
        <span
          className={`flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </span>
      );
    }

    return (
      <div
        ref={containerRef}
        className={`${parallaxClassName} relative overflow-hidden`}
        style={parallaxStyle}
      >
        <div
          ref={scrollerRef}
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
          style={scrollerStyle}
        >
          {spans}
        </div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;