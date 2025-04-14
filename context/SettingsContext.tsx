"use client"

import { createContext, useContext, useState, useEffect } from 'react';

interface ProjectSettings {
  projectName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  themeMode: 'light' | 'dark' | 'system';
  fontFamily: string;
  fontSize: string;
  accentColor: string;
  customStyles?: {
    [key: string]: string;
  };
}

interface SettingsContextType {
  settings: ProjectSettings;
  updateSettings: (newSettings: Partial<ProjectSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: ProjectSettings = {
  projectName: 'Dashboard',
  logoUrl: '/logo.png',
  primaryColor: '#FF4F59',
  secondaryColor: '#FFAD28',
  themeMode: 'system',
  fontFamily: 'inter',
  fontSize: 'base',
  accentColor: '#FF4F59',
  customStyles: {},
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ProjectSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('projectSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({
          ...prev,
          ...parsedSettings,
        }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<ProjectSettings>) => {
    setSettings(prev => {
      const updatedSettings = {
        ...prev,
        ...newSettings,
      };
      localStorage.setItem('projectSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('projectSettings');
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 