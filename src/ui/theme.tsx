/**
 * Theme manager.
 * Toggles a `light` class on <html>; CSS variables do the rest.
 */

import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';
import { storage } from '../utils/storage';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'calc.theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    storage.get<Theme>(STORAGE_KEY).then((saved) => {
      if (saved === 'dark' || saved === 'light') {
        setThemeState(saved);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    storage.set(STORAGE_KEY, theme).catch(() => {});
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeState,
        toggle: () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
