"use client"

import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

const fontSizes = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' }
];

const fontFamilies = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'opensans', label: 'Open Sans' }
];

const accentColors = [
  { value: '#FF4F59', label: 'Coral (Default)' },
  { value: '#FFAD28', label: 'Sunset Orange' },
  { value: '#4CAF50', label: 'Success Green' },
  { value: '#2196F3', label: 'Info Blue' }
];

export default function ThemeSettings() {
  const { theme, fontSize, fontFamily, accentColor, toggleTheme, updateSettings } = useTheme();
  const [localSettings, setLocalSettings] = useState({
    fontSize: fontSize,
    fontFamily: fontFamily,
    accentColor: accentColor
  });

  useEffect(() => {
    setLocalSettings({
      fontSize: fontSize,
      fontFamily: fontFamily,
      accentColor: accentColor
    });
  }, [fontSize, fontFamily, accentColor]);

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
    <div className="p-6 bg-[#FFFAF4] dark:bg-[#181C23]">
      <h1 className="text-2xl font-bold mb-6 text-[#181C23] dark:text-[#FFFAF4]">Theme Settings</h1>
      
      <div className="grid gap-6 max-w-4xl">
        {/* Theme Mode */}
        <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
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

        {/* Other sections - update background and text colors */}
        <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
          <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Font Family</h2>
          <div className="grid grid-cols-2 gap-4">
            {fontFamilies.map((font) => (
              <button
                key={font.value}
                onClick={() => handleSettingChange('fontFamily', font.value)}
                className={`p-4 text-left rounded border transition-all ${
                  localSettings.fontFamily === font.value
                    ? 'border-coral text-coral'
                    : 'border-first-light-2 dark:text-sunrise-white light:text-midnight hover:border-coral'
                }`}
              >
                <div className="text-lg mb-1">{font.label}</div>
                <div className="text-sm text-gray-400">The quick brown fox jumps over the lazy dog</div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
          <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Font Size</h2>
          <div className="grid grid-cols-4 gap-4">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => handleSettingChange('fontSize', size.value)}
                className={`p-3 text-center rounded border transition-all ${
                  localSettings.fontSize === size.value
                    ? 'border-coral text-coral'
                    : 'border-[#444744] text-[#181C23] dark:text-[#FFFAF4] hover:border-coral'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
          <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Accent Color</h2>
          <div className="grid grid-cols-4 gap-4">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleSettingChange('accentColor', color.value)}
                className={`p-4 rounded border transition-all ${
                  localSettings.accentColor === color.value
                    ? 'border-coral'
                    : 'border-[#444744] hover:border-coral'
                }`}
              >
                <div 
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: color.value }}
                ></div>
                <div className="text-sm text-[#181C23] dark:text-[#FFFAF4] text-center">
                  {color.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-first-light-1 dark:bg-first-light-1 light:bg-sunrise-cream p-6 rounded-lg">
          <h2 className="text-lg font-medium dark:text-sunrise-white light:text-midnight mb-4">Preview</h2>
          <div 
            className={`p-6 rounded font-${localSettings.fontFamily} text-${localSettings.fontSize}`}
            style={{ 
              backgroundColor: theme === 'dark' ? '#282A27' : '#FFFAF4',
              color: theme === 'dark' ? '#FFFAF4' : '#181C23'
            }}
          >
            <h3 className="text-xl font-bold mb-2">Sample Heading</h3>
            <p className="text-[#181C23] dark:text-[#FFFAF4]">
              This is how your content will look with the selected settings.
              The quick brown fox jumps over the lazy dog.
            </p>
            <button 
              className="mt-4 px-4 py-2 rounded text-white"
              style={{ backgroundColor: localSettings.accentColor }}
            >
              Sample Button
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-coral text-white py-3 hover:bg-[#e64550] transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}