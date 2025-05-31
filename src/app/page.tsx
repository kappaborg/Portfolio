'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-400">Coming soon...</p>
      </motion.div>
    </main>
  );
}