export type QuestionType = 'single' | 'multiple';

export interface Question {
  id: number;
  section: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export interface SectionInfo {
  id: number;
  title: string;
  range: [number, number];
}

export interface AnswerRecord {
  questionId: number;
  selected: number[];
  correct: boolean;
  timedOut: boolean;
}

export interface ReactorReading {
  temperature: number;
  pressure: number;
  volume: number;
}

export type ReactorStatus = 'idle' | 'correct' | 'wrong';

export interface BestResult {
  correct: number;
  total: number;
  wrong: number;
  score: number;
  accuracy: number;
  timeSeconds: number;
  date: string;
}

export interface GameProgress {
  unlockedSection: number;
  completedSections: boolean[];
  currentIndex: number;
  answers: AnswerRecord[];
  score: number;
  correctCount: number;
  wrongCount: number;
  energy: number;
  elapsedSeconds: number;
}
