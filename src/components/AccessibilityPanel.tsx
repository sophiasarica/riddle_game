import React, { useState } from 'react';
import { AccessibilitySettings } from '../types';

interface AccessibilityPanelProps {
  settings: AccessibilitySettings;
  onSettingsChange: (updates: Partial<AccessibilitySettings>) => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  settings,
  onSettingsChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingChange = (key: keyof AccessibilitySettings, value: boolean) => {
    onSettingsChange({ [key]: value });
  };

  return (
    <div className="accessibility-panel">
      <button
        className="accessibility-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
      >
        ♿ Settings
      </button>

      {isOpen && (
        <div className="accessibility-menu">
          <h3>Accessibility Settings</h3>
          
          <div className="setting-group">
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.largeText}
                  onChange={(e) => handleSettingChange('largeText', e.target.checked)}
                />
                Large Text
              </label>
              <small>Increase font sizes for better readability</small>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.soundEffects}
                  onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                />
                Sound Effects
              </label>
              <small>Enable audio feedback for actions</small>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.showInstructions}
                  onChange={(e) => handleSettingChange('showInstructions', e.target.checked)}
                />
                Show Instructions
              </label>
              <small>Display helpful instructions throughout the game</small>
            </div>
          </div>

          <button
            className="close-settings"
            onClick={() => setIsOpen(false)}
            aria-label="Close accessibility settings"
          >
            Close Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityPanel;
