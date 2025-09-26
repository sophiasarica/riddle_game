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
    { 
      key: 'easy' as const, 
      label: 'Easy', 
      emoji: '😊', 
      description: 'Perfect for beginners' 
    },
    { 
      key: 'medium' as const, 
      label: 'Medium', 
      emoji: '🤔', 
      description: 'A bit more challenging' 
    },
    { 
      key: 'difficult' as const, 
      label: 'Hard', 
      emoji: '🧠', 
      description: 'For riddle masters!' 
    }
  ];

  return (
    <div className="difficulty-switch">
      <label className="difficulty-label">
        Choose Your Challenge Level:
      </label>
      <div className="difficulty-segments">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.key}
            className={`difficulty-segment ${selectedDifficulty === difficulty.key ? 'active' : ''}`}
            onClick={() => onDifficultyChange(difficulty.key)}
            aria-label={`Select ${difficulty.label} difficulty: ${difficulty.description}`}
            title={difficulty.description}
          >
            <span className="difficulty-emoji">{difficulty.emoji}</span>
            <span className="difficulty-text">{difficulty.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySwitch;
