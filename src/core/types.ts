/**
 * Core types — shared across the whole codebase.
 * Pure TypeScript, no React, no DOM. Can be reused in CLI, bots, etc.
 */

export type AngleMode = 'DEG' | 'RAD' | 'GRAD';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  latex?: string;
  timestamp: number;
  kind: 'arithmetic' | 'symbolic' | 'plot' | 'plugin';
}

export interface EvalResult {
  ok: true;
  value: string;
  latex: string;
  raw: unknown;
}

export interface EvalError {
  ok: false;
  error: string;
}

export type EvalOutcome = EvalResult | EvalError;

export interface FormulaInput {
  name: string;
  label: string;
  unit?: string;
  default: number;
}

export interface FormulaOutput {
  result: number;
  unit?: string;
  latex?: string;
  steps?: string[];
}

export interface Formula {
  id: string;
  name: string;
  category: string;
  description?: string;
  expression?: string;
  inputs: FormulaInput[];
  compute: (values: Record<string, number>) => FormulaOutput;
}

export interface Converter {
  id: string;
  name: string;
  category: string;
  units: Array<{
    code: string;
    label: string;
    toBase: number | ((x: number) => number);
    fromBase?: (x: number) => number;
  }>;
}

export interface Plugin {
  id: string;
  name: string;
  version?: string;
  formulas?: Formula[];
  tabs?: PluginTab[];
}

export interface PluginTab {
  id: string;
  title: string;
  mount: (container: HTMLElement, api: PluginAPI) => void | (() => void);
}

export interface PluginAPI {
  evaluate: (expression: string) => EvalOutcome;
  history: HistoryEntry[];
  memory: number;
  setMemory: (value: number) => void;
  toast: (message: string) => void;
}

export interface CommandPaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'formula' | 'converter' | 'function' | 'history' | 'action';
  keywords?: string[];
  action: () => void;
}
