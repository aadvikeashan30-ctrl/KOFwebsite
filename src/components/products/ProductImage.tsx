'use client';

interface ProductImageProps {
  type: 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled';
  className?: string;
}

export default function ProductImage({ type, className = '' }: ProductImageProps) {
  const configs = {
    sunflower: {
      gradient: 'from-amber-400 via-yellow-300 to-orange-400',
      bottle: '#f59e0b',
      cap: '#d97706',
      label: 'SUNGOLD',
      sublabel: 'Sunflower Oil',
      flower: true,
    },
    groundnut: {
      gradient: 'from-amber-700 via-orange-600 to-red-700',
      bottle: '#c2410c',
      cap: '#9a3412',
      label: 'SAFAL',
      sublabel: 'Groundnut Oil',
      flower: false,
    },
    palmolein: {
      gradient: 'from-green-500 via-emerald-400 to-teal-500',
      bottle: '#059669',
      cap: '#047857',
      label: 'SAFAL',
      sublabel: 'Palmolein Oil',
      flower: false,
    },
    soyabean: {
      gradient: 'from-lime-500 via-green-400 to-emerald-500',
      bottle: '#65a30d',
      cap: '#4d7c0f',
      label: 'SAFAL',
      sublabel: 'Soyabean Oil',
      flower: false,
    },
    ricebran: {
      gradient: 'from-purple-500 via-violet-400 to-indigo-500',
      bottle: '#7c3aed',
      cap: '#6d28d9',
      label: 'SAFAL',
      sublabel: 'Rice Bran Oil',
      flower: false,
    },
    deoiled: {
      gradient: 'from-yellow-700 via-amber-600 to-orange-700',
      bottle: '#92400e',
      cap: '#78350f',
      label: 'KOF',
      sublabel: 'De-oiled Cake',
      flower: false,
    },
  };

  const config = configs[type];

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 rounded-full blur-2xl scale-75`} />
      
      <svg viewBox="0 0 200 280" className="w-full h-full relative z-10 drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
        {/* Oil Bottle */}
        {type !== 'deoiled' ? (
          <>
            {/* Bottle cap */}
            <rect x="82" y="20" width="36" height="25" rx="4" fill={config.cap} />
            <rect x="78" y="40" width="44" height="8" rx="2" fill={config.cap} opacity="0.8" />
            
            {/* Bottle neck */}
            <path d="M85 48 L85 70 Q85 75 80 80 L80 80" fill={config.bottle} opacity="0.9" />
            <path d="M115 48 L115 70 Q115 75 120 80 L120 80" fill={config.bottle} opacity="0.9" />
            <rect x="85" y="48" width="30" height="30" fill={config.bottle} opacity="0.9" />
            
            {/* Bottle body */}
            <path d="M70 80 Q65 85 60 100 L55 220 Q55 240 70 250 L130 250 Q145 240 145 220 L140 100 Q135 85 130 80 Z" 
                  fill={config.bottle} />
            
            {/* Bottle highlight */}
            <path d="M75 85 Q72 90 68 105 L64 215 Q64 230 75 238 L85 240 L85 100 Q82 90 75 85 Z" 
                  fill="white" opacity="0.2" />
            
            {/* Label background */}
            <rect x="65" y="110" width="70" height="90" rx="5" fill="white" opacity="0.95" />
            <rect x="67" y="112" width="66" height="86" rx="4" fill="white" stroke={config.cap} strokeWidth="1.5" />
            
            {/* Label text */}
            <text x="100" y="140" textAnchor="middle" fill={config.cap} fontWeight="bold" fontSize="16" fontFamily="sans-serif">
              {config.label}
            </text>
            <text x="100" y="158" textAnchor="middle" fill="#374151" fontSize="8" fontFamily="sans-serif">
              {config.sublabel}
            </text>
            
            {/* AGMARK badge */}
            <circle cx="100" cy="178" r="12" fill={config.cap} opacity="0.15" />
            <text x="100" y="181" textAnchor="middle" fill={config.cap} fontSize="6" fontWeight="bold" fontFamily="sans-serif">
              AGMARK
            </text>
            
            {/* Oil drops */}
            <ellipse cx="100" cy="260" rx="35" ry="5" fill={config.bottle} opacity="0.1" />

            {/* Sunflower decoration for Sungold */}
            {config.flower && (
              <>
                <circle cx="155" cy="60" r="15" fill="#fbbf24" />
                <circle cx="155" cy="60" r="8" fill="#92400e" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx={155 + Math.cos((angle * Math.PI) / 180) * 18}
                    cy={60 + Math.sin((angle * Math.PI) / 180) * 18}
                    rx="6"
                    ry="3"
                    fill="#f59e0b"
                    transform={`rotate(${angle} ${155 + Math.cos((angle * Math.PI) / 180) * 18} ${60 + Math.sin((angle * Math.PI) / 180) * 18})`}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          /* De-oiled cake bag */
          <>
            <rect x="45" y="50" width="110" height="150" rx="8" fill={config.bottle} />
            <rect x="50" y="55" width="100" height="140" rx="6" fill="#fef3c7" />
            <path d="M45 50 L60 30 L140 30 L155 50" fill={config.cap} />
            
            {/* Bag label */}
            <rect x="60" y="75" width="80" height="60" rx="3" fill="white" stroke={config.cap} strokeWidth="1" />
            <text x="100" y="100" textAnchor="middle" fill={config.cap} fontWeight="bold" fontSize="14" fontFamily="sans-serif">
              KOF
            </text>
            <text x="100" y="118" textAnchor="middle" fill="#374151" fontSize="8" fontFamily="sans-serif">
              De-oiled Cake
            </text>
            <text x="100" y="130" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily="sans-serif">
              High Protein Cattle Feed
            </text>
            
            {/* Weight marking */}
            <rect x="70" y="155" width="60" height="20" rx="3" fill={config.cap} opacity="0.8" />
            <text x="100" y="169" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              50 KG
            </text>
            
            <ellipse cx="100" cy="210" rx="50" ry="6" fill={config.bottle} opacity="0.1" />
          </>
        )}
      </svg>
    </div>
  );
}
