"use client"

import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

const fontSizes = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' }
];

const accentColors = [
  { value: '#FF4F59', label: 'Coral (Default)' },
  { value: '#FFAD28', label: 'Sunset Orange' },
  { value: '#4CAF50', label: 'Success Green' },
  { value: '#2196F3', label: 'Info Blue' }
];

export default function ThemeSettings() {
  const { theme, fontSize, accentColor, toggleTheme, updateSettings } = useTheme();
  const [localSettings, setLocalSettings] = useState({
    fontSize: fontSize,
    accentColor: accentColor
  });

  useEffect(() => {
    setLocalSettings({
      fontSize: fontSize,
      accentColor: accentColor
    });
  }, [fontSize, accentColor]);

  const handleSettingChange = (type: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSave = () => {
    updateSettings(localSettings);
  };

  return (
    <div className="p-6 bg-[#FFFAF4] dark:bg-[#161916]">
      <div className="grid gap-6 max-w-4xl">
        {/* Theme Mode */}
        <div className="bg-[#FFF2DF] dark:bg-[#1d1f1d] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4]">Theme Mode</h2>
              <p className="text-sm text-[#444744] dark:text-gray-400">Choose between light and dark theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-coral text-[#FFFAF4] hover:bg-[#e64550] transition-colors"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-[#FFF2DF] dark:bg-[#1d1f1d] p-6 rounded-lg">
          <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Font Size</h2>
          <div className="grid grid-cols-2 gap-4">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => handleSettingChange('fontSize', size.value)}
                className={`p-4 text-left rounded border transition-all ${
                  localSettings.fontSize === size.value
                    ? 'border-coral text-coral'
                    : 'border-first-light-2 dark:text-sunrise-white light:text-midnight hover:border-coral'
                }`}
              >
                <div className="text-lg mb-1">{size.label}</div>
                <div className="text-sm text-gray-400">The quick brown fox jumps over the lazy dog</div>
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="bg-[#FFF2DF] dark:bg-[#1d1f1d] p-6 rounded-lg">
          <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Accent Color</h2>
          <div className="grid grid-cols-2 gap-4">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleSettingChange('accentColor', color.value)}
                className={`p-4 text-left rounded border transition-all ${
                  localSettings.accentColor === color.value
                    ? 'border-coral text-coral'
                    : 'border-first-light-2 dark:text-sunrise-white light:text-midnight hover:border-coral'
                }`}
              >
                <div className="text-lg mb-1">{color.label}</div>
                <div className="text-sm text-gray-400">This is a sample text with the selected color</div>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-coral text-[#FFFAF4] hover:bg-[#e64550] transition-colors rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}