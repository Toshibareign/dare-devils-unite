
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  gradients: {
    hero: string;
    truth: string;
    dare: string;
  };
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Cosmic Purple',
    colors: {
      primary: '#8B5CF6',
      secondary: '#3B82F6',
      accent: '#EC4899',
      background: '#0f0f23',
      foreground: '#ffffff'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      truth: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      dare: 'linear-gradient(135deg, #EC4899 0%, #EF4444 100%)'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      primary: '#06B6D4',
      secondary: '#0EA5E9',
      accent: '#10B981',
      background: '#0c1222',
      foreground: '#ffffff'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #10b981 100%)',
      truth: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
      dare: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      accent: '#EC4899',
      background: '#1a1a1a',
      foreground: '#ffffff'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
      truth: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      dare: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)'
    }
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
      const savedTheme = themes.find(theme => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.colors.primary);
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--theme-accent', currentTheme.colors.accent);
    root.style.setProperty('--theme-background', currentTheme.colors.background);
    root.style.setProperty('--theme-foreground', currentTheme.colors.foreground);
    root.style.setProperty('--theme-hero-gradient', currentTheme.gradients.hero);
    root.style.setProperty('--theme-truth-gradient', currentTheme.gradients.truth);
    root.style.setProperty('--theme-dare-gradient', currentTheme.gradients.dare);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('selectedTheme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
