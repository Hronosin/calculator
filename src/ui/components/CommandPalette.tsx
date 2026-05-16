/**
 * Command Palette (Ctrl+K / ⌘K).
 *
 * Aggregates formulas, converters, history and actions into a single
 * fuzzy-searchable list. This is one of the "killer features" — it makes
 * the otherwise huge feature set discoverable.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../i18n';
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
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      // Focus next tick so the input is mounted
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const allItems: CommandPaletteItem[] = useMemo(() => {
    const items: CommandPaletteItem[] = [];

    for (const f of allFormulas()) {
      items.push({
        id: `formula:${f.id}`,
        title: f.name,
        subtitle: `${f.category} · ${f.expression ?? f.id}`,
        category: 'formula',
        keywords: [f.id, f.category, f.description ?? ''],
        action: () => {
          /* set by consumer via onSelect */
        },
      });
    }

    for (const c of allConverters()) {
      items.push({
        id: `converter:${c.id}`,
        title: c.name,
        subtitle: `Конвертер · ${c.units.length} единиц`,
        category: 'converter',
        keywords: [c.id, c.category],
        action: () => {},
      });
    }

    return [...items, ...extraItems];
  }, [extraItems]);

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

  // Keyboard navigation
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
