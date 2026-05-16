/**
 * Symbolic computation panel.
 * Wraps the algebrite-based Symbolic core API in a friendly UI.
 */

import { useState } from 'react';
import { Symbolic, type SymbolicResult } from '../../core/symbolic';
import { useTranslation } from '../../i18n';
import { Latex } from './Latex';
import { history } from '../../core/history';

type Op = 'derivative' | 'integral' | 'simplify' | 'factor' | 'solve';

export function SymbolicPanel() {
  const { t } = useTranslation();
  const [input, setInput] = useState('sin(x)^2 + cos(x)^2');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState<SymbolicResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [op, setOp] = useState<Op>('simplify');

  const run = async (operation: Op) => {
    setOp(operation);
    setLoading(true);
    setResult(null);

    let res: SymbolicResult;
    switch (operation) {
      case 'derivative':
        res = await Symbolic.differentiate(input, variable);
        break;
      case 'integral':
        res = await Symbolic.integrate(input, variable);
        break;
      case 'simplify':
        res = await Symbolic.simplify(input);
        break;
      case 'factor':
        res = await Symbolic.factor(input);
        break;
      case 'solve':
        res = await Symbolic.solve(input, variable);
        break;
    }

    setResult(res);
    setLoading(false);

    if (res.ok && res.result) {
      history.add({
        expression: `${operation}(${input})`,
        result: res.result,
        latex: res.latex,
        kind: 'symbolic',
      });
    }
  };

  const buttons: Array<{ op: Op; label: string }> = [
    { op: 'simplify', label: t('symbolic.simplify') },
    { op: 'derivative', label: t('symbolic.derivative') },
    { op: 'integral', label: t('symbolic.integral') },
    { op: 'factor', label: t('symbolic.factor') },
    { op: 'solve', label: t('symbolic.solve') },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}>
          {t('symbolic.input')}
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-base px-3 py-2 rounded-lg w-full outline-none mt-1"
          style={{
            background: 'var(--display)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}>
          {t('symbolic.variable')}
        </label>
        <input
          type="text"
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          className="font-mono text-sm px-2 py-1 rounded w-16 text-center"
          style={{
            background: 'var(--display)',
            color: 'var(--accent)',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
        {buttons.map((b) => (
          <button
            key={b.op}
            className="px-3 py-2 rounded-lg text-sm transition-colors"
            style={{
              background: op === b.op ? 'var(--accent-glow)' : 'var(--bg-card)',
              border: `1px solid ${op === b.op ? 'var(--accent)' : 'var(--border)'}`,
              color: op === b.op ? 'var(--accent)' : 'var(--text)',
            }}
            onClick={() => run(b.op)}
            disabled={loading}
          >
            {b.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-sm font-mono" style={{ color: 'var(--text-faint)' }}>
          …
        </div>
      )}

      {result && (
        <div
          className="rounded-xl p-4"
          style={{
            background: result.ok ? 'var(--display)' : 'rgba(255, 107, 139, 0.06)',
            border: `1px solid ${result.ok ? 'var(--border)' : 'var(--rose)'}`,
          }}
        >
          {result.ok ? (
            <>
              <div className="text-[10px] uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-faint)' }}>
                Result
              </div>
              {result.latex && (
                <div className="mb-2 overflow-x-auto">
                  <Latex expression={result.latex} displayMode />
                </div>
              )}
              <div className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                {result.result}
              </div>
            </>
          ) : (
            <div className="font-mono text-sm" style={{ color: 'var(--rose)' }}>
              {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
