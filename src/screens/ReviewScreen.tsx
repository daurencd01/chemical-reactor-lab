import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import type { AnswerRecord } from '../types';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

interface ReviewScreenProps {
  answers: AnswerRecord[];
  onBack: () => void;
}

export default function ReviewScreen({ answers, onBack }: ReviewScreenProps) {
  const [activeId, setActiveId] = useState<number>(answers[0]?.questionId ?? 1);
  const active = QUESTIONS.find((q) => q.id === activeId)!;
  const activeAnswer = answers.find((a) => a.questionId === activeId);

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-900 mb-6 text-sm font-display uppercase tracking-wide"
        >
          <ArrowLeft size={16} /> Артқа
        </button>

        <h2 className="font-display text-3xl font-black text-blue-900 text-glow-cyan mb-6">Қателерді қарау</h2>

        <div className="grid md:grid-cols-[220px_1fr] gap-5">
          <div className="glass-panel rounded-2xl p-3 max-h-[520px] overflow-y-auto">
            {QUESTIONS.map((q) => {
              const ans = answers.find((a) => a.questionId === q.id);
              const correct = ans?.correct;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveId(q.id)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 mb-1 text-sm transition-colors ${
                    activeId === q.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <span>{q.id}-сұрақ</span>
                  {correct ? (
                    <Check size={16} className="text-emerald-600" />
                  ) : (
                    <X size={16} className="text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel rounded-2xl p-6 border ${
              activeAnswer?.correct ? 'border-emerald-300' : 'border-rose-300'
            }`}
          >
            <div className="text-xs uppercase tracking-widest text-blue-600 font-display">Сұрақ {active.id}</div>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{active.question}</h3>

            <div className="mt-4 space-y-2">
              {active.options.map((opt, i) => {
                const isMine = activeAnswer?.selected.includes(i);
                const isCorrectOpt = active.correctAnswers.includes(i);
                let style = 'border-slate-200 bg-slate-50 text-slate-600';
                if (isCorrectOpt) style = 'border-emerald-400 bg-emerald-50 text-emerald-700';
                else if (isMine && !isCorrectOpt) style = 'border-rose-400 bg-rose-50 text-rose-700';
                return (
                  <div key={i} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${style}`}>
                    <span className="font-display font-bold">{LETTERS[i]}</span>
                    <span className="flex-1">{opt}</span>
                    {isMine && <span className="text-[10px] uppercase tracking-wide opacity-70">Менің жауабым</span>}
                  </div>
                );
              })}
            </div>

            {activeAnswer?.timedOut && (
              <div className="mt-3 text-xs text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 inline-block">
                Уақыт аяқталды
              </div>
            )}

            <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Түсіндірме</div>
              <div className="text-slate-600 text-sm leading-relaxed">{active.explanation}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
