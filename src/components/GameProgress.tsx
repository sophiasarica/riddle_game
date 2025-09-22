import React from 'react';

interface GameProgressProps {
  current: number;
  total: number;
  score: number;
  skippedCount?: number;
}

const GameProgress: React.FC<GameProgressProps> = ({ current, total, score, skippedCount = 0 }) => {
  const progressPercentage = (current / total) * 100;

  // Update CSS custom property for progress width
  React.useEffect(() => {
    document.documentElement.style.setProperty('--progress-width', `${progressPercentage}%`);
  }, [progressPercentage]);

  return (
    <div className="game-progress">
      <div className="progress-header">
        <div className="progress-info">
          <span className="current-riddle">
            Riddle {current} of {total}
          </span>
          <span className="score">
            Score: {score}/{total}
          </span>
        </div>
        <div className="progress-percentage">
          {Math.round(progressPercentage)}%
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Progress: ${current} of ${total} riddles completed`}
        >
          <div className="progress-fill" />
        </div>
      </div>

      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">{current - 1}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Remaining:</span>
          <span className="stat-value">{total - current + 1}</span>
        </div>
        {skippedCount > 0 && (
          <div className="stat-item">
            <span className="stat-label">Skipped:</span>
            <span className="stat-value">{skippedCount}</span>
          </div>
        )}
        <div className="stat-item">
          <span className="stat-label">Accuracy:</span>
          <span className="stat-value">
            {current > 1 ? Math.round((score / (current - 1)) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameProgress;
