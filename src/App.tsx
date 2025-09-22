import React, { useState, useEffect } from 'react';
import { GameState, AccessibilitySettings } from './types';
import { getRandomRiddles } from './data/riddles';
import GameBoard from './components/GameBoard';
import WelcomeScreen from './components/WelcomeScreen';
import AccessibilityPanel from './components/AccessibilityPanel';
import './App.css';

const initialGameState: GameState = {
  currentRiddleIndex: 0,
  score: 0,
  totalRiddles: 0,
  completedRiddles: [],
  gameStatus: 'paused',
  showHint: false,
  userAnswer: '',
  feedback: 'none'
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
  const [currentRiddles, setCurrentRiddles] = useState(getRandomRiddles(10));

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
    const newRiddles = getRandomRiddles(10);
    setCurrentRiddles(newRiddles);
    setGameState({
      ...initialGameState,
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
        />
      ) : (
        <GameBoard 
          gameState={gameState}
          currentRiddles={currentRiddles}
          onGameStateChange={updateGameState}
          accessibilitySettings={accessibilitySettings}
          onStartNewGame={startNewGame}
        />
      )}
    </div>
  );
}

export default App;
