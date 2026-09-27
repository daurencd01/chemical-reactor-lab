import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Clock, Star } from 'lucide-react';
import NeonButton from '../components/NeonButton';
import type { BestResult } from '../types';

interface ResultsScreenProps {
  result: BestResult | null;
  onBack: () => void;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export default function ResultsScreen({ result, onBack }: ResultsScreenProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 md:p-10 max-w-xl w-full text-center"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-900 mb-6 text-sm font-display uppercase tracking-wide"
        >
          <ArrowLeft size={16} /> Артқа
        </button>

        <h2 className="font-display text-3xl font-black text-blue-900 text-glow-cyan mb-2">Нәтижелер</h2>

        {!result ? (
          <div className="py-16">
            <Trophy size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-500">Әзірге нәтиже жоқ. Ойынды бастап, зерттеуді аяқтаңыз!</p>
          </div>
        ) : (
          <>
            <p className="text-slate-500 mb-6 text-sm">{result.date}</p>
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={<Target className="text-emerald-600" />} label="Дұрыс" value={`${result.correct}/${result.total}`} />
              <StatCard icon={<Star className="text-orange-500" />} label="Ұпай" value={String(result.score)} />
              <StatCard icon={<Trophy className="text-blue-600" />} label="Дәлдік" value={`${result.accuracy}%`} />
              <StatCard icon={<Clock className="text-fuchsia-500" />} label="Уақыт" value={formatTime(result.timeSeconds)} />
            </div>
          </>
        )}

        <div className="mt-8">
          <NeonButton onClick={onBack}>Басты бетке</NeonButton>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center gap-1">
      {icon}
      <div className="text-xl font-display font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
  );
}
