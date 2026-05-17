/**
 * Command Palette (Ctrl+K / ⌘K).
 *
 * Aggregates formulas, converters, history and actions into a single
 * fuzzy-searchable list. Formula names and converter names use the
 * dictionary translations.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../i18n';
import { tFormulaName, tCategory } from '../../i18n/dictionaries';
import { getAll as allFormulas } from '../../core/formulas/registry';
import { getAll as allConverters } from '../../core/converters/registry';
import type { CommandPaletteItem } from '../../core/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (item: CommandPaletteItem) => void;
  extraItems?: CommandPaletteItem[];
}

export function CommandPalette({ open, onClose, onSelect, extraItems = [] }: Props) {
  const { t, locale } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Force re-memoization when locale changes
  void locale;

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const allItems: CommandPaletteItem[] = useMemo(() => {
    const items: CommandPaletteItem[] = [];

    for (const f of allFormulas()) {
      const localizedName = tFormulaName(f.id, f.name);
      const localizedCategory = tCategory(f.category);
      items.push({
        id: `formula:${f.id}`,
        title: localizedName,
        subtitle: `${localizedCategory} · ${f.expression ?? f.id}`,
        category: 'formula',
        // Keep original strings as keywords so search works regardless of locale
        keywords: [
          f.id, f.name, f.category, localizedCategory, f.description ?? '',
        ],
        action: () => {},
      });
    }

    for (const c of allConverters()) {
      items.push({
        id: `converter:${c.id}`,
        title: c.name,
        subtitle: `${c.units.length} ${pickUnitsLabel(locale)}`,
        category: 'converter',
        keywords: [c.id, c.category, c.name],
        action: () => {},
      });
    }

    return [...items, ...extraItems];
  }, [extraItems, locale]);

  const filtered = useMemo(() => {
    if (!query) return allItems.slice(0, 50);
    const q = query.toLowerCase();
    return allItems
      .filter((item) => {
        const haystack = [
          item.title,
          item.subtitle ?? '',
          item.category,
          ...(item.keywords ?? []),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 50);
  }, [allItems, query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) {
          onSelect(item);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selectedIndex, onClose, onSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 animate-fade-in"
      style={{ background: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="mx-auto mt-[10vh] w-[min(640px,92vw)] rounded-2xl overflow-hidden animate-slide-up"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-strong)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="font-mono text-xs mr-3 px-1.5 py-0.5 rounded"
            style={{
              color: 'var(--accent)',
              background: 'var(--accent-glow)',
            }}>
            ⌘K
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('palette.placeholder')}
            className="flex-1 bg-transparent outline-none font-sans text-base"
            style={{ color: 'var(--text)' }}
          />
        </div>

        <ul className="max-h-[60vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm"
              style={{ color: 'var(--text-faint)' }}>
              {t('palette.empty')}
            </li>
          ) : (
            filtered.map((item, i) => (
              <li
                key={item.id}
                className="px-4 py-2 mx-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  background: i === selectedIndex ? 'var(--bg-hover)' : 'transparent',
                }}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <CategoryBadge category={item.category} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: 'var(--text)' }}>
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className="font-mono text-xs truncate mt-0.5"
                        style={{ color: 'var(--text-faint)' }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="px-4 py-2 font-mono text-[11px]"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-faint)' }}>
          {t('palette.hint')}
        </div>
      </div>
    </div>
  );
}

function pickUnitsLabel(locale: string): string {
  const labels: Record<string, string> = {
    en: 'units', ru: 'единиц', uk: 'одиниць', es: 'unidades',
    de: 'Einheiten', fr: 'unités', zh: '单位', ja: '単位',
    pt: 'unidades', it: 'unità', pl: 'jednostek',
  };
  return labels[locale] ?? labels.en;
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    formula: 'var(--accent)',
    converter: 'var(--sage)',
    function: 'var(--amber)',
    history: 'var(--text-muted)',
    action: 'var(--rose)',
  };
  const labels: Record<string, string> = {
    formula: 'ƒ',
    converter: '⇄',
    function: 'fn',
    history: '⟲',
    action: '▶',
  };
  return (
    <span
      className="font-mono text-xs flex-shrink-0 w-7 text-center"
      style={{ color: colors[category] ?? 'var(--text-muted)' }}
    >
      {labels[category] ?? '·'}
    </span>
  );
}
