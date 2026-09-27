import { useEffect, useState } from 'react';
import LabBackground from './components/LabBackground';
import StartScreen from './screens/StartScreen';
import RulesScreen from './screens/RulesScreen';
import ResultsScreen from './screens/ResultsScreen';
import LevelMap from './screens/LevelMap';
import GameScreen from './screens/GameScreen';
import SectionCompleteScreen from './screens/SectionCompleteScreen';
import FinalScreen from './screens/FinalScreen';
import ReviewScreen from './screens/ReviewScreen';
import { SECTIONS } from './data/questions';
import {
  clearProgress,
  initialProgress,
  loadLastResult,
  loadProgress,
  saveLastResult,
  saveProgress,
} from './storage';
import type { AnswerRecord, BestResult, GameProgress } from './types';

type Screen = 'start' | 'rules' | 'results' | 'map' | 'game' | 'sectionComplete' | 'final' | 'review';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress());
  const [lastResult, setLastResult] = useState<BestResult | null>(() => loadLastResult());
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (screen !== 'game') return;
    const id = setInterval(() => {
      setProgress((p) => ({ ...p, elapsedSeconds: p.elapsedSeconds + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, [screen]);

  const hasProgress = progress.answers.length > 0;

  function handleAnswer(record: AnswerRecord, scoreDelta: number, energyDelta: number) {
    setProgress((p) => ({
      ...p,
      answers: [...p.answers, record],
      score: p.score + scoreDelta,
      correctCount: p.correctCount + (record.correct ? 1 : 0),
      wrongCount: p.wrongCount + (record.correct ? 0 : 1),
      energy: clamp(p.energy + energyDelta, 0, 100),
    }));
  }

  function handleStabilize() {
    setProgress((p) => ({ ...p, energy: 30 }));
  }

  function handleSectionComplete(sectionId: number) {
    setProgress((p) => {
      const completedSections = [...p.completedSections];
      completedSections[sectionId - 1] = true;
      return { ...p, completedSections, unlockedSection: Math.max(p.unlockedSection, sectionId + 1) };
    });
    setScreen('sectionComplete');
  }

  function handleContinueAfterSection(sectionId: number) {
    if (sectionId >= 4) {
      const total = 20;
      const result: BestResult = {
        correct: progress.correctCount,
        wrong: progress.wrongCount,
        total,
        score: progress.score,
        accuracy: Math.round((progress.correctCount / total) * 100),
        timeSeconds: progress.elapsedSeconds,
        date: new Date().toLocaleDateString('kk-KZ', { year: 'numeric', month: 'long', day: 'numeric' }),
      };
      saveLastResult(result);
      setLastResult(result);
      setScreen('final');
    } else {
      setScreen('map');
    }
  }

  function handleReplay() {
    const fresh = initialProgress();
    clearProgress();
    setProgress(fresh);
    setActiveSectionId(null);
    setScreen('map');
  }

  const activeSection = SECTIONS.find((s) => s.id === activeSectionId) ?? null;
  const sectionAnswers = activeSection
    ? progress.answers.filter(
        (a) => a.questionId >= activeSection.range[0] && a.questionId <= activeSection.range[1]
      )
    : [];

  return (
    <div className="relative min-h-screen">
      <LabBackground />

      {screen === 'start' && (
        <StartScreen
          hasProgress={hasProgress}
          onStart={() => setScreen('map')}
          onRules={() => setScreen('rules')}
          onResults={() => setScreen('results')}
        />
      )}

      {screen === 'rules' && <RulesScreen onBack={() => setScreen('start')} />}

      {screen === 'results' && <ResultsScreen result={lastResult} onBack={() => setScreen('start')} />}

      {screen === 'map' && (
        <LevelMap
          progress={progress}
          onBack={() => setScreen('start')}
          onSelectSection={(id) => {
            setActiveSectionId(id);
            setScreen('game');
          }}
        />
      )}

      {screen === 'game' && activeSection && (
        <GameScreen
          section={activeSection}
          progress={progress}
          onAnswer={handleAnswer}
          onStabilize={handleStabilize}
          onSectionComplete={handleSectionComplete}
          onExit={() => setScreen('map')}
        />
      )}

      {screen === 'sectionComplete' && activeSection && (
        <SectionCompleteScreen
          sectionId={activeSection.id}
          answers={sectionAnswers}
          sectionTimeSeconds={progress.elapsedSeconds}
          isFinalSection={activeSection.id === 4}
          onContinue={() => handleContinueAfterSection(activeSection.id)}
        />
      )}

      {screen === 'final' && (
        <FinalScreen
          progress={progress}
          onReplay={handleReplay}
          onReview={() => setScreen('review')}
          onHome={() => setScreen('start')}
        />
      )}

      {screen === 'review' && <ReviewScreen answers={progress.answers} onBack={() => setScreen('final')} />}
    </div>
  );
}
