'use client';

import { motion } from 'framer-motion';

interface Floating3DOrbsProps {
  count?: number;
  variant?: 'gold' | 'green' | 'mixed';
  intensity?: 'subtle' | 'medium' | 'bold';
}

const COLOR_VARIANTS = {
  gold: ['#D4A017', '#F0C94B', '#A67C0F'],
  green: ['#0E5A3A', '#14805A', '#059669'],
  mixed: ['#D4A017', '#0E5A3A', '#14805A', '#059669', '#F0C94B'],
};

const INTENSITY_OPACITY = {
  subtle: 0.05,
  medium: 0.1,
  bold: 0.2,
};

export default function Floating3DOrbs({
  count = 6,
  variant = 'mixed',
  intensity = 'medium',
}: Floating3DOrbsProps) {
  const colors = COLOR_VARIANTS[variant];
  const baseOpacity = INTENSITY_OPACITY[intensity];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 200 + Math.random() * 400;
        const color = colors[i % colors.length];
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = 15 + Math.random() * 15;
        const delay = i * 0.5;
        const z = Math.random() * 200 - 100;

        return (
          <motion.div
            key={i}
            initial={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              opacity: baseOpacity,
              transform: `translateZ(${z}px)`,
              transformStyle: 'preserve-3d',
            }}
          />
        );
      })}

      {/* Floating particles for extra depth */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -150, 0],
            x: [0, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${20 + Math.random() * 60}%`,
            backgroundColor: colors[i % colors.length],
            boxShadow: `0 0 8px ${colors[i % colors.length]}, 0 0 16px ${colors[i % colors.length]}`,
          }}
        />
      ))}
    </div>
  );
}
