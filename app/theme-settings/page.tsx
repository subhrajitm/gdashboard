"use client"

import { useTheme } from '../../context/ThemeContext';

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-sunrise-white light:text-midnight">Theme Settings</h1>
      
      <div className="bg-first-light-1 dark:bg-first-light-1 light:bg-sunrise-cream p-6 rounded-lg max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium dark:text-sunrise-white light:text-midnight">Theme Mode</h2>
            <p className="text-sm text-gray-400">Choose between light and dark theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-coral text-white rounded hover:bg-[#e64550] transition-colors"
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="border-t border-first-light-2 pt-6">
          <h2 className="text-lg font-medium dark:text-sunrise-white light:text-midnight mb-4">Preview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-midnight text-sunrise-white rounded">
              Dark Theme
            </div>
            <div className="p-4 bg-sunrise-white text-midnight rounded border border-first-light-2">
              Light Theme
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}