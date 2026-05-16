/**
 * Unit converter registry.
 */

import type { Converter } from '../types';

const registry = new Map<string, Converter>();

export function register(converter: Converter): void {
  registry.set(converter.id, converter);
}

export function getAll(): Converter[] {
  return Array.from(registry.values());
}

export function getById(id: string): Converter | undefined {
  return registry.get(id);
}

export function convert(
  converter: Converter,
  value: number,
  fromCode: string,
  toCode: string
): number {
  const fromUnit = converter.units.find((u) => u.code === fromCode);
  const toUnit = converter.units.find((u) => u.code === toCode);
  if (!fromUnit || !toUnit) {
    throw new Error(`Unknown unit: ${fromCode} or ${toCode}`);
  }

  const base =
    typeof fromUnit.toBase === 'function' ? fromUnit.toBase(value) : value * fromUnit.toBase;

  if (toUnit.fromBase) {
    return toUnit.fromBase(base);
  }
  if (typeof toUnit.toBase === 'number') {
    return base / toUnit.toBase;
  }
  throw new Error(`Converter ${toCode} requires fromBase function`);
}

import './length';
import './mass';
import './temperature';
