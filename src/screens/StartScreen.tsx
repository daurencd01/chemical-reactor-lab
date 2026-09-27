import { motion } from 'framer-motion';
import { Play, BookOpen, BarChart3, FlaskConical } from 'lucide-react';
import Reactor from '../components/Reactor';
import Character from '../components/Character';
import NeonButton from '../components/NeonButton';

interface StartScreenProps {
  onStart: () => void;
  onRules: () => void;
  onResults: () => void;
  hasProgress: boolean;
}

export default function StartScreen({ onStart, onRules, onResults, hasProgress }: StartScreenProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <FlaskConical size={20} />
            <span className="text-xs font-display tracking-[0.2em] uppercase">
              Канат Зерде <span className="text-blue-300 mx-1">·</span> 1-тапсырма
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-blue-900 text-glow-cyan leading-tight">
            CHEMICAL
            <br />
            REACTOR LAB
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Химиялық технологияның негізгі заңдары. Реакторлар
          </p>

          <div className="mt-8 flex flex-col gap-3 max-w-xs">
            <NeonButton onClick={onStart} icon={<Play size={18} />}>
              {hasProgress ? 'Ойынды жалғастыру' : 'Ойынды бастау'}
            </NeonButton>
            <NeonButton onClick={onRules} variant="secondary" icon={<BookOpen size={18} />}>
              Ережелер
            </NeonButton>
            <NeonButton onClick={onResults} variant="secondary" icon={<BarChart3 size={18} />}>
              Нәтижелер
            </NeonButton>
          </div>

          <div className="absolute -right-6 bottom-0 opacity-90 w-40">
            <Character mood="happy" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center"
        >
          <Reactor status="idle" reading={{ temperature: 320, pressure: 5.0, volume: 1200 }} energy={72} />
        </motion.div>
      </div>
    </div>
  );
}
