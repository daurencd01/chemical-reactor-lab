import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import TopBar from '../components/TopBar';
import Reactor from '../components/Reactor';
import QuestionCard from '../components/QuestionCard';
import FeedbackCard from '../components/FeedbackCard';
import NeonButton from '../components/NeonButton';
import { QUESTIONS } from '../data/questions';
import type { AnswerRecord, GameProgress, ReactorStatus, SectionInfo } from '../types';

const QUESTION_TIME = 30;

interface GameScreenProps {
  section: SectionInfo;
  progress: GameProgress;
  onAnswer: (record: AnswerRecord, scoreDelta: number, energyDelta: number) => void;
  onStabilize: () => void;
  onSectionComplete: (sectionId: number) => void;
  onExit: () => void;
}

function sameSet(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

export default function GameScreen({
  section,
  progress,
  onAnswer,
  onStabilize,
  onSectionComplete,
  onExit,
}: GameScreenProps) {
  const questions = useMemo(() => QUESTIONS.filter((q) => q.section === section.id), [section.id]);
  const [qIndex, setQIndex] = useState(0);
  const question = questions[qIndex];
  const globalIndex = section.range[0] + qIndex;

  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastTimedOut, setLastTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [reactorStatus, setReactorStatus] = useState<ReactorStatus>('idle');
  const [showStabilize, setShowStabilize] = useState(false);

  useEffect(() => {
    setSelected([]);
    setSubmitted(false);
    setTimeLeft(QUESTION_TIME);
    setReactorStatus('idle');
  }, [qIndex, section.id]);

  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit([], true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitted]);

  function handleSubmit(selected: number[], timedOut: boolean) {
    if (submitted) return;
    const correct = !timedOut && sameSet(selected, question.correctAnswers);
    const speedBonus = correct && timeLeft > 15 ? 20 : 0;
    const scoreDelta = correct ? 100 + speedBonus : 0;
    const energyDelta = correct ? 10 : -10;

    setSubmitted(true);
    setLastCorrect(correct);
    setLastTimedOut(timedOut);
    setReactorStatus(correct ? 'correct' : 'wrong');

    onAnswer({ questionId: question.id, selected, correct, timedOut }, scoreDelta, energyDelta);
  }

  function advance() {
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      onSectionComplete(section.id);
    }
  }

  function handleNext() {
    if (progress.energy <= 0) {
      setShowStabilize(true);
      return;
    }
    advance();
  }

  function handleStabilizeConfirm() {
    onStabilize();
    setShowStabilize(false);
    advance();
  }

  const base = 300 + ((qIndex * 11) % 45);
  const pressureBase = 4.4 + ((qIndex * 3) % 5) * 0.3;
  const volumeBase = 1100 + ((qIndex * 5) % 6) * 45;
  const reading =
    reactorStatus === 'wrong'
      ? { temperature: base + 55, pressure: Number((pressureBase + 1.4).toFixed(1)), volume: volumeBase }
      : { temperature: base, pressure: Number(pressureBase.toFixed(1)), volume: volumeBase };

  const isLastOverall = section.id === 4 && qIndex === questions.length - 1;

  return (
    <div className="min-h-screen w-full px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <TopBar
          indexInGame={globalIndex}
          total={20}
          timeLeft={timeLeft}
          energy={progress.energy}
          score={progress.score}
          correctCount={progress.correctCount}
          wrongCount={progress.wrongCount}
          onExit={onExit}
        />

        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-5 items-stretch">
          <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative">
            {progress.energy > 0 && progress.energy < 30 && (
              <div className="absolute top-3 left-3 right-3 flex items-center gap-2 bg-orange-100 border border-orange-300 text-orange-700 text-xs rounded-lg px-3 py-2">
                <AlertTriangle size={14} />
                Ескерту: реактор энергиясы төмен!
              </div>
            )}
            <Reactor status={reactorStatus} reading={reading} energy={progress.energy} />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <QuestionCard
                key={question.id}
                question={question}
                indexInGame={globalIndex}
                total={20}
                selected={selected}
                onSelectSingle={(i) => {
                  setSelected([i]);
                  handleSubmit([i], false);
                }}
                onToggleMultiple={(i) =>
                  setSelected((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]))
                }
                onSubmitMultiple={() => handleSubmit(selected, false)}
                disabled={submitted}
              />
            </AnimatePresence>

            {submitted && !showStabilize && (
              <FeedbackCard
                question={question}
                correct={lastCorrect}
                timedOut={lastTimedOut}
                isLast={isLastOverall}
                onNext={handleNext}
              />
            )}

            {showStabilize && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-white/85 backdrop-blur-sm rounded-2xl"
              >
                <div className="glass-panel border border-rose-300 rounded-2xl p-6 max-w-sm text-center">
                  <ShieldAlert size={40} className="mx-auto text-rose-500 mb-3" />
                  <h3 className="font-display text-xl font-black text-rose-600">Реакторды қайта тұрақтандыру қажет</h3>
                  <p className="mt-2 text-slate-600 text-sm">
                    Реактордың энергиясы 0-ге дейін төмендеді. Жалғастыру үшін реакторды тұрақтандырыңыз.
                  </p>
                  <div className="mt-5">
                    <NeonButton onClick={handleStabilizeConfirm}>Тұрақтандыру</NeonButton>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
