import React from 'react';
import { Riddle, AccessibilitySettings } from '../types';

interface RiddleCardProps {
  riddle: Riddle;
  showHint: boolean;
  feedback: 'none' | 'correct' | 'incorrect' | 'hint';
  userAnswer: string;
  accessibilitySettings: AccessibilitySettings;
}

const RiddleCard: React.FC<RiddleCardProps> = ({
  riddle,
  showHint,
  feedback,
  userAnswer,
  accessibilitySettings
}) => {
  const getFeedbackMessage = () => {
    switch (feedback) {
      case 'correct':
        return `🎉 Great job! "${riddle.answer}" is correct!`;
      case 'incorrect':
        return `❌ Not quite right. Try again!`;
      case 'hint':
        return `💡 Hint: ${riddle.hint}`;
      default:
        return '';
    }
  };

  const getFeedbackClass = () => {
    switch (feedback) {
      case 'correct':
        return 'feedback-correct';
      case 'incorrect':
        return 'feedback-incorrect';
      case 'hint':
        return 'feedback-hint';
      default:
        return '';
    }
  };

  return (
    <div className="riddle-card">
      <div className="riddle-header">
        <div className="riddle-number">
          Riddle {riddle.id}
        </div>
        <div className="riddle-category">
          {riddle.category.charAt(0).toUpperCase() + riddle.category.slice(1)}
        </div>
        <div className="riddle-difficulty">
          {riddle.difficulty === 'easy' ? '⭐ Easy' : '⭐⭐ Medium'}
        </div>
      </div>

      <div className="riddle-content">
        <h2 className="riddle-question">
          {riddle.question}
        </h2>

        {showHint && riddle.hint && (
          <div className="hint-display" role="region" aria-label="Hint">
            <h3>💡 Hint:</h3>
            <p>{riddle.hint}</p>
          </div>
        )}

        {feedback !== 'none' && (
          <div 
            className={`feedback-message ${getFeedbackClass()}`}
            role="status"
            aria-live="polite"
          >
            {getFeedbackMessage()}
          </div>
        )}
      </div>

      <div className="riddle-footer">
        <div className="progress-indicator">
          <div className="progress-dots">
            {Array.from({ length: 5 }, (_, i) => (
              <div 
                key={i} 
                className={`progress-dot ${i < 3 ? 'active' : ''}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="progress-text">
            {riddle.difficulty === 'easy' ? 'Easy' : 'Medium'} Level
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiddleCard;
