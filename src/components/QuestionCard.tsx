import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Question } from '../types';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

interface QuestionCardProps {
  question: Question;
  indexInGame: number;
  total: number;
  selected: number[];
  onSelectSingle: (optionIndex: number) => void;
  onToggleMultiple: (optionIndex: number) => void;
  onSubmitMultiple: () => void;
  disabled: boolean;
}

export default function QuestionCard({
  question,
  indexInGame,
  total,
  selected,
  onSelectSingle,
  onToggleMultiple,
  onSubmitMultiple,
  disabled,
}: QuestionCardProps) {
  const isMultiple = question.type === 'multiple';
  const needCount = question.correctAnswers.length;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-2xl p-6 flex flex-col gap-5 h-full"
    >
      <div>
        <div className="text-xs font-display tracking-widest text-blue-600 uppercase">
          Сұрақ {indexInGame} / {total}
        </div>
        {isMultiple && (
          <div className="mt-1 inline-block text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
            {needCount} жауапты таңдаңыз
          </div>
        )}
        <h3 className="mt-3 text-lg md:text-xl font-semibold text-slate-900 leading-snug">
          {question.question}
        </h3>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected.includes(i);
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => (isMultiple ? onToggleMultiple(i) : onSelectSingle(i))}
              className={`group flex items-center gap-3 w-full text-left rounded-xl border px-4 py-3.5 transition-all disabled:cursor-not-allowed ${
                isSelected
                  ? 'border-blue-400 bg-blue-50 shadow-[0_4px_14px_rgba(37,99,235,0.15)]'
                  : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40'
              }`}
            >
              <span
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                  isMultiple ? 'rounded-md' : 'rounded-full'
                } ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-blue-600'}`}
              >
                {isSelected && isMultiple ? <Check size={16} strokeWidth={3} /> : LETTERS[i]}
              </span>
              <span className="text-slate-800 text-sm md:text-base">{opt}</span>
            </button>
          );
        })}
      </div>

      {isMultiple && (
        <button
          onClick={onSubmitMultiple}
          disabled={disabled || selected.length === 0}
          className="mt-1 w-full rounded-xl py-3.5 font-display font-bold uppercase tracking-wide text-sm bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all"
        >
          Жауапты тексеру
        </button>
      )}
    </motion.div>
  );
}
