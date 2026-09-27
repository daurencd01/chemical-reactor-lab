import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, ArrowRight } from 'lucide-react';
import Character from './Character';
import type { Question } from '../types';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

interface FeedbackCardProps {
  question: Question;
  correct: boolean;
  timedOut: boolean;
  isLast: boolean;
  onNext: () => void;
}

export default function FeedbackCard({ question, correct, timedOut, isLast, onNext }: FeedbackCardProps) {
  const correctText = question.correctAnswers.map((i) => `${LETTERS[i]}) ${question.options[i]}`).join('; ');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={`w-full max-w-md rounded-2xl p-6 border glass-panel ${
            correct ? 'border-emerald-300' : 'border-rose-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {correct ? (
              <CheckCircle2 size={34} className="text-emerald-600" />
            ) : (
              <XCircle size={34} className="text-rose-500" />
            )}
            <h3 className={`font-display text-2xl font-black ${correct ? 'text-emerald-600' : 'text-rose-600'}`}>
              {timedOut ? 'Уақыт аяқталды!' : correct ? 'Дұрыс жауап!' : 'Қате жауап!'}
            </h3>
          </div>

          <p className="mt-3 text-slate-600 text-sm">
            {correct
              ? 'Реактор тұрақты жұмысын жалғастыруда.'
              : 'Реактордың параметрлері тұрақсызданды.'}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold font-display ${
              correct ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}
          >
            <Zap size={14} />
            {correct ? '+10 энергия' : '-10 энергия'}
          </motion.div>

          {!correct && (
            <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Дұрыс жауап</div>
              <div className="text-slate-800 text-sm font-medium">{correctText}</div>
            </div>
          )}

          <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Түсіндірме</div>
            <div className="text-slate-600 text-sm leading-relaxed">{question.explanation}</div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="w-14 h-16 shrink-0">
              <Character mood={correct ? 'happy' : 'sad'} />
            </div>
            <button
              onClick={onNext}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 font-display font-bold uppercase tracking-wide text-sm bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)]"
            >
              {isLast ? 'Аяқтау' : 'Келесі сұрақ'} <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
