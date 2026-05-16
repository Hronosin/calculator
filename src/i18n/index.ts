/**
 * Internationalization manager.
 */

import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

import ru from './locales/ru.json';
import en from './locales/en.json';
import uk from './locales/uk.json';

type Locale = 'ru' | 'en' | 'uk';

const LOCALES: Record<Locale, Record<string, string>> = { ru, en, uk };
const STORAGE_KEY = 'calc.lang';

type Listener = (locale: Locale) => void;

class LocaleManager {
  private current: Locale = this.detect();
  private listeners = new Set<Listener>();

  constructor() {
    this.load();
  }

  private detect(): Locale {
    if (typeof navigator !== 'undefined') {
      const lang = navigator.language.split('-')[0];
      if (lang === 'ru' || lang === 'uk' || lang === 'en') return lang;
    }
    return 'en';
  }

  private async load() {
    const saved = await storage.get<Locale>(STORAGE_KEY);
    if (saved && saved in LOCALES) {
      this.current = saved;
      this.emit();
    }
  }

  get(): Locale {
    return this.current;
  }

  set(locale: Locale): void {
    if (!(locale in LOCALES)) return;
    this.current = locale;
    storage.set(STORAGE_KEY, locale).catch(() => {});
    this.emit();
  }

  t(key: string): string {
    return LOCALES[this.current][key] ?? LOCALES.en[key] ?? key;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    for (const listener of this.listeners) listener(this.current);
  }
}

export const i18n = new LocaleManager();

/** React hook — re-renders when locale changes */
export function useTranslation(): {
  t: (key: string) => string;
  locale: Locale;
  setLocale: (l: Locale) => void;
} {
  const [locale, setLocaleState] = useState<Locale>(i18n.get());
  useEffect(() => i18n.subscribe(setLocaleState), []);
  return {
    t: (key: string) => i18n.t(key),
    locale,
    setLocale: (l: Locale) => i18n.set(l),
  };
}
