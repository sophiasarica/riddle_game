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
  skippedRiddles: number[]; // Track skipped riddles
  revealedAnswers: number[]; // Track riddles where answer was revealed
  gameStatus: 'playing' | 'completed' | 'paused';
  showHint: boolean;
  showVisualHint: boolean;
  showAnswer: boolean; // Track if current riddle's answer is revealed
  userAnswer: string;
  feedback: 'none' | 'correct' | 'incorrect' | 'hint' | 'visual-hint' | 'skipped' | 'answer-revealed';
  selectedDifficulty: 'easy' | 'medium' | 'difficult';
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  soundEffects: boolean;
  reducedMotion: boolean;
  showInstructions: boolean;
}
