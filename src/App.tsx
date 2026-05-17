/**
 * Root application component.
 */

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme, THEMES, type ThemeId } from './ui/theme';
import { useTranslation, i18n, SUPPORTED_LOCALES, type Locale } from './i18n';
import { tTheme } from './i18n/dictionaries';
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
  const { theme, setTheme, cycle: cycleTheme } = useTheme();
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
        cycleTheme();
      } else if (meta && e.key === '/') {
        e.preventDefault();
        const codes = SUPPORTED_LOCALES.map((l) => l.code);
        const idx = codes.indexOf(locale);
        const next = codes[(idx + 1) % codes.length];
        setLocale(next);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cycleTheme, locale, setLocale]);

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
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="font-mono text-xs px-2 py-1 rounded outline-none cursor-pointer"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              maxWidth: 140,
            }}
            title={t('lang.label')}
          >
            {SUPPORTED_LOCALES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.short} · {l.native}
              </option>
            ))}
          </select>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeId)}
            className="font-mono text-xs px-2 py-1 rounded outline-none cursor-pointer"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              maxWidth: 220,
            }}
            title="Theme"
          >
            {THEMES.map((th) => (
              <option key={th.id} value={th.id}>
                {th.icon} {tTheme(th.id)}
              </option>
            ))}
          </select>

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

      <div className="flex-1 flex min-h-0">
        <nav
          className="flex-shrink-0 flex flex-col items-center py-3 gap-1"
          style={{
            width: 64,
            background: 'var(--bg-elevated)',
            borderRight: '1px solid var(--border)',
          }}
        >
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className="w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors group relative"
              style={{
                background: tab === tabItem.id ? 'var(--accent-glow)' : 'transparent',
                color: tab === tabItem.id ? 'var(--accent)' : 'var(--text-muted)',
              }}
              title={tabItem.label}
            >
              <span className="text-base font-mono">{tabItem.icon}</span>
              <span className="text-[9px] mt-0.5 uppercase tracking-wider">
                {tabItem.label.slice(0, 4)}
              </span>
            </button>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 min-w-0">
          {tab === 'calc' && <Calculator />}
          {tab === 'symbolic' && <SymbolicPanel />}
          {tab === 'plot' && <PlotPanel />}
          {tab === 'formulas' && <FormulasPanel />}
          {tab === 'units' && <UnitConverter />}
          {tab === 'repl' && <ReplPanel />}
          {tab === 'plugins' && <PluginPanel />}
        </main>

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
                navigator.clipboard?.writeText(entry.expression).catch(() => {});
              }}
            />
          </aside>
        )}
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={(item) => {
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
  void i18n;
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
