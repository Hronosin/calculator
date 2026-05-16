/**
 * Plot panel — 2D function plotting with live parameter sliders.
 *
 * Killer feature: change parameters with sliders, curve redraws instantly.
 * Example: "a * sin(b * x + c)" with three sliders a, b, c.
 */

import { useEffect, useRef, useState } from 'react';
import { render, type PlotParameter } from '../../core/plotting';
import { useTranslation } from '../../i18n';

export function PlotPanel() {
  const { t } = useTranslation();
  const plotRef = useRef<HTMLDivElement>(null);
  const [expression, setExpression] = useState('a * sin(b * x + c)');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [parameters, setParameters] = useState<PlotParameter[]>([
    { name: 'a', min: -3, max: 3, value: 1, step: 0.1 },
    { name: 'b', min: 0.1, max: 5, value: 1, step: 0.1 },
    { name: 'c', min: -Math.PI, max: Math.PI, value: 0, step: 0.05 },
  ]);

  useEffect(() => {
    if (!plotRef.current) return;
    render(plotRef.current, {
      expression,
      parameters,
      xDomain: [xMin, xMax],
      color: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00d9ff',
    });
  }, [expression, parameters, xMin, xMax]);

  // Re-render on window resize
  useEffect(() => {
    const handler = () => {
      if (!plotRef.current) return;
      render(plotRef.current, {
        expression,
        parameters,
        xDomain: [xMin, xMax],
      });
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [expression, parameters, xMin, xMax]);

  const updateParam = (name: string, value: number) => {
    setParameters((prev) => prev.map((p) => (p.name === name ? { ...p, value } : p)));
  };

  const addParameter = () => {
    const usedNames = new Set(parameters.map((p) => p.name));
    const available = ['d', 'k', 'm', 'n', 'p', 'q'].find((n) => !usedNames.has(n));
    if (!available) return;
    setParameters((prev) => [...prev, { name: available, min: -5, max: 5, value: 1, step: 0.1 }]);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}>
          {t('plot.expression')} · y =
        </label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="font-mono text-sm px-3 py-2 rounded-lg w-full outline-none"
          style={{
            background: 'var(--display)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      <div
        ref={plotRef}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--display)',
          border: '1px solid var(--border)',
          minHeight: 280,
        }}
      />

      <div className="flex items-center gap-3">
        <label className="text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}>
          {t('plot.x_range')}
        </label>
        <input
          type="number"
          value={xMin}
          onChange={(e) => setXMin(Number(e.target.value))}
          className="font-mono text-sm px-2 py-1 rounded w-20"
          style={{
            background: 'var(--display)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          }}
        />
        <span style={{ color: 'var(--text-faint)' }}>…</span>
        <input
          type="number"
          value={xMax}
          onChange={(e) => setXMax(Number(e.target.value))}
          className="font-mono text-sm px-2 py-1 rounded w-20"
          style={{
            background: 'var(--display)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}>
            {t('plot.params')}
          </label>
          <button
            className="font-mono text-xs px-3 py-1 rounded"
            style={{
              color: 'var(--accent)',
              background: 'var(--accent-glow)',
            }}
            onClick={addParameter}
          >
            {t('plot.add_param')}
          </button>
        </div>

        {parameters.map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="font-mono text-sm w-6" style={{ color: 'var(--accent)' }}>
              {p.name}
            </span>
            <input
              type="range"
              min={p.min}
              max={p.max}
              step={p.step ?? 0.01}
              value={p.value}
              onChange={(e) => updateParam(p.name, Number(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-sm w-16 text-right" style={{ color: 'var(--text-muted)' }}>
              {p.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
