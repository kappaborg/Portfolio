'use client';

import { motion } from 'framer-motion';
import { KeyboardEvent } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  tech: string[];
}

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function ProjectCard({ project, isHovered, onHover, onLeave }: ProjectCardProps) {
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.open(project.url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onKeyPress={handleKeyPress}
      role="link"
      tabIndex={0}
      aria-label={`${project.title} - ${project.description}. Press Enter to visit project.`}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl p-6 h-80
          bg-gradient-to-br ${project.color}
          backdrop-blur-lg border border-white/10
          transition-all duration-300 ease-out
          ${isHovered ? 'shadow-2xl shadow-white/10' : 'shadow-lg'}
          focus:outline-none focus:ring-2 focus:ring-white/50
          focus-visible:ring-2 focus-visible:ring-white/50
        `}
      >
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-white/10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
            animate={{
              opacity: isHovered ? 0.2 : 0.1,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.span
            className="text-5xl mb-6 block"
            animate={{
              rotateY: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
            role="img"
            aria-label={`${project.title} icon: ${project.icon}`}
          >
            {project.icon}
          </motion.span>
          <h3 className="text-2xl font-bold mb-2 bg-clip-text">{project.title}</h3>
          <p className="text-white/80 mb-4">{project.description}</p>
          
          {/* Technology Tags */}
          <div 
            className="flex flex-wrap gap-2 mt-4"
            role="list"
            aria-label="Technologies used"
          >
            {project.tech.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-lg"
                role="listitem"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-4 right-4 flex items-center gap-2"
          aria-hidden={!isHovered}
        >
          <span className="text-sm font-medium">Explore Project</span>
          <motion.span
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}