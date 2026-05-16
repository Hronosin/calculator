/**
 * Unit converter panel.
 * Uses the converter registry — pick a converter, value, from/to units.
 */

import { useMemo, useState, useEffect } from 'react';
import { getAll, convert } from '../../core/converters/registry';

export function UnitConverter() {
  const converters = useMemo(() => getAll(), []);
  const [activeId, setActiveId] = useState(converters[0]?.id ?? '');
  const active = converters.find((c) => c.id === activeId);

  const [value, setValue] = useState('1');
  const [from, setFrom] = useState(active?.units[0]?.code ?? '');
  const [to, setTo] = useState(active?.units[1]?.code ?? '');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset units when converter changes
  useEffect(() => {
    if (!active) return;
    setFrom(active.units[0]?.code ?? '');
    setTo(active.units[1]?.code ?? '');
  }, [activeId, active]);

  // Recompute on any input change
  useEffect(() => {
    if (!active || !from || !to) return;
    const num = Number(value);
    if (Number.isNaN(num)) {
      setError('Invalid number');
      setResult('');
      return;
    }
    try {
      const out = convert(active, num, from, to);
      setResult(formatNumber(out));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setResult('');
    }
  }, [active, value, from, to]);

  return (
    <div className="flex flex-col gap-4">
      {/* Converter selector */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {converters.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors"
            style={{
              background: activeId === c.id ? 'var(--accent-glow)' : 'transparent',
              color: activeId === c.id ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${activeId === c.id ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {active && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          {/* From */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}>
              Из
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="font-mono text-2xl px-3 py-3 rounded-lg outline-none"
              style={{
                background: 'var(--display)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="font-sans text-sm px-3 py-2 rounded-lg outline-none"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
            >
              {active.units.map((u) => (
                <option key={u.code} value={u.code}>
                  {u.code} · {u.label}
                </option>
              ))}
            </select>
          </div>

          {/* Arrow */}
          <div className="text-2xl px-2 hidden md:block" style={{ color: 'var(--accent)' }}>
            →
          </div>

          {/* To */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}>
              В
            </label>
            <div
              className="font-mono text-2xl px-3 py-3 rounded-lg"
              style={{
                background: 'var(--display)',
                color: error ? 'var(--rose)' : 'var(--accent)',
                border: '1px solid var(--border)',
                minHeight: 60,
              }}
            >
              {error ? error : result || '—'}
            </div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="font-sans text-sm px-3 py-2 rounded-lg outline-none"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
            >
              {active.units.map((u) => (
                <option key={u.code} value={u.code}>
                  {u.code} · {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 1e-4 || abs >= 1e12)) {
    return n.toExponential(6);
  }
  // Round to remove FP noise; up to 10 significant digits
  return parseFloat(n.toPrecision(10)).toString();
}
