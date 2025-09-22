import React from 'react';
import { Riddle } from '../types';

interface RiddleCardProps {
  riddle: Riddle;
  showHint: boolean;
  showAnswer: boolean;
  feedback: 'none' | 'correct' | 'incorrect' | 'hint' | 'skipped';
}

const RiddleCard: React.FC<RiddleCardProps> = ({
  riddle,
  showHint,
  showAnswer,
  feedback
}) => {
  const getFeedbackMessage = () => {
    switch (feedback) {
      case 'correct':
        return `🎉 Great job! "${riddle.answer}" is correct!`;
      case 'incorrect':
        return `❌ Not quite right. Try again!`;
      case 'hint':
        return `💡 Hint: ${riddle.hint}`;
      case 'skipped':
        return `⏭️ Riddle skipped!`;
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
      case 'skipped':
        return 'feedback-skipped';
      default:
        return '';
    }
  };

  return (
    <div className={`riddle-card ${showAnswer ? 'answer-revealed' : ''}`}>
      <div className="riddle-header">
        <div className="riddle-number">
          Riddle {riddle.id}
        </div>
        <div className="riddle-category">
          {riddle.category.charAt(0).toUpperCase() + riddle.category.slice(1)}
        </div>
        <div className="riddle-difficulty">
          {riddle.difficulty === 'easy' ? '⭐ Easy' : 
           riddle.difficulty === 'medium' ? '⭐⭐ Medium' : '⭐⭐⭐ Difficult'}
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
        <div className="difficulty-badge">
          {riddle.difficulty === 'easy' ? '⭐ Easy' : 
           riddle.difficulty === 'medium' ? '⭐⭐ Medium' : '⭐⭐⭐ Difficult'}
        </div>
      </div>
    </div>
  );
};

export default RiddleCard;
