/**
 * Arithmetic evaluator.
 * Built on mathjs — safer than eval(), handles BigNumber, complex, units.
 */

import { create, all, type MathJsInstance } from 'mathjs';
import type { EvalOutcome, AngleMode } from './types';

const math: MathJsInstance = create(all, {
  number: 'BigNumber',
  precision: 30,
});

export class Evaluator {
  private angleMode: AngleMode = 'DEG';
  private scope: Record<string, unknown> = {};

  setAngleMode(mode: AngleMode): void {
    this.angleMode = mode;
  }

  getAngleMode(): AngleMode {
    return this.angleMode;
  }

  setVariable(name: string, value: unknown): void {
    this.scope[name] = value;
  }

  private prepareExpression(expr: string): string {
    return expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');
  }

  evaluate(expression: string): EvalOutcome {
    if (!expression.trim()) {
      return { ok: false, error: 'Empty expression' };
    }
    try {
      const prepared = this.prepareExpression(expression);
      const node = math.parse(prepared);
      const compiled = node.compile();
      const result = compiled.evaluate(this.scope);

      const value =
        typeof result === 'object' && result !== null && 'toString' in result
          ? (result as { toString: () => string }).toString()
          : String(result);

      const latex = node.toTex({ parenthesis: 'auto', implicit: 'show' });

      return { ok: true, value, latex, raw: result };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  toLatex(expression: string): string {
    try {
      return math.parse(this.prepareExpression(expression)).toTex({
        parenthesis: 'auto',
        implicit: 'show',
      });
    } catch {
      return expression;
    }
  }

  format(value: unknown, precision = 14): string {
    try {
      return math.format(value, { precision, notation: 'auto', lowerExp: -6, upperExp: 12 });
    } catch {
      return String(value);
    }
  }
}

export const evaluator = new Evaluator();
