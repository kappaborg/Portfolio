'use client';

import { motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    imageUrl: '/images/projects/Ip.png',
    url: 'https://ip-location-mapper-fin.vercel.app/',
    theme: 'God Eye',
    description: 'IP Location Tracking System',
    tech: ['Next.js', 'Leaflet', 'TailwindCSS']
  },
  {
    id: 2,
    imageUrl: '/images/projects/QuantumLogo.png',
    url: 'https://kappaborg.github.io/quantum-memory-compiler/',
    theme: 'Quantum Lab',
    description: 'Quantum Computing Interface',
    tech: ['React', 'TypeScript', 'WebAssembly']
  },
  {
    id: 3,
    imageUrl: '/images/projects/Bosnia.png',
    url: 'https://bosnian-translation.vercel.app/',
    theme: 'Bosnia Learner',
    description: 'Language Learning Platform',
    tech: ['Next.js', 'AI', 'TailwindCSS']
  }
];

const ProjectCircle = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const controls = useAnimation();
  const isMobile = useCallback(() => window.innerWidth <= 768, []);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      if (autoRotate && !hoveredProject && !selectedProject) {
        setOrbitRotation(prev => (prev + (isMobileView ? 0.1 : 0.2)) % 360);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (autoRotate && !hoveredProject && !selectedProject) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [autoRotate, hoveredProject, selectedProject, isMobileView]);

  const handleProjectClick = useCallback(async (url: string, id: number) => {
    setSelectedProject(id);
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setSelectedProject(null);
  }, [controls]);

  const calculatePosition = useCallback((index: number, total: number, radius: number) => {
    const angle = (360 / total) * index + orbitRotation;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
      rotation: angle
    };
  }, [orbitRotation]);

  return (
    <div className="project-circle-container">
      <motion.div 
        className="projects-orbit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {projects.map((project, index) => {
          const position = calculatePosition(
            index,
            projects.length,
            isMobileView ? 160 : 220
          );
          const isHovered = hoveredProject === project.id;

          return (
            <motion.div
              key={project.id}
              className="project-card-container"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: isMobileView ? '120px' : '180px',
                height: isMobileView ? '120px' : '180px',
                transformOrigin: '50% 50%',
              }}
              animate={{
                x: position.x,
                y: position.y,
                rotate: position.rotation,
                scale: isHovered ? 1.1 : 1,
                zIndex: isHovered ? 10 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onHoverStart={() => !isMobileView && setHoveredProject(project.id)}
              onHoverEnd={() => !isMobileView && setHoveredProject(null)}
              onClick={() => handleProjectClick(project.url, project.id)}
            >
              <motion.div
                className="project-card"
                initial={false}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  boxShadow: isHovered
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.theme}
                    fill
                    sizes="(max-width: 768px) 120px, 180px"
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-white text-lg font-bold mb-1">{project.theme}</h3>
                    <p className="text-white text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-white bg-opacity-20 rounded px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="central-hub"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="hub-content">
          <h2 className="hub-text">PORTFOLIO</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCircle;