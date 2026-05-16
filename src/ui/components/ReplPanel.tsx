/**
 * Mini-REPL.
 *
 * Lets the user run small JS expressions with full access to the calculator
 * runtime: history, memory, evaluator, formulas.
 *
 * Killer feature: power users can script complex pipelines, e.g.
 *   history.list().map(e => e.result).reduce((a,b) => a + Number(b), 0)
 */

import { useEffect, useRef, useState } from 'react';
import { evaluator } from '../../core/evaluator';
import { history } from '../../core/history';
import { memory } from '../../core/memory';
import { getAll as allFormulas, getById as getFormulaById } from '../../core/formulas/registry';
import { useTranslation } from '../../i18n';

interface ReplLine {
  kind: 'input' | 'output' | 'error';
  text: string;
}

// Sandboxed-ish API exposed to user scripts
function buildContext() {
  return {
    evaluate: (expr: string) => evaluator.evaluate(expr),
    history,
    memory,
    formulas: {
      all: allFormulas,
      get: getFormulaById,
    },
    ans: () => history.list()[0]?.result ?? null,
    print: (...args: unknown[]) => args.map(String).join(' '),
    Math,
  };
}

export function ReplPanel() {
  const { t } = useTranslation();
  const [lines, setLines] = useState<ReplLine[]>([
    { kind: 'output', text: t('repl.help') },
  ]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputHistoryRef = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = () => {
    const code = input.trim();
    if (!code) return;

    inputHistoryRef.current.push(code);
    setHistoryIndex(-1);

    const newLines: ReplLine[] = [...lines, { kind: 'input', text: code }];

    try {
      const ctx = buildContext();
      // Build a function with the context keys as parameters
      const keys = Object.keys(ctx);
      const values = Object.values(ctx);
      // eslint-disable-next-line no-new-func
      const fn = new Function(...keys, `"use strict"; return (${code});`);
      const result = fn(...values);

      let output: string;
      if (result === undefined) output = 'undefined';
      else if (result === null) output = 'null';
      else if (typeof result === 'object') output = JSON.stringify(result, null, 2);
      else output = String(result);

      newLines.push({ kind: 'output', text: output });
    } catch (err) {
      newLines.push({
        kind: 'error',
        text: err instanceof Error ? err.message : String(err),
      });
    }

    setLines(newLines);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(inputHistoryRef.current.length - 1, historyIndex + 1);
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(inputHistoryRef.current[inputHistoryRef.current.length - 1 - newIndex] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex < 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(inputHistoryRef.current[inputHistoryRef.current.length - 1 - newIndex] ?? '');
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1"
        style={{ background: 'var(--display)' }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color:
                line.kind === 'input'
                  ? 'var(--text)'
                  : line.kind === 'error'
                  ? 'var(--rose)'
                  : 'var(--text-muted)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>
              {line.kind === 'input' ? '› ' : line.kind === 'error' ? '✗ ' : '  '}
            </span>
            {line.text}
          </div>
        ))}
      </div>

      <div className="flex items-center px-4 py-3"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <span className="font-mono mr-2" style={{ color: 'var(--accent)' }}>›</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="evaluate('2 + 2')"
          className="flex-1 bg-transparent outline-none font-mono text-sm"
          style={{ color: 'var(--text)' }}
        />
      </div>
    </div>
  );
}
