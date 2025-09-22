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

  const showVisualHint = () => {
    onGameStateChange({ 
      showVisualHint: true, 
      feedback: 'visual-hint' 
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
    // Apply light score penalty (0.5 points instead of 1)
    const newScore = Math.max(0, gameState.score - 0.5);
    
    onGameStateChange({
      score: newScore,
      skippedRiddles: [...gameState.skippedRiddles, currentRiddle.id],
      feedback: 'skipped',
      userAnswer: ''
    });

    // Play skip sound if enabled
    if (accessibilitySettings.soundEffects) {
      playSound('error');
    }

    // Move to next riddle after showing feedback
    setTimeout(() => {
      if (gameState.currentRiddleIndex < currentRiddles.length - 1) {
        onGameStateChange({
          currentRiddleIndex: gameState.currentRiddleIndex + 1,
          feedback: 'none',
          userAnswer: '',
          showHint: false,
          showVisualHint: false,
          showAnswer: false
        });
        setUserInput('');
      } else {
        onGameStateChange({
          gameStatus: 'completed',
          feedback: 'none'
        });
      }
    }, 2000);
  };

  const revealAnswer = () => {
    // Reset score to 0 (no points for revealed answers)
    // Add to revealed answers list
    onGameStateChange({
      score: 0,
      revealedAnswers: [...gameState.revealedAnswers, currentRiddle.id],
      showAnswer: true,
      feedback: 'answer-revealed',
      userAnswer: ''
    });

    // Play hint sound if enabled
    if (accessibilitySettings.soundEffects) {
      playSound('hint');
    }

    // Move to next riddle after showing feedback
    setTimeout(() => {
      if (gameState.currentRiddleIndex < currentRiddles.length - 1) {
        onGameStateChange({
          currentRiddleIndex: gameState.currentRiddleIndex + 1,
          feedback: 'none',
          userAnswer: '',
          showHint: false,
          showVisualHint: false,
          showAnswer: false
        });
        setUserInput('');
      } else {
        onGameStateChange({
          gameStatus: 'completed',
          feedback: 'none'
        });
      }
    }, HINT_TIMEOUT);
  };

  const previousRiddle = () => {
    if (gameState.currentRiddleIndex > 0) {
      onGameStateChange({
        currentRiddleIndex: gameState.currentRiddleIndex - 1,
        feedback: 'none',
        userAnswer: '',
        showHint: false,
        showVisualHint: false,
        showAnswer: false
      });
      setUserInput('');

      // Play navigation sound if enabled
      if (accessibilitySettings.soundEffects) {
        playSound('hint');
      }
    }
  };

  const submitAnswer = () => {
    if (!userInput.trim() || gameState.showAnswer) {
      return;
    }

    const isCorrect = userInput.toLowerCase().trim() === currentRiddle.answer.toLowerCase().trim();
    
    if (isCorrect) {
      // Correct answer - award points based on difficulty
      let points = 0;
      switch (currentRiddle.difficulty) {
        case 'easy':
          points = 1;
          break;
        case 'medium':
          points = 2;
          break;
        case 'hard':
          points = 3;
          break;
      }

      onGameStateChange({
        score: gameState.score + points,
        feedback: 'correct',
        userAnswer: userInput.trim()
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
            showVisualHint: false,
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
        userAnswer: userInput.trim()
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
        showVisualHint={gameState.showVisualHint}
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
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="answer-input"
            autoComplete="off"
            autoFocus
            disabled={gameState.showAnswer}
          />
        </div>

        <div className="button-group">
          <button 
            className="previous-button"
            onClick={previousRiddle}
            disabled={gameState.currentRiddleIndex === 0}
            aria-label="Go to previous riddle"
          >
            ← Previous Riddle
          </button>

          {currentRiddle.hint && (
            <button 
              className="hint-button"
              onClick={showHint}
              disabled={gameState.showHint || gameState.showAnswer}
              aria-label="Get a text hint for this riddle"
            >
              💡 Hint
            </button>
          )}

          {currentRiddle.visualHint && (
            <button 
              className="visual-hint-button"
              onClick={showVisualHint}
              disabled={gameState.showVisualHint || gameState.showAnswer}
              aria-label="Get a visual hint for this riddle"
            >
              👁️ Visual Hint
            </button>
          )}

          <button 
            className="show-answer-button"
            onClick={revealAnswer}
            disabled={gameState.showAnswer}
            aria-label="Show the answer (no points awarded)"
          >
            💡 Show Answer
          </button>

          <button 
            className="skip-button"
            onClick={skipRiddle}
            disabled={gameState.showAnswer}
            aria-label="Skip this riddle (small score penalty)"
          >
            ⏭️ Skip
          </button>
        </div>
      </div>

      {accessibilitySettings.showInstructions && (
        <div className="game-instructions" role="region" aria-label="Current Game Instructions">
          <p><strong>Navigation:</strong> Use the Previous Riddle button to go back to earlier riddles.</p>
          <p><strong>Show Answer:</strong> Use this button if you need help - it won't give you points but will show the correct answer.</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
