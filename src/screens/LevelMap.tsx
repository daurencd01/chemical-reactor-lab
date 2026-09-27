import { motion } from 'framer-motion';
import { ArrowLeft, Check, Lock, FlaskConical, Beaker, Factory, Atom } from 'lucide-react';
import { SECTIONS } from '../data/questions';
import type { GameProgress } from '../types';

interface LevelMapProps {
  progress: GameProgress;
  onSelectSection: (sectionId: number) => void;
  onBack: () => void;
}

const ICONS = [Atom, Beaker, FlaskConical, Factory];

const PALETTE = [
  { border: 'border-blue-300', bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100', iconBg: 'bg-blue-100', iconText: 'text-blue-600' },
  { border: 'border-violet-300', bg: 'bg-violet-50', hoverBg: 'hover:bg-violet-100', iconBg: 'bg-violet-100', iconText: 'text-violet-600' },
  { border: 'border-teal-300', bg: 'bg-teal-50', hoverBg: 'hover:bg-teal-100', iconBg: 'bg-teal-100', iconText: 'text-teal-600' },
  { border: 'border-orange-300', bg: 'bg-orange-50', hoverBg: 'hover:bg-orange-100', iconBg: 'bg-orange-100', iconText: 'text-orange-600' },
];

type Status = 'completed' | 'active' | 'locked';

function sectionStatus(progress: GameProgress, sectionId: number): Status {
  if (progress.completedSections[sectionId - 1]) return 'completed';
  const firstIncomplete = progress.completedSections.findIndex((c) => !c);
  const activeId = firstIncomplete === -1 ? SECTIONS.length + 1 : firstIncomplete + 1;
  if (sectionId === activeId) return 'active';
  return 'locked';
}

export default function LevelMap({ progress, onSelectSection, onBack }: LevelMapProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 md:p-10 max-w-4xl w-full"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-900 mb-6 text-sm font-display uppercase tracking-wide"
        >
          <ArrowLeft size={16} /> Артқа
        </button>

        <h2 className="font-display text-3xl font-black text-blue-900 text-glow-cyan mb-2 text-center">
          Деңгейлер картасы
        </h2>
        <p className="text-center text-slate-500 mb-8 text-sm">Зертхана станцияларынан өтіп, реакторды меңгеріңіз</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {SECTIONS.map((section, idx) => {
            const status = sectionStatus(progress, section.id);
            const Icon = ICONS[idx];
            const locked = status === 'locked';
            const completed = status === 'completed';
            const clickable = status === 'active';
            const palette = PALETTE[idx];

            return (
              <motion.button
                key={section.id}
                disabled={!clickable}
                onClick={() => onSelectSection(section.id)}
                whileHover={clickable ? { scale: 1.02, y: -2 } : {}}
                whileTap={clickable ? { scale: 0.98 } : {}}
                className={`relative text-left rounded-2xl p-5 border-2 transition-all overflow-hidden shadow-sm ${
                  locked
                    ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                    : `${palette.border} ${palette.bg} ${clickable ? palette.hoverBg : ''} ${clickable ? 'shadow-md' : ''}`
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      locked ? 'bg-slate-100 text-slate-400' : `${palette.iconBg} ${palette.iconText}`
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  {completed && (
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Check size={18} strokeWidth={3} />
                    </div>
                  )}
                  {locked && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                      <Lock size={14} />
                    </div>
                  )}
                </div>
                <div className="mt-4 text-xs font-display uppercase tracking-widest text-slate-500">
                  {section.range[0]}–{section.range[1]}
                </div>
                <div className="font-display font-bold text-lg text-slate-900">{section.title.split(': ')[1]}</div>
                <div className="text-xs text-slate-500 mt-1">{section.title.split(': ')[0]}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
