import React from 'react';
import { motion } from 'framer-motion';
import type { GameSettings } from '../types';

interface ThemeSettingsProps {
  settings: GameSettings;
  onUpdate: (settings: GameSettings) => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ settings, onUpdate }) => {
  const handleChange = (key: string, value: string) => {
    const newSettings = { ...settings };
    if (key.includes('.')) {
      const [section, prop] = key.split('.');
      newSettings[section] = { ...newSettings[section], [prop]: value };
    } else {
      newSettings[key] = value;
    }
    onUpdate(newSettings);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-200">Theme Settings</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Primary Color
          </label>
          <input
            type="color"
            value={settings.theme.primary}
            onChange={(e) => handleChange('theme.primary', e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Secondary Color
          </label>
          <input
            type="color"
            value={settings.theme.secondary}
            onChange={(e) => handleChange('theme.secondary', e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Accent Color
          </label>
          <input
            type="color"
            value={settings.theme.accent}
            onChange={(e) => handleChange('theme.accent', e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Background Color
          </label>
          <input
            type="color"
            value={settings.theme.background}
            onChange={(e) => handleChange('theme.background', e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button Roundness
          </label>
          <select
            value={settings.buttonStyle.rounded}
            onChange={(e) => handleChange('buttonStyle.rounded', e.target.value)}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
          >
            <option value="none">Square</option>
            <option value="sm">Slightly Rounded</option>
            <option value="md">Medium Rounded</option>
            <option value="lg">Large Rounded</option>
            <option value="full">Fully Rounded</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button Shadow
          </label>
          <select
            value={settings.buttonStyle.shadow}
            onChange={(e) => handleChange('buttonStyle.shadow', e.target.value)}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
          >
            <option value="none">No Shadow</option>
            <option value="sm">Small Shadow</option>
            <option value="md">Medium Shadow</option>
            <option value="lg">Large Shadow</option>
            <option value="xl">Extra Large Shadow</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.buttonStyle.animation}
            onChange={(e) => handleChange('buttonStyle.animation', e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label className="text-sm font-medium text-gray-300">
            Enable Button Animations
          </label>
        </div>
      </div>
    </div>
  );
};