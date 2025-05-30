'use client';

import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function ProjectCard({ project, isHovered, onHover, onLeave }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        <div className={`
          relative overflow-hidden rounded-2xl p-6 h-64
          bg-gradient-to-br ${project.color}
          backdrop-blur-lg border border-white/10
          transition-all duration-300 ease-out
          ${isHovered ? 'shadow-2xl shadow-white/10' : 'shadow-lg'}
        `}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/10" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">{project.icon}</span>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-white/80">{project.description}</p>
          </div>

          {/* Hover Effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-4 right-4"
          >
            <span className="text-sm font-medium">
              Visit Project →
            </span>
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
}