import { useState, useEffect } from 'react';
import { GameState, AccessibilitySettings } from './types';
import { getRandomRiddlesByDifficulty } from './data/riddles';
import GameBoard from './components/GameBoard';
import WelcomeScreen from './components/WelcomeScreen';
import AccessibilityPanel from './components/AccessibilityPanel';
import DifficultySwitch from './components/DifficultySwitch';
import './App.css';

const initialGameState: GameState = {
  currentRiddleIndex: 0,
  score: 0,
  totalRiddles: 0,
  completedRiddles: [],
  skippedRiddles: [],
  revealedAnswers: [],
  gameStatus: 'paused',
  showHint: false,
  showVisualHint: false,
  showAnswer: false,
  userAnswer: '',
  feedback: 'none',
  selectedDifficulty: 'easy'
};

const initialAccessibilitySettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  soundEffects: true,
  reducedMotion: false,
  showInstructions: true
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(initialAccessibilitySettings);
  const [currentRiddles, setCurrentRiddles] = useState(getRandomRiddlesByDifficulty('easy', 10));

  // Load accessibility settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('riddle-game-accessibility');
    if (savedSettings) {
      setAccessibilitySettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save accessibility settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('riddle-game-accessibility', JSON.stringify(accessibilitySettings));
  }, [accessibilitySettings]);

  const startNewGame = () => {
    const newRiddles = getRandomRiddlesByDifficulty(gameState.selectedDifficulty, 10);
    setCurrentRiddles(newRiddles);
    setGameState({
      ...initialGameState,
      selectedDifficulty: gameState.selectedDifficulty,
      totalRiddles: newRiddles.length,
      gameStatus: 'playing'
    });
  };

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const updateAccessibilitySettings = (updates: Partial<AccessibilitySettings>) => {
    setAccessibilitySettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className={`app ${accessibilitySettings.highContrast ? 'high-contrast' : ''} ${accessibilitySettings.largeText ? 'large-text' : ''} ${accessibilitySettings.reducedMotion ? 'reduced-motion' : ''}`}>
      <AccessibilityPanel 
        settings={accessibilitySettings}
        onSettingsChange={updateAccessibilitySettings}
      />
      
      {gameState.gameStatus === 'paused' ? (
        <WelcomeScreen 
          onStartGame={startNewGame}
          accessibilitySettings={accessibilitySettings}
        >
          <DifficultySwitch
            selectedDifficulty={gameState.selectedDifficulty}
            onDifficultyChange={(difficulty) => updateGameState({ selectedDifficulty: difficulty })}
          />
        </WelcomeScreen>
      ) : (
        <GameBoard 
          gameState={gameState}
          currentRiddles={currentRiddles}
          onGameStateChange={updateGameState}
          accessibilitySettings={accessibilitySettings}
          onStartNewGame={startNewGame}
        >
          <DifficultySwitch
            selectedDifficulty={gameState.selectedDifficulty}
            onDifficultyChange={(difficulty) => {
              updateGameState({ selectedDifficulty: difficulty });
              // Restart game with new difficulty
              const newRiddles = getRandomRiddlesByDifficulty(difficulty, 10);
              setCurrentRiddles(newRiddles);
              setGameState({
                ...initialGameState,
                selectedDifficulty: difficulty,
                totalRiddles: newRiddles.length,
                gameStatus: 'playing'
              });
            }}
          />
        </GameBoard>
      )}
    </div>
  );
}

export default App;
