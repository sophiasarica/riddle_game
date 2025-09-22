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

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    onSettingsChange({ [key]: !settings[key] });
  };

  return (
    <div className="accessibility-panel">
      <button 
        className="accessibility-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
      >
        ⚙️ Settings
      </button>

      {isOpen && (
        <div className="accessibility-menu" role="dialog" aria-label="Accessibility Settings">
          <h3>Accessibility Settings</h3>
          
          <div className="setting-group">
            <label className="setting-item">
              <input
                type="checkbox"
                checked={settings.largeText}
                onChange={() => toggleSetting('largeText')}
                aria-describedby="large-text-desc"
              />
              <span>Large Text</span>
              <small id="large-text-desc">Makes text bigger</small>
            </label>

            <label className="setting-item">
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={() => toggleSetting('soundEffects')}
                aria-describedby="sound-effects-desc"
              />
              <span>Sound Effects</span>
              <small id="sound-effects-desc">Plays sounds for feedback</small>
            </label>
          </div>

          <button 
            className="close-settings"
            onClick={() => setIsOpen(false)}
            aria-label="Close accessibility settings"
          >
            ✕ Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityPanel;
