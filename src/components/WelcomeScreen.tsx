import React from 'react';
import { AccessibilitySettings } from '../types';

interface WelcomeScreenProps {
  onStartGame: () => void;
  accessibilitySettings: AccessibilitySettings;
  children?: React.ReactNode;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, accessibilitySettings, children }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1 className="game-title">
          🧩 Riddle Quest 🧩
        </h1>
        
        <div className="welcome-message">
          <h2>Welcome!</h2>
          <p>Solve fun riddles and test your brain!</p>
        </div>

        {accessibilitySettings.showInstructions && (
          <div className="instructions" role="region" aria-label="Game Instructions">
            <h3>How to Play:</h3>
            <ol>
              <li>Read each riddle</li>
              <li>Type your answer</li>
              <li>Click Submit or press Enter</li>
              <li>Use hints if you need help</li>
            </ol>
          </div>
        )}

        {children}

        <button 
          className="start-button"
          onClick={onStartGame}
          aria-label="Start the riddle game"
        >
          🚀 Start Game!
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
