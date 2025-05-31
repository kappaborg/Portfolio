'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy loaded components
const ProjectCircle = dynamic(() => import('@/components/ProjectCircle'), {
  loading: () => <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
  </div>,
  ssr: false
});

const Header = dynamic(() => import('@/components/Header'), {
  ssr: true
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true
});

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      <CustomCursor />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[rgba(234,88,12,0.05)] to-transparent pointer-events-none" />
      
      {/* Animated particles or stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: Math.random() * 0.5 + 0.25,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{ 
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Header Section */}
        <Suspense fallback={
          <div className="w-full h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        }>
          <div className="mb-20">
            <Header />
          </div>
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={
          <div className="w-full h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        }>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex-1 flex items-start justify-center relative z-20 -mt-10"
          >
            <ProjectCircle />
          </motion.div>
        </Suspense>

        {/* Footer */}
        <Suspense fallback={
          <div className="w-full h-16 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        }>
          <Footer />
        </Suspense>
      </motion.div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-l from-orange-500/10 to-transparent rounded-full blur-xl" />
      </div>
    </main>
  );
}