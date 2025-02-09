'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedLogo() {
  const { theme } = useTheme();
  const [isBlinking, setIsBlinking] = useState(false);

  // Mouse/Gyroscope takibi için spring animasyonları
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Göz bebeği pozisyonu için transform değerleri
  const pupilX = useTransform(springX, [-100, 100], [-10, 10]);
  const pupilY = useTransform(springY, [-100, 100], [-10, 10]);

  // Scroll pozisyonuna göre göz hareketi
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollY / maxScroll;
      y.set(scrollPercentage * 20 - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  // Mouse hareketi takibi
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      x.set((clientX - centerX) / centerX * 100);
      y.set((clientY - centerY) / centerY * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  // Gyroscope sensörü takibi
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // Cihaz eğimine göre göz bebeği hareketi
        x.set(e.gamma);
        y.set(e.beta / 2);
      }
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [x, y]);

  // Otomatik göz kırpma
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 4000 + 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className="relative w-32 h-32 mx-auto cursor-pointer"
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {/* Dış halka ve enerji dalgaları */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-blue-500 dark:border-blue-400"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
          filter: theme === 'dark' ? 
            ['brightness(1) drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'] : 
            ['brightness(1.2) drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Göz kapağı */}
      <motion.div
        className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden"
        animate={{
          scaleY: isBlinking ? 0.1 : 1
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut"
        }}
      >
        {/* Göz bebeği ve iris */}
        <motion.div
          className="absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            x: pupilX,
            y: pupilY,
          }}
        >
          {/* İris */}
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Göz bebeği */}
            <motion.div
              className="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full"
              animate={{
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Göz parıltısı */}
              <motion.div
                className="absolute w-2 h-2 bg-white rounded-full top-1 left-1 opacity-80"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Radar ve enerji dalgaları efektleri */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-blue-500/20 dark:border-blue-400/20 rounded-full"
          animate={{
            scale: [1, 2],
            opacity: [0.15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
} 