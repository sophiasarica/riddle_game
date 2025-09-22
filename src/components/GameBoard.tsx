import React, { useState } from 'react';
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
  children?: React.ReactNode;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  currentRiddles,
  onGameStateChange,
  accessibilitySettings,
  onStartNewGame,
  children
}) => {
  const [userInput, setUserInput] = useState('');
  
  // Timeout constants
  const FEEDBACK_TIMEOUT = 2000;
  const HINT_TIMEOUT = 3000;

  const currentRiddle = currentRiddles[gameState.currentRiddleIndex];



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
    }, HINT_TIMEOUT);
  };


  const skipRiddle = () => {
    // Move to next riddle
    if (gameState.currentRiddleIndex < currentRiddles.length - 1) {
      onGameStateChange({
        currentRiddleIndex: gameState.currentRiddleIndex + 1,
        feedback: 'none',
        userAnswer: '',
        showHint: false,
        showAnswer: false
      });
      setUserInput('');
    } else {
      onGameStateChange({
        gameStatus: 'completed',
        feedback: 'none'
      });
    }
  };


  const submitAnswer = () => {
    const trimmedInput = userInput.trim();
    console.log('Submit button clicked!', { userInput, trimmedInput, currentAnswer: currentRiddle.answer });
    
    if (!trimmedInput) {
      console.log('No input provided');
      return;
    }

    const isCorrect = trimmedInput.toLowerCase() === currentRiddle.answer.toLowerCase().trim();
    console.log('Answer check:', { trimmedInput, currentAnswer: currentRiddle.answer, isCorrect });
    
    if (isCorrect) {
      // Correct answer - award 1 point
      onGameStateChange({
        score: gameState.score + 1,
        feedback: 'correct',
        userAnswer: trimmedInput
      });

      // Play success sound if enabled
      if (accessibilitySettings.soundEffects) {
        playSound('success');
      }

      // Move to next riddle after showing feedback
      setTimeout(() => {
        if (gameState.currentRiddleIndex < currentRiddles.length - 1) {
          onGameStateChange({
            currentRiddleIndex: gameState.currentRiddleIndex + 1,
            feedback: 'none',
            userAnswer: '',
            showHint: false,
            showAnswer: false
          });
          setUserInput('');
        } else {
          onGameStateChange({
            gameStatus: 'completed',
            feedback: 'none'
          });
        }
      }, FEEDBACK_TIMEOUT);
    } else {
      // Incorrect answer
      onGameStateChange({
        feedback: 'incorrect',
        userAnswer: trimmedInput
      });

      // Play error sound if enabled
      if (accessibilitySettings.soundEffects) {
        playSound('error');
      }

      // Clear feedback after delay
      setTimeout(() => {
        onGameStateChange({ feedback: 'none' });
      }, FEEDBACK_TIMEOUT);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAnswer();
    }
  };

  const playSound = (type: 'success' | 'error' | 'hint') => {
    // Simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
      {children}
      
      <GameProgress 
        current={gameState.currentRiddleIndex + 1}
        total={gameState.totalRiddles}
        score={gameState.score}
        skippedCount={gameState.skippedRiddles.length}
      />

      <RiddleCard 
        riddle={currentRiddle}
        showHint={gameState.showHint}
        showAnswer={gameState.showAnswer}
        feedback={gameState.feedback}
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
            onChange={(e) => {
              console.log('Input changed:', e.target.value);
              setUserInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="answer-input"
            autoComplete="off"
            autoFocus
            disabled={gameState.showAnswer}
            inputMode="text"
            enterKeyHint="send"
          />
        </div>

        <div className="button-group">
          <button 
            className="submit-button"
            onClick={(e) => {
              console.log('Button clicked!', e);
              submitAnswer();
            }}
            disabled={!userInput.trim() || gameState.showAnswer}
            aria-label="Submit your answer"
            type="button"
            style={{ 
              backgroundColor: (!userInput.trim() || gameState.showAnswer) ? '#ccc' : undefined 
            }}
          >
            ✓ Submit Answer {!userInput.trim() ? '(Empty)' : ''}
          </button>

          <button 
            className="hint-button"
            onClick={showHint}
            disabled={gameState.showHint || gameState.showAnswer}
            aria-label="Get a hint for this riddle"
          >
            💡 Hint
          </button>

          <button 
            className="skip-button"
            onClick={skipRiddle}
            disabled={gameState.showAnswer}
            aria-label="Skip this riddle"
          >
            ⏭️ Skip
          </button>
          
          {/* Debug button - always enabled */}
          <button 
            className="hint-button"
            onClick={() => {
              console.log('Debug button clicked!', { userInput, gameState });
              alert(`Input: "${userInput}", Length: ${userInput.length}`);
            }}
            style={{ backgroundColor: '#ff6b6b' }}
          >
            🐛 Debug
          </button>
        </div>
      </div>

    </div>
  );
};

export default GameBoard;
