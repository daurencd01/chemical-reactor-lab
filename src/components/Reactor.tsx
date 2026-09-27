import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactorReading, ReactorStatus } from '../types';

interface ReactorProps {
  status: ReactorStatus;
  reading: ReactorReading;
  energy: number;
  size?: 'lg' | 'md';
}

const STATUS_COLOR: Record<ReactorStatus, string> = {
  idle: '#2563eb',
  correct: '#10b981',
  wrong: '#ef4444',
};

export default function Reactor({ status, reading, energy, size = 'lg' }: ReactorProps) {
  const color = STATUS_COLOR[status];
  const bubbles = useMemo(
    () =>
      Array.from({ length: status === 'correct' ? 14 : 9 }).map((_, i) => ({
        x: 70 + ((i * 37) % 120),
        delay: (i % 7) * 0.28,
        duration: 2.2 + (i % 5) * 0.35,
        r: 3 + (i % 3),
      })),
    [status]
  );

  const isLg = size === 'lg';

  return (
    <motion.div
      className="relative w-full"
      style={{ maxWidth: isLg ? 420 : 280 }}
      animate={status === 'wrong' ? { x: [0, -6, 6, -5, 5, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg viewBox="0 0 260 340" className="w-full h-auto">
        {/* support frame */}
        <rect x="30" y="300" width="200" height="14" rx="4" fill="#cbd5e1" stroke="#94a3b8" />
        <rect x="60" y="30" width="10" height="280" fill="#e2e8f0" stroke="#cbd5e1" />
        <rect x="190" y="30" width="10" height="280" fill="#e2e8f0" stroke="#cbd5e1" />
        <rect x="55" y="24" width="150" height="12" rx="4" fill="#cbd5e1" />

        {/* top pipes */}
        <rect x="120" y="0" width="20" height="30" fill="#cbd5e1" />
        <circle cx="130" cy="4" r="10" fill="#f8fafc" stroke={color} strokeWidth="2" />

        {/* side pipes with flow glow */}
        <rect x="20" y="120" width="20" height="14" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
        <rect x="220" y="180" width="20" height="14" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
        <motion.circle
          cx="30"
          cy="127"
          r="4"
          fill={color}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />

        {/* glass vessel */}
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={color} stopOpacity="0.85" />
          </linearGradient>
          <clipPath id="vesselClip">
            <path d="M75 40 L185 40 L185 220 Q185 280 130 290 Q75 280 75 220 Z" />
          </clipPath>
        </defs>

        <motion.path
          d="M75 40 L185 40 L185 220 Q185 280 130 290 Q75 280 75 220 Z"
          fill="url(#glass)"
          stroke={color}
          strokeWidth="3"
          animate={{
            filter: [
              `drop-shadow(0 0 4px ${color}33)`,
              `drop-shadow(0 0 14px ${color}66)`,
              `drop-shadow(0 0 4px ${color}33)`,
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />

        <g clipPath="url(#vesselClip)">
          {/* liquid level driven by energy */}
          <motion.rect
            x="70"
            width="130"
            fill="url(#liquid)"
            animate={{
              y: 290 - Math.max(30, (energy / 100) * 220),
              height: Math.max(30, (energy / 100) * 220) + 20,
            }}
            transition={{ duration: 0.8 }}
          />
          {/* liquid surface wobble */}
          <motion.ellipse
            cx="130"
            cy={290 - Math.max(30, (energy / 100) * 220)}
            rx="60"
            ry="6"
            fill={color}
            opacity="0.5"
            animate={{ rx: [56, 64, 56] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <AnimatePresence>
            {bubbles.map((b, i) => (
              <motion.circle
                key={`${status}-${i}`}
                cx={b.x}
                r={b.r}
                fill="#e6f9ff"
                opacity="0.75"
                initial={{ cy: 285 }}
                animate={{ cy: 40, opacity: [0.8, 0.8, 0] }}
                transition={{
                  duration: b.duration,
                  repeat: Infinity,
                  delay: b.delay,
                  ease: 'easeIn',
                }}
              />
            ))}
          </AnimatePresence>
        </g>

        {/* molecules floating */}
        <motion.circle cx="105" cy="150" r="5" fill="#67e8f9" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="150" cy="170" r="4" fill="#a7f3d0" animate={{ y: [0, 8, 0] }} transition={{ duration: 2.6, repeat: Infinity }} />
        <motion.line x1="105" y1="150" x2="150" y2="170" stroke="#67e8f9" strokeWidth="1.5" opacity="0.5" />

        {/* warning overlay when wrong */}
        {status === 'wrong' && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.9] }} transition={{ duration: 0.6 }}>
            <circle cx="130" cy="100" r="22" fill="#ef4444" />
            <text x="130" y="109" textAnchor="middle" fontSize="26" fill="#ffffff" fontWeight="bold">
              !
            </text>
          </motion.g>
        )}

        {/* valves */}
        <circle cx="65" cy="200" r="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="195" cy="130" r="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      </svg>

      {/* gauges */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <Gauge label="T" value={`${reading.temperature}°C`} color="#f97316" />
        <Gauge label="P" value={`${reading.pressure.toFixed(1)} atm`} color="#2563eb" />
        <Gauge label="V" value={`${reading.volume} L`} color="#10b981" />
      </div>
    </motion.div>
  );
}

function Gauge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass-panel rounded-lg px-2 py-1.5 text-center">
      <div className="text-[10px] tracking-widest text-slate-500 font-display">{label}</div>
      <div className="text-sm font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
