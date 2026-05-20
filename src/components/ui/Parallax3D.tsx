'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Parallax3DProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  depth?: 'shallow' | 'medium' | 'deep';
}

/**
 * Wraps content with 3D parallax effect on scroll.
 * Different depths create different parallax speeds for layered 3D feel.
 */
export default function Parallax3D({
  children,
  speed = 50,
  className = '',
  depth = 'medium',
}: Parallax3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const depthMap = {
    shallow: speed * 0.5,
    medium: speed,
    deep: speed * 1.5,
  };

  const actualSpeed = depthMap[depth];

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [actualSpeed, -actualSpeed]), {
    stiffness: 100,
    damping: 30,
  });

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]),
    { stiffness: 100, damping: 30 }
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
