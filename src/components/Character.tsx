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

      {/* legs (dark wide-leg trousers) */}
      <rect x="76" y="178" width="20" height="57" rx="7" fill="#1f2430" />
      <rect x="104" y="178" width="20" height="57" rx="7" fill="#1f2430" />
      <rect x="72" y="228" width="28" height="12" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="100" y="228" width="28" height="12" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* coat body */}
      <path
        d="M62 110 L58 195 Q100 210 142 195 L138 110 Q100 95 62 110 Z"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      <path d="M96 112 L100 200 L104 112 Z" fill="#eef2f7" />
      {/* coat collar */}
      <path d="M84 100 L100 122 L92 108 Z" fill="#60a5fa" />
      <path d="M116 100 L100 122 L108 108 Z" fill="#60a5fa" />
      {/* necklace */}
      <path d="M91 105 Q100 114 109 105" stroke="#f4c463" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* left arm */}
      <motion.g
        animate={armUp ? { rotate: 135 } : { rotate: 0 }}
        style={{ originX: '54px', originY: '116px' }}
        transition={{ duration: 0.4 }}
      >
        <rect x="46" y="112" width="16" height="58" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="54" cy="174" r="9" fill="#f3c9a0" />
      </motion.g>

      {/* right arm */}
      <rect x="138" y="112" width="16" height="60" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="146" cy="176" r="9" fill="#f3c9a0" />

      {/* neck */}
      <rect x="92" y="86" width="16" height="18" fill="#f3c9a0" />

      {/* hair — back mass behind head/shoulders */}
      <path
        d="M100 16 Q140 16 144 56 Q147 90 142 130 Q139 156 134 172 Q128 150 130 112 Q131 76 122 50 Q112 34 100 32 Q88 34 78 50 Q69 76 70 112 Q72 150 66 172 Q61 156 58 130 Q53 90 56 56 Q60 16 100 16 Z"
        fill="#1c1730"
      />

      {/* head */}
      <circle cx="100" cy="64" r="36" fill="#f3c9a0" />
      {/* ears */}
      <circle cx="65" cy="66" r="6" fill="#f3c9a0" />
      <circle cx="135" cy="66" r="6" fill="#f3c9a0" />

      {/* earrings */}
      <circle cx="65" cy="75" r="2.4" fill="#f4c463" />
      <circle cx="135" cy="75" r="2.4" fill="#f4c463" />

      {/* hair — top cap + center-part fringe */}
      <path d="M61 56 Q62 22 100 20 Q138 22 139 56 Q126 34 100 34 Q74 34 61 56 Z" fill="#1c1730" />

      {/* blush */}
      <ellipse cx="78" cy="76" rx="6" ry="3.5" fill="#f4a6a6" opacity="0.55" />
      <ellipse cx="122" cy="76" rx="6" ry="3.5" fill="#f4a6a6" opacity="0.55" />

      {/* eyes */}
      {eyesClosed ? (
        <>
          <path d="M79 64 Q86 68 93 64" stroke="#1e293b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M107 64 Q114 68 121 64" stroke="#1e293b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="86" cy="64" rx="3.2" ry="3.8" fill="#1e293b" />
          <ellipse cx="114" cy="64" rx="3.2" ry="3.8" fill="#1e293b" />
          <path d="M79 59 Q86 55 94 58" stroke="#1e293b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M106 58 Q114 55 121 59" stroke="#1e293b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* eyebrows */}
      <path d="M78 51 Q86 46 94 50" stroke="#1c1730" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M106 50 Q114 46 122 51" stroke="#1c1730" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* lips */}
      {mood === 'happy' ? (
        <path d="M86 78 Q100 91 114 78 Q100 85 86 78 Z" fill="#c1455f" />
      ) : mood === 'sad' ? (
        <path d="M88 83 Q100 75 112 83 Q100 79 88 83 Z" fill="#c1455f" />
      ) : (
        <path d="M89 79 Q100 83 111 79 Q100 81.5 89 79 Z" fill="#c1455f" />
      )}

      {/* side face-framing hair strands (drawn last, over shoulders) */}
      <path d="M69 40 Q55 74 57 112 Q58 140 63 166 Q70 148 71 112 Q72 76 80 46 Z" fill="#1c1730" opacity="0.96" />
      <path d="M131 40 Q145 74 143 112 Q142 140 137 166 Q130 148 129 112 Q128 76 120 46 Z" fill="#1c1730" opacity="0.96" />

      {/* badge */}
      <rect x="106" y="128" width="14" height="18" rx="2" fill="#60a5fa" opacity="0.85" />
    </motion.svg>
  );
}
