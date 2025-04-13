"use client"

import { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  fontSize: string;
  fontFamily: string;
  accentColor: string;
  toggleTheme: () => void;
  updateSettings: (settings: { fontSize?: string; fontFamily?: string; accentColor?: string }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('base');
  const [fontFamily, setFontFamily] = useState('inter');
  const [accentColor, setAccentColor] = useState('#FF4F59');

  useEffect(() => {
    const savedSettings = localStorage.getItem('themeSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTheme(settings.theme || 'dark');
      setFontSize(settings.fontSize || 'base');
      setFontFamily(settings.fontFamily || 'inter');
      setAccentColor(settings.accentColor || '#FF4F59');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveSettings({ theme: newTheme });
  };

  const updateSettings = (settings: { fontSize?: string; fontFamily?: string; accentColor?: string }) => {
    if (settings.fontSize) setFontSize(settings.fontSize);
    if (settings.fontFamily) setFontFamily(settings.fontFamily);
    if (settings.accentColor) setAccentColor(settings.accentColor);
    saveSettings({ ...settings });
  };

  const saveSettings = (settings: any) => {
    const currentSettings = localStorage.getItem('themeSettings');
    const updatedSettings = {
      ...(currentSettings ? JSON.parse(currentSettings) : {}),
      theme,
      fontSize,
      fontFamily,
      accentColor,
      ...settings
    };
    localStorage.setItem('themeSettings', JSON.stringify(updatedSettings));
  };

  return (
    <ThemeContext.Provider value={{ theme, fontSize, fontFamily, accentColor, toggleTheme, updateSettings }}>
      <div className={`${theme} ${fontFamily} text-${fontSize}`} style={{ '--accent-color': accentColor } as any}>
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