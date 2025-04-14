"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useSettings } from './SettingsContext';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, updateSettings } = useSettings();
  const [theme, setTheme] = useState(settings.themeMode);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (settings.themeMode === 'system') {
      setTheme(systemTheme);
    } else {
      setTheme(settings.themeMode);
    }
  }, [settings.themeMode]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    updateSettings({ themeMode: newTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div 
        className={`${theme} ${settings.fontFamily} text-${settings.fontSize}`}
        style={{ 
          '--accent-color': settings.accentColor,
          '--primary-color': settings.primaryColor,
          '--secondary-color': settings.secondaryColor,
          ...settings.customStyles
        } as any}
      >
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