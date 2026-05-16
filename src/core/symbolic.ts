/**
 * Symbolic computation engine.
 *
 * Algebrite is a small CAS that runs entirely in the browser — no server,
 * no Python, no Pyodide.
 */

interface AlgebriteAPI {
  run: (input: string) => string;
}

let algebrite: AlgebriteAPI | null = null;

async function loadAlgebrite(): Promise<AlgebriteAPI> {
  if (algebrite) return algebrite;
  const mod = (await import('algebrite')) as unknown as AlgebriteAPI;
  algebrite = mod;
  return mod;
}

export interface SymbolicResult {
  ok: boolean;
  result?: string;
  latex?: string;
  steps?: string[];
  error?: string;
}

function algebraicToLatex(s: string): string {
  return s
    .replace(/\*/g, ' \\cdot ')
    .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/pi/g, '\\pi');
}

export const Symbolic = {
  async differentiate(expression: string, variable = 'x'): Promise<SymbolicResult> {
    try {
      const lib = await loadAlgebrite();
      const out = lib.run(`d(${expression}, ${variable})`);
      return {
        ok: true,
        result: out,
        latex: `\\frac{d}{d${variable}}\\left(${expression}\\right) = ${algebraicToLatex(out)}`,
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  },

  async integrate(expression: string, variable = 'x'): Promise<SymbolicResult> {
    try {
      const lib = await loadAlgebrite();
      const out = lib.run(`integral(${expression}, ${variable})`);
      return {
        ok: true,
        result: out,
        latex: `\\int ${expression}\\, d${variable} = ${algebraicToLatex(out)} + C`,
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  },

  async simplify(expression: string): Promise<SymbolicResult> {
    try {
      const lib = await loadAlgebrite();
      const out = lib.run(`simplify(${expression})`);
      return {
        ok: true,
        result: out,
        latex: `${algebraicToLatex(expression)} = ${algebraicToLatex(out)}`,
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  },

  async factor(expression: string): Promise<SymbolicResult> {
    try {
      const lib = await loadAlgebrite();
      const out = lib.run(`factor(${expression})`);
      return { ok: true, result: out, latex: algebraicToLatex(out) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  },

  async solve(equation: string, variable = 'x'): Promise<SymbolicResult> {
    try {
      const lib = await loadAlgebrite();
      const out = lib.run(`roots(${equation}, ${variable})`);
      return {
        ok: true,
        result: out,
        latex: `${variable} \\in ${algebraicToLatex(out)}`,
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  },
};
