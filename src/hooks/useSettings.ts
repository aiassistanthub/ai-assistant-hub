import { useState, useEffect } from 'react';
import { categoryGroups } from '../data/categoryGroups';

export interface Settings {
  difyApiKey: string;
  difyBaseUrl: string;
  companyId: string;
  visibleCategories: string[];
}

const defaultSettings: Settings = {
  difyApiKey: '',
  difyBaseUrl: 'https://api.dify.ai',
  companyId: '',
  visibleCategories: categoryGroups.flatMap(group => group.categories.map(cat => cat.id)),
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoaded) {
      try {
        const storedSettings = {
          difyApiKey: localStorage.getItem('difyApiKey') || defaultSettings.difyApiKey,
          difyBaseUrl: localStorage.getItem('difyBaseUrl') || defaultSettings.difyBaseUrl,
          companyId: localStorage.getItem('companyId') || defaultSettings.companyId,
          visibleCategories: JSON.parse(localStorage.getItem('visibleCategories') || JSON.stringify(defaultSettings.visibleCategories)),
        };
        setSettings(storedSettings);
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
      }
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const updateSettings = (newSettings: Settings) => {
    try {
      setSettings(newSettings);
      if (typeof window !== 'undefined') {
        localStorage.setItem('difyApiKey', newSettings.difyApiKey);
        localStorage.setItem('difyBaseUrl', newSettings.difyBaseUrl);
        localStorage.setItem('companyId', newSettings.companyId);
        localStorage.setItem('visibleCategories', JSON.stringify(newSettings.visibleCategories));
      }
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  };

  return { settings, updateSettings, isLoaded };
}