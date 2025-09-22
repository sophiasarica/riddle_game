export interface Riddle {
  id: number;
  question: string;
  answer: string;
  hint?: string;
  category: 'animals' | 'nature' | 'objects' | 'food' | 'school' | 'fun';
  difficulty: 'easy' | 'medium';
}

export interface GameState {
  currentRiddleIndex: number;
  score: number;
  totalRiddles: number;
  completedRiddles: number[];
  gameStatus: 'playing' | 'completed' | 'paused';
  showHint: boolean;
  userAnswer: string;
  feedback: 'none' | 'correct' | 'incorrect' | 'hint';
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  soundEffects: boolean;
  reducedMotion: boolean;
  showInstructions: boolean;
}
