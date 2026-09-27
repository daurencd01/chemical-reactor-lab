import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#2563eb', '#8b5cf6', '#10b981', '#f97316', '#f43f5e', '#fbbf24'];

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 26 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: (i * 137) % 100,
        color: COLORS[i % COLORS.length],
        delay: (i % 10) * 0.06,
        duration: 2.2 + (i % 5) * 0.3,
        rotate: (i * 47) % 360,
        size: 6 + (i % 3) * 3,
        round: i % 2 === 0,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 420, opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}
