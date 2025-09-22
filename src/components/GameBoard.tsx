import React, { useState, useEffect } from 'react';
import { GameState, Riddle, AccessibilitySettings } from '../types';
import RiddleCard from './RiddleCard';
import GameProgress from './GameProgress';
import GameComplete from './GameComplete';

interface GameBoardProps {
  gameState: GameState;
  currentRiddles: Riddle[];
  onGameStateChange: (updates: Partial<GameState>) => void;
  accessibilitySettings: AccessibilitySettings;
  onStartNewGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  currentRiddles,
  onGameStateChange,
  accessibilitySettings,
  onStartNewGame
}) => {
  const [userInput, setUserInput] = useState('');

  const currentRiddle = currentRiddles[gameState.currentRiddleIndex];

  const checkAnswer = () => {
    if (!userInput.trim()) return;

    const isCorrect = userInput.toLowerCase().trim() === currentRiddle.answer.toLowerCase();
    
    if (isCorrect) {
      onGameStateChange({
        score: gameState.score + 1,
        completedRiddles: [...gameState.completedRiddles, currentRiddle.id],
        feedback: 'correct',
        userAnswer: userInput
      });

      // Play success sound if enabled
      if (accessibilitySettings.soundEffects) {
        playSound('success');
      }

      // Move to next riddle after a short delay
      setTimeout(() => {
        if (gameState.currentRiddleIndex < currentRiddles.length - 1) {
          onGameStateChange({
            currentRiddleIndex: gameState.currentRiddleIndex + 1,
            feedback: 'none',
            userAnswer: '',
            showHint: false
          });
          setUserInput('');
        } else {
          onGameStateChange({
            gameStatus: 'completed',
            feedback: 'none'
          });
        }
      }, 2000);
    } else {
      onGameStateChange({
        feedback: 'incorrect',
        userAnswer: userInput
      });

      // Play error sound if enabled
      if (accessibilitySettings.soundEffects) {
        playSound('error');
      }

      // Clear feedback after delay
      setTimeout(() => {
        onGameStateChange({ feedback: 'none' });
      }, 2000);
    }
  };

  const showHint = () => {
    onGameStateChange({ 
      showHint: true, 
      feedback: 'hint' 
    });

    // Play hint sound if enabled
    if (accessibilitySettings.soundEffects) {
      playSound('hint');
    }

    // Clear feedback after delay
    setTimeout(() => {
      onGameStateChange({ feedback: 'none' });
    }, 3000);
  };

  const playSound = (type: 'success' | 'error' | 'hint') => {
    // Simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different sounds
    switch (type) {
      case 'success':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        break;
      case 'hint':
        oscillator.frequency.setValueAtTime(392, audioContext.currentTime); // G4
        break;
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  if (gameState.gameStatus === 'completed') {
    return (
      <GameComplete 
        gameState={gameState}
        onStartNewGame={onStartNewGame}
        accessibilitySettings={accessibilitySettings}
      />
    );
  }

  return (
    <div className="game-board">
      <GameProgress 
        current={gameState.currentRiddleIndex + 1}
        total={gameState.totalRiddles}
        score={gameState.score}
      />

      <RiddleCard 
        riddle={currentRiddle}
        showHint={gameState.showHint}
        feedback={gameState.feedback}
        userAnswer={gameState.userAnswer}
        accessibilitySettings={accessibilitySettings}
      />

      <div className="answer-section">
        <div className="input-group">
          <label htmlFor="answer-input" className="input-label">
            Your Answer:
          </label>
          <input
            id="answer-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            className="answer-input"
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="button-group">
          <button 
            className="check-button"
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            aria-label="Check your answer"
          >
            ✓ Check Answer
          </button>

          {currentRiddle.hint && (
            <button 
              className="hint-button"
              onClick={showHint}
              disabled={gameState.showHint}
              aria-label="Get a hint for this riddle"
            >
              💡 Hint
            </button>
          )}
        </div>
      </div>

      {accessibilitySettings.showInstructions && (
        <div className="game-instructions" role="region" aria-label="Current Game Instructions">
          <p><strong>Tip:</strong> Press Enter to check your answer quickly!</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
