import type { ReactNode } from 'react';
import { Timer, Zap, Star, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface TopBarProps {
  indexInGame: number;
  total: number;
  timeLeft: number;
  energy: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  onExit: () => void;
}

export default function TopBar({
  indexInGame,
  total,
  timeLeft,
  energy,
  score,
  correctCount,
  wrongCount,
  onExit,
}: TopBarProps) {
  const progressPct = (indexInGame / total) * 100;
  const timeLow = timeLeft <= 10;

  return (
    <div className="glass-panel rounded-2xl px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="font-display font-black text-blue-900 text-sm md:text-base tracking-wide">
              CHEMICAL REACTOR LAB
            </div>
            <div className="text-xs text-slate-500">
              {indexInGame} / {total}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <Stat icon={<Timer size={16} className={timeLow ? 'text-rose-500' : 'text-blue-600'} />}>
            <span className={timeLow ? 'text-rose-600' : 'text-slate-800'}>
              00:{String(timeLeft).padStart(2, '0')}
            </span>
          </Stat>
          <Stat icon={<Zap size={16} className="text-orange-500" />}>
            <span className="text-slate-800">{energy} / 100</span>
          </Stat>
          <Stat icon={<Star size={16} className="text-yellow-500" />}>
            <span className="text-slate-800">{score}</span>
          </Stat>
          <Stat icon={<CheckCircle2 size={16} className="text-emerald-600" />}>
            <span className="text-slate-800">{correctCount}</span>
          </Stat>
          <Stat icon={<XCircle size={16} className="text-rose-500" />}>
            <span className="text-slate-800">{wrongCount}</span>
          </Stat>
        </div>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}

function Stat({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-200 text-sm font-medium">
      {icon}
      {children}
    </div>
  );
}
