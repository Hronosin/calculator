/**
 * Theme manager.
 *
 * Single source of truth: THEMES array.
 * Adding a new theme = add one entry here + add CSS block in global.css.
 *
 * Themes are applied via data-theme attribute on <html>;
 * CSS variables in global.css drive the rest.
 */

import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';
import { storage } from '../utils/storage';

export type ThemeId =
  | 'dark'
  | 'light'
  | 'pink'
  | 'synthwave'
  | 'solarized'
  | 'nord'
  | 'matrix'
  | 'sepia';

export const THEMES: ReadonlyArray<{ id: ThemeId; label: string; icon: string }> = [
  { id: 'dark', label: 'Dark', icon: '☾' },
  { id: 'light', label: 'Light', icon: '☼' },
  { id: 'pink', label: 'Строгая Серьозность', icon: '🌸' },
  { id: 'synthwave', label: 'Synthwave', icon: '⏚' },
  { id: 'solarized', label: 'Solarized', icon: '☀' },
  { id: 'nord', label: 'Nord', icon: '❄' },
  { id: 'matrix', label: 'Matrix', icon: '▣' },
  { id: 'sepia', label: 'Sepia', icon: '◐' },
];

const STORAGE_KEY = 'calc.theme';
const VALID_THEMES: ReadonlySet<string> = new Set(THEMES.map((t) => t.id));

function isTheme(value: string): value is ThemeId {
  return VALID_THEMES.has(value);
}

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('dark');

  // Load saved theme
  useEffect(() => {
    storage.get<string>(STORAGE_KEY).then((saved) => {
      if (saved && isTheme(saved)) {
        setThemeState(saved);
      }
    });
  }, []);

  // Apply theme to DOM + persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Legacy: keep `.light` class for any code that still reads it
    document.documentElement.classList.toggle('light', theme === 'light');
    storage.set(STORAGE_KEY, theme).catch(() => {});
  }, [theme]);

  const cycle = () => {
    setThemeState((current) => {
      const ids = THEMES.map((t) => t.id);
      const idx = ids.indexOf(current);
      return ids[(idx + 1) % ids.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, cycle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
