import React from 'react';
import { AccessibilitySettings } from '../types';

interface WelcomeScreenProps {
  onStartGame: () => void;
  accessibilitySettings: AccessibilitySettings;
  children?: React.ReactNode;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStartGame, 
  accessibilitySettings,
  children 
}) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1 className="game-title">🧩 Riddle Quest</h1>
        
        <div className="welcome-message">
          <h2>Welcome to Riddle Quest!</h2>
          <p>Test your brain with fun technology riddles designed just for you!</p>
        </div>

        {children}

        <div className="instructions">
          <h3>How to Play:</h3>
          <ol>
            <li>Read each riddle carefully</li>
            <li>Type your answer in the text box</li>
            <li>Click "Check Answer" or press Enter</li>
            <li>Use hints if you need help</li>
            <li>Complete all riddles to see your score!</li>
          </ol>
        </div>

        <div className="game-features">
          <h3>Game Features:</h3>
          <ul>
            <li>🎯 Age-appropriate riddles</li>
            <li>♿ Accessibility options</li>
            <li>📱 Mobile-friendly design</li>
            <li>🎨 Calming visual design</li>
            <li>🔊 Optional sound effects</li>
          </ul>
        </div>

        <button 
          className="start-button" 
          onClick={onStartGame}
          aria-label="Start the riddle game"
        >
          Start Playing! 🚀
        </button>

        {accessibilitySettings.showInstructions && (
          <div className="accessibility-note">
            <p>
              <strong>Accessibility Note:</strong> This game is designed with accessibility in mind. 
              You can adjust settings like text size and sound effects to make the game work best for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
