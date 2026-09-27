import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, XCircle, Star, Clock, ArrowRight } from 'lucide-react';
import Character from '../components/Character';
import Confetti from '../components/Confetti';
import NeonButton from '../components/NeonButton';
import { SECTIONS } from '../data/questions';
import type { AnswerRecord } from '../types';

interface SectionCompleteScreenProps {
  sectionId: number;
  answers: AnswerRecord[];
  sectionTimeSeconds: number;
  isFinalSection: boolean;
  onContinue: () => void;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function SectionCompleteScreen({
  sectionId,
  answers,
  sectionTimeSeconds,
  isFinalSection,
  onContinue,
}: SectionCompleteScreenProps) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const correct = answers.filter((a) => a.correct).length;
  const wrong = answers.length - correct;
  const score = correct * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-3xl p-8 md:p-10 max-w-lg w-full text-center relative overflow-hidden"
      >
        <Confetti />
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 mx-auto rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center mb-4"
        >
          <motion.div animate={{ rotate: [0, -8, 8, -8, 0] }} transition={{ delay: 0.6, duration: 0.6 }}>
            <Trophy size={36} className="text-yellow-600" />
          </motion.div>
        </motion.div>

        <h2 className="font-display text-2xl font-black text-blue-900 text-glow-cyan">
          {section.title.split(': ')[0]} аяқталды!
        </h2>
        <p className="text-slate-500 mt-1">{section.title.split(': ')[1]}</p>

        <div className="grid grid-cols-4 gap-2 mt-6">
          <MiniStat icon={<Target size={16} className="text-emerald-600" />} label="Дұрыс" value={String(correct)} />
          <MiniStat icon={<XCircle size={16} className="text-rose-500" />} label="Қате" value={String(wrong)} />
          <MiniStat icon={<Star size={16} className="text-yellow-500" />} label="Ұпай" value={String(score)} />
          <MiniStat icon={<Clock size={16} className="text-blue-600" />} label="Уақыт" value={formatTime(sectionTimeSeconds)} />
        </div>

        <div className="mt-6 flex items-center gap-4 bg-slate-50 rounded-xl p-4 text-left">
          <div className="w-14 h-16 shrink-0">
            <Character mood="happy" />
          </div>
          <p className="text-sm text-slate-600">
            {correct === answers.length
              ? 'Керемет! Сіз бөлімді қатесіз аяқтадыңыз.'
              : 'Жақсы! Сіз негізгі ұғымдарды меңгердіңіз. Келесі бөлімге өтейік.'}
          </p>
        </div>

        <div className="mt-7">
          <NeonButton onClick={onContinue} icon={<ArrowRight size={18} />}>
            {isFinalSection ? 'Қорытындыны көру' : 'Келесі бөлім'}
          </NeonButton>
        </div>
      </motion.div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center gap-1">
      {icon}
      <div className="font-display font-bold text-slate-900">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
