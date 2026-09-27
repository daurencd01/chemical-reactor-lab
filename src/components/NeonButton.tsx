import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

const VARIANTS: Record<string, string> = {
  primary:
    'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_10px_26px_rgba(37,99,235,0.45)]',
  secondary:
    'bg-white text-blue-700 border border-slate-200 shadow-sm hover:border-blue-300 hover:bg-blue-50',
  danger:
    'bg-gradient-to-b from-rose-400 to-rose-500 text-white shadow-[0_8px_20px_rgba(244,63,94,0.35)]',
  ghost: 'bg-transparent text-blue-700 border border-blue-100 hover:bg-blue-50',
};

export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
  className = '',
  icon,
}: NeonButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-display font-bold tracking-wide text-sm uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none ${VARIANTS[variant]} ${className}`}
    >
      {icon}
      {children}
    </motion.button>
  );
}
