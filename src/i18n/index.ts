/**
 * Internationalization manager.
 *
 * Single source of truth: SUPPORTED_LOCALES array.
 * To add a new language: create locales/<code>.json + add one entry below.
 */

import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

import en from './locales/en.json';
import ru from './locales/ru.json';
import uk from './locales/uk.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import pl from './locales/pl.json';

export const SUPPORTED_LOCALES = [
  { code: 'en', short: 'EN', native: 'English' },
  { code: 'ru', short: 'RU', native: 'Русский' },
  { code: 'uk', short: 'UK', native: 'Українська' },
  { code: 'es', short: 'ES', native: 'Español' },
  { code: 'de', short: 'DE', native: 'Deutsch' },
  { code: 'fr', short: 'FR', native: 'Français' },
  { code: 'zh', short: 'ZH', native: '中文' },
  { code: 'ja', short: 'JA', native: '日本語' },
  { code: 'pt', short: 'PT', native: 'Português' },
  { code: 'it', short: 'IT', native: 'Italiano' },
  { code: 'pl', short: 'PL', native: 'Polski' },
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number]['code'];

const LOCALES: Record<Locale, Record<string, string>> = {
  en,
  ru,
  uk,
  es,
  de,
  fr,
  zh,
  ja,
  pt,
  it,
  pl,
};

const STORAGE_KEY = 'calc.lang';

const VALID_CODES: ReadonlySet<string> = new Set(SUPPORTED_LOCALES.map((l) => l.code));

function isLocale(value: string): value is Locale {
  return VALID_CODES.has(value);
}

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
      if (isLocale(lang)) return lang;
    }
    return 'en';
  }

  private async load() {
    const saved = await storage.get<string>(STORAGE_KEY);
    if (saved && isLocale(saved)) {
      this.current = saved;
      this.emit();
    }
  }

  get(): Locale {
    return this.current;
  }

  set(locale: Locale): void {
    if (!isLocale(locale)) return;
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
