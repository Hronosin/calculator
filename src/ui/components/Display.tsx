/**
 * Calculator display.
 * Top: smaller, faded expression (what the user typed).
 * Bottom: large result number.
 *
 * Earlier version rendered the LaTeX of the expression in the result slot —
 * which made the display look like a duplicated input. The actual result string
 * comes from `result`; LaTeX is kept on the entry but used only by History/Export.
 */

interface Props {
  expression: string;
  result: string;
  /** LaTeX of the expression — currently unused by Display, kept for API stability */
  latex?: string;
  error?: string;
  angleMode: string;
}

export function Display({ expression, result, error, angleMode }: Props) {
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
      <div
        className="absolute top-3 right-4 flex gap-2 text-[10px] font-mono uppercase tracking-wider"
        style={{ color: 'var(--text-faint)' }}
      >
        <span>{angleMode}</span>
      </div>

      {/* Expression (faded, smaller) */}
      <div
        className="font-mono text-sm mb-3 min-h-[20px] break-all pr-12"
        style={{ color: 'var(--text-faint)' }}
      >
        {expression || '\u00A0'}
      </div>

      {/* Result — big, prominent */}
      {error ? (
        <div className="font-mono text-2xl break-all" style={{ color: 'var(--rose, #ff6b8b)' }}>
          {error}
        </div>
      ) : (
        <div
          className="font-mono text-4xl font-medium break-all"
          style={{ color: result ? 'var(--accent)' : 'var(--text)' }}
        >
          {result || '0'}
        </div>
      )}
    </div>
  );
}
