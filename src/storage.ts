import type { BestResult, GameProgress } from './types';

const PROGRESS_KEY = 'crlab.progress.v1';
const RESULT_KEY = 'crlab.lastResult.v1';

export const initialProgress = (): GameProgress => ({
  unlockedSection: 1,
  completedSections: [false, false, false, false],
  currentIndex: 0,
  answers: [],
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  energy: 100,
  elapsedSeconds: 0,
});

export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return initialProgress();
    const parsed = JSON.parse(raw) as GameProgress;
    if (!parsed || typeof parsed.currentIndex !== 'number') return initialProgress();
    return parsed;
  } catch {
    return initialProgress();
  }
}

export function saveProgress(progress: GameProgress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // ignore
  }
}

export function loadLastResult(): BestResult | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BestResult;
  } catch {
    return null;
  }
}

export function saveLastResult(result: BestResult) {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
  } catch {
    // ignore
  }
}
