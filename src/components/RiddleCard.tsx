import React from 'react';
import { Riddle } from '../types';

interface RiddleCardProps {
  riddle: Riddle;
  showHint: boolean;
  showVisualHint: boolean;
  showAnswer: boolean;
  feedback: 'none' | 'correct' | 'incorrect' | 'hint' | 'visual-hint' | 'skipped' | 'answer-revealed';
}

const RiddleCard: React.FC<RiddleCardProps> = ({
  riddle,
  showHint,
  showVisualHint,
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
      case 'visual-hint':
        return `👁️ Visual Hint: ${riddle.visualHint}`;
      case 'skipped':
        return `⏭️ Riddle skipped!`;
      case 'answer-revealed':
        return `💡 The answer is "${riddle.answer}"`;
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
      case 'visual-hint':
        return 'feedback-visual-hint';
      case 'skipped':
        return 'feedback-skipped';
      case 'answer-revealed':
        return 'feedback-answer-revealed';
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

        {showVisualHint && riddle.visualHint && (
          <div className="visual-hint-display" role="region" aria-label="Visual Hint">
            <h3>👁️ Visual Hint:</h3>
            <div className="visual-hint-emoji" aria-label={`Visual hint: ${riddle.visualHint}`}>
              {riddle.visualHint}
            </div>
          </div>
        )}

        {showAnswer && (
          <div className="answer-display" role="region" aria-label="Revealed Answer">
            <h3>💡 Answer:</h3>
            <div className="revealed-answer" aria-label={`The answer is: ${riddle.answer}`}>
              {riddle.answer}
            </div>
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
            {riddle.difficulty === 'easy' ? 'Easy' : 
             riddle.difficulty === 'medium' ? 'Medium' : 'Difficult'} Level
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiddleCard;
