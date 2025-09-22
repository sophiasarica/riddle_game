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
          <h2>Welcome, Brain Detective!</h2>
          <p>Get ready for an exciting adventure with fun riddles!</p>
        </div>

        {accessibilitySettings.showInstructions && (
          <div className="instructions" role="region" aria-label="Game Instructions">
            <h3>How to Play:</h3>
            <ol>
              <li>Read each riddle carefully</li>
              <li>Type your answer in the box</li>
              <li>Click "Check Answer" to see if you're right</li>
              <li>Use the hint button if you need help</li>
              <li>Complete all riddles to win!</li>
            </ol>
          </div>
        )}

        <div className="game-features">
          <h3>What Makes This Game Special:</h3>
          <ul>
            <li>🎯 Riddles perfect for 5th graders</li>
            <li>♿ Built with accessibility in mind</li>
            <li>📱 Works great on phones and tablets</li>
            <li>🎨 Calming colors and clear text</li>
            <li>🔊 Sound effects (can be turned off)</li>
            <li>💻 Technology and digital life focus</li>
          </ul>
        </div>

        {children}

        <button 
          className="start-button"
          onClick={onStartGame}
          aria-label="Start the riddle game"
        >
          🚀 Start Your Quest!
        </button>

        <div className="accessibility-note">
          <p>
            <strong>Accessibility Tip:</strong> Use the settings button in the top right 
            to customize the game for your needs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
