/**
 * Memory store — single value, M+ / M- / MR / MC operations.
 */

import { storage } from '../utils/storage';

type Listener = (value: number) => void;

const STORAGE_KEY = 'calc.memory';

class MemoryStore {
  private value = 0;
  private listeners = new Set<Listener>();

  constructor() {
    this.load();
  }

  private async load() {
    const data = await storage.get(STORAGE_KEY);
    if (typeof data === 'number') {
      this.value = data;
      this.emit();
    }
  }

  private emit() {
    for (const listener of this.listeners) listener(this.value);
  }

  private save() {
    storage.set(STORAGE_KEY, this.value).catch(() => {});
  }

  get(): number {
    return this.value;
  }

  set(value: number): void {
    this.value = value;
    this.save();
    this.emit();
  }

  add(delta: number): void {
    this.value += delta;
    this.save();
    this.emit();
  }

  subtract(delta: number): void {
    this.value -= delta;
    this.save();
    this.emit();
  }

  clear(): void {
    this.value = 0;
    this.save();
    this.emit();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.value);
    return () => this.listeners.delete(listener);
  }
}

export const memory = new MemoryStore();
