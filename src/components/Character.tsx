import { motion } from 'framer-motion';

interface CharacterProps {
  mood?: 'idle' | 'happy' | 'sad';
  className?: string;
}

export default function Character({ mood = 'idle', className = '' }: CharacterProps) {
  const armUp = mood === 'happy';
  const eyesClosed = mood === 'sad';

  return (
    <motion.svg
      viewBox="0 0 200 260"
      className={className}
      animate={mood === 'happy' ? { y: [0, -8, 0] } : mood === 'sad' ? { x: [0, -4, 4, -3, 3, 0] } : { y: [0, -4, 0] }}
      transition={
        mood === 'idle'
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.5 }
      }
    >
      {/* shadow */}
      <ellipse cx="100" cy="250" rx="42" ry="7" fill="#1e293b" opacity="0.12" />

      {/* legs */}
      <rect x="78" y="180" width="18" height="55" rx="6" fill="#334155" />
      <rect x="104" y="180" width="18" height="55" rx="6" fill="#334155" />
      <rect x="74" y="228" width="26" height="12" rx="4" fill="#1e293b" />
      <rect x="100" y="228" width="26" height="12" rx="4" fill="#1e293b" />

      {/* coat body */}
      <path
        d="M62 110 L58 195 Q100 210 142 195 L138 110 Q100 95 62 110 Z"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      <path d="M96 112 L100 200 L104 112 Z" fill="#eef2f7" />
      {/* coat collar */}
      <path d="M84 100 L100 122 L92 108 Z" fill="#3b82f6" />
      <path d="M116 100 L100 122 L108 108 Z" fill="#3b82f6" />

      {/* left arm */}
      <motion.g
        animate={armUp ? { rotate: 135 } : { rotate: 0 }}
        style={{ originX: '54px', originY: '116px' }}
        transition={{ duration: 0.4 }}
      >
        <rect x="46" y="112" width="16" height="58" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="54" cy="174" r="9" fill="#fbcfa0" />
      </motion.g>

      {/* right arm */}
      <rect x="138" y="112" width="16" height="60" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="146" cy="176" r="9" fill="#fbcfa0" />

      {/* neck */}
      <rect x="92" y="86" width="16" height="18" fill="#fbcfa0" />

      {/* head */}
      <circle cx="100" cy="64" r="36" fill="#fbcfa0" />
      {/* ears */}
      <circle cx="65" cy="66" r="6" fill="#fbcfa0" />
      <circle cx="135" cy="66" r="6" fill="#fbcfa0" />
      {/* hair */}
      <path d="M62 54 Q64 20 100 20 Q136 20 138 54 Q126 36 100 36 Q74 36 62 54 Z" fill="#2d2140" />
      <path d="M62 54 Q60 44 66 40 L70 56 Z" fill="#2d2140" />
      <path d="M138 54 Q140 44 134 40 L130 56 Z" fill="#2d2140" />

      {/* blush */}
      <ellipse cx="78" cy="76" rx="6" ry="3.5" fill="#f7a8a8" opacity="0.6" />
      <ellipse cx="122" cy="76" rx="6" ry="3.5" fill="#f7a8a8" opacity="0.6" />

      {/* glasses */}
      <g stroke="#1e293b" strokeWidth="3" fill="rgba(59,130,246,0.14)">
        <circle cx="86" cy="64" r="12" />
        <circle cx="114" cy="64" r="12" />
        <line x1="98" y1="64" x2="102" y2="64" />
        <line x1="74" y1="62" x2="68" y2="60" />
        <line x1="126" y1="62" x2="132" y2="60" />
      </g>

      {/* eyes */}
      {eyesClosed ? (
        <>
          <path d="M80 64 L92 64" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M108 64 L120 64" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="86" cy="64" r="2.8" fill="#1e293b" />
          <circle cx="114" cy="64" r="2.8" fill="#1e293b" />
        </>
      )}

      {/* eyebrows */}
      <path d="M79 52 Q86 48 93 52" stroke="#2d2140" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M107 52 Q114 48 121 52" stroke="#2d2140" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* mouth */}
      {mood === 'happy' ? (
        <path d="M87 79 Q100 91 113 79" stroke="#1e293b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      ) : mood === 'sad' ? (
        <path d="M88 83 Q100 75 112 83" stroke="#1e293b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M90 79 Q100 83 110 79" stroke="#1e293b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      )}

      {/* id badge */}
      <rect x="106" y="128" width="14" height="18" rx="2" fill="#3b82f6" opacity="0.85" />
    </motion.svg>
  );
}
