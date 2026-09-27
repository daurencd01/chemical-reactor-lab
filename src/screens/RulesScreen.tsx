import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Timer, ListChecks, Layers } from 'lucide-react';
import NeonButton from '../components/NeonButton';

interface RulesScreenProps {
  onBack: () => void;
}

const RULES = [
  { icon: ListChecks, text: 'Барлығы 20 тест тапсырмасы бар.' },
  { icon: ListChecks, text: '1–10 сұрақтарда бір дұрыс жауап бар.' },
  { icon: Layers, text: '11–20 сұрақтарда бірнеше дұрыс жауап бар.' },
  { icon: Zap, text: 'Дұрыс жауап үшін +10 энергия беріледі.' },
  { icon: Zap, text: 'Қате жауап үшін -10 энергия алынады.' },
  { icon: Timer, text: 'Әр сұраққа 30 секунд беріледі.' },
];

const SECTIONS = [
  '1–5: Негізгі заңдар',
  '6–10: Химиялық реакциялар',
  '11–15: Реакторлар',
  '16–20: Өнеркәсіптік технология',
];

export default function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 md:p-10 max-w-2xl w-full"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-900 mb-6 text-sm font-display uppercase tracking-wide"
        >
          <ArrowLeft size={16} /> Артқа
        </button>

        <h2 className="font-display text-3xl font-black text-blue-900 text-glow-cyan mb-6">Ойын ережелері</h2>

        <ul className="space-y-3">
          {RULES.map((r, i) => (
            <li key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-blue-100">
              <r.icon size={20} className="text-blue-600 mt-0.5 shrink-0" />
              <span className="text-slate-800">
                {i + 1}. {r.text}
              </span>
            </li>
          ))}
          <li className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-blue-100">
            <Layers size={20} className="text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-slate-800">
              7. Барлық бөлімдерді аяқтап, қорытынды нәтиже алыңыз. 4 бөлімнен тұрады:
              <ul className="mt-2 ml-2 space-y-1 text-slate-500 text-sm list-disc list-inside">
                {SECTIONS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <div className="mt-8">
          <NeonButton onClick={onBack}>Түсінікті</NeonButton>
        </div>
      </motion.div>
    </div>
  );
}
