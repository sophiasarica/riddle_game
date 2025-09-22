import React from 'react';

interface DifficultySwitchProps {
  selectedDifficulty: 'easy' | 'medium' | 'difficult';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'difficult') => void;
}

const DifficultySwitch: React.FC<DifficultySwitchProps> = ({
  selectedDifficulty,
  onDifficultyChange
}) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', emoji: '😊' },
    { value: 'medium', label: 'Medium', emoji: '🤔' },
    { value: 'difficult', label: 'Difficult', emoji: '🧠' }
  ] as const;

  return (
    <div className="difficulty-switch">
      <label className="difficulty-label" htmlFor="difficulty-selector">
        Choose Difficulty:
      </label>
      <div 
        className="difficulty-segments"
        role="tablist"
        aria-label="Difficulty selection"
        id="difficulty-selector"
      >
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            className={`difficulty-segment ${selectedDifficulty === difficulty.value ? 'active' : ''}`}
            onClick={() => onDifficultyChange(difficulty.value)}
            role="tab"
            aria-selected={selectedDifficulty === difficulty.value}
            aria-label={`${difficulty.label} difficulty`}
            type="button"
          >
            <span className="difficulty-emoji" aria-hidden="true">
              {difficulty.emoji}
            </span>
            <span className="difficulty-text">
              {difficulty.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySwitch;
