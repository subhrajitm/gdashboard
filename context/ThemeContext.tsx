"use client"

import { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  fontSize: string;
  accentColor: string;
  toggleTheme: () => void;
  updateSettings: (settings: { fontSize?: string; accentColor?: string }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('base');
  const [accentColor, setAccentColor] = useState('#FF4F59');

  useEffect(() => {
    const savedSettings = localStorage.getItem('themeSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTheme(settings.theme || 'dark');
      setFontSize(settings.fontSize || 'base');
      setAccentColor(settings.accentColor || '#FF4F59');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveSettings({ theme: newTheme });
  };

  const updateSettings = (settings: { fontSize?: string; accentColor?: string }) => {
    if (settings.fontSize) setFontSize(settings.fontSize);
    if (settings.accentColor) setAccentColor(settings.accentColor);
    saveSettings({ ...settings });
  };

  const saveSettings = (settings: any) => {
    const currentSettings = localStorage.getItem('themeSettings');
    const updatedSettings = {
      ...(currentSettings ? JSON.parse(currentSettings) : {}),
      theme,
      fontSize,
      accentColor,
      ...settings
    };
    localStorage.setItem('themeSettings', JSON.stringify(updatedSettings));
  };

  return (
    <ThemeContext.Provider value={{ theme, fontSize, accentColor, toggleTheme, updateSettings }}>
      <div className={`${theme} text-${fontSize}`} style={{ '--accent-color': accentColor } as any}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}