'use client';

import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const controls = useAnimation();

  // Optimize scroll-based animations
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  // Optimize mouse move handler with useCallback and debounce
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  // Optimize rotation calculation with useCallback
  const calculateRotation = useCallback(() => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    const element = document.querySelector('.title-container');
    if (!element) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = -(mousePosition.y - centerY) / 30;
    const rotateY = (mousePosition.x - centerX) / 30;

    return {
      x: Math.min(Math.max(rotateX, -10), 10),
      y: Math.min(Math.max(rotateY, -10), 10)
    };
  }, [mousePosition]);

  useEffect(() => {
    const newRotation = calculateRotation();
    requestAnimationFrame(() => {
      setRotation(newRotation);
    });
  }, [calculateRotation]);

  // Optimize Matrix rain effect with memoization
  const createMatrixRain = useCallback(() => {
    if (!matrixActive) return null;
    
    return Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="matrix-column"
        style={{
          left: `${i * 5}%`,
          animationDelay: `${Math.random() * 2}s`
        }}
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 2
        }}
      >
        {Array.from({ length: 20 }).map((_, j) => (
          <span key={j}>
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </span>
        ))}
      </motion.div>
    ));
  }, [matrixActive]);

  // Optimize hidden symbols with hardware acceleration
  const createHiddenSymbols = useCallback(() => {
    const symbols = ['⌘', '⚡', '⚛', '∞', '⚔'];
    return symbols.map((symbol, i) => (
      <motion.div
        key={i}
        className="symbol"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: i * 0.1,
          ease: 'easeOut'
        }}
      >
        {symbol}
      </motion.div>
    ));
  }, []);

  const handleTitleClick = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
    setMatrixActive(prev => !prev);
  }, []);

  return (
    <header className="header-container">
      <motion.div 
        className={`title-container ${isGlitching ? 'glitch' : ''}`}
        style={{
          opacity: headerOpacity,
          scale: headerScale,
          rotateX: rotation.x,
          rotateY: rotation.y,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        onClick={handleTitleClick}
      >
        <h1 className="main-title" data-text="kappasutra">
          kappasutra
        </h1>
        <div className="title-glow" />
        <div className="matrix-overlay">
          {createMatrixRain()}
        </div>
        <div className="hidden-symbols">
          {createHiddenSymbols()}
        </div>
      </motion.div>

      <div className="header-decorations">
        <motion.div 
          className="decoration-circle"
          style={{
            left: '10%',
            background: 'radial-gradient(circle at center, rgba(234, 88, 12, 0.2), transparent)',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.div 
          className="decoration-circle"
          style={{
            right: '10%',
            background: 'radial-gradient(circle at center, rgba(234, 88, 12, 0.15), transparent)',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </header>
  );
};

export default Header; 