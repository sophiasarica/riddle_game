import React, { useState, useEffect } from 'react';
import { GameState, Riddle, AccessibilitySettings } from '../types';

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
  const [inputValue, setInputValue] = useState('');

  const currentRiddle = currentRiddles[gameState.currentRiddleIndex];
  const progress = ((gameState.currentRiddleIndex + 1) / gameState.totalRiddles) * 100;

  // Reset input when moving to next riddle
  useEffect(() => {
    setInputValue('');
  }, [gameState.currentRiddleIndex]);

  const handleAnswerSubmit = () => {
    if (!inputValue.trim()) return;

    const isCorrect = inputValue.toLowerCase().trim() === currentRiddle.answer.toLowerCase();
    
    if (isCorrect) {
      onGameStateChange({
        score: gameState.score + 1,
        completedRiddles: [...gameState.completedRiddles, currentRiddle.id],
        feedback: 'correct',
        userAnswer: inputValue.trim()
      });
    } else {
      onGameStateChange({
        feedback: 'incorrect',
        userAnswer: inputValue.trim()
      });
    }
  };

  const handleHint = () => {
    onGameStateChange({
      showHint: true,
      feedback: 'hint'
    });
  };

  const handleSkip = () => {
    onGameStateChange({
      skippedRiddles: [...gameState.skippedRiddles, currentRiddle.id],
      feedback: 'skipped'
    });
  };

  const handleShowAnswer = () => {
    onGameStateChange({
      showAnswer: true,
      feedback: 'answer-revealed'
    });
  };

  const handleNextRiddle = () => {
    if (gameState.currentRiddleIndex < gameState.totalRiddles - 1) {
      onGameStateChange({
        currentRiddleIndex: gameState.currentRiddleIndex + 1,
        showHint: false,
        showAnswer: false,
        feedback: 'none',
        userAnswer: ''
      });
    } else {
      onGameStateChange({
        gameStatus: 'completed'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !gameState.showAnswer) {
      handleAnswerSubmit();
    }
  };

  // Game Complete Screen
  if (gameState.gameStatus === 'completed') {
    const correctAnswers = gameState.completedRiddles.length;
    const skippedAnswers = gameState.skippedRiddles.length;
    const percentage = Math.round((correctAnswers / gameState.totalRiddles) * 100);

    let performanceMessage = '';
    if (percentage >= 90) {
      performanceMessage = "🌟 Amazing! You're a riddle master!";
    } else if (percentage >= 70) {
      performanceMessage = "🎉 Great job! You did really well!";
    } else if (percentage >= 50) {
      performanceMessage = "👍 Good work! Keep practicing!";
    } else {
      performanceMessage = "💪 Nice try! Practice makes perfect!";
    }

    return (
      <div className="game-complete">
        <div className="completion-content">
          <div className="celebration">
            <div className="celebration-emoji">🎊</div>
            <h1>Game Complete!</h1>
            <h2>Congratulations on finishing Riddle Quest!</h2>
          </div>

          <div className="final-stats">
            <div className="stat-card">
              <div className="stat-number">{correctAnswers}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{skippedAnswers}</div>
              <div className="stat-label">Skipped</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{percentage}%</div>
              <div className="stat-label">Score</div>
            </div>
          </div>

          <div className="performance-message">
            <p>{performanceMessage}</p>
          </div>

          <button 
            className="play-again-button" 
            onClick={onStartNewGame}
            aria-label="Play the game again"
          >
            Play Again! 🔄
          </button>

          <div className="completion-tips">
            <h3>Tips for Next Time:</h3>
            <ul>
              <li>Read each riddle carefully</li>
              <li>Think about technology and digital life</li>
              <li>Use hints when you're stuck</li>
              <li>Don't be afraid to skip if needed</li>
            </ul>
          </div>

          <div className="encouragement">
            <p>
              <strong>Keep Learning:</strong> Technology is always changing, and there's always something new to discover!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="game-board">
      {children}

      {/* Game Progress */}
      <div className="game-progress">
        <div className="progress-header">
          <div className="progress-info">
            <span className="current-riddle">
              Riddle {gameState.currentRiddleIndex + 1} of {gameState.totalRiddles}
            </span>
            <span className="score">Score: {gameState.score}</span>
          </div>
          <div className="progress-percentage">{Math.round(progress)}%</div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-label">Correct</span>
            <span className="stat-value">{gameState.completedRiddles.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Skipped</span>
            <span className="stat-value">{gameState.skippedRiddles.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{gameState.totalRiddles - gameState.currentRiddleIndex - 1}</span>
          </div>
        </div>
      </div>

      {/* Riddle Card */}
      <div className={`riddle-card ${gameState.showAnswer ? 'answer-revealed' : ''}`}>
        <div className="riddle-header">
          <span className="riddle-number">#{gameState.currentRiddleIndex + 1}</span>
          <span className="riddle-category">{currentRiddle.category}</span>
          <span className="riddle-difficulty">{currentRiddle.difficulty}</span>
        </div>

        <div className="riddle-question">
          {currentRiddle.question}
        </div>

        {currentRiddle.visualHint && (
          <div style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem 0' }}>
            {currentRiddle.visualHint}
          </div>
        )}

        {gameState.showHint && currentRiddle.hint && (
          <div className="hint-display">
            <h3>💡 Hint:</h3>
            <p>{currentRiddle.hint}</p>
          </div>
        )}

        {gameState.showAnswer && (
          <div className="answer-display">
            <h3>✅ The Answer Is:</h3>
            <div className="revealed-answer">{currentRiddle.answer}</div>
          </div>
        )}

        {gameState.feedback !== 'none' && (
          <div className={`feedback-message feedback-${gameState.feedback}`}>
            {gameState.feedback === 'correct' && '🎉 Correct! Well done!'}
            {gameState.feedback === 'incorrect' && '❌ Not quite right. Try again or use a hint!'}
            {gameState.feedback === 'hint' && '💡 Hint revealed! Try again!'}
            {gameState.feedback === 'skipped' && '⏭️ Riddle skipped. Moving to next one!'}
            {gameState.feedback === 'answer-revealed' && '✅ Answer revealed! Moving to next riddle!'}
          </div>
        )}

        <div className="riddle-footer">
          <div className="progress-indicator">
            <div className="progress-dots">
              {Array.from({ length: gameState.totalRiddles }, (_, i) => (
                <div 
                  key={i} 
                  className={`progress-dot ${i === gameState.currentRiddleIndex ? 'active' : ''}`}
                ></div>
              ))}
            </div>
            <span className="progress-text">
              {gameState.currentRiddleIndex + 1} of {gameState.totalRiddles}
            </span>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="answer-section">
        <div className="input-group">
          <label htmlFor="answer-input" className="input-label">
            Your Answer:
          </label>
          <input
            id="answer-input"
            type="text"
            className="answer-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            disabled={gameState.showAnswer}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="button-group">
          {!gameState.showAnswer && (
            <>
              <button
                className="submit-button"
                onClick={handleAnswerSubmit}
                disabled={!inputValue.trim()}
                aria-label="Submit your answer"
              >
                Check Answer ✓
              </button>
              
              <button
                className="hint-button"
                onClick={handleHint}
                disabled={gameState.showHint}
                aria-label="Get a hint for this riddle"
              >
                {gameState.showHint ? 'Hint Used 💡' : 'Get Hint 💡'}
              </button>
              
              <button
                className="skip-button"
                onClick={handleSkip}
                aria-label="Skip this riddle"
              >
                Skip ⏭️
              </button>
            </>
          )}

          {gameState.feedback === 'incorrect' && !gameState.showAnswer && (
            <button
              className="submit-button"
              onClick={handleShowAnswer}
              aria-label="Show the correct answer"
            >
              Show Answer 👁️
            </button>
          )}

          {(gameState.feedback === 'correct' || gameState.feedback === 'answer-revealed' || gameState.feedback === 'skipped') && (
            <button
              className="submit-button"
              onClick={handleNextRiddle}
              aria-label="Go to next riddle"
            >
              {gameState.currentRiddleIndex < gameState.totalRiddles - 1 ? 'Next Riddle ➡️' : 'Finish Game 🏁'}
            </button>
          )}
        </div>

        {accessibilitySettings.showInstructions && (
          <div className="game-instructions">
            <p>
              <strong>Instructions:</strong> Type your answer and press Enter or click "Check Answer". 
              Use hints if you need help, or skip if you're stuck!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
