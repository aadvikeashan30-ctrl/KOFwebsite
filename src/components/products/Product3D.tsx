'use client';

import { useState } from 'react';

interface Product3DProps {
  type: 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled';
  className?: string;
}

const configs = {
  sunflower: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24', name: 'SUNGOLD', sub: 'Sunflower Oil', emoji: '🌻' },
  groundnut: { primary: '#c2410c', secondary: '#9a3412', accent: '#ea580c', name: 'SAFAL', sub: 'Groundnut Oil', emoji: '🥜' },
  palmolein: { primary: '#059669', secondary: '#047857', accent: '#10b981', name: 'SAFAL', sub: 'Palmolein Oil', emoji: '🌴' },
  soyabean: { primary: '#65a30d', secondary: '#4d7c0f', accent: '#84cc16', name: 'SAFAL', sub: 'Soyabean Oil', emoji: '🫘' },
  ricebran: { primary: '#7c3aed', secondary: '#6d28d9', accent: '#a78bfa', name: 'SAFAL', sub: 'Rice Bran Oil', emoji: '🌾' },
  deoiled: { primary: '#92400e', secondary: '#78350f', accent: '#b45309', name: 'KOF', sub: 'De-oiled Cake', emoji: '📦' },
};

export default function Product3D({ type, className = '' }: Product3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const config = configs[type];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 20);
    setRotateX(-y * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}>
      <div className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
        
        {/* 3D Bottle */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Shadow */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-4 rounded-full blur-md opacity-30" style={{ background: config.primary }} />
          
          {/* Bottle SVG */}
          <svg viewBox="0 0 180 320" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`bottle-grad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={config.secondary} />
                <stop offset="35%" stopColor={config.primary} />
                <stop offset="65%" stopColor={config.accent} />
                <stop offset="100%" stopColor={config.secondary} />
              </linearGradient>
              <linearGradient id={`shine-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
              <filter id={`glow-${type}`}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {type !== 'deoiled' ? (
              <>
                {/* Cap */}
                <rect x="72" y="15" width="36" height="30" rx="6" fill={config.secondary} />
                <rect x="68" y="40" width="44" height="10" rx="3" fill={config.secondary} opacity="0.8" />
                {/* Cap shine */}
                <rect x="74" y="17" width="8" height="26" rx="3" fill="white" opacity="0.2" />

                {/* Neck */}
                <rect x="76" y="50" width="28" height="35" rx="2" fill={`url(#bottle-grad-${type})`} />

                {/* Body */}
                <path d="M60 85 Q55 90 50 110 L45 260 Q45 285 65 295 L115 295 Q135 285 135 260 L130 110 Q125 90 120 85 Z"
                  fill={`url(#bottle-grad-${type})`} />

                {/* 3D shine effect */}
                <path d="M65 90 Q62 95 58 115 L54 255 Q54 275 68 283 L78 285 L78 120 Q72 100 65 90 Z"
                  fill={`url(#shine-${type})`} />

                {/* Label */}
                <rect x="55" y="130" width="70" height="100" rx="8" fill="white" opacity="0.95" filter={`url(#glow-${type})`} />
                <rect x="58" y="133" width="64" height="94" rx="6" fill="white" stroke={config.primary} strokeWidth="2" />
                
                {/* Label content */}
                <text x="90" y="162" textAnchor="middle" fill={config.primary} fontWeight="900" fontSize="18" fontFamily="sans-serif">{config.name}</text>
                <text x="90" y="180" textAnchor="middle" fill="#4b5563" fontSize="9" fontFamily="sans-serif">{config.sub}</text>
                
                {/* AGMARK circle */}
                <circle cx="90" cy="205" r="14" fill={config.primary} opacity="0.1" />
                <circle cx="90" cy="205" r="14" fill="none" stroke={config.primary} strokeWidth="1" strokeDasharray="3" />
                <text x="90" y="208" textAnchor="middle" fill={config.primary} fontSize="7" fontWeight="bold" fontFamily="sans-serif">AGMARK</text>

                {/* Bottom reflection */}
                <ellipse cx="90" cy="300" rx="40" ry="6" fill={config.primary} opacity="0.08" />
              </>
            ) : (
              <>
                {/* Bag shape */}
                <path d="M40 60 L55 30 L125 30 L140 60 L145 270 Q145 290 130 295 L50 295 Q35 290 35 270 Z" fill={config.primary} />
                <path d="M45 65 L57 35 L123 35 L135 65 L138 265 Q138 282 126 287 L54 287 Q42 282 42 265 Z" fill="#fef3c7" />
                {/* Label */}
                <rect x="55" y="90" width="70" height="80" rx="5" fill="white" stroke={config.primary} strokeWidth="1.5" />
                <text x="90" y="120" textAnchor="middle" fill={config.primary} fontWeight="900" fontSize="18" fontFamily="sans-serif">KOF</text>
                <text x="90" y="140" textAnchor="middle" fill="#4b5563" fontSize="9" fontFamily="sans-serif">De-oiled Cake</text>
                <text x="90" y="155" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="sans-serif">High Protein Feed</text>
                {/* Weight */}
                <rect x="60" y="200" width="60" height="25" rx="4" fill={config.primary} />
                <text x="90" y="217" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">50 KG</text>
              </>
            )}
          </svg>

          {/* Floating emoji */}
          <span className="absolute top-2 right-2 text-2xl animate-bounce" style={{ animationDuration: '2s' }}>
            {config.emoji}
          </span>
        </div>
      </div>
    </div>
  );
}
