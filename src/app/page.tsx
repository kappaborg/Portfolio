'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import Scene from '@/components/Scene';

const projects = [
  {
    id: 1,
    title: "IP Location Mapper",
    description: "Real-time IP tracking with weather and aviation data",
    url: "https://ip-location-mapper-fin.vercel.app/",
    icon: "🌍",
    color: "from-blue-500 to-cyan-500"
  },
  // Add your other 3 projects here
];

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Welcome to My Universe
            </h1>
            <p className="text-xl text-gray-300">
              Explore my collection of web applications
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatePresence>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}