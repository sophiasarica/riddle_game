import React from 'react';
import { GameState, AccessibilitySettings } from '../types';

interface GameCompleteProps {
  gameState: GameState;
  onStartNewGame: () => void;
  accessibilitySettings: AccessibilitySettings;
}

const GameComplete: React.FC<GameCompleteProps> = ({
  gameState,
  onStartNewGame,
  accessibilitySettings
}) => {
  const accuracy = Math.round((gameState.score / gameState.totalRiddles) * 100);
  
  const getPerformanceMessage = () => {
    if (accuracy === 100) {
      return "🏆 Perfect Score! You're a riddle master!";
    } else if (accuracy >= 80) {
      return "🌟 Excellent work! You're really good at riddles!";
    } else if (accuracy >= 60) {
      return "👍 Great job! You solved most of the riddles!";
    } else {
      return "🎯 Good effort! Keep practicing and you'll get even better!";
    }
  };

  const getPerformanceEmoji = () => {
    if (accuracy === 100) return "🏆";
    if (accuracy >= 80) return "🌟";
    if (accuracy >= 60) return "👍";
    return "🎯";
  };

  return (
    <div className="game-complete">
      <div className="completion-content">
        <div className="celebration">
          <div className="celebration-emoji">
            {getPerformanceEmoji()}
          </div>
          <h1>Congratulations!</h1>
          <h2>You completed Riddle Quest!</h2>
        </div>

        <div className="final-stats">
          <div className="stat-card">
            <div className="stat-number">{gameState.score}</div>
            <div className="stat-label">Correct Answers</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{gameState.totalRiddles}</div>
            <div className="stat-label">Total Riddles</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>

        <div className="performance-message">
          <p>{getPerformanceMessage()}</p>
        </div>

        <div className="completion-actions">
          <button 
            className="play-again-button"
            onClick={onStartNewGame}
            aria-label="Start a new riddle game"
          >
            🎮 Play Again
          </button>
        </div>

        {accessibilitySettings.showInstructions && (
          <div className="completion-tips">
            <h3>What's Next?</h3>
            <ul>
              <li>Try playing again to see new riddles!</li>
              <li>Challenge yourself to get a perfect score!</li>
              <li>Share your success with friends and family!</li>
              <li>Keep your brain sharp with more puzzles!</li>
            </ul>
          </div>
        )}

        <div className="encouragement">
          <p>
            <strong>Remember:</strong> Every riddle you solve makes your brain stronger! 
            Keep exploring, keep learning, and keep having fun! 🧠✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameComplete;
