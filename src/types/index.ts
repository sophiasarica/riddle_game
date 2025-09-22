export interface Riddle {
  id: number;
  question: string;
  answer: string;
  hint?: string;
  visualHint?: string; // Emoji or SVG for visual learners
  category: 'animals' | 'nature' | 'objects' | 'food' | 'school' | 'fun' | 'technology' | 'internet' | 'devices' | 'online-safety' | 'digital-life';
  difficulty: 'easy' | 'medium' | 'difficult';
}

export interface GameState {
  currentRiddleIndex: number;
  score: number;
  totalRiddles: number;
  completedRiddles: number[];
  skippedRiddles: number[];
  gameStatus: 'playing' | 'completed' | 'paused';
  showHint: boolean;
  showAnswer: boolean;
  userAnswer: string;
  feedback: 'none' | 'correct' | 'incorrect' | 'hint' | 'skipped';
  selectedDifficulty: 'easy' | 'medium' | 'difficult';
}

export interface AccessibilitySettings {
  largeText: boolean;
  soundEffects: boolean;
  showInstructions: boolean;
}
