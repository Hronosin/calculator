/**
 * Main calculator screen.
 *
 * Combines Display + Keypad with the action dispatcher that handles
 * all the button actions emitted by Keypad ('ins:X', 'fn:X(', 'op:X',
 * 'mem:X', 'eval', 'clear', 'delete', 'inv', 'angle', 'percent', 'ans').
 */

import { useEffect, useState, useCallback } from 'react';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { evaluator } from '../../core/evaluator';
import { history } from '../../core/history';
import { memory } from '../../core/memory';
import type { AngleMode } from '../../core/types';

export function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [latex, setLatex] = useState('');
  const [error, setError] = useState('');
  const [angleMode, setAngleMode] = useState<AngleMode>(evaluator.getAngleMode());
  const [inverse, setInverse] = useState(false);

  /** Append a piece of text to the expression at end. */
  const insert = useCallback((text: string) => {
    setError('');
    setExpression((prev) => prev + text);
  }, []);

  /** Run evaluator and push result to history. */
  const evaluate = useCallback(() => {
    if (!expression.trim()) return;
    const out = evaluator.evaluate(expression);
    if (out.ok) {
      setResult(out.value);
      setLatex(out.latex);
      setError('');
      history.add({
        expression,
        result: out.value,
        latex: out.latex,
        kind: 'arithmetic',
      });
      // Save as 'ans' variable
      evaluator.setVariable('ans', out.raw);
    } else {
      setError(out.error);
    }
  }, [expression]);

  const dispatch = useCallback(
    (action: string) => {
      // ins:X — append string
      if (action.startsWith('ins:')) {
        insert(action.slice(4));
        return;
      }
      // fn:X( — append function call (cursor inside parens)
      if (action.startsWith('fn:')) {
        insert(action.slice(3));
        return;
      }
      // op:X — special operators
      if (action.startsWith('op:')) {
        const op = action.slice(3);
        if (op === 'neg') {
          // Toggle sign — wrap last number/expression
          setExpression((prev) => {
            if (!prev) return '-';
            // Naive: if ends with ), wrap; else negate last number
            const match = prev.match(/(-?\d+\.?\d*)$/);
            if (match) {
              const num = match[1];
              const negated = num.startsWith('-') ? num.slice(1) : `-${num}`;
              return prev.slice(0, -num.length) + negated;
            }
            return `-(${prev})`;
          });
        } else if (op === '!') {
          insert('!');
        } else if (op.startsWith('^')) {
          insert(op);
        }
        return;
      }
      // mem:X — memory operations
      if (action.startsWith('mem:')) {
        const cmd = action.slice(4);
        if (cmd === 'clear') memory.clear();
        else if (cmd === 'recall') insert(String(memory.get()));
        else if (cmd === 'plus') {
          const out = evaluator.evaluate(expression);
          if (out.ok) memory.add(Number(out.value));
        } else if (cmd === 'minus') {
          const out = evaluator.evaluate(expression);
          if (out.ok) memory.subtract(Number(out.value));
        }
        return;
      }
      // Special actions
      switch (action) {
        case 'clear':
          setExpression('');
          setResult('');
          setLatex('');
          setError('');
          break;
        case 'delete':
          setExpression((prev) => prev.slice(0, -1));
          break;
        case 'eval':
          evaluate();
          break;
        case 'inv':
          setInverse((v) => !v);
          break;
        case 'angle':
          setAngleMode((prev) => {
            const next: AngleMode = prev === 'DEG' ? 'RAD' : prev === 'RAD' ? 'GRAD' : 'DEG';
            evaluator.setAngleMode(next);
            return next;
          });
          break;
        case 'percent':
          insert('/100');
          break;
        case 'ans':
          insert('ans');
          break;
      }
    },
    [insert, evaluate, expression]
  );

  // Keyboard handler — bind physical keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Skip when an input/textarea is focused (REPL, palette, etc.)
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }

      const k = e.key;
      if (/^[0-9]$/.test(k)) {
        insert(k);
      } else if (k === '.' || k === ',') {
        insert('.');
      } else if (['+', '-', '*', '/', '(', ')', '^', '%'].includes(k)) {
        insert(k);
      } else if (k === 'Enter' || k === '=') {
        e.preventDefault();
        evaluate();
      } else if (k === 'Backspace') {
        setExpression((prev) => prev.slice(0, -1));
      } else if (k === 'Escape') {
        setExpression('');
        setResult('');
        setLatex('');
        setError('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [insert, evaluate]);

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <Display
        expression={expression}
        result={result}
        latex={latex}
        error={error}
        angleMode={angleMode}
      />
      {inverse && (
        <div className="text-[10px] font-mono uppercase tracking-widest px-2"
          style={{ color: 'var(--amber)' }}>
          INV mode active
        </div>
      )}
      <Keypad onAction={dispatch} />
    </div>
  );
}
