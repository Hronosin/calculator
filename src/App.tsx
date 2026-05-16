/**
 * Root application component.
 *
 * Layout:
 *  ┌────────────────────────────────────────────────────┐
 *  │ Header: title, lang switch, theme toggle, ⌘K hint  │
 *  ├──────────┬─────────────────────────┬───────────────┤
 *  │ Sidebar  │ Active panel            │ History       │
 *  │ (tabs)   │ (calc/sym/plot/...)     │ (collapsible) │
 *  └──────────┴─────────────────────────┴───────────────┘
 */

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './ui/theme';
import { useTranslation, i18n } from './i18n';
import { Calculator } from './ui/components/Calculator';
import { SymbolicPanel } from './ui/components/SymbolicPanel';
import { PlotPanel } from './ui/components/PlotPanel';
import { FormulasPanel } from './ui/components/FormulasPanel';
import { UnitConverter } from './ui/components/UnitConverter';
import { ReplPanel } from './ui/components/ReplPanel';
import { PluginPanel } from './ui/components/PluginPanel';
import { History } from './ui/components/History';
import { CommandPalette } from './ui/components/CommandPalette';

type Tab = 'calc' | 'symbolic' | 'plot' | 'formulas' | 'units' | 'repl' | 'plugins';

function AppShell() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggle: toggleTheme } = useTheme();
  const [tab, setTab] = useState<Tab>('calc');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(true);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      } else if (meta && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setHistoryOpen((h) => !h);
      } else if (meta && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      } else if (meta && e.key === '/') {
        e.preventDefault();
        const next = locale === 'ru' ? 'en' : locale === 'en' ? 'uk' : 'ru';
        setLocale(next);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleTheme, locale, setLocale]);

  const tabs: Array<{ id: Tab; label: string; icon: string }> = [
    { id: 'calc', label: t('tab.calc'), icon: '⌗' },
    { id: 'symbolic', label: t('tab.symbolic'), icon: 'ƒ' },
    { id: 'plot', label: t('tab.plot'), icon: '∿' },
    { id: 'formulas', label: t('tab.formulas'), icon: '∑' },
    { id: 'units', label: t('tab.units'), icon: '⇄' },
    { id: 'repl', label: t('tab.repl'), icon: '›_' },
    { id: 'plugins', label: t('tab.plugins'), icon: '⊕' },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-lg tracking-tight" style={{ color: 'var(--text)' }}>
            ƒ(x)
          </span>
          <span className="font-display text-base hidden sm:block" style={{ color: 'var(--text)' }}>
            {t('app.title')}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest hidden md:block"
            style={{ color: 'var(--text-faint)' }}>
            {t('app.subtitle')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="font-mono text-xs px-2.5 py-1 rounded flex items-center gap-1.5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
            title="Command palette"
          >
            <span style={{ color: 'var(--accent)' }}>⌘</span>K
          </button>

          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as 'ru' | 'en' | 'uk')}
            className="font-mono text-xs px-2 py-1 rounded outline-none cursor-pointer"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
            <option value="uk">UK</option>
          </select>

          <button
            onClick={toggleTheme}
            className="font-mono text-xs px-2.5 py-1 rounded"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☾' : '☼'}
          </button>

          <button
            onClick={() => setHistoryOpen((v) => !v)}
            className="font-mono text-xs px-2.5 py-1 rounded hidden md:block"
            style={{
              background: historyOpen ? 'var(--accent-glow)' : 'var(--bg-card)',
              border: `1px solid ${historyOpen ? 'var(--accent)' : 'var(--border)'}`,
              color: historyOpen ? 'var(--accent)' : 'var(--text)',
            }}
            title="Toggle history"
          >
            ⟲
          </button>
        </div>
      </header>

      {/* Main body */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <nav
          className="flex-shrink-0 flex flex-col items-center py-3 gap-1"
          style={{
            width: 64,
            background: 'var(--bg-elevated)',
            borderRight: '1px solid var(--border)',
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors group relative"
              style={{
                background: tab === t.id ? 'var(--accent-glow)' : 'transparent',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
              }}
              title={t.label}
            >
              <span className="text-base font-mono">{t.icon}</span>
              <span className="text-[9px] mt-0.5 uppercase tracking-wider">{t.label.slice(0, 4)}</span>
            </button>
          ))}
        </nav>

        {/* Active panel */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 min-w-0">
          {tab === 'calc' && <Calculator />}
          {tab === 'symbolic' && <SymbolicPanel />}
          {tab === 'plot' && <PlotPanel />}
          {tab === 'formulas' && <FormulasPanel />}
          {tab === 'units' && <UnitConverter />}
          {tab === 'repl' && <ReplPanel />}
          {tab === 'plugins' && <PluginPanel />}
        </main>

        {/* History side panel */}
        {historyOpen && (
          <aside
            className="hidden md:flex flex-col flex-shrink-0"
            style={{
              width: 280,
              background: 'var(--bg-elevated)',
              borderLeft: '1px solid var(--border)',
            }}
          >
            <History
              onRecall={(entry) => {
                // Naive recall — paste expression into something? For now just log.
                navigator.clipboard?.writeText(entry.expression).catch(() => {});
              }}
            />
          </aside>
        )}
      </div>

      {/* Command Palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={(item) => {
          // Route based on category
          if (item.category === 'formula') {
            setTab('formulas');
          } else if (item.category === 'converter') {
            setTab('units');
          } else {
            item.action();
          }
        }}
      />
    </div>
  );
}

export default function App() {
  // i18n already self-initializes; touching the import ensures it's loaded
  void i18n;
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
