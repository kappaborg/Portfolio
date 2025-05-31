'use client';

import { motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const projects = [
  {
    id: 1,
    imageUrl: '/images/projects/Ip.png',
    url: 'https://ip-location-mapper-fin.vercel.app/',
    theme: 'God Eye'
  },
  {
    id: 2,
    imageUrl: '/images/projects/QuantumLogo.png',
    url: 'https://kappaborg.github.io/quantum-memory-compiler/',
    theme: 'Quantum Lab'
  },
  {
    id: 3,
    imageUrl: '/images/projects/Bosnia.png',
    url: 'https://bosnian-translation.vercel.app/',
    theme: 'Bosnia Learner'
  }
];

type OrbitClass = 'orbit-inner-1' | 'orbit-inner-2' | 'orbit-middle-1' | 'orbit-middle-2' | 'orbit-outer-1' | 'orbit-outer-2';

const orbits: Record<OrbitClass, number> = {
  'orbit-inner-1': 160,
  'orbit-inner-2': 185,
  'orbit-middle-1': 210,
  'orbit-middle-2': 235,
  'orbit-outer-1': 260,
  'orbit-outer-2': 285
};

interface SolarElement {
  id: string;
  orbitClass: OrbitClass;
  rotationDuration: number;
  startAngle: number;
  color: string;
  size: number;
}

const solarElements: SolarElement[] = [
  // İç Yörünge Elementleri (En Hızlı)
  {
    id: 'mercury',
    orbitClass: 'orbit-inner-1',
    rotationDuration: 15,
    startAngle: 45,
    color: '#c2c2c2',
    size: 0.6
  },
  {
    id: 'venus',
    orbitClass: 'orbit-inner-1',
    rotationDuration: 18,
    startAngle: 90,
    color: '#f4d03f',
    size: 0.8
  },
  {
    id: 'ceres',
    orbitClass: 'orbit-inner-1',
    rotationDuration: 20,
    startAngle: 135,
    color: '#a1887f',
    size: 0.55
  },
  {
    id: 'vesta',
    orbitClass: 'orbit-inner-1',
    rotationDuration: 22,
    startAngle: 180,
    color: '#8d6e63',
    size: 0.5
  },
  {
    id: 'pallas',
    orbitClass: 'orbit-inner-2',
    rotationDuration: 25,
    startAngle: 60,
    color: '#90a4ae',
    size: 0.45
  },
  {
    id: 'hygiea',
    orbitClass: 'orbit-inner-2',
    rotationDuration: 28,
    startAngle: 120,
    color: '#78909c',
    size: 0.4
  },
  {
    id: 'juno',
    orbitClass: 'orbit-inner-2',
    rotationDuration: 30,
    startAngle: 180,
    color: '#607d8b',
    size: 0.35
  },
  // Orta Yörünge Elementleri (Orta Hız)
  {
    id: 'earth',
    orbitClass: 'orbit-middle-1',
    rotationDuration: 35,
    startAngle: 0,
    color: '#3a82f7',
    size: 1
  },
  {
    id: 'mars',
    orbitClass: 'orbit-middle-1',
    rotationDuration: 40,
    startAngle: 90,
    color: '#e57373',
    size: 0.7
  },
  {
    id: 'jupiter',
    orbitClass: 'orbit-middle-1',
    rotationDuration: 45,
    startAngle: 180,
    color: '#ffa726',
    size: 1.2
  },
  {
    id: 'saturn',
    orbitClass: 'orbit-middle-1',
    rotationDuration: 50,
    startAngle: 270,
    color: '#ffee58',
    size: 1.1
  },
  {
    id: 'chiron',
    orbitClass: 'orbit-middle-2',
    rotationDuration: 55,
    startAngle: 45,
    color: '#81c784',
    size: 0.65
  },
  {
    id: 'pholus',
    orbitClass: 'orbit-middle-2',
    rotationDuration: 60,
    startAngle: 135,
    color: '#4db6ac',
    size: 0.55
  },
  {
    id: 'nessus',
    orbitClass: 'orbit-middle-2',
    rotationDuration: 65,
    startAngle: 225,
    color: '#4dd0e1',
    size: 0.45
  },
  // Dış Yörünge Elementleri (En Yavaş)
  {
    id: 'uranus',
    orbitClass: 'orbit-outer-1',
    rotationDuration: 70,
    startAngle: 0,
    color: '#81d4fa',
    size: 0.9
  },
  {
    id: 'neptune',
    orbitClass: 'orbit-outer-1',
    rotationDuration: 75,
    startAngle: 72,
    color: '#5c6bc0',
    size: 0.85
  },
  {
    id: 'pluto',
    orbitClass: 'orbit-outer-1',
    rotationDuration: 80,
    startAngle: 144,
    color: '#90a4ae',
    size: 0.5
  },
  {
    id: 'eris',
    orbitClass: 'orbit-outer-1',
    rotationDuration: 85,
    startAngle: 216,
    color: '#b39ddb',
    size: 0.65
  },
  {
    id: 'makemake',
    orbitClass: 'orbit-outer-2',
    rotationDuration: 90,
    startAngle: 0,
    color: '#80cbc4',
    size: 0.58
  },
  {
    id: 'haumea',
    orbitClass: 'orbit-outer-2',
    rotationDuration: 95,
    startAngle: 90,
    color: '#fff176',
    size: 0.62
  },
  {
    id: 'sedna',
    orbitClass: 'orbit-outer-2',
    rotationDuration: 100,
    startAngle: 180,
    color: '#ff8a65',
    size: 0.7
  },
  {
    id: 'quaoar',
    orbitClass: 'orbit-outer-2',
    rotationDuration: 105,
    startAngle: 270,
    color: '#9575cd',
    size: 0.55
  },
  {
    id: 'orcus',
    orbitClass: 'orbit-outer-2',
    rotationDuration: 110,
    startAngle: 45,
    color: '#7986cb',
    size: 0.48
  }
];

const planets = [
  {
    id: 'mercury',
    orbitIndex: 0,
    rotationSpeed: 1.2,
  },
  {
    id: 'venus',
    orbitIndex: 1,
    rotationSpeed: 0.8,
  },
  {
    id: 'earth',
    orbitIndex: 2,
    rotationSpeed: 1,
  },
  {
    id: 'mars',
    orbitIndex: 3,
    rotationSpeed: 1.5,
  },
];

const generateRandomPosition = () => {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 180 + 120; // 120px to 300px from center
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
};

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

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    if (autoRotate && !hoveredProject && !selectedProject) {
      const interval = setInterval(() => {
        setOrbitRotation(prev => (prev + (isMobileView ? 0.1 : 0.2)) % 360);
      }, isMobileView ? 100 : 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, hoveredProject, selectedProject, isMobileView]);

  const handleProjectClick = async (url: string, id: number) => {
    setSelectedProject(id);
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setSelectedProject(null);
  };

  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (360 / total) * index + orbitRotation;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, rotation: 0 };
  };

  return (
    <div className={`project-circle-container ${isMobileView ? 'scale-75 -mt-20' : ''}`}>
      {/* Orbit Rings */}
      {Object.entries(orbits).map(([orbitClass, radius]) => (
        <div key={orbitClass} className={`orbit-ring ${orbitClass}`} style={{
          width: `${radius * (isMobileView ? 1.5 : 2)}px`,
          height: `${radius * (isMobileView ? 1.5 : 2)}px`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(234, 88, 12, 0.15)',
          pointerEvents: 'none'
        }}>
          <motion.div
            className="ring-effect"
            animate={{ rotate: orbitClass.includes('inner') ? -360 : 360 }}
            transition={{
              duration: orbitClass.includes('inner') ? (isMobileView ? 90 : 60) : 
                       orbitClass.includes('middle') ? (isMobileView ? 120 : 80) : 
                       (isMobileView ? 150 : 100),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      ))}

      {/* Solar Elements */}
      <div className="solar-system">
        {solarElements.map((element, index) => {
          const radius = orbits[element.orbitClass] * (isMobileView ? 0.75 : 1);
          const position = calculatePosition(index, solarElements.length, radius);
          
          return (
            <motion.div
              key={element.id}
              className={`planet ${element.id}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%)`,
                width: `${20 * element.size * (isMobileView ? 0.75 : 1)}px`,
                height: `${20 * element.size * (isMobileView ? 0.75 : 1)}px`,
                background: `radial-gradient(circle at 30% 30%, ${element.color}, ${element.color}88)`,
                boxShadow: `0 0 15px ${element.color}44`,
                borderRadius: '50%',
                zIndex: 5,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
              }}
              animate={{
                x: position.x,
                y: position.y,
                rotate: [0, 360],
              }}
              transition={{
                rotate: {
                  duration: element.rotationDuration * (isMobileView ? 1.5 : 1),
                  repeat: Infinity,
                  ease: "linear"
                },
                x: { type: "spring", stiffness: 100, damping: 30 },
                y: { type: "spring", stiffness: 100, damping: 30 }
              }}
            />
          );
        })}
      </div>

      {/* Project Cards */}
      <div className="orbit-container">
        {projects.map((project, index) => {
          const position = calculatePosition(index, projects.length, isMobileView ? 160 : 220);
          const isHovered = hoveredProject === project.id;
          const isSelected = selectedProject === project.id;

          return (
            <motion.div
              key={project.id}
              className="project-orbit-item"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: isMobileView ? '70px' : '90px',
                height: isMobileView ? '70px' : '90px',
                transformOrigin: 'center center',
                zIndex: 10,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
              }}
              animate={{
                x: position.x,
                y: position.y,
                scale: isSelected ? 1.1 : 1,
                opacity: selectedProject && !isSelected ? 0.3 : 1,
                zIndex: isHovered ? 20 : 10,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30
              }}
              onHoverStart={() => {
                if (!isMobileView) {
                  setHoveredProject(project.id);
                  setAutoRotate(false);
                }
              }}
              onHoverEnd={() => {
                if (!isMobileView) {
                  setHoveredProject(null);
                  setAutoRotate(true);
                }
              }}
              onClick={() => handleProjectClick(project.url, project.id)}
            >
              <motion.div 
                className="project-card"
                whileHover={!isMobileView ? { scale: 1.15 } : {}}
                whileTap={{ scale: 0.95 }}
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(10, 10, 10, 0.95)',
                  borderRadius: '20px',
                  border: '1px solid rgba(234, 88, 12, 0.2)',
                  overflow: 'hidden',
                  padding: '0',
                  boxSizing: 'border-box',
                  position: 'relative',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                <motion.img
                  src={project.imageUrl}
                  alt={`${project.theme} project`}
                  style={{
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    imageRendering: '-webkit-optimize-contrast',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                  animate={{
                    scale: isHovered && !isMobileView ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Central Hub */}
      <motion.div 
        className="central-hub"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: isMobileView ? 45 : 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          width: isMobileView ? '100px' : '150px',
          height: isMobileView ? '100px' : '150px',
          left: `calc(50% - ${isMobileView ? '50px' : '75px'})`,
          top: `calc(50% - ${isMobileView ? '50px' : '75px'})`,
        }}
        onHoverStart={() => !isMobileView && setAutoRotate(false)}
        onHoverEnd={() => !isMobileView && setAutoRotate(true)}
      >
        <motion.div 
          className="hub-inner"
          style={{
            width: isMobileView ? '90px' : '135px',
            height: isMobileView ? '90px' : '135px',
          }}
        >
          <div className="hub-content">
            <div className="hub-text-container">
              <h2 className="hub-text" style={{ fontSize: isMobileView ? '0.75rem' : '0.85rem' }}>
                PORTFOLIO
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Constellation Effect */}
      <div className="constellation">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ scale: Math.random() * 0.5 + 0.5 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCircle;