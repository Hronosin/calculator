/**
 * Formula registry.
 * Each formula module imports `register` and adds itself at module load time.
 *
 * Note: side-effect imports of physics/electric/chemistry have been moved
 * to main.tsx to avoid circular-import TDZ issues.
 */

import type { Formula } from '../types';

const registry = new Map<string, Formula>();

export function register(formula: Formula): void {
  if (registry.has(formula.id)) {
    console.warn(`[formulas] duplicate id: ${formula.id} — overwriting`);
  }
  registry.set(formula.id, formula);
}

export function getAll(): Formula[] {
  return Array.from(registry.values());
}

export function getById(id: string): Formula | undefined {
  return registry.get(id);
}

export function getByCategory(category: string): Formula[] {
  return Array.from(registry.values()).filter((f) => f.category === category);
}

export function search(query: string): Formula[] {
  if (!query) return getAll();
  const q = query.toLowerCase();
  return Array.from(registry.values()).filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      (f.description?.toLowerCase().includes(q) ?? false)
  );
}

export function getCategories(): string[] {
  return Array.from(new Set(Array.from(registry.values()).map((f) => f.category))).sort();
}

export function clear(): void {
  registry.clear();
}
