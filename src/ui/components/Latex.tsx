/**
 * LaTeX renderer using KaTeX.
 * Memoized — only re-renders when the formula changes.
 */

import { useEffect, useRef, memo } from 'react';
import katex from 'katex';

interface Props {
  expression: string;
  displayMode?: boolean;
  className?: string;
}

function LatexImpl({ expression, displayMode = false, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(expression, ref.current, {
        displayMode,
        throwOnError: false,
        errorColor: '#ff6b8b',
        strict: false,
      });
    } catch (err) {
      if (ref.current) {
        ref.current.textContent = expression;
      }
    }
  }, [expression, displayMode]);

  return <span ref={ref} className={className} />;
}

export const Latex = memo(LatexImpl);
