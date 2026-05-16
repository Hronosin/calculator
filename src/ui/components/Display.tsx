/**
 * Calculator display.
 * Top: dim, smaller expression. Bottom: large result with LaTeX rendering.
 */

import { Latex } from './Latex';

interface Props {
  expression: string;
  result: string;
  latex?: string;
  error?: string;
  angleMode: string;
}

export function Display({ expression, result, latex, error, angleMode }: Props) {
  return (
    <div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: 'var(--display)',
        border: '1px solid var(--border)',
        minHeight: 168,
      }}
    >
      {/* Badge: angle mode */}
      <div className="absolute top-3 right-4 flex gap-2 text-[10px] font-mono uppercase tracking-wider"
        style={{ color: 'var(--text-faint)' }}>
        <span>{angleMode}</span>
      </div>

      {/* Expression (faded, smaller) */}
      <div
        className="font-mono text-sm mb-2 min-h-[20px] break-all"
        style={{ color: 'var(--text-faint)' }}
      >
        {expression || '\u00A0'}
      </div>

      {/* Result — big, prominent */}
      {error ? (
        <div className="font-mono text-2xl" style={{ color: 'var(--rose, #ff6b8b)' }}>
          {error}
        </div>
      ) : latex ? (
        <div className="text-3xl break-all">
          <Latex expression={latex} displayMode />
        </div>
      ) : (
        <div className="font-mono text-4xl font-medium break-all" style={{ color: 'var(--text)' }}>
          {result || '0'}
        </div>
      )}
    </div>
  );
}
