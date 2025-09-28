import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Wielogo from "/assets/wie_white.png";

const funMessages = [
  "Empowering Women in Engineering...",
  "Unleashing Creativity...",
  "Building the Future...",
  "Inspiring Innovation...",
  "Connecting Bright Minds...",
  "Loading Awesomeness..."
];

const SplashScreen = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(funMessages[0]);
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    // Cycle through fun messages
    const msgInterval = setInterval(() => {
      setMessage(funMessages[Math.floor(Math.random() * funMessages.length)]);
    }, 1200);
    // Animate loading dots
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingComplete();
    }, 2500);
    return () => {
      clearTimeout(timer);
      clearInterval(msgInterval);
      clearInterval(dotInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #742F8A 0%, #B08DB9 100%)",
            overflow: 'hidden'
          }}
        >
          {/* Animated background bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10 blur-2xl"
                style={{
                  width: `${80 + Math.random() * 80}px`,
                  height: `${80 + Math.random() * 80}px`,
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 20, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          <div className="relative flex flex-col items-center z-10">
            {/* Bouncing Logo */}
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: 1, y: [0, -20, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              src={Wielogo}
              alt="WIE Logo"
              className="w-32 h-32 mb-8 drop-shadow-2xl"
            />
            {/* Fun Loading Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-white text-xl font-semibold text-center"
            >
              {message}
              <span className="inline-block" style={{ letterSpacing: 2 }}>
                {'.'.repeat(dotCount)}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 