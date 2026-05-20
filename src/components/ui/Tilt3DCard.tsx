'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  scale?: number;
}

export default function Tilt3DCard({
  children,
  className = '',
  intensity = 15,
  glowColor = '#0E5A3A',
  scale = 1.02,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 25,
  });

  // Glow position follows cursor
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`relative ${className}`}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${glowColor}40, transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content with 3D depth */}
      <div style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
        style={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
            x: useTransform(mouseX, [-0.5, 0.5], ['-100%', '100%']),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
