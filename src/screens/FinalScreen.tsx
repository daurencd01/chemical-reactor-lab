import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, XCircle, Star, Percent, Clock, RotateCcw, ListChecks, Home } from 'lucide-react';
import Character from '../components/Character';
import Confetti from '../components/Confetti';
import NeonButton from '../components/NeonButton';
import type { GameProgress } from '../types';

interface FinalScreenProps {
  progress: GameProgress;
  onReplay: () => void;
  onReview: () => void;
  onHome: () => void;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function rank(accuracy: number) {
  if (accuracy >= 90) return { title: 'Зертхана маманы', color: 'text-emerald-600', ring: 'border-emerald-300' };
  if (accuracy >= 70) return { title: 'Жақсы нәтиже', color: 'text-blue-600', ring: 'border-blue-300' };
  if (accuracy >= 50) return { title: 'Білімді толықтыру қажет', color: 'text-orange-600', ring: 'border-orange-300' };
  return { title: 'Қайталап көріңіз', color: 'text-rose-600', ring: 'border-rose-300' };
}

export default function FinalScreen({ progress, onReplay, onReview, onHome }: FinalScreenProps) {
  const total = 20;
  const correct = progress.correctCount;
  const wrong = progress.wrongCount;
  const accuracy = Math.round((correct / total) * 100);
  const r = rank(accuracy);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 md:p-10 max-w-2xl w-full text-center relative overflow-hidden"
      >
        {accuracy >= 70 && <Confetti count={34} />}
        <h2 className="font-display text-3xl font-black text-blue-900 text-glow-cyan">Зерттеу аяқталды!</h2>

        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-16 h-20 shrink-0 hidden sm:block">
            <Character mood={accuracy >= 50 ? 'happy' : 'sad'} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, delay: 0.15 }}
            className={`w-24 h-24 rounded-full border-2 ${r.ring} bg-slate-50 flex items-center justify-center`}
          >
            <motion.div animate={{ rotate: [0, -6, 6, 0] }} transition={{ delay: 0.6, duration: 0.7 }}>
              <GraduationCap size={44} className={r.color} />
            </motion.div>
          </motion.div>
        </div>
        <div className={`mt-3 font-display text-xl font-black ${r.color}`}>{r.title}</div>

        <p className="text-slate-500 mt-2 text-sm">Сіздің нәтижелеріңіз:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
          <Stat icon={<Target className="text-emerald-600" size={20} />} label="Дұрыс жауаптар" value={`${correct}/${total}`} />
          <Stat icon={<XCircle className="text-rose-500" size={20} />} label="Қате жауаптар" value={String(wrong)} />
          <Stat icon={<Star className="text-yellow-500" size={20} />} label="Ұпай" value={String(progress.score)} />
          <Stat icon={<Percent className="text-blue-600" size={20} />} label="Дәлдік" value={`${accuracy}%`} />
          <Stat icon={<Clock className="text-fuchsia-500" size={20} />} label="Уақыт" value={formatTime(progress.elapsedSeconds)} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <NeonButton onClick={onReplay} icon={<RotateCcw size={18} />}>
            Қайта ойнау
          </NeonButton>
          <NeonButton onClick={onReview} variant="secondary" icon={<ListChecks size={18} />}>
            Қателерді қарау
          </NeonButton>
          <NeonButton onClick={onHome} variant="ghost" icon={<Home size={18} />}>
            Басты бетке
          </NeonButton>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center gap-1.5">
      {icon}
      <div className="text-lg font-display font-bold text-slate-900">{value}</div>
      <div className="text-[11px] text-slate-500 uppercase tracking-wide text-center">{label}</div>
    </div>
  );
}
